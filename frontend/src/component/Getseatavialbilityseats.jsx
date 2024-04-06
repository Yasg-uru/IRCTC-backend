import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { GrLinkPrevious } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import Seatavailabilty from "./Seatavailabality.jsx";
import {
  Searchtrain,
  getseatavailability,
} from "../reducx-toolkit/TrainSlice.js";
function getseatavailabilityseats() {
  const [date, setdate] = useState(
    new Date(Date.now()).toISOString().split("T")[0]
  );
  const location = useLocation();
  console.log(
    "this is a location data inside the second last element :",
    location?.state
  );
  const dispatch = useDispatch();
  const fromstation = localStorage.getItem("fromstation");
  const tostation = localStorage.getItem("tostation");
  useEffect(() => {
    dispatch(getseatavailability(location?.state));
    dispatch(Searchtrain({ fromstation, tostation }));
  }, []);

  const { trainarray } = useSelector((state) => state?.train);
  const { seat } = useSelector((state) => state?.train);
  const navigate = useNavigate();
  const handledatechange = () => {
    if (location.state.data) {
      location.state.data.date = date;
      dispatch(getseatavailability(location?.state));
    } else {
      location.state.date = date;
      dispatch(getseatavailability(location?.state));
    }
  };

  //now writing the logic for rendering the seatavailabilty logic
  const [selectcoachRender, setselectcoachRender] = useState(null);
  //this state is helping in the rendering the seats of the coach
  console.log(
    "this is a component that is select coach render ",
    selectcoachRender
  );
  return (
    <div className="h-[100vh] w-full bg-black flex flex-col gap-2">
      <div className="flex gap-2 items-center cursor-pointer">
        <GrLinkPrevious color="red" size={28} />
        <p
          onClick={() => navigate("/")}
          className="text-red-500 font-bold text-xl"
        >
          Back
        </p>
      </div>

      <h1 className="text-white text-center text-2xl"></h1>
      <div className="flex items-center h-[50vh] p-3 rounded-lg w-full border-2 border-white gap-2">
        {seat &&
          seat.map((s) => (
            <div
              key={s.coachtypename}
              onClick={() => {
                setselectcoachRender(s.coachtypename);
              }}
              className="h-[20vh] p-4 w-[30vw] flex flex-col gap-1 rounded-lg shadow-cyan-600 shadow-2xl border-[0.5px] border-white"
            >
              <h1 className="text-white text-xl text-center">
                {s?.coachtypename}
              </h1>
              {s.availableSeat > 0 ? (
                <p className="text-green-500 text-center ">
                  {" "}
                  AVALABLE-{s?.availableSeat}
                </p>
              ) : (
                <p className="text-red-500 text-center">NOT AVAILABLE</p>
              )}
            </div>
          ))}
      </div>
      <div className="h-[10vh] w-72 border-[0.5px] border-slate-100 flex justify-center items-center">
        <input
          type="date"
          placeholder="select date"
          value={date}
          onChange={(e) => {
            setdate(e.target.value);
          }}
          className="text-white bg-black "
        />
        <button
          onClick={handledatechange}
          className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          search by date
        </button>
      </div>
      {/* logic for rendering the seatcharts component  */}
      {selectcoachRender && (
        <Seatavailabilty
          coachtype={selectcoachRender}
          locationdata={location?.state}
        />
      )}
    </div>
  );
}
export default getseatavailabilityseats;
