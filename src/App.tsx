import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ServiceCard from "./components/ServiceCard.component";
import ServicesListings from "./components/ServicesListings.component";
import MainPage from "./pages/Main.page";

// import Categories from "./components/Categories.component";
// import Landing from "./components/Landing.component";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignIn.page";
import SignUpPage from "./pages/SignUp.page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </>
  );
}
export default App;
