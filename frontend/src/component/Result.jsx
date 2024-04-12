// import { useEffect, useState } from "react";
// import { FaExchangeAlt } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaLongArrowAltRight } from "react-icons/fa";
// import Loader from "./Loader.jsx";
// import { LuRefreshCcw } from "react-icons/lu";
// import toast from "react-hot-toast";
// import {
//   Searchtrain,
//   getpricecoachwise,
//   getseatavailability,
//   getseatavailabilityprev,
// } from "../reducx-toolkit/TrainSlice";

// function Result() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [selectedTrain, setSelectedTrain] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const toggleModal = (train) => {
//     setSelectedTrain(train);
//     setIsOpen(!isOpen);
//   };

//   const [fromstation, setfromstation] = useState(
//     localStorage.getItem("fromstation")
//   );
//   const [tostation, settostation] = useState(localStorage.getItem("tostation"));
//   const [dateselect, setselectdate] = useState(localStorage.getItem("date"));
//   const [prices, setPrices] = useState([]);
//   const [openindex, setopenindex] = useState(null);
//   const handleopenindex = (index) => {
//     setopenindex(index === openindex ? null : index);
//   };
//   const handleexchange = () => {
//     const temp = fromstation;
//     setfromstation(tostation);
//     settostation(temp);
//   };

//   let { trainarray } = useSelector((state) => state.train);
//   const dispatch = useDispatch();

//   const handleprevsearch = () => {
//     const currentDate = new Date(dateselect);
//     currentDate.setDate(currentDate.getDate() - 1);
//     const previousDay = currentDate.toISOString().split("T")[0];
//     setselectdate(previousDay);
//     dispatch(Searchtrain({ fromstation, tostation, date: dateselect }));
//   };
//   const handlenextsearch = () => {
//     const currentDate = new Date(dateselect);
//     currentDate.setDate(currentDate.getDate() + 1);
//     const nextDay = currentDate.toISOString().split("T")[0];
//     setselectdate(nextDay);
//     dispatch(Searchtrain({ fromstation, tostation, date: dateselect }));
//   };
//   const handlemodifysearch = () => {
//     dispatch(Searchtrain({ fromstation, tostation, date: dateselect }));
//   };
//   useEffect(() => {
//     // trainarray?.forEach(async (train) => {
//     //   await dispatch(
//     //     getpricecoachwise({
//     //       fromstation: fromstation,
//     //       tostation: tostation,
//     //       trainid: train._id,
//     //     })
//     //   );
//     // });

//     dispatch(Searchtrain({ fromstation, tostation, date: dateselect }));
//     setLoading(false);
//   }, []);
//   console.log(
//     "this is a localstorage data tostation",
//     localStorage.getItem("tostation")
//   );
//   console.log(
//     "this is a localstorage data fromstation",
//     localStorage.getItem("fromstation")
//   );
//   console.log("this is a localstorage date", localStorage.getItem("date"));

//   const { coachwiseprice } = useSelector((state) => state.train);
//   const Day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   // let currentDate = new Date();
//   // const day = Day[currentDate.getDay()];
//   // const month = months[currentDate.getMonth()];
//   // const year = currentDate.getFullYear();
//   // const date = currentDate.getDate();

//   const handleavailabilityseat = (data) => {
//     console.log("this is a data for seat availability", data);
//     dispatch(getseatavailability(data));
//   };

//   const { seat } = useSelector((state) => state.train);
//   const calculateDuration = (train) => {
//     const fromStationDeparture = train?.schedule.find(
//       (s) => s.stationName === fromstation
//     )?.departureTime;
//     const toStationArrival = train?.schedule.find(
//       (s) => s.stationName === tostation
//     )?.arrivalTime;

//     if (fromStationDeparture && toStationArrival) {
//       const fromTime = new Date(`01/01/2000 ${fromStationDeparture}`);
//       const toTime = new Date(`01/01/2000 ${toStationArrival}`);
//       const durationMinutes = Math.abs(toTime - fromTime) / 60000; // Difference in minutes
//       const hours = Math.floor(durationMinutes / 60);
//       const minutes = durationMinutes % 60;
//       return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
//     }
//     return "--";
//   };
//   function fromstationinfo(train) {
//     const fromStation = localStorage.getItem("fromstation");

//     if (!train || !train.schedule) {
//       return null;
//     }
//     const departuretime = train.schedule.find((s) => {
//       return s.stationName === fromstation;
//     });
//     let departuredatetime = new Date(
//       dateselect + "T" + departuretime?.departureTime
//     );
//     departuredatetime = departuredatetime.toDateString();
//     return train.schedule
//       .filter((s) => s.stationName === fromStation)
//       .map((s) => (
//         <p key={s.id} className="text-white">
//           {s.departureTime} | {s.stationName} | {departuredatetime}
//         </p>
//       ));
//   }
//   function tostationinfo(train) {
//     if (!train || !train.schedule) {
//       return null;
//     }
//     //now we need to find the tostation date according to their arrival time
//     let arrivaltime = train?.schedule.find((s) => {
//       return s.stationName === tostation;
//     });
//     let departuretime = train?.schedule.find((s) => {
//       return s.stationName === fromstation;
//     });
//     let departuretimedate = new Date(
//       dateselect + "T" + departuretime?.departureTime
//     );

//     let arrivaltimedate = new Date(dateselect + "T" + arrivaltime?.arrivalTime);
//     console.log("this is a arrival date :", arrivaltimedate);
//     if (arrivaltimedate < departuretimedate) {
//       arrivaltimedate.setDate(arrivaltimedate.getDate() + 1);
//     }
//     arrivaltimedate = arrivaltimedate.toDateString();
//     return train.schedule
//       .filter((s) => s.stationName === localStorage.getItem("tostation"))
//       .map((s, index) => (
//         <p key={index} className="text-white">
//           {s.arrivalTime} | {s.stationName} | {arrivaltimedate}
//         </p>
//       ));
//   }

//   const getformatedDate = () => {
//     const currentDate = new Date(dateselect);

//     let day = currentDate.getDay();
//     let year = currentDate.getFullYear();
//     let date = currentDate.getDate();
//     let month = currentDate.getMonth();

//     return `${Day[day]}, ${date} ${months[month]} ${year}`;
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="h-[100vh] w-full bg-black p-2 flex flex-col overflow-y-auto ">
//           <div className="flex gap-4 p-4 w-full shadow-2xl shadow-white mt-3 h-[10vh] items-center">
//             <div className="flex gap-2 h-[30px]">
//               <input
//                 type="text"
//                 name="fromstation"
//                 value={fromstation}
//                 onChange={(e) => {
//                   setfromstation(e.target.value);
//                 }}
//                 className="text-white bg-black rounded-md "
//               />
//               <FaExchangeAlt size={30} color="white" onClick={handleexchange} />
//               <input
//                 type="text"
//                 name="tostation"
//                 value={tostation}
//                 onChange={(e) => {
//                   settostation(e.target.value);
//                 }}
//                 className="text-white bg-black rounded-md "
//               />
//             </div>
//             <div className="h-[30px] ">
//               <input
//                 type="date"
//                 value={dateselect}
//                 onChange={(e) => {
//                   setselectdate(e.target.value);
//                 }}
//                 className="bg-black text-white border-2 rounded-sm border-white "
//               />
//             </div>

//             <div className="relative inline-flex">
//               <select
//                 className="block appearance-none bg-gray-800 border border-gray-600 hover:border-gray-500 text-white px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
//                 name=""
//                 id=""
//               >
//                 <option className="text-gray-300">All Classes</option>
//                 <option value="EA">Anubhuti Class (EA)</option>
//                 <option value="1A">AC First Class (1A)</option>
//                 <option value="EV">Vistadom AC (EV)</option>
//                 <option value="EC">Exec Chair Car (EC)</option>
//                 <option value="2A">AC 2 Tier (2A)</option>
//                 <option value="FC">First Class (FC)</option>
//                 <option value="2A">AC 2 Tier (2A)</option>
//                 <option value="3E">AC 3 Economy (3E)</option>
//                 <option value="VC">Vistadom Chair Car (VC)</option>
//                 <option value="CC">Ac Chair Car (VC)</option>
//                 <option value="SL">Sleeper (SL)</option>
//                 <option value="VS">Vistadom Non AC (VS)</option>
//                 <option value="2S">Second Sitting (2S)</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
//                 <svg
//                   className="fill-current h-4 w-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M9.293 13.707a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 1.414 1.414l-3 3z"
//                   />
//                 </svg>
//               </div>
//             </div>

//             <div className="">
//               <button
//                 onClick={handlemodifysearch}
//                 className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
//               >
//                 Modify Search
//               </button>
//             </div>
//           </div>
//           <div className="grid grid-cols-10 ">
//             <div className="col-span-2  h-[100vh]"></div>
//             <div className="col-span-8  h-[100vh]">
//               <div>
//                 <div className="h-[10vh] w-full p-2  mt-2 gap-2 flex items-center">
//                   <div>
//                     <p className="text-white text-2xl ">
//                       {trainarray?.length} Result for{" "}
//                       <span className="font-bold">
//                         {localStorage.getItem("fromstation")}{" "}
//                       </span>
//                     </p>
//                   </div>
//                   <div>
//                     <FaLongArrowAltRight color="white" size={30} />
//                   </div>
//                   <div>
//                     <p className="text-white text-2xl font-bold">
//                       {localStorage.getItem("tostation")}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-white">| {getformatedDate()}</p>
//                   </div>
//                 </div>
//                 <div className="h-[10vh] w-full  p-2 flex justify-between">
//                   <div className="flex gap-2 ">
//                     <button className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
//                       Sort By Duration
//                     </button>
//                     <button className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
//                       Show Available Trains
//                     </button>
//                   </div>
//                   <div className="flex gap-2 justify-around">
//                     <button
//                       onClick={handleprevsearch}
//                       className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
//                     >
//                       Previous Day
//                     </button>
//                     <button
//                       onClick={handlenextsearch}
//                       className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
//                     >
//                       Next Day
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex overflow-y-auto flex-col gap-2 p-4">
//                 {!trainarray ? (
//                   <p className="text-red-500 font-bold text--xl">
//                     Trains Not Available for this Route
//                   </p>
//                 ) : (
//                   trainarray &&
//                   trainarray.map((train, index) => (
//                     <div
//                       key={index}
//                       className="h-[45vh] w-full border-2 border-cyan-500 rounded-md shadow-lg shadow-cyan-500 flex flex-col gap-2 p-2"
//                     >
//                       <div className="flex justify-between">
//                         <p className="text-white text-2xl">
//                           {train?.name}
//                           {`(${train.Train_no})`}
//                         </p>
//                         <div className="flex gap-2 text-white">
//                           Runs On :
//                           {train?.runningDays.map((days) => (
//                             <p className="text-white">{Day[days]}</p>
//                           ))}
//                         </div>
//                         <p
//                           onClick={() => toggleModal(train)}
//                           className=" cursor-pointer text-cyan-500 font-bold text-xl"
//                         >
//                           {" "}
//                           Train Schedule
//                         </p>
//                       </div>
//                       <div className="flex justify-between ">
//                         <div className="text-white text-xl">
//                           {fromstationinfo(train)}
//                         </div>
//                         <p className="text-white text-xl">
//                           {" "}
//                           __________ {calculateDuration(train)} __________{" "}
//                         </p>
//                         <div className="text-white text-xl">
//                           {tostationinfo(train)}
//                         </div>
//                       </div>
//                       <div className="flex gap-2 ">
//                         <button
//                           onClick={() => {
//                             navigate("/seatavailabilty", {
//                               state: {
//                                 trainid: train._id,
//                                 fromstation: fromstation,
//                                 tostation: tostation,
//                                 date: dateselect,
//                               },
//                             });
//                           }}
//                           className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
//                         >
//                           Check seat Availabilty and Book Ticket
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//           {isOpen && (
//             <div className="fixed z-10 inset-0 overflow-y-auto">
//               <div className="flex items-center justify-center min-h-screen">
//                 <div
//                   className="fixed inset-0 transition-opacity"
//                   onClick={toggleModal}
//                 >
//                   <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//                 </div>
//                 <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-3xl sm:w-full">
//                   <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                     <div className="sm:flex sm:items-start">
//                       <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
//                         <svg
//                           onClick={toggleModal}
//                           className="h-6 w-6 text-blue-600 cursor-pointer"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </div>
//                       <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                         <h3 className="text-lg leading-6 font-medium text-gray-900">
//                           Train Schedule
//                         </h3>
//                         <div className="mt-2 bg-black text-white">
//                           <table className="w-full">
//                             <thead>
//                               <tr>
//                                 <th>S No.</th>
//                                 <th>Station Code</th>
//                                 <th>Station Name</th>
//                                 <th>Route Number</th>
//                                 <th>Arrival Time</th>
//                                 <th>Departure Time</th>
//                                 <th>Halt Time (In minutes)</th>
//                                 <th>Distance</th>
//                                 <th>Day</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {selectedTrain &&
//                                 selectedTrain.schedule.map((item, index) => (
//                                   <tr key={index}>
//                                     <td>{item.serialNo}</td>
//                                     <td>{item.stationCode}</td>
//                                     <td>{item.stationName}</td>
//                                     <td>{item.routeNumber}</td>
//                                     <td>{item.arrivalTime}</td>
//                                     <td>{item.departureTime}</td>
//                                     <td>{item.haltTime}</td>
//                                     <td>{item.distance}</td>
//                                     <td>{item.day}</td>
//                                   </tr>
//                                 ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                     <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
//                       <button
//                         onClick={toggleModal}
//                         type="button"
//                         className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
//                       >
//                         Close
//                       </button>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default Result;
import { useEffect, useState } from "react";
import { FaExchangeAlt, FaLongArrowAltRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader.jsx";
import { LuRefreshCcw } from "react-icons/lu";
import toast from "react-hot-toast";
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

  //   return (
  //     <>
  //       {loading ? (
  //         <Loader />
  //       ) : (
  //         <div className="h-[100vh] w-full bg-black p-2 flex flex-col overflow-y-auto ">
  //           {/* <div className="flex gap-4 p-4 w-full shadow-2xl shadow-white mt-3 h-[10vh] items-center">
  //             <div className="flex gap-2 h-[30px]">
  //               <input
  //                 type="text"
  //                 name="fromstation"
  //                 value={fromstation}
  //                 onChange={(e) => {
  //                   setfromstation(e.target.value);
  //                 }}
  //                 className="text-white bg-black rounded-md "
  //               />
  //               <FaExchangeAlt size={30} color="white" onClick={handleexchange} />
  //               <input
  //                 type="text"
  //                 name="tostation"
  //                 value={tostation}
  //                 onChange={(e) => {
  //                   settostation(e.target.value);
  //                 }}
  //                 className="text-white bg-black rounded-md "
  //               />
  //             </div>
  //             <div className="h-[30px] ">
  //               <input
  //                 type="date"
  //                 value={dateselect}
  //                 onChange={(e) => {
  //                   setselectdate(e.target.value);
  //                 }}
  //                 className="bg-black text-white border-2 rounded-sm border-white "
  //               />
  //             </div>

  //             <div className="relative inline-flex">
  //               <select
  //                 className="block appearance-none bg-gray-800 border border-gray-600 hover:border-gray-500 text-white px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
  //                 name=""
  //                 id=""
  //               >
  //                 <option className="text-gray-300">All Classes</option>
  //                 <option value="EA">Anubhuti Class (EA)</option>
  //                 <option value="1A">AC First Class (1A)</option>
  //                 <option value="EV">Vistadom AC (EV)</option>
  //                 <option value="EC">Exec Chair Car (EC)</option>
  //                 <option value="2A">AC 2 Tier (2A)</option>
  //                 <option value="FC">First Class (FC)</option>
  //                 <option value="2A">AC 2 Tier (2A)</option>
  //                 <option value="3E">AC 3 Economy (3E)</option>
  //                 <option value="VC">Vistadom Chair Car (VC)</option>
  //                 <option value="CC">Ac Chair Car (VC)</option>
  //                 <option value="SL">Sleeper (SL)</option>
  //                 <option value="VS">Vistadom Non AC (VS)</option>
  //                 <option value="2S">Second Sitting (2S)</option>
  //               </select>
  //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
  //                 <svg
  //                   className="fill-current h-4 w-4"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   viewBox="0 0 20 20"
  //                 >
  //                   <path
  //                     fillRule="evenodd"
  //                     d="M9.293 13.707a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 1.414 1.414l-3 3z"
  //                   />
  //                 </svg>
  //               </div>
  //             </div>

  //             <div className="">
  //               <button
  //                 onClick={handlemodifysearch}
  //                 className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
  //               >
  //                 Modify Search
  //               </button>
  //             </div>
  //           </div> */}
  //           <div className="p-4 shadow-2xl shadow-white mt-3">
  //         <div className="flex flex-col md:flex-row gap-4">
  //           <div className="flex gap-2 flex-grow">
  //             <input
  //               type="text"
  //               name="fromstation"
  //               value={fromstation}
  //               onChange={(e) => {
  //                 setfromstation(e.target.value);
  //               }}
  //               className="text-white bg-black rounded-md mb-2 flex-grow"
  //               placeholder="From Station"
  //             />
  //             <FaExchangeAlt
  //               size={30}
  //               color="white"
  //               onClick={handleexchange}
  //               className="self-center cursor-pointer"
  //             />
  //             <input
  //               type="text"
  //               name="tostation"
  //               value={tostation}
  //               onChange={(e) => {
  //                 settostation(e.target.value);
  //               }}
  //               className="text-white bg-black rounded-md flex-grow"
  //               placeholder="To Station"
  //             />
  //           </div>
  //           <div className="flex flex-col md:flex-row gap-2 md:items-center">
  //             <input
  //               type="date"
  //               value={dateselect}
  //               onChange={(e) => {
  //                 setselectdate(e.target.value);
  //               }}
  //               className="bg-black text-white border-2 rounded-sm border-white mb-2 md:mb-0"
  //             />
  //             <select
  //               className="block appearance-none bg-gray-800 border border-gray-600 hover:border-gray-500 text-white px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
  //               name=""
  //               id=""
  //             >
  //                <option className="text-gray-300">All Classes</option>
  //                 <option value="EA">Anubhuti Class (EA)</option>
  //                 <option value="1A">AC First Class (1A)</option>
  //                 <option value="EV">Vistadom AC (EV)</option>
  //                 <option value="EC">Exec Chair Car (EC)</option>
  //                 <option value="2A">AC 2 Tier (2A)</option>
  //                 <option value="FC">First Class (FC)</option>
  //                 <option value="2A">AC 2 Tier (2A)</option>
  //                 <option value="3E">AC 3 Economy (3E)</option>
  //                 <option value="VC">Vistadom Chair Car (VC)</option>
  //                 <option value="CC">Ac Chair Car (VC)</option>
  //                 <option value="SL">Sleeper (SL)</option>
  //                 <option value="VS">Vistadom Non AC (VS)</option>
  //                 <option value="2S">Second Sitting (2S)</option>

  //             </select>
  //           </div>
  //           <div className="flex justify-end md:items-center">
  //             <button
  //               onClick={handlemodifysearch}
  //               className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
  //             >
  //               Modify Search
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //           <div className="grid grid-cols-10 ">
  //             <div className="col-span-2  h-[100vh]"></div>
  //             <div className="col-span-8  h-[100vh]">
  //               <div>
  //                 <div className="h-[10vh] w-full p-2  mt-2 gap-2 flex items-center">
  //                   <div>
  //                     <p className="text-white text-2xl ">
  //                       {trainarray?.length} Result for{" "}
  //                       <span className="font-bold">
  //                         {localStorage.getItem("fromstation")}{" "}
  //                       </span>
  //                     </p>
  //                   </div>
  //                   <div>
  //                     <FaLongArrowAltRight color="white" size={30} />
  //                   </div>
  //                   <div>
  //                     <p className="text-white text-2xl font-bold">
  //                       {localStorage.getItem("tostation")}
  //                     </p>
  //                   </div>
  //                   <div>
  //                     <p className="text-white">| {getformatedDate()}</p>
  //                   </div>
  //                 </div>
  //                 <div className="h-[10vh] w-full p-2 flex flex-col md:flex-row justify-between items-center">
  //   <div className="flex flex-wrap gap-2">
  //     <button className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold h-10 w-36 md:h-12 md:w-48 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
  //       Sort By Duration
  //     </button>
  //     <button className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold h-10 w-36 md:h-12 md:w-48 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
  //       Show Available Trains
  //     </button>
  //   </div>
  //   <div className="flex gap-2 justify-around">
  //     <button
  //       onClick={handleprevsearch}
  //       className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold h-10 w-36 md:h-12 md:w-48 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
  //     >
  //       Previous Day
  //     </button>
  //     <button
  //       onClick={handlenextsearch}
  //       className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold h-10 w-36 md:h-12 md:w-48 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
  //     >
  //       Next Day
  //     </button>
  //   </div>
  // </div>

  //               </div>
  //               <div className="flex flex-col gap-4 p-4">
  //   {!trainarray ? (
  //     <p className="text-red-500 font-bold text-xl">
  //       Trains Not Available for this Route
  //     </p>
  //   ) : (
  //     trainarray &&
  //     trainarray.map((train, index) => (
  //       <div
  //         key={index}
  //         className="w-full border-2 border-cyan-500 rounded-md shadow-lg shadow-cyan-500 flex flex-col gap-4 p-4"
  //       >
  //         <div className="flex flex-col gap-4 md:flex-row md:items-center">
  //           <div className="flex justify-between items-center">
  //             <p className="text-white text-2xl mb-2 md:mb-0">
  //               {train?.name}
  //               {`(${train.Train_no})`}
  //             </p>
  //             <div className="flex gap-2 text-white">
  //               <p className="text-white">Runs:</p>
  //               {train?.runningDays.map((days) => (
  //                 <p className="text-white" key={days}>
  //                   {Day[days].charAt(0)}
  //                 </p>
  //               ))}
  //             </div>
  //           </div>
  //           <div className="text-white md:text-xl">
  //             {fromstationinfo(train)}
  //           </div>
  //           <p className="text-white md:text-xl">
  //             __________ {calculateDuration(train)} __________
  //           </p>
  //           <div className="text-white md:text-xl">
  //             {tostationinfo(train)}
  //           </div>
  //         </div>
  //         <button
  //           onClick={() => {
  //             navigate("/seatavailabilty", {
  //               state: {
  //                 trainid: train._id,
  //                 fromstation: fromstation,
  //                 tostation: tostation,
  //                 date: dateselect,
  //               },
  //             });
  //           }}
  //           className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
  //         >
  //           Check Seat Availability and Book Ticket
  //         </button>
  //         <p
  //           onClick={() => toggleModal(train)}
  //           className="cursor-pointer text-cyan-500 font-bold text-xl"
  //         >
  //           Train Schedule
  //         </p>
  //       </div>
  //     ))
  //   )}
  // </div>

  //             </div>
  //           </div>
  //           {isOpen && (
  //             <div className="fixed z-10 inset-0 overflow-y-auto">
  //               <div className="flex items-center justify-center min-h-screen">
  //                 <div
  //                   className="fixed inset-0 transition-opacity"
  //                   onClick={toggleModal}
  //                 >
  //                   <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
  //                 </div>
  //                 <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-3xl sm:w-full">
  //                   <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
  //                     <div className="sm:flex sm:items-start">
  //                       <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
  //                         <svg
  //                           onClick={toggleModal}
  //                           className="h-6 w-6 text-blue-600 cursor-pointer"
  //                           xmlns="http://www.w3.org/2000/svg"
  //                           fill="none"
  //                           viewBox="0 0 24 24"
  //                           stroke="currentColor"
  //                         >
  //                           <path
  //                             strokeLinecap="round"
  //                             strokeLinejoin="round"
  //                             strokeWidth={2}
  //                             d="M6 18L18 6M6 6l12 12"
  //                           />
  //                         </svg>
  //                       </div>
  //                       <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
  //                         <h3 className="text-lg leading-6 font-medium text-gray-900">
  //                           Train Schedule
  //                         </h3>
  //                         <div className="mt-2 bg-black text-white">
  //                           <table className="w-full">
  //                             <thead>
  //                               <tr>
  //                                 <th>S No.</th>
  //                                 <th>Station Code</th>
  //                                 <th>Station Name</th>
  //                                 <th>Route Number</th>
  //                                 <th>Arrival Time</th>
  //                                 <th>Departure Time</th>
  //                                 <th>Halt Time (In minutes)</th>
  //                                 <th>Distance</th>
  //                                 <th>Day</th>
  //                               </tr>
  //                             </thead>
  //                             <tbody>
  //                               {selectedTrain &&
  //                                 selectedTrain.schedule.map((item, index) => (
  //                                   <tr key={index}>
  //                                     <td>{item.serialNo}</td>
  //                                     <td>{item.stationCode}</td>
  //                                     <td>{item.stationName}</td>
  //                                     <td>{item.routeNumber}</td>
  //                                     <td>{item.arrivalTime}</td>
  //                                     <td>{item.departureTime}</td>
  //                                     <td>{item.haltTime}</td>
  //                                     <td>{item.distance}</td>
  //                                     <td>{item.day}</td>
  //                                   </tr>
  //                                 ))}
  //                             </tbody>
  //                           </table>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                   <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
  //                     <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
  //                       <button
  //                         onClick={toggleModal}
  //                         type="button"
  //                         className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
  //                       >
  //                         Close
  //                       </button>
  //                     </span>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       )}
  //     </>
  //   );
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen w-full bg-black p-2 flex flex-col overflow-y-auto ">
          <div className="p-4 shadow-2xl shadow-white mt-3">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex md:flex-row flex-col gap-2 flex-grow">
                <input
                  type="text"
                  name="fromstation"
                  value={fromstation}
                  onChange={(e) => {
                    setfromstation(e.target.value);
                  }}
                  className="text-white bg-black rounded-md mb-2 flex-grow"
                  placeholder="From Station"
                />
                <FaExchangeAlt
                  size={30}
                  color="white"
                  onClick={handleexchange}
                  className="self-center cursor-pointer"
                />
                <input
                  type="text"
                  name="tostation"
                  value={tostation}
                  onChange={(e) => {
                    settostation(e.target.value);
                  }}
                  className="text-white bg-black rounded-md flex-grow"
                  placeholder="To Station"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:items-center">
                <input
                  type="date"
                  value={dateselect}
                  onChange={(e) => {
                    setselectdate(e.target.value);
                  }}
                  className="bg-black text-white border-2 rounded-sm border-white mb-2 md:mb-0"
                />
                <select
                  className="block appearance-none bg-gray-800 border border-gray-600 hover:border-gray-500 text-white px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  name=""
                  id=""
                >
                  <option className="text-gray-300">All Classes</option>
                  {/* Options */}
                </select>
              </div>
              <div className="flex justify-end md:items-center">
                <button
                  onClick={handlemodifysearch}
                  className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                >
                  Modify Search
                </button>
              </div>
            </div>
          </div>
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
                  {/* <div className="flex flex-wrap gap-2">
                    <button className=" sm:hidden bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold h-10 w-36 md:h-12 md:w-48 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                      Sort By Duration
                    </button>
                    <button className=" sm:hidden bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold h-10 w-36 md:h-12 md:w-48 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                      Show Available Trains
                    </button>
                  </div> */}
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
                      className="w-full max-w-sm border-2 border-cyan-500 rounded-md shadow-lg shadow-cyan-500 flex flex-col gap-4 p-4"
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
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div
                  className="fixed inset-0 transition-opacity"
                  onClick={toggleModal}
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-3xl sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          onClick={toggleModal}
                          className="h-6 w-6 text-blue-600 cursor-pointer"
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
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Train Schedule
                        </h3>
                        <div className="mt-2 bg-black text-white">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th>S No.</th>
                                <th>Station Code</th>
                                <th>Station Name</th>
                                <th>Route Number</th>
                                <th>Arrival Time</th>
                                <th>Departure Time</th>
                                <th>Halt Time (In minutes)</th>
                                <th>Distance</th>
                                <th>Day</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedTrain &&
                                selectedTrain.schedule.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.serialNo}</td>
                                    <td>{item.stationCode}</td>
                                    <td>{item.stationName}</td>
                                    <td>{item.routeNumber}</td>
                                    <td>{item.arrivalTime}</td>
                                    <td>{item.departureTime}</td>
                                    <td>{item.haltTime}</td>
                                    <td>{item.distance}</td>
                                    <td>{item.day}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                      <button
                        onClick={toggleModal}
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        Close
                      </button>
                    </span>
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
