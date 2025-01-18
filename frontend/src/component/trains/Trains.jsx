import { useState, useEffect } from "react";
import TrainCard from "./train-card";

export default function Trains() {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("https://irctc-backend.vercel.app/api/Train/get-trains")
      .then((response) => response.json())
      .then((data) => setTrains(data.trains))
      .catch((error) => console.error("Error fetching trains:", error));
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSelectedTrain(null);
    }
  };

  return (
    <main className="min-h-screen bg-black p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800 animate-fade-in">
        Railway Reservation
      </h1>

      {isOpen && selectedTrain ? (
        // Train Schedule Modal
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="relative p-6 flex justify-between items-center bg-gray-100">
              <h3 className="text-2xl font-bold text-gray-900">
                Train Schedule - {selectedTrain.name}
              </h3>
              {/* Close Button */}
              <button
                onClick={toggleModal}
                className="bg-gray-300 p-2 rounded-full text-gray-700 transition hover:bg-gray-400"
              >
                <svg
                  className="h-6 w-6"
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
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto h-[50vh] p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 font-semibold text-gray-700">
                        S No.
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-700">
                        Station Code
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-700">
                        Station Name
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-700">
                        Route No.
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-700">
                        Arrival
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-700">
                        Departure
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-700">
                        Halt Time
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-700">
                        Distance
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-700">
                        Day
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedTrain.schedule.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2">{item.serialNo}</td>
                        <td className="px-4 py-2">{item.stationCode}</td>
                        <td className="px-4 py-2">{item.stationName}</td>
                        <td className="px-4 py-2">{item.routeNumber}</td>
                        <td className="px-4 py-2">{item.arrivalTime}</td>
                        <td className="px-4 py-2">{item.departureTime}</td>
                        <td className="px-4 py-2">{item.haltTime} min</td>
                        <td className="px-4 py-2">{item.distance} km</td>
                        <td className="px-4 py-2">{item.day}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-100 px-6 py-4 flex justify-end">
              <button
                onClick={toggleModal}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Train List
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {trains.map((train) => (
            <TrainCard
              key={train._id}
              train={train}
              onClick={() => {
                setSelectedTrain(train);
                setIsOpen(true);
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
