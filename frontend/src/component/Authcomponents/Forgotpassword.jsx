import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotpassword } from "../../reducx-toolkit/authSlice";
import toast from "react-hot-toast";

function Forgotpassword() {
  const [email, setemail] = useState("");
  const dispatch = useDispatch();
  function handlesubmitform(event) {
    event.preventDefault();

    if (!email || !email.match(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm)) {
      toast.error("please enter valid email");
      return;
    }
    console.log("this is a email",email)
    dispatch(forgotpassword(email));
  }

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center">
      <form onSubmit={handlesubmitform} className="w-full max-w-sm border-2 border-white flex flex-col p-2 gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-white font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className="bg-black border border-white text-white px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          Send Mail
        </button>
      </form>
    </div>
  );
}
export default Forgotpassword;
