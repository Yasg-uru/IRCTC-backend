import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
function Ticket() {
  const bookingdata = {
    user: "6613911bed37de7fb8072702",
    name: "yash choudhary",
    age: 19,
    gender: "Male",
    trainId: "661178fd4259e77657a64dee",
    date: "2024-04-08T00:00:00.000Z",
    fromStation: "Chhindwara",
    toStation: "Indore Junction",
    seats: {
      coachType: "Sleeper",
      categoryName: "S2",
      seatNumber: 16,
      isBooked: true,
    },
  };

  return (
    <div className="min-h-screen flex flex-col gap-2 p-4 bg-gray-100">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-bold">Booked From</p>
          <p className="font-bold text-xl">{bookingdata.fromStation}</p>
        </div>
        <div>
          <FaArrowRightLong size={50} color="black" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">To</p>
          <p className="font-bold text-xl">{bookingdata.toStation}</p>
        </div>
      </div>
      <div className="flex flex-col ">
        <p className="font-bold underline">Passenger Details</p>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Name</p>
            <p>{bookingdata.name}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Age</p>
            <p>{bookingdata.age}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Gender</p>
            <p>{bookingdata.gender}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Booking Status</p>
            <p>{bookingdata.}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
