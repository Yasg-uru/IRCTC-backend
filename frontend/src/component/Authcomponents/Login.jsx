import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../reducx-toolkit/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../Loader.jsx";
function Login() {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  function handlechange(event) {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handlesubmitform(event) {
    if (!formdata.email || !formdata.password) {
      toast.error("please fill all the fields");
      return;
    }
    event.preventDefault();
    setisLoading(true);

    dispatch(login(formdata));
    navigate("/");
    setisLoading(false);
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-screen bg-black w-full flex flex-col justify-center items-center">
      <form
        onSubmit={handlesubmitform}
        className="flex p-2 flex-col gap-2 w-full shadow-lg shadow-cyan-500 rounded-2xl max-w-sm border-[0.5px] border-cyan-500 "
      >
        <h1 className="text-white text-center text-2xl font-bold">
          Login Form
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-white font-bold ">
            Email
          </label>
          <input
            type="text"
            value={formdata.email}
            onChange={handlechange}
            name="email"
            placeholder="Enter email"
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-white font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handlechange}
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          Sign Up
        </button>
        <p className="text-green-500 font-bold">
          <Link to="/forgotpassword">Forgot Password?</Link>
        </p>
      </form>
    </div>
  );
}
export default Login;
