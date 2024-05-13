import { useEffect, useState } from "react";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./SingelProductPage.css";
import { BiSolidLike } from "react-icons/bi";
const SingleProductPage = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const { _id } = useParams();
  // get token from local storage / get token from local storage / get token from local storage
  const token = localStorage.getItem("token");
  //get products by id / get products by id / get products by id / get products by id
const API =import.meta.env.VITE_API
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
  }, [_id, token,API]);

  return (
    <>
      <MyShopSideBar />
      <div className="single-prod-position">
        <li className="single-products">
          {/* Display image */}
          <img
            src={singleProduct.image}
            alt="image not found"
            className="single-prodt-image"
          />
          <div className="single-prod-info">
            <div className="single-prod-name-price">
              <h4 className="single-prod-name-limit">{singleProduct.name}</h4>
              <h4 className="single-prod-price-limit">
                {singleProduct.price}$
              </h4>
            </div>
            <p className="single-prod-info-limit">
              Category : {singleProduct.category}
            </p>
            <p className="single-prod-info-limit">
              Quantity {singleProduct.quantity}
            </p>
            <p className="single-prod-likes , home-prod-info-limit">
              <BiSolidLike className="home-product-icon , single-prod-info-limit" />
              {singleProduct.likes}
            </p>
          </div>
        </li>
      </div>
      <Link to="/myShop">
        <button className="back-to-shop-btn">Back To The Shop</button>
      </Link>
    </>
  );
};

export default SingleProductPage;
