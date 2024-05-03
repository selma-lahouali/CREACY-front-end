import { useEffect, useState } from "react";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SingelProductPage.css";
const SingleProductPage = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const { _id } = useParams();

  useEffect(() => {
    // Construct the API endpoint URL with the product ID
    const apiUrl = `http://localhost:3000/products/${_id}`;

    //get products by id
    axios
      .get(apiUrl)
      .then((res) => {
        // Update state with the fetched product data
        setSingleProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log("Failed to load product.");
      });
  }, [_id]); // Dependency array ensures the effect runs when _id changes

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
    </>
  );
};

export default SingleProductPage;
