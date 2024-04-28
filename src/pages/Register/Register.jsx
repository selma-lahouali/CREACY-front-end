import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { FaUserCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import registerImage from "../../assets/register-image.webp";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  // register states / register states / register states / register states
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // password visibiity / password visibiity / password visibiity / password visibiity
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // register API call / register API call / register API call / register API call
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/register", {
        email,
        username: userName,
        password,
      })
      .then(() => {
        alert("Registation Successful."), navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <>
      <div className="register">
        <div className="register-left">
          <h1>Welcome To CREACY. Sign Up Now For Free</h1>
          <form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input
              type="text"
              placeholder="Enter Your User Name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <FaUserCircle className="userIcon" />
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdOutlineMail className="emailIcon" />
            <label>Password</label>
            <input
              type={passwordVisible ? "password" : "text"}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordVisible ? (
              <FaRegEye
                className="passwordIcon"
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
          <h1 className="logintLink">
            Already Have An Account? <Link to="/login">log In Now</Link>
          </h1>
        </div>
        <div className="registe-right">
          <img src={registerImage} alt="logo image" className="registerImage" />
        </div>
      </div>
    </>
  );
};

export default Register;
