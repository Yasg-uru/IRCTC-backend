export default function StationDetails({ station, schedule, onClose }) {
  if (!schedule) return null;

  return (
    <div className="mt-4 bg-indigo-50 rounded-lg p-4 animate-fade-in">
      <button
        onClick={onClose}
        className="float-right text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h4 className="text-xl font-semibold mb-2">{station}</h4>
      <p>Arrival: {schedule.arrivalTime}</p>
      <p>Departure: {schedule.departureTime}</p>
      <p>Platform: {schedule.routeNumber}</p>
      <p>Distance: {schedule.distance} km</p>
    </div>
  );
}
