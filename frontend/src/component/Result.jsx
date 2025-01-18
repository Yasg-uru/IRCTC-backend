import { useEffect, useState } from "react";
import { FaExchangeAlt, FaLongArrowAltRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader.jsx";
import { LuRefreshCcw } from "react-icons/lu";
import toast from "react-hot-toast";
import {motion} from 'framer-motion'
import {
  Searchtrain,
  getpricecoachwise,
  getseatavailability,
  getseatavailabilityprev,
} from "../reducx-toolkit/TrainSlice";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleModal = (train) => {
    setSelectedTrain(train);
    setIsOpen(!isOpen);
  };

  const [fromstation, setfromstation] = useState(
    localStorage.getItem("fromstation")
  );
  const [tostation, settostation] = useState(localStorage.getItem("tostation"));
  const [dateselect, setselectdate] = useState(localStorage.getItem("date"));
  const [prices, setPrices] = useState([]);
  const [openindex, setopenindex] = useState(null);

  const handleopenindex = (index) => {
    setopenindex(index === openindex ? null : index);
  };

  const handleexchange = () => {
    const temp = fromstation;
    setfromstation(tostation);
    settostation(temp);
  };

  let { trainarray } = useSelector((state) => state.train);
  const dispatch = useDispatch();

  const handleprevsearch = () => {
    const currentDate = new Date(dateselect);
    currentDate.setDate(currentDate.getDate() - 1);
    const previousDay = currentDate.toISOString().split("T")[0];
    setselectdate(previousDay);
    dispatch(Searchtrain({ fromstation, tostation, date: dateselect }));
  };

  const handlenextsearch = () => {
    const currentDate = new Date(dateselect);
    currentDate.setDate(currentDate.getDate() + 1);
    const nextDay = currentDate.toISOString().split("T")[0];
    setselectdate(nextDay);
    dispatch(Searchtrain({ fromstation, tostation, date: dateselect }));
  };

  const handlemodifysearch = () => {
    dispatch(Searchtrain({ fromstation, tostation, date: dateselect }));
  };

  useEffect(() => {
    dispatch(Searchtrain({ fromstation, tostation, date: dateselect }));
    setLoading(false);
  }, []);

  console.log(
    "this is a localstorage data tostation",
    localStorage.getItem("tostation")
  );
  console.log(
    "this is a localstorage data fromstation",
    localStorage.getItem("fromstation")
  );
  console.log("this is a localstorage date", localStorage.getItem("date"));

  const { coachwiseprice } = useSelector((state) => state.train);
  const Day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calculateDuration = (train) => {
    const fromStationDeparture = train?.schedule.find(
      (s) => s.stationName === fromstation
    )?.departureTime;
    const toStationArrival = train?.schedule.find(
      (s) => s.stationName === tostation
    )?.arrivalTime;

    if (fromStationDeparture && toStationArrival) {
      const fromTime = new Date(`01/01/2000 ${fromStationDeparture}`);
      const toTime = new Date(`01/01/2000 ${toStationArrival}`);
      const durationMinutes = Math.abs(toTime - fromTime) / 60000; // Difference in minutes
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    }
    return "--";
  };

  function fromstationinfo(train) {
    const fromStation = localStorage.getItem("fromstation");

    if (!train || !train.schedule) {
      return null;
    }
    const departuretime = train.schedule.find((s) => {
      return s.stationName === fromstation;
    });
    let departuredatetime = new Date(
      dateselect + "T" + departuretime?.departureTime
    );
    departuredatetime = departuredatetime.toDateString();
    return train.schedule
      .filter((s) => s.stationName === fromStation)
      .map((s) => (
        <p key={s.id} className="text-white">
          {s.departureTime} | {s.stationName} | {departuredatetime}
        </p>
      ));
  }

  function tostationinfo(train) {
    if (!train || !train.schedule) {
      return null;
    }
    let arrivaltime = train?.schedule.find((s) => {
      return s.stationName === tostation;
    });
    let departuretime = train?.schedule.find((s) => {
      return s.stationName === fromstation;
    });
    let departuretimedate = new Date(
      dateselect + "T" + departuretime?.departureTime
    );

    let arrivaltimedate = new Date(dateselect + "T" + arrivaltime?.arrivalTime);
    console.log("this is a arrival date :", arrivaltimedate);
    if (arrivaltimedate < departuretimedate) {
      arrivaltimedate.setDate(arrivaltimedate.getDate() + 1);
    }
    arrivaltimedate = arrivaltimedate.toDateString();
    return train.schedule
      .filter((s) => s.stationName === localStorage.getItem("tostation"))
      .map((s, index) => (
        <p key={index} className="text-white">
          {s.arrivalTime} | {s.stationName} | {arrivaltimedate}
        </p>
      ));
  }

  const getformatedDate = () => {
    const currentDate = new Date(dateselect);

    let day = currentDate.getDay();
    let year = currentDate.getFullYear();
    let date = currentDate.getDate();
    let month = currentDate.getMonth();

    return `${Day[day]}, ${date} ${months[month]} ${year}`;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen w-full bg-black p-2 flex flex-col overflow-y-auto ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl mt-3"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex flex-col sm:flex-row gap-4 flex-grow">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative flex-grow"
                >
                  <input
                    type="text"
                    name="fromstation"
                    value={fromstation}
                    onChange={(e) => setfromstation(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    placeholder="From Station"
                  />
                  <label className="absolute text-xs text-gray-400 -top-2 left-2 bg-gray-800 px-1">
                    From
                  </label>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="self-center cursor-pointer"
                >
                  <FaExchangeAlt
                    size={24}
                    color="white"
                    onClick={handleexchange}
                    className="transform hover:text-blue-400 transition duration-300"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative flex-grow"
                >
                  <input
                    type="text"
                    name="tostation"
                    value={tostation}
                    onChange={(e) => settostation(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    placeholder="To Station"
                  />
                  <label className="absolute text-xs text-gray-400 -top-2 left-2 bg-gray-800 px-1">
                    To
                  </label>
                </motion.div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 lg:w-2/5">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative flex-grow"
                >
                  <input
                    type="date"
                    value={dateselect}
                    onChange={(e) => setselectdate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  />
                  <label className="absolute text-xs text-gray-400 -top-2 left-2 bg-gray-800 px-1">
                    Date
                  </label>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative flex-grow"
                >
                  <select className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                    <option className="text-gray-300">All Classes</option>
                    <option>First Class</option>
                    <option>Second Class</option>
                    <option>Third Class</option>
                  </select>
                  <label className="absolute text-xs text-gray-400 -top-2 left-2 bg-gray-800 px-1">
                    Class
                  </label>
                </motion.div>
              </div>
              <div className="flex justify-center lg:justify-end items-center mt-4 lg:mt-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlemodifysearch}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                  Modify Search
                </motion.button>
              </div>
            </div>
          </motion.div>
          <div className="grid grid-cols-10 ">
            <div className="col-span-2 hidden md:block lg:block h-screen"></div>
            <div className="md:col-span-8  col-span-10 h-screen">
              <div>
                <div className="h-auto w-full p-2  mt-2 gap-2 flex  md:flex-row flex-col items-center ">
                  <div>
                    <p className="text-white text-2xl ">
                      {trainarray?.length} Result for{" "}
                      <span className="font-bold">
                        {localStorage.getItem("fromstation")}{" "}
                      </span>
                    </p>
                  </div>
                  <div>
                    <FaLongArrowAltRight color="white" size={30} />
                  </div>
                  <div>
                    <p className="text-white text-2xl font-bold">
                      {localStorage.getItem("tostation")}
                    </p>
                  </div>
                  <div>
                    <p className="text-white">| {getformatedDate()}</p>
                  </div>
                </div>
                <div className="h-[10vh] w-full p-2 flex flex-col md:flex-row justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={handleprevsearch}
                      className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold h-10 w-36 md:h-12 md:w-48 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                    >
                      Previous Day
                    </button>
                    <button
                      onClick={handlenextsearch}
                      className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold h-10 w-36 md:h-12 md:w-48 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                    >
                      Next Day
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-4 w-full md:block lg:block mt-5">
                {!trainarray ? (
                  <p className="text-red-500 font-bold text-xl">
                    Trains Not Available for this Route
                  </p>
                ) : (
                  trainarray &&
                  trainarray.map((train, index) => (
                    <div
                      key={index}
                      className="w-full  border-2 border-cyan-500 rounded-md shadow-lg shadow-cyan-500 flex flex-col gap-4 p-4"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="flex justify-between items-center">
                          <p className="text-white text-2xl mb-2 md:mb-0">
                            {train?.name}
                            {`(${train.Train_no})`}
                          </p>
                          <div className="flex gap-2 text-white flex-wrap">
                            <p className="text-white">Runs:</p>
                            {train?.runningDays.map((days) => (
                              <p className="text-white" key={days}>
                                {Day[days].charAt(0)}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="text-white md:text-xl">
                          {fromstationinfo(train)}
                        </div>
                        <p className="text-white md:text-xl">
                          __________ {calculateDuration(train)} __________
                        </p>
                        <div className="text-white md:text-xl">
                          {tostationinfo(train)}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          navigate("/seatavailabilty", {
                            state: {
                              trainid: train._id,
                              fromstation: fromstation,
                              tostation: tostation,
                              date: dateselect,
                            },
                          });
                        }}
                        className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                      >
                        Check Seat Availability and Book Ticket
                      </button>
                      <p
                        onClick={() => toggleModal(train)}
                        className="cursor-pointer text-cyan-500 font-bold text-xl"
                      >
                        Train Schedule
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="flex min-h-screen items-center justify-center p-4 bg-black">
                <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5">
                  <div className="relative p-6 ">
                    <button
                      onClick={toggleModal}
                      className="absolute right-4 top-4 rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-300 hover:text-gray-900"
                    >
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                      Train Schedule
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-4 py-2 font-semibold text-gray-700">
                              S No.
                            </th>
                            <th className="px-4 py-2 font-semibold text-gray-700">
                              Station Code
                            </th>
                            <th className="px-4 py-2 font-semibold text-gray-700">
                              Station Name
                            </th>
                            <th className="px-4 py-2 font-semibold text-gray-700">
                              Route Number
                            </th>
                            <th className="px-4 py-2 font-semibold text-gray-700">
                              Arrival Time
                            </th>
                            <th className="px-4 py-2 font-semibold text-gray-700">
                              Departure Time
                            </th>
                            <th className="px-4 py-2 font-semibold text-gray-700">
                              Halt Time (min)
                            </th>
                            <th className="px-4 py-2 font-semibold text-gray-700">
                              Distance
                            </th>
                            <th className="px-4 py-2 font-semibold text-gray-700">
                              Day
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedTrain &&
                            selectedTrain.schedule.map((item, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                              >
                                <td className="px-4 py-2">{item.serialNo}</td>
                                <td className="px-4 py-2">
                                  {item.stationCode}
                                </td>
                                <td className="px-4 py-2">
                                  {item.stationName}
                                </td>
                                <td className="px-4 py-2">
                                  {item.routeNumber}
                                </td>
                                <td className="px-4 py-2">
                                  {item.arrivalTime}
                                </td>
                                <td className="px-4 py-2">
                                  {item.departureTime}
                                </td>
                                <td className="px-4 py-2">{item.haltTime}</td>
                                <td className="px-4 py-2">{item.distance}</td>
                                <td className="px-4 py-2">{item.day}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-4">
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Result;
