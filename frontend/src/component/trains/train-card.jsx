export default function TrainCard({ train, onClick }) {
  return (
    <div
      className="bg-black border-white border-[0.5px] rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="bg-indigo-600 text-white p-4">
        <h2 className="text-2xl font-semibold">{train.name}</h2>
        <p className="text-sm">Train No: {train.Train_no}</p>
      </div>
      <div className="p-4">
        <p className="text-gray-600">
          <span className="font-semibold">From:</span> {train.origin}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">To:</span> {train.destination}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Category:</span> {train.category}
        </p>
      </div>
    </div>
  );
}
