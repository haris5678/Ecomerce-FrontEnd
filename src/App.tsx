import "./App.css";
// import ReactDOM from 'react-dom';
// import axios from 'axios'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUpForm";
import SignIn from "./components/SignInForm";
import ProductList from "./components/Product";
import ForgetPassword from "./components/ForgetPassword";
import UploadProduct from "./components/UploadProduct";
import React, { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");

  console.log("token in app is", token);

  useEffect(
    () => {
      const getToken = localStorage.getItem("token");

      if (getToken) {
        setToken(getToken);
      }
      console.log("token in app effect is", token);
    },
    [token]
  );

  return (
    <Router>
      <div>
        <Header isToken={token} setToken={setToken} />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<SignIn setToken={setToken} />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/" element={<ProductList />} />
          <Route
            path="/forgot-password"
            element={<ForgetPassword setToken={setToken} />}
          />
          <Route
            path="/product/create-product"
            element={<UploadProduct setToken={setToken} />}
          />
          {/* <Route element={<Navigate to="/product" />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
