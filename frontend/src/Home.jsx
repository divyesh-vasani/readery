import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "./redux/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      console.log("Clicked");
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logoutSuccess());
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <div>
      Home
      <button onClick={() => handleLogout()}>Logout</button>
      <Link to={"/login"}>Login</Link>
      <Link to={"/profile"}>Profile</Link>
    </div>
  );
};

export default Home;
