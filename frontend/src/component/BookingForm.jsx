import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bookingticket } from "../reducx-toolkit/BookingSlice";

function BookingForm() {
  const location = useLocation();
  const bookingdata = location.state
    ? location.state
    : JSON.parse(localStorage.getItem("bookingdata"));
  const [formdata, setformdata] = useState({
    name: "",
    age: null,
    Gender: "",
    trainid: bookingdata.trainid,
    date: bookingdata.date,
    from_station: bookingdata.from_station,
    to_station: bookingdata.from_station,
    coachType: bookingdata.coachType,
    seatNumber: bookingdata.seatNumber,
    categoryName: bookingdata.categoryName,
  });
  function handlechange(event) {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handlesubmit(event) {
    event.preventDefault();
    dispatch(bookingticket(formdata));

    const { bookingdata } = useSelector((state) => state.book);
    if (bookingdata !== null) {
      navigate("/ticket");
    }
  }
  return (
    <div className="min-h-screen w-full bg-black flex flex-col justify-center items-center">
      <form
        onSubmit={handlesubmit}
        className="max-w-sm w-full flex flex-col gap-2 border-[0.5px] border-cyan-500 shadow-lg shadow-cyan-500 p-2 rounded-lg"
      >
        <h1 className="text-center text-white font-bold text-2xl ">
          Booking Form
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-white font-bold">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formdata.name}
            onChange={handlechange}
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
            placeholder="Enter Name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="age" className="text-white font-bold">
            Age
          </label>
          <input
            type="text"
            name="age"
            value={formdata.age}
            onChange={handlechange}
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
            placeholder="Enter Age"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="Gender" className="text-white font-bold">
            Gender
          </label>
          <input
            type="text"
            name="Gender"
            value={formdata.Gender}
            onChange={handlechange}
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
            placeholder="Enter Name"
          />
        </div>

        <button
          type="submit"
          className=" w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}
export default BookingForm;
