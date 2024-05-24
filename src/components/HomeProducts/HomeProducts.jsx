import { useEffect, useState } from "react";
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";
import { Pagination } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "./HomeProducts.css";
import AddToCart from "../AddToCart/AddToCart";

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  // to refresh product after a like
  const [key, setKey] = useState(0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  const user = JSON.parse(localStorage.getItem("user"));
  const ownerId = user ? user._id : null;
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    let apiUrl = `${API}/products/?page=${page}&categories=${selectedCategories.join(
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
  }, [page, selectedCategories, searchTerm, token, API, key]);

  // Change the page
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  useEffect(() => {
  
    setPage(1);
  }, [selectedCategories]);

  // Toggle dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle like/unlike
  const handleLike = async (productId) => {
    try {
      const response = await axios.put(
        `${API}/products/like/${ownerId}/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedProducts = products.map((product) =>
        product._id === productId
          ? { ...product, likes: response.data.likes }
          : product
      );
      setProducts(updatedProducts);
      setKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error liking the product", error);
    }
  };
  // Conditionally render like icon based on whether the user has liked the product
  const likeIcon = (productId) => {
    const product = products.find((product) => product._id === productId);
    // Check if the product is defined and has a 'likes' array
    if (product && Array.isArray(product.likes)) {
      const liked = product.likes.includes(ownerId);
      return liked ? (
        <BiSolidLike
          className="home-prod-like-icon-liked"
          onClick={() => handleLike(productId)}
        />
      ) : (
        <BiSolidLike
          className="home-prod-unlike-icon"
          onClick={() => handleLike(productId)}
        />
      );
    } else {
      return (
        <BiSolidLike
          className="home-prod-icon"
          onClick={() => handleLike(productId)}
        />
      );
    }
  };
  return (
    <>
      <div key={key} className="home-products-position">
        {/* Category filter dropdown with checkboxes */}
        <div className="home-category-dropdown">
          <button className="home-categry-btn" onClick={toggleDropdown}>
            Select Categories <span>&#9662;</span>
          </button>
          {showDropdown && (
            <div className="home-categry-btn-content">
              <div className="home-categry-checkbox">
                <input
                  type="checkbox"
                  id="clothing"
                  value="clothing"
                  checked={selectedCategories.includes("clothing")}
                  onChange={() => handleCategoryChange("clothing")}
                />
                <label htmlFor="clothing">Clothing</label>
              </div>
              <div className="home-categry-checkbox">
                <input
                  type="checkbox"
                  id="accessory"
                  value="accessory"
                  checked={selectedCategories.includes("accessory")}
                  onChange={() => handleCategoryChange("accessory")}
                />
                <label htmlFor="accessory">Accessory</label>
              </div>
              <div className="home-categry-checkbox">
                <input
                  type="checkbox"
                  id="shoes"
                  value="shoes"
                  checked={selectedCategories.includes("shoes")}
                  onChange={() => handleCategoryChange("shoes")}
                />
                <label htmlFor="shoes">Shoes</label>
              </div>
              <div className="home-categry-checkbox">
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
                  {/* Render the like icon */}
                  <p className="home-prod-likes home-prod-info-limit">
                    {likeIcon(product._id)}
                    {product.likes ? product.likes.length : 0}
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
