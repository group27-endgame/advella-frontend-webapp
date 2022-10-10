import "./App.css";

import MainPage from "./pages/Main.page";

import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignIn.page";
import SignUpPage from "./pages/SignUp.page";
import Navbar from "./components/Navbar.component";
import Newlisting from "./pages/NewListing.page";
import CategoryPage from "./pages/Category.page";
import ServicePage from "./pages/Service.page";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/newlisting" element={<Newlisting />}></Route>
        <Route path="category/:categoryId" element={<CategoryPage />}>
          {" "}
        </Route>
        <Route path="/service" element={<ServicePage />} />
        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </>
  );
}
export default App;
