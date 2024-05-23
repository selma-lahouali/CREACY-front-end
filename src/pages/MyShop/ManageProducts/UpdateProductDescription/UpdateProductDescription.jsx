import { useEffect, useState } from "react";
import "./UpdateProductDescription.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import MyShopSideBar from "../../../../components/MyShopSideBar/MyShopSideBar";

const UpdateProductDescription = () => {
  const [productDescription, setProductDescription] = useState({
    description: "",
    extraInfo: "",
    imageDescription: [],
    color: [],
    size: [],
    tiktok: [],
    instagram: [],
  });
  const { _id } = useParams();
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;
  // get prod by id
  useEffect(() => {
    axios
      .get(`${API}/products/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setProductDescription(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log("Failed to load product.");
      });
  }, [_id, token, API]);
  // update prod description
  const updateDescription = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", productDescription.description);
    formData.append("extraInfo", productDescription.extraInfo);
    formData.append("color", productDescription.color);
    formData.append("size", productDescription.size);
    formData.append("tiktok", productDescription.tiktok);
    formData.append("instagram", productDescription.instagram);

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
          <div className="update-prod-descs">
            <h1>Product Descriptions :</h1>
            <label>Description : </label>
            <textarea
              type="text"
              placeholder="Enter Your Product Description"
              name="description"
              value={productDescription.description}
              onChange={handleChange}
            />
            <label>More Information : </label>
            <textarea
              type="text"
              placeholder="Enter Your Product Description"
              name="extraInfo"
              value={productDescription.extraInfo}
              onChange={handleChange}
            />
          </div>
          <div className="update-prod-desc-details">
            <h1>Product Detail :</h1>
            <label>Colors : </label>
            <input
              type="text"
              placeholder="Enter Your Product Colors"
              name="color"
              onChange={handleChange}
            />
            <label>Size : </label>
            <input
              type="text"
              placeholder="Enter Your Product Sizes"
              name="size"
              onChange={handleChange}
            />
          </div>
          <div className="updat-prod-desc-socials">
            <h1>Socials :</h1>
            <label>TikTok : </label>
            <input
              type="text"
              placeholder="Enter Your Product Related Video"
              name="tiktok"
              onChange={handleChange}
            />
            <label>Instagram :</label>
            <input
              type="text"
              placeholder="Enter Your Product Related Vide"
              name="instagram"
              onChange={handleChange}
            />
          </div>
          <div className="update-prod-desc-image">
            <h1>Photos</h1>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              name="imageDescription"
            />
          </div>
          <button type="submit" className="update-product-desc-btn">
            Update Product Description
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProductDescription;
