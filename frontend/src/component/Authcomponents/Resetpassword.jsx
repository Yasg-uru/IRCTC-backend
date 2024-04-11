import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetpassword } from "../../reducx-toolkit/authSlice";
import { useSearchParams } from "react-router-dom";

function Resetpassword() {
  const [formdata, setformdata] = useState({
    password: "",
    confirmpassword: "",
  });
  const dispatch = useDispatch();
  const {token}=useSearchParams();

  function handlesubmitform(event) {
    event.preventDefault();
    console.log("this is formdata of the resetpassword:",formdata)
    if (FormData.password!== FormData.confirmpassword) {
      toast.error("please enter the valid password");
      return ;
    }

    dispatch(resetpassword({formdata,token}));
  }
  function handlechange(event) {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  }
  return (
    <div className="min-h-screen bg-black w-full flex flex-col justify-center items-center">
      <form
        onSubmit={handlesubmitform}
        className="flex p-2 flex-col gap-2 w-full shadow-lg shadow-cyan-500 rounded-2xl max-w-sm border-[0.5px] border-cyan-500 "
      >
        <h1 className="text-white text-center text-2xl font-bold">
          Resetpassword Form
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-white font-bold ">
            password
          </label>
          <input
            type="password"
            value={formdata.password}
            onChange={handlechange}
            name="password"
            placeholder="Enter email"
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmpassword" className="text-white font-bold">
            Confirmpassword
          </label>
          <input
            type="password"
            name="confirmpassword"
            placeholder="confirmpassword"
            value={formdata.confirmpassword}
            onChange={handlechange}
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          Reset password
        </button>
      </form>
    </div>
  );
}
export default Resetpassword;
