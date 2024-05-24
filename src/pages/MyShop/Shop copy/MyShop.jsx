import { useEffect, useState } from "react";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import "./MyShop.css";
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";
import { Pagination } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import AddToCart from "../../../components/AddToCart/AddToCart";

const MyShop = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  const user = JSON.parse(localStorage.getItem("user"));
  const ownerId = user ? user._id : null;
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    let apiUrl = `${API}/products/owner/${ownerId}?page=${page}&categories=${selectedCategories.join(
      ","
    )}`;

    if (searchTerm && searchTerm.trim() !== "") {
      apiUrl += `&search=${searchTerm}`;
    }

    axios
      .get(apiUrl, {
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
  }, [ownerId, page, selectedCategories, searchTerm, token, API]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCategoryChange = (category) => {
    // Toggle selected category
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <MyShopSideBar
        selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange}
      />
      <div className="my-products-position">
        {/* Category filter dropdown with checkboxes */}
        <div className="shop-category-dropdown">
          <button className="shop-categry-btn" onClick={toggleDropdown}>
            Select Categories <span>&#9662;</span>
          </button>
          {showDropdown && (
            <div className="shop-categry-btn-content">
              <div className="shop-categry-checkbox">
                <input
                  type="checkbox"
                  id="clothing"
                  value="clothing"
                  checked={selectedCategories.includes("clothing")}
                  onChange={() => handleCategoryChange("clothing")}
                />
                <label htmlFor="clothing">Clothing</label>
              </div>
              <div className="shop-categry-checkbox">
                <input
                  type="checkbox"
                  id="accessory"
                  value="accessory"
                  checked={selectedCategories.includes("accessory")}
                  onChange={() => handleCategoryChange("accessory")}
                />
                <label htmlFor="accessory">Accessory</label>
              </div>
              <div className="shop-categry-checkbox">
                <input
                  type="checkbox"
                  id="shoes"
                  value="shoes"
                  checked={selectedCategories.includes("shoes")}
                  onChange={() => handleCategoryChange("shoes")}
                />
                <label htmlFor="shoes">Shoes</label>
              </div>
              <div className="shop-categry-checkbox">
                <input
                  type="checkbox"
                  id="home-decoration"
                  value="home decoration"
                  checked={selectedCategories.includes("home decoration")}
                  onChange={() => handleCategoryChange("home decoration")}
                />
                <label htmlFor="home-decoration">Home Decoration</label>
              </div>
            </div>
          )}
        </div>

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
                    <h4 className="my-prod-price-limit">${product.price}</h4>
                  </div>
                  <p className="my-prod-info-limit">
                    Category : {product.category}
                  </p>
                  <p className="my-prod-info-limit">
                    Quantity {product.quantity}
                  </p>
                  <p className="my-product-likes my-prod-info-limit">
                    <BiSolidLike className="my-product-icon" /> {product.likes}
                  </p>

                  <Link to={`/myShop/${product._id}`}>
                    <button className="myShop-prod-detail-btn">Detail</button>
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
          className="my-product-pagination"
        />
      </div>
    </>
  );
};

export default MyShop;
