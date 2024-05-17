import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookMain from "./components/Bookstore";
import Login from "./components/LoginForm";
import SignUp from "./components/SignUp";
import Cart from "./components/Cart";
import { SharedStateProvider } from "./SharedContext.js";
import { AuthProvider } from "./utils/AuthContext.js";
import UserProfile from "./components/UserPofile.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <SharedStateProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<BookMain />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/signup" element={<SignUp />} /> */}
                {/* <Route path="/profile" element={<UserProfile />} /> */}
                <Route path="/profile" element={<UserProfile />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </SharedStateProvider>
    </AuthProvider>
  </React.StrictMode>
);
