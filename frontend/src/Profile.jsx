import axios from "axios";
import React, { useEffect } from "react";

const Profile = () => {
  const getProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/auth/profile",
        {
          withCredentials: true,         }
      );
      console.log(res.data, "User Profile Data"); 
    } catch (error) {
      console.error("Error fetching profile:", error.response ? error.response.data : error);
      if (error.response && error.response.status === 401) {
        console.log("User is not authenticated.");
      }
    }
  };

  useEffect(() => {
    getProfile();
    console.log(document.cookie,"document.cookie")
  }, []);

  return <div>Profile</div>;
};

export default Profile;
