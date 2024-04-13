import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { resetpassword } from "../../reducx-toolkit/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
function Updatepassword() {
  const [formdata, setformdata] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });
  const [isLoading, setisLoading] = useState(false);
  function handleinputs(event) {
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
    const { newpassword, confirmpassword, oldpassword } = formdata;
    if (!newpassword || !confirmpassword || !oldpassword) {
      toast.success("please enter all the fields");
      return;
    }
    setisLoading(true);
    dispatch(resetpassword(formdata));
    navigate("/");
    setisLoading(false);
  }
  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center">
      <form
        onSubmit={handlesubmit}
        className="w-full shadow-2xl shadow-cyan-500 max-w-sm border-[0.5px] rounded-lg border-white p-4 flex flex-col gap-4"
      >
        <h1 className="text-white font-bold text-2xl text-center">
          Registration Form
        </h1>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="oldpassword" className="text-white font-bold">
            Oldpassword
          </label>
          <input
            type="text"
            placeholder="oldpassword"
            name="oldpassword"
            value={formdata.oldpassword}
            onChange={handleinputs}
            autoComplete="off"
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="newpassword" className="text-white font-bold">
            Newpassword
          </label>
          <input
            type="email"
            placeholder="newpassword"
            autoComplete="off"
            name="newpassword"
            value={formdata.newpassword}
            onChange={handleinputs}
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmpassword" className="text-white font-bold">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="confirmpassword"
            value={formdata.confirmpassword}
            onChange={handleinputs}
            name="confirmpassword"
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
export default Updatepassword;
