import React, { useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";


function Ticket() {
  const location=useLocation();
  console.log("this is a location ticket data :",location.state)
  const bookingdata=useSelector((state)=>state.book.bookingdata) || localStorage.getItem("booking") || {};
console.log("this is a booking data :",bookingdata)
  // const bookingdata = {
  //   user: "6613911bed37de7fb8072702",
  //   name: "yash choudhary",
  //   age: 19,
  //   Gender: "Male",
  //   trainid: "661178fd4259e77657a64dee",
  //   date: "2024-04-08T00:00:00.000Z",
  //   from_station: "Chhindwara",
  //   to_station: "Indore Junction",
  //   seats: {
  //     coachType: "Sleeper",
  //     categoryName: "S2",
  //     seatNumber: 24,
  //     isBooked: true,
  //   },
  //   startDate: "Mon Apr 08 2024",
  //   endDate: "Tue Apr 09 2024",
  //   totalDistance: 561,
  //   arrivaltime: "12:45",
  //   seatType: {
  //     seatNumber: 24,
  //     seatType: "Side Upper",
  //   },
  //   trainname: "Penchvalley Express",
  //   train_Number: 19344,
  // };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div
      className="min-h-screen flex flex-col gap-4 p-4 bg-gray-100"
      ref={componentRef}
    >
      <div className="flex justify-between items-center bg-white rounded-lg shadow-lg p-4 animate-fadeIn">
        <div className="flex flex-col gap-2">
          <p className="font-bold">Booked From</p>
          <p className="font-bold text-xl">{bookingdata?.from_station}</p>
          <p className="text-sm">Start Date: {bookingdata?.startDate}</p>
        </div>
        <div>
          <FaArrowRightLong
            size={50}
            color="black"
            className="animate-bounce"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">To</p>
          <p className="font-bold text-xl">{bookingdata?.to_station}</p>
          <p className="text-sm">
            Arrival: {bookingdata?.arrivaltime} {bookingdata?.endDate}
          </p>
        </div>
      </div>

      <div className="flex justify-between bg-white rounded-lg shadow-lg p-4 animate-fadeIn delay-200">
        <div className="flex flex-col gap-2">
          <p className="text-cyan-500 font-bold">Train No./Name</p>
          <p className="text-cyan-500 font-bold">
            {bookingdata?.train_Number}/{bookingdata?.trainname}
          </p>
          <p className="font-bold">Distance</p>
          <p>{bookingdata?.totalDistance} KM</p>
        </div>
        <div className="flex flex-col gap-2 ">
          <p className="font-bold">CLASS</p>
          <p className="text-cyan-500 font-bold text-xl">
            {bookingdata?.seats?.coachType}
          </p>
          <p className="font-bold">Booking</p>
          <p>28-Mar-2024 12:10:22 HRS</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 animate-fadeIn delay-400">
        <p className="font-bold underline">Passenger Details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Name</p>
            <p>{bookingdata?.name}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Age</p>
            <p>{bookingdata?.age}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Gender</p>
            <p>{bookingdata?.Gender}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Booking Status</p>
            <p>
              {bookingdata?.seats?.categoryName}/{bookingdata?.seatType?.seatNumber}
              /{bookingdata?.seatType?.seatType.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 animate-fadeIn delay-400">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handlePrint}
        >
          Print PDF
        </button>
      </div>
    </div>
  );
}

export default Ticket;
