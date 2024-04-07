import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../reducx-toolkit/authSlice";
import toast from "react-hot-toast";

function Signup() {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleinputs = (event) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  const dispatch = useDispatch();

  function handlesubmit(event) {
    event.preventDefault();
    const { name, email, password } = formdata;

    if (!name || !email || !password) {
      toast.error("please fill all the details ");
    }
    dispatch(signup(formdata));
    setformdata({
      name: "",
      email: "",
      password: "",
    });
    console.log("this is a formdata of the signup :", formdata);
  }
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center">
      <form
        onSubmit={handlesubmit}
        className="w-full shadow-2xl shadow-cyan-500 max-w-sm border-[0.5px] rounded-lg border-white p-4 flex flex-col gap-4"
      >
        <h1 className="text-white font-bold text-2xl text-center">
          Registration Form
        </h1>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="name" className="text-white font-bold">
            Name
          </label>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={formdata.name}
            onChange={handleinputs}
            autoComplete="off"
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="email" className="text-white font-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            name="email"
            value={formdata.email}
            onChange={handleinputs}
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-white font-bold">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={formdata.password}
            onChange={handleinputs}
            name="password"
            autoComplete="off"
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
