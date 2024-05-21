import { useState } from "react";
import "./UpdateProductDescription.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import MyShopSideBar from "../../../../components/MyShopSideBar/MyShopSideBar";

const UpdateProductDescription = () => {
  const [productDescription, setProductDescription] = useState({
    description: "",
    imageDescription: null,
    linkDescription: "",
    extraInfo: "",
  });
  
  const { _id } = useParams();
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  const updateDescription = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", productDescription.description);
    formData.append("linkDescription", productDescription.linkDescription);
    formData.append("extraInfo", productDescription.extraInfo);

    if (productDescription.imageDescription) {
      formData.append("imageDescription", productDescription.imageDescription);
    }

    axios
      .put(`${API}/products/description/${_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("Product Description Updated Successfully");
      })
      .catch((err) => {
        console.error(err);
        console.log("Failed to update product description.");
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "imageDescription") {
      setProductDescription({
        ...productDescription,
        imageDescription: e.target.files[0],
      });
    } else {
      setProductDescription({
        ...productDescription,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <MyShopSideBar />
      <div className="ProductDescription">
        <form onSubmit={updateDescription}>
          <label>Description : </label>
          <input
            type="text"
            placeholder="Enter Your Product Description"
            name="description"
            value={productDescription.description}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter Your Product Description"
            name="linkDescription"
            value={productDescription.linkDescription}
            onChange={handleChange}
          />
          <label>More Detail : </label>
          <input
            type="text"
            placeholder="Enter Your Product Description"
            name="extraInfo"
            value={productDescription.extraInfo}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            name="imageDescription"
            className="update-product-input"
          />
          <button type="submit" className="update-product-btn">
            Update Product Description
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProductDescription;
