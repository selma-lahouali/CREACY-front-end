import { useEffect, useState } from "react";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./SingelProductPage.css";
import { BiSolidLike } from "react-icons/bi";
import AddToCart from "../../../components/AddToCart/AddToCart";
const SingleProductPage = () => {
  const [singleProduct, setSingleProduct] = useState({});
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
  return (
    <>
      <MyShopSideBar />
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
                Name : {singleProduct.name}
              </h4>
              <h4 className="single-prod-price-limit">
                Price : $ {singleProduct.price}
              </h4>
              <p className="single-prod-likes home-prod-info-limit">
                <BiSolidLike className="single-product-icon single-prod-info-limit" />
                {singleProduct.likes}
              </p>
              <h4 className="single-prod-info-limit">
                Category : {singleProduct.category}
              </h4>
              <h4 className="single-prod-info-limit">
                Quantity : {singleProduct.quantity}
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
          <h1>Description</h1>
          {/* <p>
            <a
              href={singleProduct.linkDescription}
              target="_blank"
              rel="noopener noreferrer"
            >
              {singleProduct.linkDescription}
            </a>
          </p> */}
          <p>{singleProduct.extraInfo}</p>
          {/* map to get all the descritption images / map to get all the descritption images */}
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
        </div>
        {/* <Link to="/myShop">
          <button className="back-to-shop-btn">Back To The Shop</button>
        </Link>
        <Link to={`/UpdateProductDescription/${_id}`}>
          <button className="modify-prod-description-btn">
            Modify Product Description
          </button>
        </Link> */}
      </div>
    </>
  );
};

export default SingleProductPage;
