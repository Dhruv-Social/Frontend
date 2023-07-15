import { Route, Routes } from "react-router-dom";
import "./App.scss";

import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import ReelsPage from "./pages/reels";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/reels" element={<ReelsPage />} />
    </Routes>
  );
}

export default App;
