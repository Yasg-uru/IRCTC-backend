import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Searchtrain,
  getseatavailability,
} from "../reducx-toolkit/TrainSlice.js";
function getseatavailabilityseats() {
  const location = useLocation();
  console.log("this is a location data :", location?.state);
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
  return (
    <div className="h-[100vh] w-full bg-black flex flex-col gap-2">
      <h1 className="text-white text-center text-2xl"></h1>
      <div className="flex items-center h-[50vh] p-3 rounded-lg w-full border-2 border-white gap-2">
        {seat &&
          seat.map((s) => (
            <div
              onClick={() => {
                navigate("seat");
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
      <Outlet/>
    </div>
  );
}
export default getseatavailabilityseats;
