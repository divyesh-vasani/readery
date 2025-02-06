import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import Home from "./Home";
import Profile from "./Profile";
import { useSelector } from "react-redux";

function App() {
  const { user, loading, error } = useSelector((state) => state.auth);
  console.log(user,"user from appjs")
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
