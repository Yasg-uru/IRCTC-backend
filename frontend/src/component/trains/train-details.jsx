import { useState } from "react";
import StationDetails from "./stattion-details";

export default function TrainDetails({ train, onClose }) {
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 animate-slide-in">
      <button
        onClick={onClose}
        className="float-right text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h2 className="text-3xl font-bold mb-4 text-indigo-800">{train.name}</h2>
      <p className="text-xl mb-2">Train No: {train.Train_no}</p>
      <p className="text-lg mb-4">
        {train.origin} to {train.destination}
      </p>
      <h3 className="text-2xl font-semibold mb-2">Stations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {train.intermediate_stations.map((station, index) => (
          <button
            key={index}
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-semibold py-2 px-4 rounded transition-colors duration-300"
            onClick={() => setSelectedStation(station)}
          >
            {station}
          </button>
        ))}
      </div>
      {selectedStation && (
        <StationDetails
          station={selectedStation}
          schedule={train.schedule.find(
            (s) => s.stationName === selectedStation
          )}
          onClose={() => setSelectedStation(null)}
        />
      )}
    </div>
  );
}
