import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import Home from "./Home";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess, logoutSuccess } from "./redux/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated,"isAuthenticated from app")
  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/verify-auth", {
        withCredentials: true,
      });
      dispatch(loginSuccess(res.data.user));
    } catch (error) {
      dispatch(logoutSuccess());
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
