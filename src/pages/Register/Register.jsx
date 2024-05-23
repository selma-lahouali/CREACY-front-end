import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { FaUserCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import registerImage from "../../assets/register-image.webp";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/AuthSlice";
import Swal from "sweetalert2";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // define dark or light mode based on the user's preferences
  const userMode = localStorage.getItem("theme") || "light";

  // Apply the user's mode preference
  useEffect(() => {
    document.body.setAttribute("data-theme", userMode);
  }, [userMode]);

  // toggle Password Visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const API = import.meta.env.VITE_API;
  // register API call / register API call / register API call / register API call
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    } else {
      setPasswordError("");
    }
    axios
      .post(`${API}/auth/register`, {
        email,
        username: userName,
        password,
      })
      .then((res) => {
        dispatch(register(res?.data?.user));
              
        // sweet alert successess message
        Swal.fire({
          title: "Good job!",
          text: "Your Account Has Been Created!",
          icon: "success",
        });
        navigate("/home");
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
            <label>User Name :</label>
            <input
              type="text"
              placeholder="Enter Your User Name"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <FaUserCircle className="userIcon" />
            <label>E-mail :</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              required
              autoComplete="new-email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdOutlineMail className="emailIcon" />
            <label>Password :</label>
            <input
              type={passwordVisible ? "password" : "text"}
              placeholder="Enter Your Password"
              required
              autoComplete="new-password"
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
            {passwordError && <p className="errorText">{passwordError}</p>}
            <button type="submit">Register</button>
          </form>
          <h3 className="logintLink">
            Already Have An Account? <Link to="/login">log In Now</Link>
          </h3>
        </div>
        <div className="registe-right">
          <img src={registerImage} alt="logo image" className="registerImage" />
        </div>
      </div>
    </>
  );
};

export default Register;
