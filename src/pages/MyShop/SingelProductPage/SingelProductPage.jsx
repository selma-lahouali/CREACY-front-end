import { useEffect, useState } from "react";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./SingelProductPage.css";
import { BiSolidLike } from "react-icons/bi";
import AddToCart from "../../../components/AddToCart/AddToCart";
import { useTranslation } from "react-i18next";

const SingleProductPage = () => {
  const { t } = useTranslation();
  const [singleProduct, setSingleProduct] = useState({});
  // states to toggle description parts / states to toggle description parts
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(false);
  const [links, setLinks] = useState(false);
  const { _id } = useParams();
  // get token from local storage / get token from local storage / get token from local storage
  const token = localStorage.getItem("token");
  //get products by id / get products by id / get products by id / get products by id
  const API = import.meta.env.VITE_API;
  useEffect(() => {
    axios
      .get(`${API}/products/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSingleProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log("Failed to load product.");
      });
  }, [_id, token, API]);
  // functions to toggle description parts / functions to toggle description parts
  const toggleDescription = () => {
    setDescription(true);
    setDetails(false);
    setLinks(false);
  };
  const toggleDetails = () => {
    setDescription(false);
    setDetails(true);
    setLinks(false);
  };
  const toggleLinks = () => {
    setDescription(false);
    setDetails(false);
    setLinks(true);
  };
  return (
    <>
      <MyShopSideBar />
      <Link to="/myShop">
        <button className="back-to-shop-btn">
          {t("singleProduct.BackToShop")}
        </button>
      </Link>
      <div className="single-prod-position">
        <div className="single-products">
          {/* Display image */}
          <img
            src={singleProduct.image}
            alt="image not found"
            className="single-prod-image"
          />
          <div className="single-prod-info">
            <div className="single-prod-name-price">
              <h4 className="single-prod-name-limit">
                {t("UserCart.name")} : {singleProduct.name}
              </h4>
              <h4 className="single-prod-price-limit">
                {t("UserCart.price")} : $ {singleProduct.price}
              </h4>
              <p className="single-prod-likes home-prod-info-limit">
                <BiSolidLike className="single-product-icon single-prod-info-limit" />
                {singleProduct.likes?.length}
              </p>
              <h4 className="single-prod-info-limit">
                {t("singleProduct.category")} : {singleProduct.category}
              </h4>
              <h4 className="single-prod-info-limit">
                {t("singleProduct.quantity")} : {singleProduct.quantity}
              </h4>
              <p>{singleProduct.description}</p>
            </div>
            <AddToCart
              className={"single-prod-add-to-cart-btn"}
              product={singleProduct}
            ></AddToCart>
          </div>
        </div>
        <div className="signle-prod-extra-info">
          <div className="signle-prod-extra-info-toggle">
            <button onClick={toggleDescription}>Description</button>
            <button onClick={toggleDetails}>Details</button>
            <button onClick={toggleLinks}>{t("singleProduct.link")}</button>
          </div>
          <div className="signle-prod-extra-info-desc">
            {description && (
              <>
                <p>{singleProduct.extraInfo}</p>
                <div className="extra-info-img">
                  {singleProduct.imageDescription &&
                    singleProduct.imageDescription.map((descImage, index) => (
                      <img
                        key={index}
                        src={descImage}
                        alt={`Description Image ${index + 1}`}
                      />
                    ))}
                </div>
              </>
            )}
          </div>
          <div className="signle-prod-extra-info-detail">
            {details && (
              <>
                <h2>{singleProduct.color}</h2>
                <h2>{singleProduct.size}</h2>
              </>
            )}
          </div>
          <div className="signle-prod-extra-info-link">
            {links && (
              <div className="social">
                <a
                  href={singleProduct.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {singleProduct.tiktok}
                </a>
                <a
                  href={singleProduct.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {singleProduct.instagram}
                </a>
              </div>
            )}
          </div>
        </div>
        <Link to={`/UpdateProductDescription/${_id}`}>
          <button className="modify-prod-description-btn">
            {t("singleProduct.ModifyProductDescription")}
          </button>
        </Link>
      </div>
    </>
  );
};

export default SingleProductPage;
