import React, { useEffect } from 'react'
import HomePage from './components/HomePage';
import { Routes, Route } from "react-router-dom";
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import SettingPage from './components/SettingPage';
import ProfilePage from './components/ProfilePage';
import Navbar from './components/Navbar';
import { useAuthStore } from './store/useAuthStore';
const App = () => {
  const { authUser, checkAuth } = useAuthStore();
  useEffect(() => {
    authUser;
  }, [checkAuth]);

  return (

    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={< LoginPage />} />
        <Route path="/settings" element={< SettingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App;
