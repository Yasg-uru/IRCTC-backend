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
import Login from "./component/Authcomponents/Login.jsx";
import Forgotpassword from "./component/Authcomponents/Forgotpassword.jsx";
import Resetpassword from "./component/Authcomponents/Resetpassword.jsx";
import Updatepassword from "./component/Authcomponents/Updatepassword.jsx";
import NotfoundPage from "./component/Authcomponents/Notfoundpage.jsx";
import BookingForm from "./component/BookingForm.jsx";
import Ticket from "./component/Ticket.jsx";
import Protectedpage from "./component/Authcomponents/Protectedpage.jsx";
import Trains from "./component/trains/Trains.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/trains" element={<Trains />} />
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/reset/:token" element={<Resetpassword />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/result" element={<Result />} />
        <Route path="/seatavailabilty/" element={<Getseatavialbilityseats />}>
          <Route path="seat" element={<Seatavailabality />} />
        </Route>

        <Route path="/updatepassword" element={<Updatepassword />} />

        <Route element={<Protectedpage allowedrole={["user", "admin"]} />}>
          <Route path="/bookticket" element={<Bookticket />} />
          <Route path="/bokingform" element={<BookingForm />} />
          <Route path="/printticket" element={<Ticket />} />
        </Route>
        <Route path="/example" element={<Example />}></Route>
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
}

export default App;
