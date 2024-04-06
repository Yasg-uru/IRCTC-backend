import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Searchtrain, getseatscharts } from "../reducx-toolkit/TrainSlice";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
function Seatavailabilty() {
  const [selectseat, setselectseat] = useState(null);

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getseatscharts(location?.state?.data));
  }, [dispatch, location.state.data]);

  const { seatcharts } = useSelector((state) => state.train);
  const coachType = location?.state?.coachType;

  const categoryNames = [];
  seatcharts.forEach((seatchart) => {
    if (seatchart.coachTypes === coachType) {
      categoryNames.push(seatchart.categoryname);
    }
  });

  const [coach, setcoach] = useState("");

  return (
    <div className="text-white text-2xl h-[100vh] w-full flex flex-col overflow-y-auto">
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
