import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import registerImage from "../../assets/register-image.webp";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  // login states / login states / login states / login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // password visibiity / password visibiity / password visibiity / password visibiity
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // login slice
  const dispatch = useDispatch();
  // login API call / login API call / login API call / login API call
  const navigate = useNavigate();
  const handlsubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/login", { email, password })
      .then((res) => {
        
        dispatch(login(res?.data?.user));
        localStorage.setItem("token",res.data.token)

        console.log(res.data, "login successful"), navigate("/home");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <>
      <div className="login">
        <div className="login-left">
          <h1>Welcome To CREACY</h1>
          <form onSubmit={(e) => handlsubmit(e)}>
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdOutlineMail className="loginEmailIcon" />
            <label>Password</label>
            <input
              type={passwordVisible ? "password" : "text"}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
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
            <button type="submit">Login</button>
          </form>
          <div className="error">{error}</div>
          <h1 className="registertLink">
            Don't Have An Account? <Link to="/register">Sign Up Now</Link>
          </h1>
        </div>
        <div className="login-right">
          <img src={registerImage} alt="logo image" className="registerImage" />
        </div>
      </div>
    </>
  );
};

export default Login;
