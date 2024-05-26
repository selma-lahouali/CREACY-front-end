import axios from "axios";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import { useState } from "react";
import "./AddNewProd.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";

const AddNewProd = () => {
  // product states / product states / product states / product states / product states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("clothing");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  // image upload states / image upload states / image upload states / image upload states
  const [selectedFile, setSelectedFile] = useState(null);
  // loading state / loading state / loading state  / loading state  / loading state
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  // add new product API call / add new product API call / add new product API call / add new product API call
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("image", selectedFile);

    // get userId from localStorage / get userId from localStorage / get userId from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData ? userData._id : null;

    // get userId from user and includ it in the request payload / get userId from user and includ it in the request payload
    formData.append("userId", userId);

    // get JWT token from localStorage / get JWT token from localStorage / get JWT token from localStorage
    const token = localStorage.getItem("token");
    const API = import.meta.env.VITE_API;
    try {
      const response = await axios.post(`${API}/products/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(response.data, "product created successfully");
        // Reset input fields after successful product creation
        setName("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setSelectedFile(null);
        setIsLoading(false);
        // sweet alert success message / sweet alert success message / sweet alert success message
        Swal.fire({
          title: "Good job!",
          text: "Your Product Has Been Created!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setIsLoading(false);
      setError("Failed to create product.");
      // Display error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  return (
    <>
      <MyShopSideBar />
      {isLoading && <Loader></Loader>}
      <form onSubmit={handleSubmit} className="add-new-product">
        {/* Product name */}
        <label>Product Name :</label>
        <input
          type="text"
          placeholder="Enter Your Product Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="add-product-input"
        />
        {/* Product price */}
        <label>Product Price :</label>
        <input
          type="number"
          placeholder="Enter The Price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="add-product-input"
        />
        {/* Product category */}
        <label>Product Category :</label>
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
        {/* Product quantity */}
        <label>Product Quantity :</label>
        <input
          type="number"
          placeholder="Enter The Quantity"
          required
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="add-product-input"
        />
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
            Add Product
          </button>
        </div>
      </form>
      <div className="error">{error}</div>
    </>
  );
};

export default AddNewProd;
