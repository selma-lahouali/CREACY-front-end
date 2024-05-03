import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import registerImage from "../../assets/register-image.webp";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";

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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/login", { email, password })
      .then((res) => {
        dispatch(login(res.data.user));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        navigate("/home");
      })
      .catch((err) => setError(err.message));
  };

  //  save the email and password if they are in the local storage
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  return (
    <>
      <div className="login">
        <div className="login-left">
          <h1>Welcome To CREACY</h1>
          <form onSubmit={handleSubmit}>
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
