import "./App.css";

import MainPage from "./pages/Main.page";

import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignIn.page";
import SignUpPage from "./pages/SignUp.page";
import Navbar from "./components/Navbar.component";
import Newlisting from "./pages/NewListing.page";
import ServicePage from "./pages/Service.page";
import ProductPage from "./pages/Product.page";
import UserPage from "./pages/User.page";
import MyListings from "./pages/MyListings.page";
import ChatPage from "./pages/Chat.page";
import CategoryProductPage from "./pages/CategoryProduct.page";
import CategoryServicePage from "./pages/CategoryService.page";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/newlisting" element={<Newlisting />}></Route>
        <Route path="/mylistings" element={<MyListings />}></Route>

        <Route
          path="/categoryProduct/:categoryId"
          element={<CategoryProductPage />}
        ></Route>
        <Route
          path="/categoryService/:categoryId"
          element={<CategoryServicePage />}
        ></Route>

        <Route path="/service/:id" element={<ServicePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </>
  );
}
export default App;
