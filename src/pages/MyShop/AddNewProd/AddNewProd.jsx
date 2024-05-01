import axios from "axios";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import { useState } from "react";

const AddNewProd = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

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
      const response = await axios.post("http://localhost:3000/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(response.data, "product created successfully");
      } else {
        setError("Failed to create product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create product.");
    }
  };

  return (
    <>
      <MyShopSideBar />
      <form onSubmit={handleSubmit} className="add-new-product">
        <label>Name:</label>
        <input type="text" placeholder="Enter Your Product Name" onChange={(e) => setName(e.target.value)} />

        <label>Description:</label>
        <input type="text" placeholder="Enter Your Product Description" onChange={(e) => setDescription(e.target.value)} />

        <label>Price:</label>
        <input type="number" placeholder="Enter The Price" onChange={(e) => setPrice(e.target.value)} />

        <label>Category:</label>
        <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="cloth">clothing</option>
          <option value="accessory">accessory</option>
          <option value="shoes">shoes</option>
          <option value="home decoration">home decoration</option>
        </select>

        <label>Quantity:</label>
        <input type="number" placeholder="Enter The Quantity" onChange={(e) => setQuantity(e.target.value)} />

        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Add Product</button>
      </form>
      <div className="error">{error}</div>
      <p>{uploadStatus}</p>
    </>
  );
};

export default AddNewProd;
