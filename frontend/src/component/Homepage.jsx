import { CgArrowsExchangeAltV } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Searchtrain, getstations } from "../reducx-toolkit/TrainSlice";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Trains from "./trains/Trains";
import "./Homepage.css";

function Homepage() {
  const dispatch = useDispatch();
  const [fromstation, setfromstation] = useState("");
  const [tostation, settostation] = useState("");
  const [selectdate, setselectdate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchResultsfromstation, setSearchResultsfromstation] = useState([]);
  const [searchResulttostation, setsearchResulttostation] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [mockResults, setmockResults] = useState([]);
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleoutsideclick);
    dispatch(getstations());
    return () => {
      document.removeEventListener("click", handleoutsideclick);
    };
  }, []);

  const stationlist = useSelector((state) => state.train.stations);

  useEffect(() => {
    setmockResults(stationlist);
  }, [stationlist]);

  function handleoutsideclick(event) {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setSearchResultsfromstation([]);
      setsearchResulttostation([]);
    }
  }

  function handlesearchresult(event) {
    const { name, value } = event.target;
    if (name === "fromstation") {
      setSearchResultsfromstation(
        mockResults.filter((result) =>
          result.toLowerCase().includes(value.toLowerCase())
        )
      );
      setfromstation(value);
    } else {
      setsearchResulttostation(
        mockResults.filter((result) =>
          result.toLowerCase().includes(value.toLowerCase())
        )
      );
      settostation(value);
    }
  }

  function handleselectsuggestion(suggestion, stationType) {
    if (stationType === "fromstation") {
      setfromstation(suggestion);
      setSearchResultsfromstation([]);
    } else {
      settostation(suggestion);
      setsearchResulttostation([]);
    }
  }

  const HandleReverse = () => {
    setfromstation(tostation);
    settostation(fromstation);
  };

  const submitform = async (event) => {
    event.preventDefault();
    setisLoading(true);
    await dispatch(Searchtrain({ fromstation, tostation, date: selectdate }));
    setisLoading(false);
    navigate("/result", {
      state: { fromstation, tostation, date: selectdate },
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen w-full bg-black flex flex-col justify-center items-center px-4">
      {/* Explore Trains Heading */}
      <h2 className="text-white text-3xl font-bold mb-6 text-center">
        Explore Trains 🚆
      </h2>
      <p className="text-gray-300 text-center mb-6">
        If you want to book a ticket, search for your station below.
      </p>

      {/* Search Form */}
      <form
        onSubmit={submitform}
        ref={formRef}
        className="w-full max-w-lg bg-gray-900 shadow-lg rounded-lg p-6 flex flex-col gap-4"
      >
        <h1 className="text-white text-2xl text-center font-bold">
          Book Ticket
        </h1>

        {/* From Station Input */}
        <div className="relative">
          <input
            type="text"
            name="fromstation"
            placeholder="From Station"
            value={fromstation}
            onChange={handlesearchresult}
            className="w-full bg-gray-800 text-white border-2 border-gray-600 rounded-md px-4 py-2"
          />
          {searchResultsfromstation.length > 0 && (
            <ul className="absolute z-10 w-full max-h-[150px] overflow-y-auto bg-gray-800 border border-white rounded-md mt-1 p-2">
              {searchResultsfromstation.map((result, index) => (
                <li
                  key={index}
                  className="text-white cursor-pointer hover:bg-gray-700 rounded-md p-2"
                  onClick={() => handleselectsuggestion(result, "fromstation")}
                >
                  {result}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Reverse Icon */}
        <div className="flex justify-center">
          <CgArrowsExchangeAltV
            color="white"
            size={40}
            onClick={HandleReverse}
            className="cursor-pointer"
          />
        </div>

        {/* To Station Input */}
        <div className="relative">
          <input
            type="text"
            name="tostation"
            placeholder="To Station"
            value={tostation}
            onChange={handlesearchresult}
            className="w-full bg-gray-800 text-white border-2 border-gray-600 rounded-md px-4 py-2"
          />
          {searchResulttostation.length > 0 && (
            <ul className="absolute z-10 w-full max-h-[150px] overflow-y-auto bg-gray-800 border border-white rounded-md mt-1 p-2">
              {searchResulttostation.map((result, index) => (
                <li
                  key={index}
                  className="text-white cursor-pointer hover:bg-gray-700 rounded-md p-2"
                  onClick={() => handleselectsuggestion(result, "tostation")}
                >
                  {result}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Date Picker */}
        <input
          type="date"
          value={selectdate}
          onChange={(e) => setselectdate(e.target.value)}
          className="w-full bg-gray-800 text-white border-2 border-gray-600 rounded-md px-4 py-2"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          Search
        </button>
      </form>

      
      <div className="w-full max-w-4xl mt-8">
        <Trains />
      </div>
    </div>
  );
}

export default Homepage;
