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
    } else if (
      AuthUser &&
      AuthUser?.role &&
      !allowedrole.includes(AuthUser.role)
    ) {
      navigate("/register");
    }
  }, [isAuthenticated, location, AuthUser, navigate]);
  return (
    <>
      {isAuthenticated && AuthUser && allowedrole.includes(AuthUser?.role) && (
        <Outlet />
      )}
    </>
  );
}
export default Protectedpage;
