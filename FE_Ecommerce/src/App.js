import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./View/Home/Home";
import Navbar from './Components/NavBar/Navbar';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Cart from './View/Cart/Cart';
import ListProduct from "./View/Product/ListProduct";
import ProductDetails from "./View/Product/Product-Detail/ProductDetails";
import Contact from "./View/Contact/Contact";
import About from "./View/About/About";
import Register from "./Components/Register/Register";
import { ToastContainer } from "react-toastify";
import UpdateUser from "./View/UpdateUser/UpdateUser";
import User from "./Components/Admin/User/User";
import ChangePass from "./View/ChangePasswork/ChangePass";
import CheckOut from "./View/CheckOut/CheckOut";
import Admin from "./Components/Admin/DashBoard/Admin";
import Category from "./Components/Admin/Category/Category";
import Brands from "./Components/Admin/Brands/Brands";
import ProductAdmin from "./Components/Admin/Product/Product";
import AddProduct from "./Components/Admin/Product/Add/AddProduct";
import UpdateProduct from "./Components/Admin/Product/Update/UpdateProduct";
import AcceptOrder from "./Components/Admin/AcceptOrder/AcceptOrder";
import Cancelled from "./View/Cancelled/Cancelled";
import Purchased from "./View/Purchased/Purchased";
import Shipping from "./View/Shipping/Shipping";
import Confirmed from "./View/Confirmed/Confirmed";
import Processing from "./View/Processing/Processing";
import React, { createContext, useState, useContext } from 'react';

function App () {
  
  const location = useLocation();
  const showHeaderFooter = !(
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/admin-page" ||
    location.pathname === "/list-user" ||
    location.pathname === "/category-admin" ||
    location.pathname === "/brands-admin" ||
    location.pathname === "/product-admin" ||
    location.pathname === "/add-product" ||
    location.pathname === "/accept-order" ||
    location.pathname.includes("/update-product/")
  );
  return (
    <div className="App">
      {showHeaderFooter && (<Navbar/>)}
        <Routes>
          <Route path="/admin-page" element={(<Admin />)} />
          <Route path="/list-user" element={<User/>} />
          <Route path="/product-admin" element={<ProductAdmin/>} />
          <Route path="/category-admin" element={<Category/>} />
          <Route path="/brands-admin" element={<Brands/>} />
          <Route path="/add-product" element={<AddProduct/>} />
          <Route path="/update-product/:id" element={<UpdateProduct/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/list-product" element={<ListProduct />} />  
          <Route path="/product-detail/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<UpdateUser />} />
          <Route path="/change-password" element={<ChangePass />} />
          <Route path="/check-out" element={<CheckOut />} />
          <Route path="/accept-order" element={<AcceptOrder />} />
          <Route path="/cancelled" element={<Cancelled />} />
          <Route path="/purchased" element={<Purchased />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/confirmed" element={<Confirmed />} />
          <Route path="/processing" element={<Processing />} />
        </Routes>
      {showHeaderFooter && (<Footer/>)}
      <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
    </div>
  );
}

export default App;

