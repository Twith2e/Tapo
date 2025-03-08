import React from "react";
import HomeLayout from "./HomeLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import Text from "../pages/Text";
import Pin from "./Pin";
import CallScreen from "../pages/CallScreen";
import GetStarted from "../pages/GetStarted";
import Dashboard from "../pages/Dashboard";
import GoogleCallback from "../pages/GoogleCallback";
import SignupPage from "../pages/AuthPage";
import { LoginPage } from "../pages/LoginPage";
import OtpPage from "../pages/OtpPage";
import Onboard from "../pages/Onboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<WelcomePage />} />
      </Route>
      <Route path="text" element={<Text />} />
      <Route path="call" element={<CallScreen />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="test" element={<Pin />} />
      <Route path="get-started" element={<GetStarted />} />
      <Route path="auth/callback" element={<GoogleCallback />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="otp/:id" element={<OtpPage />} />
      <Route path="complete-registration/:id" element={<Onboard />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
