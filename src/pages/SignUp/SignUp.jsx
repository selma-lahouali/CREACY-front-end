import { Link } from "react-router-dom";
import "./SignUp.css";
import { FaUserCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import logo from "../../assets/logo.png";
import { useState } from "react";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="logobar">
        <img src={logo} alt="logo image" className="logo" />
      </div>
      <div className="signUp">
        <h1>Welcome To CREACY. Sign Up Now For Free</h1>
        <form>
          <label>User Name</label>
          <input type="text" placeholder="Enter Your User Name" />
          <FaUserCircle className="userIcon" />
          <label>E-mail</label>
          <input type="email" placeholder="Enter Your Email" />
          <MdOutlineMail className="emailIcon" />
          <label>Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter Your Password"
          />
          {passwordVisible ? (
            <FaRegEyeSlash
              className="passwordIcon"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <FaRegEye
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
    </>
  );
};

export default SignUp;
