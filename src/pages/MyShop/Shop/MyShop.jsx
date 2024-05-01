import { useEffect, useState } from "react";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import "./MyShop.css";
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";

const MyShop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/`).then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <>
      <MyShopSideBar></MyShopSideBar>
      <div className="products-display">
        <ul>
          {products.map((product, index) => (
            <div key={index}>
              <li>
                <img
                  src={product.image}
                  alt="image not found"
                  className="product-image"
                />
                {/* Display image */}
                <div className="product-info">
                  <div className="prod-name-price">
                    <h4>{product.name}</h4>
                    <h4>{product.price} $</h4>
                  </div>
                  <h1>{product.category}</h1>
                  <h1>{product.quantity}</h1>
                  <p className="product-reaction">
                    {product.likes} <BiSolidLike />
                  </p>
                  <h4 className="add-to-cart">Modify Product</h4>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MyShop;
