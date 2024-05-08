import axios from "axios";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import { useState } from "react";
import "./AddNewProd.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddNewProd = () => {
  // product states / product states / product states / product states / product states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  // image upload states / image upload states / image upload states / image upload states
  const [selectedFile, setSelectedFile] = useState(null);
  // image upoad function / image upoad function / image upoad function / image upoad function
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/products/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data, "product created successfully");
        // Reset input fields after successful product creation
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setSelectedFile(null);

        // sweet alert success message / sweet alert success message / sweet alert success message
        Swal.fire({
          title: "Good job!",
          text: "Your Product Has Been Created!",
          icon: "success",
        });
      } else {
        setError("Failed to create product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create product.");
      // Display error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <>
      <MyShopSideBar />
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
        {/* Product description */}
        <label>Product Description :</label>
        <input
          type="text"
          placeholder="Enter Your Product Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
