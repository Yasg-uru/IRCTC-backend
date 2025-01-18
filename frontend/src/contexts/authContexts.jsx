import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const authContext = createContext(undefined);

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [AuthUser, setAuthUser] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const checkAuth = async () => {
    setisLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/check-auth`,
        {
          withCredentials: true,
        }
      );
      toast.success("auth checked successfully");
      setAuthUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      toast.error("failed to check auth");
    } finally {
      setisLoading(false);
    }
  };
  const logout = async () => {
    setisLoading(true);
    try {
      await axios.post(
        `http://localhost:4000/api/user/logout`,
        {},
        { withCredentials: true }
      );

      // Clear user authentication state
      setAuthUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);

      setAuthUser(null);
      setIsAuthenticated(false);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <authContext.Provider
      value={{ isLoading, isAuthenticated, AuthUser, logout, checkAuth }}
    >
      {children}
    </authContext.Provider>
  );
};
export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("plase wrap this authcontext inside the main.jsx file ");
  }
  return context;
};

export default AuthContextProvider;
