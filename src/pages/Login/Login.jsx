import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import bigLogo from "../../assets/big-logo.png";
import {FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Login.css"
import { useState } from "react";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
      <div className="login">
        <div className="login-left">
          <h1>Welcome To CREACY</h1>
          <form>
            <label>E-mail</label>
            <input type="email" placeholder="Enter Your Email" />
            <MdOutlineMail className="loginEmailIcon" />
            <label>Password</label>
            <input
              type={passwordVisible ? "password" : "text"}
              placeholder="Enter Your Password"
            />
            {passwordVisible ? (
              <FaRegEye
                className="loginPasswordIcon"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaRegEyeSlash
                className="passwordIcon"
                onClick={togglePasswordVisibility}
              />
            )}
            <button type="submit">Register</button>
          </form>
          <h1 className="registertLink">
            Don't Have An Account? <Link to="/register">Sign Up Now</Link>
          </h1>
        </div>
        <div className="login-right">
          <img src={bigLogo} alt="logo image" className="bigLogo" />
        </div>
      </div>
    </>
  );
};

export default Login;