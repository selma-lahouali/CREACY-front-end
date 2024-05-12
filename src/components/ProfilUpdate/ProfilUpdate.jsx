import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./ProfilUpdate.css";
import Loader from "../Loader/Loader";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ProfilUpdate = () => {
  // user update states / user update states / user update states / user update states
  const [user, setUser] = useState({
    password: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // Track if password is changed / Track if password is changed / Track if password is changed
  const [passwordChanged, setPasswordChanged] = useState(false); // Track if password is changed
  // Track if password field is touched / Track if password field is touched
  const [passwordTouched, setPasswordTouched] = useState(false);
  // get user id and token from local storage
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData ? userData._id : null;
  const token = localStorage.getItem("token");
  // API call to get user by id / API call to get user by id / API call to get user by id
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
  // update user image and / or password API call / update user image and / or password API call
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    // Check if the user has entered a new password and if the password field has been touched
    const passwordToSend =
      passwordChanged && passwordTouched ? user.password : "";

    formData.append("password", passwordToSend);
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
        // sweet alet success message / sweet alet success message / sweet alet success message
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
      // sweet alet faild message / sweet alet faild message / sweet alet faild message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  // handdle the changes in the inputs / handdle the changes in the inputs
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUser({
        ...user,
        image: e.target.files[0],
      });
    } else if (e.target.name === "password") {
      setUser({
        ...user,
        password: e.target.value,
      });
      setPasswordChanged(true);
    }
    setPasswordTouched(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {isLoading && <Loader></Loader>}
      <form onSubmit={handleSubmit} className="update-user-profile">
        {/* user name / user name / user name / user name / user name  */}
        <label>User Name : </label>
        <input
          type="text"
          value={userData ? userData.username : ""}
          readOnly
          className="update-user-profile-input"
        />
        {/*user email / user email / user email / user email / user email  */}
        <label>E.mail : </label>
        <input
          type="email"
          name="email"
          defaultValue={userData ? userData.email : ""}
          readOnly
          className="update-user-profile-input"
        />
        {/* user password / user password / user password / user password   */}
        <label>New Password:</label>
        <input
          type={passwordVisible ? "password" : "text"}
          name="password"
          value={user.password}
          autoComplete="new-password"
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
        {/* user image upload / user image upload / user image upload */}
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
