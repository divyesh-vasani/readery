import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess,loginStart } from "./redux/authSlice";

const Profile = () => {
  const {user, loading, error} = useSelector((state) => state.auth);
  console.log(user?.user,"user line no 8")
  const dispatch = useDispatch();
  const getProfile = async () => {
    dispatch(loginStart());
    try {
      const res = await axios.get(
        "http://localhost:5000/auth/profile",
        {
          withCredentials: true}
      );
      dispatch(loginSuccess(res.data));
    } catch (error) {
      console.error("Error fetching profile:", error.response ? error.response.data : error);
      if (error.response && error.response.status === 401) {
        console.log("User is not authenticated.");
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading text or spinner
  }

  return <div>
  <h1>Profile</h1>
  {user ? (
    <div>
      <p>User ID: {user?.user?._id}</p>
      <p>User Name: {user?.user?.username}</p>
    </div>
  ) : (
    <div>No profile found</div>
  )}
</div>

};

export default Profile;
