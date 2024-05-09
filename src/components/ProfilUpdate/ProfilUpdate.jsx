import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./ProfilUpdate.css";
import Loader from "../Loader/Loader";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ProfilUpdate = () => {
  const [user, setUser] = useState({
    password: "",
    image: null,
  });
  const [error, setError] = useState("");
  // toggle Password Visibility / toggle Password Visibility / toggle Password Visibility
  const [passwordVisible, setPasswordVisible] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // loading state / loading state / loading state  / loading state  / loading state
  const [isLoading, setIsLoading] = useState(false);
  //   get user ID from local storage / get user ID from local storage / get user ID from local storage
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData ? userData._id : null;
  // get token from local storage / get token from local storage / get token from local storage
  const token = localStorage.getItem("token");
  // get user by ID API call / get user by ID API call / get user by ID API call / get user by ID API call
  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load user.");
      });
  }, [userId, token]);
  // update user by ID API call / update user by ID API call / update user by ID API call / update user by ID API call
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("password", user.password);
    formData.append("image", user.image);
    try {
      const response = await axios.put(
        `http://localhost:3000/auth/${userId}/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("User profile updated successfully");
        setIsLoading(false);
        // sweet alert success message / sweet alert success message / sweet alert success message
        Swal.fire({
          title: "Success!",
          text: "Your Profile Has Been Updated!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      setIsLoading(false);
      setError("Failed to update user profile.");
      // sweet alert fail message / sweet alert fail message / sweet alert fail message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUser({
        ...user,
        image: e.target.files[0],
      });
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      {isLoading && <Loader></Loader>}
      <form onSubmit={handleSubmit} className="update-user-profile">
        <label>User Name : </label>
        <input
          type="text"
          value={userData ? userData.username : ""}
          readOnly
          className="update-user-profile-input"
        />
        <label>E.mail : </label>
        <input
          type="email"
          name="email"
          defaultValue={userData ? userData.email : ""}
          readOnly
          className="update-user-profile-input"
        />
        <label>New Password:</label>
        <input
          type={passwordVisible ? "password" : "text"}
          name="password"
          value={user.password}
          onChange={handleChange}
          className="update-user-profile-input"
        />
        {passwordVisible ? (
          <FaRegEye
            className="update-user-profile-Icon"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <FaRegEyeSlash
            className="update-user-profile-Icon"
            onClick={togglePasswordVisibility}
          />
        )}
        <div className="update-user-profile-image">
          <label>New Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="update-user-profile-btn">
          Update Profile
        </button>
      </form>
      <div className="error">{error}</div>
    </>
  );
};

export default ProfilUpdate;
