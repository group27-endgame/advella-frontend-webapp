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
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/signin" element={<SignInPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
      <Route path="*" element={<p>Path not resolved</p>} />
    </Routes>
  );
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Advella WebApp - Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //     {/*
  //     <Landing/>
  //     <Categories /> */}
  //     <ServicesListings />
  //   </div>
  // );
}

export default App;
