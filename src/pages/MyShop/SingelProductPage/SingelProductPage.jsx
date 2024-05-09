import { useEffect, useState } from "react";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./SingelProductPage.css";
const SingleProductPage = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const { _id } = useParams();
  // get token from local storage / get token from local storage / get token from local storage
  const token = localStorage.getItem("token");
  //get products by id / get products by id / get products by id / get products by id
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${_id}`, {
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
  }, [_id, token]);

  return (
    <>
      <MyShopSideBar />
      <div className="prod-main">
        <li className="my-products">
          {/* Display image */}
          <img
            src={singleProduct.image}
            alt="image not found"
            className="my-product-image"
          />
          <div className="my-product-info">
            <div className="my-prod-name-price">
              <h4>{singleProduct.name}</h4>
              <pattern>{singleProduct.price} $</pattern>
            </div>
            <p>Category : {singleProduct.category}</p>
            <p> Quantity {singleProduct.quantity}</p>
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
