import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import registerImage from "../../assets/register-image.webp";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";
import DarkLightMode from "../../components/DarkLightMode/DarkLightMode";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  // login states / login states / login states / login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // define dark or light mode based on the user's preferences
  const userMode = localStorage.getItem("theme") || "light";

  // Apply the user's mode preference / Apply the user's mode preference
  useEffect(() => {
    document.body.setAttribute("data-theme", userMode);
  }, [userMode]);

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
        localStorage.setItem("token", res.data.token);
        console.log(res.data, "login successful"), navigate("/home");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <>
    <DarkLightMode></DarkLightMode>
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
            {/* password icon togge / password icon togge / password icon togge */}
            <MdOutlineMail className="login-loginEmailIcon" />
            <label>Password :</label>
            <input
              type={passwordVisible ? "password" : "text"}
              placeholder="Enter Your Password"
              required
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
          <h3 className="registertLink">
            Don t Have An Account? <Link to="/register">Sign Up Now</Link>
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
