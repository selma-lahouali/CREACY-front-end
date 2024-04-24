import { Link } from "react-router-dom";
import "./Register.css";
import { FaUserCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import registerImage from "../../assets/register-image.webp";
import { useState } from "react";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
      <div className="register">
        <div className="register-left">
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
              type={passwordVisible ? "password" : "text"}
              placeholder="Enter Your Password"
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
