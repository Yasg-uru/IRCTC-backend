import { FaRegClock, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'

export default function TrainCard({ train, fromstation, tostation, dateselect, onScheduleClick, onBookClick }) {
  const fromStationInfo = train.schedule.find(s => s.stationName === fromstation)
  const toStationInfo = train.schedule.find(s => s.stationName === tostation)

  const calculateDuration = () => {
    if (fromStationInfo && toStationInfo) {
      const fromTime = new Date(`2000-01-01T${fromStationInfo.departureTime}`)
      const toTime = new Date(`2000-01-01T${toStationInfo.arrivalTime}`)
      const diff = toTime - fromTime
      const hours = Math.floor(diff / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      return `${hours}h ${minutes}m`
    }
    return '--'
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">{train.name} ({train.Train_no})</h3>
          <div className="text-sm">
            Runs on: {train.runningDays.map(day => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][day]).join(' ')}
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-lg font-semibold">{fromStationInfo?.departureTime}</p>
            <p className="text-gray-400">{fromstation}</p>
          </div>
          <div className="text-center">
            <FaRegClock className="inline mr-2" />
            <span>{calculateDuration()}</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{toStationInfo?.arrivalTime}</p>
            <p className="text-gray-400">{tostation}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onScheduleClick}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            View Schedule
          </button>
          <button
            onClick={onBookClick}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Check Availability & Book
          </button>
        </div>
      </div>
    </div>
  )
}

