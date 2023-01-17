import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>{" "}
    </div>
  );
}

export default App;
