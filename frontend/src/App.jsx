import "./App.css";
import Homepage from "./component/Homepage.jsx";
import { Routes, Route } from "react-router-dom";
import Result from "./component/Result.jsx";
import Getseatavialbilityseats from "./component/Getseatavialbilityseats.jsx";
import Seatavailabality from "./component/Seatavailabality.jsx";
import Loader from "./component/Loader.jsx";
import Example from "./component/Example.jsx";
import Bookticket from "./component/Bookticket.jsx";
import Signup from "./component/Authcomponents/Signup.jsx";
import Navbar from "./component/Authcomponents/Navbar.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/" element={<Homepage />} />
        <Route path="/result" element={<Result />} />
        <Route path="/seatavailabilty/" element={<Getseatavialbilityseats />}>
          <Route path="seat" element={<Seatavailabality />} />
        </Route>
        <Route path="/bookticket" element={<Bookticket />} />
        <Route path="/example" element={<Example />}></Route>
      </Routes>
    </>
  );
}

export default App;
