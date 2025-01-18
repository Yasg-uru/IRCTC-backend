import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/authContexts";

function Protectedpage({ allowedrole }) {
  const location = useLocation();
  const { isAuthenticated, AuthUser } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/register");
    } else if (!allowedrole.includes(role)) {
      navigate("/register");
    }
  }, [isLoggedIn, location, AuthUser, navigate]);
  return (
    <>
      {isLoggedIn && AuthUser && allowedrole.includes(AuthUser?.role) && (
        <Outlet />
      )}
    </>
  );
}
export default Protectedpage;
