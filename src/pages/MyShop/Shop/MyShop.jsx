import { useEffect, useState } from "react";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import "./MyShop.css";
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";

// API call get all product / API call get all product / API call get all product
const MyShop = () => {
  const [products, setProducts] = useState([]);
  // pagination / pagination / pagination / pagination /pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const ownerId = user ? user._id : null;
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/owner/${ownerId}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      });
  }, [ownerId, page, token]);

  return (
    <>
      <MyShopSideBar></MyShopSideBar>
      <div className="my-products-position">
        <ul className="my-products-display">
          {products.map((product, index) => (
            <div key={index}>
              <li className="my-products">
                <img
                  src={product.image}
                  alt="image not found"
                  className="my-product-image"
                />
                <div className="my-product-info">
                  <div className="my-prod-name-price">
                    <h4 className="my-prod-name-limit">{product.name}</h4>
                    <h4 className="my-prod-price-limit">{product.price}$</h4>
                  </div>
                  <p className="my-prod-info-limit">
                    Category : {product.category}
                  </p>
                  <p className="my-prod-info-limit">
                    Quantity {product.quantity}
                  </p>
                  <p className="my-product-likes , my-prod-info-limit">
                    <BiSolidLike className="my-product-icon" /> {product.likes}
                  </p>

                  <Link to={`/myShop/${product._id}`}>
                    <button>Detail</button>
                  </Link>
                </div>
              </li>
            </div>
          ))}
        </ul>
        <Pagination
          page={page}
          count={totalPages}
          onChange={handlePageChange}
          className="my-product-pagination"
        />
      </div>
    </>
  );
};

export default MyShop;
