import React, { useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { useLocation } from "react-router-dom";
import Loader from "../component/Loader.jsx";

function Ticket() {
  const location = useLocation();
  const bookingdata = location.state?.booking || {};

  const isLoading = !bookingdata;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div
      className="min-h-screen flex flex-col gap-4 p-6 bg-gray-100"
      ref={componentRef}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Train Information Section */}
          <div className="flex justify-between items-center bg-white rounded-lg shadow-lg p-6 mb-4 animate-fadeIn">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg text-gray-700">From</p>
              <p className="font-bold text-xl text-blue-500">
                {bookingdata?.from_station}
              </p>
              <p className="text-sm text-gray-500">
                Start Date: {new Date(bookingdata?.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <FaArrowRightLong
                size={50}
                color="black"
                className="animate-bounce"
              />
            </div>
            <div className="flex flex-col gap-2 text-right">
              <p className="font-semibold text-lg text-gray-700">To</p>
              <p className="font-bold text-xl text-blue-500">
                {bookingdata?.to_station}
              </p>
              <p className="text-sm text-gray-500">
                Arrival Date: {new Date(bookingdata?.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Train Details Section */}
          <div className="flex justify-between bg-white rounded-lg shadow-lg p-6 mb-4 animate-fadeIn delay-200">
            <div className="flex flex-col gap-2">
              <p className="text-cyan-500 font-semibold">Train No./Name</p>
              <p className="text-cyan-500 font-bold text-xl">
                {bookingdata?.trainid} / {bookingdata?.trainName}
              </p>
              <p className="font-semibold text-sm">Distance</p>
              <p>{bookingdata?.seats?.distance} KM</p>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <p className="font-semibold text-sm">CLASS</p>
              <p className="text-cyan-500 font-bold text-xl">
                {bookingdata?.seats?.coachType}
              </p>
              <p className="font-semibold text-sm">Booking Time</p>
              <p>{new Date().toLocaleString()}</p>
            </div>
          </div>

          {/* Passenger Information Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4 animate-fadeIn delay-400">
            <p className="font-semibold underline text-xl text-gray-700 mb-4">
              Passenger Details
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-sm text-gray-600">Name</p>
                <p className="text-lg">{bookingdata?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-sm text-gray-600">Age</p>
                <p className="text-lg">{bookingdata?.age}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-sm text-gray-600">Gender</p>
                <p className="text-lg">{bookingdata?.Gender}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-sm text-gray-600">
                  Seat Details
                </p>
                <p className="text-lg">
                  {bookingdata?.seats?.categoryName}/
                  {bookingdata?.seats?.seatNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn delay-400">
            <button
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
              onClick={handlePrint}
            >
              Print Ticket
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Ticket;
