import { Route, Routes } from "react-router-dom";
import "./App.scss";

import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import ReelsPage from "./pages/reels";
import SearchPage from "./pages/search";
import ProfileOtherPage from "./pages/profileOther";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/reels" element={<ReelsPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile/other" element={<ProfileOtherPage />} />
    </Routes>
  );
}

export default App;
