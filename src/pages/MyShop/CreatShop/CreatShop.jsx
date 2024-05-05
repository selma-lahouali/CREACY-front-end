import axios from "axios";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./CreatShop.css";
import { useDispatch } from "react-redux";
import { shopCreation } from "../../../redux/slices/CreatShopSlice";

const CreatShop = () => {
  // product states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("clothing");
  const [error, setError] = useState("");
  // image upload states
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/shop/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data, "Shop created successfully");
        dispatch(shopCreation(response?.data));
        // Reset input fields after successful product creation
        setName("");
        setDescription("");
        setCategory("");
        setSelectedFile(null);

        // sweetalert success message / sweetalert success message / sweetalert success message
        Swal.fire({
          title: "CONRATULATION!",
          text: "Your Shop Has Been Created!",
          icon: "success",
        });
        navigate("/myShop");  
      } else {
        setError("Failed to create shop.");
      }
    } catch (error) {
      console.error("Error creating shop:", error);
      setError("Failed to create shop.");
      // Display error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <>
      <MyShopSideBar />
      <form onSubmit={handleSubmit} className="add-new-product">
        {/* Shop name */}
        <label>Shop Name :</label>
        <input
          type="text"
          placeholder="Enter Your Shop Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="add-product-input"
        />
        {/* Shop description */}
        <label>Shop Description :</label>
        <input
          type="text"
          placeholder="Enter Your Shop Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="add-product-input"
        />

        {/* Shop category */}
        <label>Shop Category :</label>
        <select
          id="category"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="cloth">clothing</option>
          <option value="accessory">accessory</option>
          <option value="shoes">shoes</option>
          <option value="home decoration">home decoration</option>
        </select>

        {/* Image upload */}
        <input
          type="file"
          accept="image/*"
          required
          onChange={handleFileChange}
        />
        <div className="my-product-btn">
          <Link to="/myShop">
            <button type="submit" className="cancel-add-product-btn">
              Back
            </button>
          </Link>
          <button type="submit" className="add-product-btn">
            Creat My Shop
          </button>
        </div>
      </form>
      <div className="error">{error}</div>
    </>
  );
};

export default CreatShop;