import { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import toast from "react-hot-toast";
import {
  Searchtrain,
  getpricecoachwise,
  getseatavailability,
  getseatavailabilityprev,
} from "../reducx-toolkit/TrainSlice";
import { searchtrainbyorigintodestination } from "../../../backend/controller/Train.controller";
function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const [fromstation, setfromstation] = useState(location?.state?.fromstation);
  const [tostation, settostation] = useState(location?.state?.tostation);
  const [dateselect, setselectdate] = useState();
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
  useEffect(() => {
    trainarray?.forEach(async (train) => {
      await dispatch(
        getpricecoachwise({
          fromstation: fromstation,
          tostation: tostation,
          trainid: train._id,
        })
      );
    });
    setfromstation(localStorage.getItem("fromstation"));
    settostation(localStorage.getItem("tostation"));
    dispatch(Searchtrain({ fromstation, tostation }));
  }, []);
  const handlemodifysearch = () => {
    dispatch(Searchtrain({ fromstation, tostation }));
  };
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
  let currentDate = new Date();
  const day = Day[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const date = currentDate.getDate();
  const handleavailabilityseat = (data) => {
    console.log("this is a data for seat availability", data);
    dispatch(getseatavailability(data));
  };
  const { seat } = useSelector((state) => state.train);

  return (
    <div className="h-[100vh] w-full bg-black p-2 flex flex-col overflow-y-auto ">
      <div className="flex gap-4 p-4 w-full shadow-2xl shadow-white mt-3 h-[10vh] items-center">
        <div className="flex gap-2 h-[30px]">
          <input
            type="text"
            name="fromstation"
            value={fromstation}
            onChange={(e) => {
              setfromstation(e.target.value);
            }}
            className="text-white bg-black rounded-md "
          />
          <FaExchangeAlt size={30} color="white" onClick={handleexchange} />
          <input
            type="text"
            name="tostation"
            value={tostation}
            onChange={(e) => {
              settostation(e.target.value);
            }}
            className="text-white bg-black rounded-md "
          />
        </div>
        <div className="h-[30px] ">
          <input
            type="date"
            value={dateselect}
            onChange={(e) => {
              setselectdate(e.target.value);
            }}
            className="bg-black text-white border-2 rounded-sm border-white "
          />
        </div>

        <div className="relative inline-flex">
          <select
            className="block appearance-none bg-gray-800 border border-gray-600 hover:border-gray-500 text-white px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            name=""
            id=""
          >
            <option className="text-gray-300">All Classes</option>
            <option value="EA">Anubhuti Class (EA)</option>
            <option value="1A">AC First Class (1A)</option>
            <option value="EV">Vistadom AC (EV)</option>
            <option value="EC">Exec Chair Car (EC)</option>
            <option value="2A">AC 2 Tier (2A)</option>
            <option value="FC">First Class (FC)</option>
            <option value="2A">AC 2 Tier (2A)</option>
            <option value="3E">AC 3 Economy (3E)</option>
            <option value="VC">Vistadom Chair Car (VC)</option>
            <option value="CC">Ac Chair Car (VC)</option>
            <option value="SL">Sleeper (SL)</option>
            <option value="VS">Vistadom Non AC (VS)</option>
            <option value="2S">Second Sitting (2S)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.293 13.707a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 1.414 1.414l-3 3z"
              />
            </svg>
          </div>
        </div>

        <div className="">
          <button
            onClick={handlemodifysearch}
            className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Modify Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-10 ">
        <div className="col-span-2  h-[100vh]"></div>
        <div className="col-span-8  h-[100vh]">
          <div>
            <div className="h-[10vh] w-full p-2  mt-2 gap-2 flex items-center">
              <div>
                <p className="text-white text-2xl ">
                  {trainarray?.length} Result for{" "}
                  <span className="font-bold">{fromstation} </span>
                </p>
              </div>
              <div>
                <FaLongArrowAltRight color="white" size={30} />
              </div>
              <div>
                <p className="text-white text-2xl font-bold">{tostation}</p>
              </div>
              <div>
                <p className="text-white">
                  | {day},{date} {month} {year}
                </p>
              </div>
            </div>
            <div className="h-[10vh] w-full  p-2 flex justify-between">
              <div className="flex gap-2 ">
                <button className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  Sort By Duration
                </button>
                <button className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  Show Available Trains
                </button>
              </div>
              <div className="flex gap-2 justify-around">
                <button className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  Previous Day
                </button>
                <button className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  Next Day
                </button>
              </div>
            </div>
          </div>
          <div className="flex overflow-y-auto flex-col gap-2 p-4">
            {trainarray?.map((train, index) => (
              <div
                key={index}
                className="h-[45vh] w-full border-2 border-cyan-500 rounded-md shadow-lg shadow-cyan-500 flex flex-col gap-2 p-2"
              >
                <div className="flex justify-between">
                  <p className="text-white text-2xl">
                    {train?.name}
                    {`(${train.Train_no})`}
                  </p>
                  <p className="text-white ">Runs On : M T W T F S S</p>
                  <p className="text-cyan-500 font-bold text-xl">
                    {" "}
                    Train Schedule
                  </p>
                </div>
                <div className="flex justify-between ">
                  <p className="text-white text-xl">
                    21:27 | {fromstation.toUpperCase()} | Sun,31 Mar
                  </p>
                  <p className="text-white text-xl">--08:23--</p>
                  <p className="text-white text-xl">
                    05:50 | {tostation.toUpperCase()} | Mon,1 Apr
                  </p>
                </div>
                <div className="flex gap-2 ">
                  <button
                    onClick={() => {
                      navigate("/seatavailabilty", {
                        state: {
                          trainid: train._id,
                          fromstation: fromstation,
                          tostation: tostation,
                          date: currentDate,
                        },
                      });
                    }}
                    className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                  >
                    Check seat Availabilty and Book Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Result;
