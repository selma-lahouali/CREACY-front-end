import { useEffect, useState } from "react";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import "./MyShop.css";
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";

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
      <div className="my-products-display">
        <ul>
          {products.map((product, index) => (
            <div key={index}>
              <li className="my-products">
                <img
                  src={product.image}
                  alt="image not found"
                  className="my-product-image"
                />
                {/* Display image */}
                <div className="my-product-info">
                  <div className="my-prod-name-price">
                    <h4>{product.name}</h4>
                    <h4>{product.price} $</h4>
                  </div>
                  <h4>{product.category}</h4>
                  <h4> Quantity {product.quantity}</h4>
                  <p className="my-product-likes">
                    {product.likes} <BiSolidLike />
                  </p>
                  <h4 className="modify-Product">  <RiEdit2Fill /> Modify Product</h4>
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
