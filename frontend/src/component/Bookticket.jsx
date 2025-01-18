import { useLocation } from "react-router-dom";

function Bookticket() {
  const location = useLocation();
  console.log(
    "this is function inside the bookticket component :",
    location?.state
  );
  return <> this is a book ticket component </>;
}
export default Bookticket;
