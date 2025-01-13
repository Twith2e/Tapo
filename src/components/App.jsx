import React from "react";
import HomeLayout from "../pages/HomeLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import Text from "../pages/Text";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="text" element={<Text />} />
      </Route>
    </Routes>
  );
}
