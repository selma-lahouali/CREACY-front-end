import { useEffect, useState } from "react";
import "./UpdateProductDescription.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import MyShopSideBar from "../../../../components/MyShopSideBar/MyShopSideBar";
import { useTranslation } from "react-i18next";

const UpdateProductDescription = () => {
  const { t } = useTranslation();
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
          <h1>{t("UpdateProductDescription.productDescriptionsTitle")}</h1>
            <label>{t("UpdateProductDescription.descriptionLabel")}</label>
            <textarea
              type="text"
              placeholder={t("UpdateProductDescription.descriptionPlaceholder")}
              name="description"
              value={productDescription.description}
              onChange={handleChange}
            />
            <label>{t("UpdateProductDescription.moreInformationLabel")}</label>
            <textarea
              type="text"
              placeholder={t("UpdateProductDescription.descriptionPlaceholder")}
              name="extraInfo"
              value={productDescription.extraInfo}
              onChange={handleChange}
            />
          </div>
          <div className="update-prod-desc-details">
          <h1>{t("UpdateProductDescription.productDetails")}</h1>
            <label>{t("UpdateProductDescription.colorsLabel")}</label>
            <input
              type="text"
              placeholder={t("UpdateProductDescription.colorsPlaceholder")}
              name="color"
              onChange={handleChange}
            />
           <label>{t("UpdateProductDescription.sizeLabel")}</label>
            <input
              type="text"
              placeholder={t("UpdateProductDescription.sizePlaceholder")}
              name="size"
              onChange={handleChange}
            />
          </div>
          <div className="updat-prod-desc-socials">
          <h1>{t("UpdateProductDescription.socialsTitle")}</h1>
            <label>TikTok :</label>
            <input
              type="text"
              placeholder={t("UpdateProductDescription.tiktokPlaceholder")}
              name="tiktok"
              onChange={handleChange}
            />
             <label>Instagram :</label>
            <input
              type="text"
              placeholder={t("UpdateProductDescription.instagramPlaceholder")}
              name="instagram"
              onChange={handleChange}
            />
          </div>
          <div className="update-prod-desc-image">
          <h1>{t("UpdateProductDescription.photosTitle")} :</h1>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              name="imageDescription"
            />
          </div>
          <button type="submit" className="update-product-desc-btn">
          {t("UpdateProductDescription.updateProductDescriptionButton")}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProductDescription;
