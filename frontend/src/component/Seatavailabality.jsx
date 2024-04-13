import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Searchtrain, getseatscharts } from "../reducx-toolkit/TrainSlice";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { bookingticket } from "../reducx-toolkit/BookingSlice";
import toast from "react-hot-toast";
import Loader from "./Loader";
function Seatavailabilty({
  coachtype,
  locationdata,
  date,
  trainid,
  from_station,
  to_station,
}) {
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(getseatscharts(locationdata));
    setisLoading(false);
  }, [dispatch, locationdata]);

  const { seatcharts } = useSelector((state) => state.train);
  const coachType = coachtype;

  const categoryNames = [];
  seatcharts.forEach((seatchart) => {
    if (seatchart.coachTypes === coachType) {
      categoryNames.push(seatchart.categoryname);
    }
  });

  const navigate = useNavigate();
  const [coach, setcoach] = useState("");
  const [selectseat, setselectseat] = useState(null);
const [activecoach,setactivecoach]=useState(null)
  function handlebookticket() {
    if (!selectseat) {
      toast.error("please select ticket");
      return;
    }
    if (selectseat.isBooked === true) {
      toast.error("seat is already booked");
      return;
    }
    const data = {
      trainid,
      date,
      from_station,
      to_station,
      coachType: coachtype,
      seatNumber: selectseat.SeatType.seatNumber,
      categoryName: coach,
    };
    // localStorage.setItem("bookingdata",JSON.stringify(data));
    navigate("/bokingform", { state: data });
  }
  return isLoading ? (
    <Loader />
  ) : (
    <div className="text-white text-2xl h-[100vh] w-full flex flex-col overflow-y-auto">
      <div className="h-[10vh] w-full p-4">
        <button
          onClick={handlebookticket}
          className=" text-[20px] bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white  py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          Select Seat & Book Ticket
        </button>
      </div>
      <div className="h-[10vh] w-full flex gap-2">
        {categoryNames?.map((category) => (
          <button
            key={category}
            onClick={() => {
              setcoach(category);
              setactivecoach(category)
            }}
            className={`border-[1.5px] border-white text-green-500 shadow-2xl shadow-cyan-500 h-[50px] w-[100px] rounded-lg ${activecoach===category && `bg-green-600 text-white`  }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {coach &&
          seatcharts
            ?.filter((seatchart) => seatchart.categoryname === coach)
            ?.map((seatchart) =>
              seatchart.arrayofseats.map((s) => (
                <div
                  key={s.SeatType.seatNumber}
                  className="flex flex-col items-center"
                  onClick={() => {
                    setselectseat(s);
                  }}
                >
                  {s.isBooked === false ? (
                    <MdAirlineSeatReclineExtra size={50} color="green" />
                  ) : (
                    <MdAirlineSeatReclineExtra size={50} color="red" />
                  )}
                  <p className="text-white">{s.SeatType.seatNumber}</p>
                  <p className="text-white">{s.SeatType.seatType}</p>
                </div>
              ))
            )}
      </div>
    </div>
  );
}
export default Seatavailabilty;
