import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Searchtrain, getseatscharts } from "../reducx-toolkit/TrainSlice";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { bookingticket } from "../reducx-toolkit/BookingSlice";
import toast from "react-hot-toast";
function Seatavailabilty({
  coachtype,
  locationdata,
  date,
  trainid,
  from_station,
  to_station,
}) {
  console.log("this is a coachtype :", coachtype);
  console.log("this is a locationdata :", locationdata);
  console.log(
    "this is a another data props inside the seatavailabilty component :",
    date,
    trainid,
    from_station,
    to_station
  );
  // const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getseatscharts(locationdata));
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
  function handlebookticket() {
    if (!selectseat) {
      toast.error("please select ticket");
      return;
    }
    const data = {
      trainid,
      date,
      from_station,
      to_station,
      coachType: coachtype,
      seatNumber: selectseat,
      categoryName: coach,
    };
    // localStorage.setItem("bookingdata",JSON.stringify(data));
    navigate("/bokingform", { state: data });

    // dispatch(
    //   bookingticket({
    //     trainid,
    //     date,
    //     from_station,
    //     to_station,
    //     coachType: coachtype,
    //     seatNumber: selectseat,
    //     categoryName: coach,
    //   })
    // );
  }
  return (
    <div className="text-white text-2xl h-[100vh] w-full flex flex-col overflow-y-auto">
      <div className="h-[10vh] w-full p-4">
        <button
          onClick={handlebookticket}
          className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white  py-1 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
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
            }}
            className="border-[1.5px] border-white text-green-500 shadow-2xl shadow-cyan-500 h-[50px] w-[100px] rounded-lg "
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
                    setselectseat(s.SeatType.seatNumber);
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
