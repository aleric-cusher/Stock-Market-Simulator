import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

import AuthContext from "../../context/AuthContext";

import "./style.css";

import { ROUTES } from "../../constants";

const axios = require("axios").default;

function LoginContent() {
  const { setUser, checkVerification } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await axios.post("http://localhost:4000/login", {
        email: body.email,
        password: body.password,
      });

      const { data } = await response;

      if (data.jwtToken) {
        localStorage.setItem("jwtToken", data.jwtToken);
        setUser({ isAuthorized: true, userName: data.userName });
        checkVerification();
        console.log(data.message);
        // toast.success("Logged in Successfully");
      } else {
        setUser({ isAuthorized: false, userName: "" });
        console.log(data.message);
        // toast.error(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="header-container">
        <Link to={ROUTES.HOME} className="header-logo">
          Stock Market Simulator
        </Link>
        <div className="header-links">
          <Link to={ROUTES.REGISTER} className="header-link">
            Register
          </Link>
          <Link to={ROUTES.LOGIN} className="header-link header-link-selected">
            Login
          </Link>
        </div>
      </div>

      <div>
        <h1 className="">Login Page</h1>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => onChange(e)}
            className=""
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="false"
            value={password}
            onChange={(e) => onChange(e)}
            className=""
          />
          <button className="">Register</button>
        </form>
      </div>
    </>
  );
}

export default LoginContent;
