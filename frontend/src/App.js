import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import Books from "./components/Books";
import BookOrdering from "./components/BookOrdering";
import Orders from "./components/Orders";
import OrdersAdministration from "./components/OrdersAdministration";
import Categories from "./components/Categories";
import "./components/FontAwesomeIcon/Icons";
import './App.css';
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Contacts from "./components/Contacts.js";
import { RenderContext } from './components/RenderContext';
import ErrorPage from "./components/ErrorPage";
import Users from "./components/Users";
const App = () => {
  const [render, setRender] = useState(false);

  return (
    <>
      {/* This shows when the screen goes small and user clicks button to expand */}
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      <RenderContext.Provider value={{ render, setRender }}>
        <header>
          <Navbar />
        </header>

        <main>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/users" element={<Users />} />
            <Route path="/books" element={<Books />} />
            <Route path="/bookordering" element={<BookOrdering />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/ordersadmin" element={<OrdersAdministration />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </RenderContext.Provider>
    </>
  );
};
export default App;
