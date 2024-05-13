import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import registerImage from "../../assets/register-image.webp";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";
// login states / login states / login states  / login states  / login states  / login states  / login states
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userMode = localStorage.getItem("theme") || "light";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.setAttribute("data-theme", userMode);
  }, [userMode]);
  // toggle Password Visibility / toggle Password Visibility / toggle Password Visibility / toggle Password Visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const isAuthenticatedState = useSelector(
    (state) => state.auth.isAuthenticated
  );
  useEffect(() => {
    window.localStorage.setItem(
      "authData",
      JSON.stringify(isAuthenticatedState)
    );
  }, [isAuthenticatedState]);
  const API = import.meta.env.VITE_API;

  // login API call / login API call / login API call / login API call / login API call / login API call
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API}/auth/login`, { email, password })
      .then((res) => {
        dispatch(login(res.data)); // Dispatch the entire user object to your Redux store
        const { user, token } = res.data; // Extract user object and token from response
        localStorage.setItem("user", JSON.stringify(user)); // Store user object in localStorage
        localStorage.setItem("token", token); // Store token in localStorage
        navigate("/home");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <>
      <div className="login">
        <div className="login-left">
          <h1>Welcome To CREACY</h1>
          <form onSubmit={handleSubmit}>
            {/* user email / user email / user email / user email / user email / user email */}
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdOutlineMail className="login-loginEmailIcon" />
            {/* user password / user password / user password / user password / user password */}
            <label htmlFor="password">Password :</label>
            <input
              type={passwordVisible ? "password" : "text"}
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordVisible ? (
              <FaRegEye
                className="login-passwordIcon"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaRegEyeSlash
                className="login-passwordIcon"
                onClick={togglePasswordVisibility}
              />
            )}
            <button type="submit">Login</button>
          </form>
          <div className="error">{error}</div>
          {/* link to register / link to register / link to register / link to register / link to register */}
          <h3 className="registertLink">
            Don't Have An Account? <Link to="/register">Sign Up Now</Link>
          </h3>
        </div>
        <div className="login-right">
          <img src={registerImage} alt="logo image" className="registerImage" />
        </div>
      </div>
    </>
  );
};

export default Login;
