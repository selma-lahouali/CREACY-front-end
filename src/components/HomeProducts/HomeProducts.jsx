import { useEffect, useState } from "react";
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import "./HomeProducts.css";
import AddToCart from "../AddToCart/AddToCart";

// API call get all product / API call get all product / API call get all product
const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  // pagination / pagination / pagination / pagination /pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;
  useEffect(() => {
    const url = `${API}/products/?page=${page}`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [page, token, API]);
  return (
    <>
      <div className="home-products-position">
        <ul className="home-products-display">
          {products.map((product, index) => (
            <div key={index}>
              <li className="home-products">
                <img
                  src={product.image}
                  alt="image not found"
                  className="home-product-image"
                />
                <div className="home-product-info">
                  <div className="home-prod-name-price">
                    <h4 className="home-prod-name-limit">{product.name}</h4>
                    <h4 className="home-prod-price-limit">${product.price}</h4>
                  </div>
                  <p className="home-prod-info-limit">
                    Category : {product.category}
                  </p>
                  <p className="home-prod-info-limit">
                    Quantity {product.quantity}
                  </p>
                  <p className="home-prod-likes home-prod-info-limit">
                    <BiSolidLike className="home-prod-icon" /> {product.likes}
                  </p>

                  <Link to={`/myShop/${product._id}`}>
                    <button className="home-prod-detail-btn">Detail</button>
                  </Link>
                  <AddToCart product={product}></AddToCart>
                </div>
              </li>
            </div>
          ))}
        </ul>
        <Pagination
          page={page}
          count={totalPages}
          onChange={handlePageChange}
          className="home-pagination"
        />
      </div>
    </>
  );
};

export default HomeProducts;
