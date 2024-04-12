// import { CgArrowsExchangeAltV } from "react-icons/cg";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Searchtrain } from "../reducx-toolkit/TrainSlice";
// import { useNavigate } from "react-router-dom";

// function Homepage() {
//   const dispatch = useDispatch();
//   const [fromstation, setfromstation] = useState("");
//   const [tostation, settostation] = useState("");
//   const [selectdate, setselectdate] = useState(new Date(Date.now()));
//   const navigate = useNavigate();
//   // const {isLoading,error}=useSelector((state)=>state.train)

//   useEffect(() => {
//     const currentdate = new Date().toISOString().split("T")[0];
//     setselectdate(currentdate);
//   }, []);

//   const HandleReverse = () => {
//     const tempstation = fromstation;
//     setfromstation(tostation);
//     settostation(tempstation);
//   };
//   const submitform = async (event) => {
//     event.preventDefault();
//     await dispatch(
//       Searchtrain({
//         fromstation,
//         tostation,
//         date: selectdate,
//       })
//     );

//     navigate("/result", {
//       state: { fromstation: fromstation, tostation: tostation,date:selectdate },
//     });
//   };
//   return (
//     <div className="min-h-screen w-full bg-black flex justify-center items-center">
//       <form
//         onSubmit={submitform}
//         className="w-full max-w-sm shadow-lg shadow-white rounded-lg flex p-2 flex-col gap-3"
//       >
//         <h1 className="text-white text-2xl text-center font-bold ">
//           Book Ticket
//         </h1>
//         <div className="flex flex-col gap-3 w-full">
//           <input
//             type="text"
//             name="fromstation"
//             placeholder="From"
//             value={fromstation}
//             onChange={(e) => setfromstation(e.target.value)}
//             className="text-white bg-black border-2 border-white rounded-md"
//           />

//           <div className="flex justify-center items-center">
//             <CgArrowsExchangeAltV
//               color="white"
//               size={40}
//               onClick={HandleReverse}
//             />
//           </div>

//           <input
//             type="text"
//             name="tostation"
//             placeholder="To"
//             value={tostation}
//             onChange={(e) => settostation(e.target.value)}
//             className="text-white bg-black border-2 border-white rounded-md"
//           />
//         </div>
//         <input
//           type="date"
//           value={selectdate}
//           onChange={(e) => setselectdate(e.target.value)}
//           className="bg-black text-white"
//         />
//         <button
//           type="submit"
//           className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
//         >
//           Search
//         </button>
//       </form>
//     </div>
//   );
// }
// export default Homepage;
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Searchtrain } from "../reducx-toolkit/TrainSlice";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
function Homepage() {
  const dispatch = useDispatch();
  const [fromstation, setfromstation] = useState("");
  const [tostation, settostation] = useState("");
  const [selectdate, setselectdate] = useState(new Date(Date.now()));
  const [searchResultsfromstation, setSearchResultsfromstation] = useState([]);
  const [searchResulttostation, setsearchResulttostation] = useState([]);
  const navigate = useNavigate();
  // const {isLoading,error}=useSelector((state)=>state.train)
  const formRef = useRef(null);
  useEffect(() => {
    const currentdate = new Date().toISOString().split("T")[0];
    setselectdate(currentdate);
    document.addEventListener("click", handleoutsideclick);
    
    return () => {
      document.removeEventListener("click", handleoutsideclick);
    };
  }, []);
  function handleoutsideclick(event) {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setSearchResultsfromstation([]);
      setsearchResulttostation([]);
    }
  }
  function handlesearchresult(event) {
    const { name, value } = event.target;
    const mockResults = ["Chhindwara", "Parasia", "Nawegoan"];
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
    const tempstation = fromstation;
    setfromstation(tostation);
    settostation(tempstation);
  };
  const submitform = async (event) => {
    event.preventDefault();
    await dispatch(
      Searchtrain({
        fromstation,
        tostation,
        date: selectdate,
      })
    );

    navigate("/result", {
      state: {
        fromstation: fromstation,
        tostation: tostation,
        date: selectdate,
      },
    });
  };
  return (
    <div className="min-h-screen w-full bg-black flex justify-center items-center">
      <form
        onSubmit={submitform}
        ref={formRef}
        className="w-full  h-auto max-w-sm shadow-lg shadow-white rounded-lg flex p-2 flex-col gap-3"
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
            // onChange={(e) => setfromstation(e.target.value)}
            onChange={handlesearchresult}
            className="text-white bg-black border-2 border-white rounded-md"
          />
          {searchResultsfromstation.length > 0 && (
            <ul className="search-results max-h-[100px] overflow-y-auto search-results bg-gray-800 border border-white rounded-md p-2 ">
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
          {!searchResultsfromstation.length > 0 && (
            <>
              <div className="flex justify-center items-center ">
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
                // onChange={(e) => settostation(e.target.value)}
                onChange={handlesearchresult}
                className="text-white bg-black border-2 border-white rounded-md"
              />
              {searchResulttostation.length > 0 && (
                <ul className="search-results max-h-[100px] overflow-y-auto bg-gray-800 border border-white rounded-md p-2">
                  {searchResulttostation.map((result, index) => (
                    <li
                      key={index}
                      className="text-white cursor-pointer hover:bg-gray-700 rounded-md p-2"
                      onClick={() =>
                        handleselectsuggestion(result, "tostation")
                      }
                    >
                      {result}
                    </li>
                  ))}
                  
                </ul>
              )}
            </>
          )}
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
