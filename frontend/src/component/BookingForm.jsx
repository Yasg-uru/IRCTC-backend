import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";

function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve booking data from state or localStorage
  const bookingdata =
    location.state || JSON.parse(localStorage.getItem("bookingdata")) || {};

  // Form state
  const [formdata, setformdata] = useState({
    name: "",
    age: "",
    Gender: "",
    trainid: bookingdata.trainid || "",
    date: bookingdata.date || "",
    from_station: bookingdata.from_station || "",
    to_station: bookingdata.to_station || "",
    coachType: bookingdata.coachType || "",
    seatNumber: bookingdata.seatNumber || "",
    categoryName: bookingdata.categoryName || "",
  });

  const [isLoading, setisLoading] = useState(false);

  // Handle form input changes
  function handlechange(event) {
    const { name, value } = event.target;
    setformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Submit form and book ticket
  async function handlesubmit(event) {
    event.preventDefault();

    // Basic validation
    if (!formdata.name || !formdata.age || !formdata.Gender) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setisLoading(true);
    try {
      // API call to book the ticket
      const res = await axios.post(
        "https://irctc-backend.vercel.app/api/Book/seatBooking",
        formdata,
        { withCredentials: true }
      );

      // Success message
      toast.success("Booking successful!");
      console.log(
        "this is respnse daata of the booking api call :",
        res.data.booking
      );
      // Navigate to PrintTicket and pass the booking data
      navigate("/printticket", { state: { booking: res.data.booking } });
    } catch (error) {
      console.log('this is error in the booking ticket :',error);

      toast.error(
        error.response?.data?.error || "Booking failed. Please try again."
      );
    } finally {
      setisLoading(false);
    }
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen w-full bg-black flex flex-col justify-center items-center">
      <form
        onSubmit={handlesubmit}
        className="max-w-sm w-full flex flex-col gap-2 border border-cyan-500 shadow-lg shadow-cyan-500 p-4 rounded-lg"
      >
        <h1 className="text-center text-white font-bold text-2xl">
          Booking Form
        </h1>

        {/* Name Input */}
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
            required
          />
        </div>

        {/* Age Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="age" className="text-white font-bold">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={formdata.age}
            onChange={handlechange}
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
            placeholder="Enter Age"
            required
          />
        </div>

        {/* Gender Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="Gender" className="text-white font-bold">
            Gender
          </label>
          <select
            name="Gender"
            value={formdata.Gender}
            onChange={handlechange}
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
