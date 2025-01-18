import { useEffect, useState } from 'react'
import { FaTimes, FaMapMarkerAlt, FaClock, FaRuler } from 'react-icons/fa'

export default function TrainScheduleModal({ train, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    return () => setIsVisible(false)
  }, [])

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-gray-800">
        <div className="mt-3 text-center">
          <h3 className="text-2xl leading-6 font-medium text-white mb-2">{train.name} ({train.Train_no}) Schedule</h3>
          <div className="mt-2 px-7 py-3">
            <div className="bg-gray-900 rounded-lg shadow-inner p-4 max-h-96 overflow-y-auto">
              <table className="min-w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Station</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Arrival</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Departure</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Distance</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Day</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {train.schedule.map((stop, index) => (
                    <tr key={index} className="hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-blue-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-white">{stop.stationName}</div>
                            <div className="text-sm text-gray-400">{stop.stationCode}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaClock className="text-green-400 mr-2" />
                          <span className="text-sm text-white">{stop.arrivalTime || '--'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaClock className="text-red-400 mr-2" />
                          <span className="text-sm text-white">{stop.departureTime || '--'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaRuler className="text-yellow-400 mr-2" />
                          <span className="text-sm text-white">{stop.distance} km</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="text-sm text-white">{stop.day}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="items-center px-4 py-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

