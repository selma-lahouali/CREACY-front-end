import { useEffect, useState } from "react";
import "./UpdateProductDescription.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import MyShopSideBar from "../../../../components/MyShopSideBar/MyShopSideBar";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

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
        Swal.fire({
          title: t("AddNewProd.productCreatedTitle"),
          text: t("AddNewProd.productCreatedText"),
          icon: "success",
        });
      })
      .catch((err) => {
        console.error(err);
       // Display error message
       Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("AddNewProd.somethingWentWrong"),
      });
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
