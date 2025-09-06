import { useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./page/SignupPage";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import ProfilePage from "./page/LoginPage";
import SettingsPage from "./page/SettingPage";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
