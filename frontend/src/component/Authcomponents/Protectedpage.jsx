import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Protectedpage({ allowedrole }) {
  const location = useLocation();
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/register");
    } else if (!allowedrole.includes(role)) {
      navigate("/register");
    }
  }, [isLoggedIn, location, role, navigate]);
  return <>{isLoggedIn && allowedrole.includes(role) && <Outlet />}</>;
}
export default Protectedpage;
