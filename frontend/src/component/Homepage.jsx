import { CgArrowsExchangeAltV } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Searchtrain } from "../reducx-toolkit/TrainSlice";
import {useNavigate} from "react-router-dom"

function Homepage() {
  const dispatch = useDispatch();
  const [fromstation, setfromstation] = useState("");
  const [tostation, settostation] = useState("");
  const [selectdate, setselectdate] = useState("");
  const navigate=useNavigate();
  // const {isLoading,error}=useSelector((state)=>state.train)

  useEffect(() => {
    const currentdate = new Date().toISOString().split("T")[0];
    setselectdate(currentdate);
  }, []);
  // useEffect(()=>{

  // },[isLoading,error,navigate])

  const HandleReverse = () => {
    const tempstation = fromstation;
    setfromstation(tostation);
    settostation(tempstation);
  };
  const submitform = async(event) => {
    event.preventDefault();
    await dispatch(
      Searchtrain({
        fromstation,
        tostation,
      })
    );
    

      navigate("/result",{state:{fromstation:fromstation,tostation:tostation}})
    
    
  };
  return (
    <div className="h-[100vh] w-full bg-black flex justify-center items-center">
      <form
        onSubmit={submitform}
        className="h-[60vh] w-[50vw] shadow-lg shadow-white rounded-lg flex p-2 flex-col gap-3"
      >
        <h1 className="text-white text-2xl text-center font-bold ">
          Book Ticket
        </h1>
        <div className="flex flex-col gap-3 w-full">
          <input
            type="text"
            name="fromstation"
            placeholder="From"
            value={fromstation}
            onChange={(e) => setfromstation(e.target.value)}
            className="text-white bg-black border-2 border-white rounded-md"
          />

          <div className="flex justify-center items-center">
            <CgArrowsExchangeAltV
              color="white"
              size={40}
              onClick={HandleReverse}
            />
          </div>

          <input
            type="text"
            name="tostation"
            placeholder="To"
            value={tostation}
            onChange={(e) => settostation(e.target.value)}
            className="text-white bg-black border-2 border-white rounded-md"
          />
        </div>
        <input
          type="date"
          value={selectdate}
          onChange={(e) => setselectdate(e.target.value)}
          className="bg-black text-white"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          Search
        </button>
      </form>
    </div>
  );
}
export default Homepage;
