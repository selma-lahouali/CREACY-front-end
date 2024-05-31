import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import "./SingleShop.css";
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";
import { Pagination } from "@mui/material";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AddToCart from "../../components/AddToCart/AddToCart";
import { useTranslation } from "react-i18next";

const SingleShop = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [key, setKey] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");
  const { _id } = useParams();
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));
  const ownerId = user ? user._id : null;
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  // get shop by user id
  useEffect(() => {
    let apiUrl = `${API}/products/owner/${_id}?page=${page}&categories=${selectedCategories.join(
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
        console.log("res.data.products", res.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [_id, page, selectedCategories, searchTerm, token, API, key]);

  // handdle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  useEffect(() => {
    setPage(1);
  }, [selectedCategories]);

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
          className="my-shop-prod-like-icon-liked"
          onClick={() => handleLike(productId)}
        />
      ) : (
        <BiSolidLike
          className="my-shop-prod-unlike-icon"
          onClick={() => handleLike(productId)}
        />
      );
    } else {
      return (
        <BiSolidLike
          className="my-shop-prod-icon"
          onClick={() => handleLike(productId)}
        />
      );
    }
  };

  // creat a chat
  const creatChat = async () => {
    const senderId = ownerId;
    const receiverId = _id;
    try {
      const response = await axios.post(
        `${API}/chat/`,
        { senderId, receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message === "Chat already exists") {
        console.log("Chat already exists", response.data.chat);
        navigate("/chat")
      } else {
        console.log("Chat created successfully", response.data);
        navigate("/chat")
      }
    } catch (error) {
      console.error("Error creating chat", error);
    }
  };
  return (
    <>
      <SideBar
        selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange}
      />
      <div className="single-shop-position">
        {/* Category filter dropdown with checkboxes */}
        <MdEmail className="my-shop-messangerie" onClick={creatChat} />
        <div className="shop-category-dropdown">
          <button className="shop-categry-btn" onClick={toggleDropdown}>
            {t("homeProducts.selectCategories")} <span>&#9662;</span>
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
                <label htmlFor="clothing">{t("homeProducts.clothing")}</label>
              </div>
              <div className="shop-categry-checkbox">
                <input
                  type="checkbox"
                  id="accessory"
                  value="accessory"
                  checked={selectedCategories.includes("accessory")}
                  onChange={() => handleCategoryChange("accessory")}
                />
                <label htmlFor="accessory">{t("homeProducts.accessory")}</label>
              </div>
              <div className="shop-categry-checkbox">
                <input
                  type="checkbox"
                  id="shoes"
                  value="shoes"
                  checked={selectedCategories.includes("shoes")}
                  onChange={() => handleCategoryChange("shoes")}
                />
                <label htmlFor="shoes">{t("homeProducts.shoes")}</label>
              </div>
              <div className="shop-categry-checkbox">
                <input
                  type="checkbox"
                  id="home-decoration"
                  value="home decoration"
                  checked={selectedCategories.includes("home decoration")}
                  onChange={() => handleCategoryChange("home decoration")}
                />
                <label htmlFor="home-decoration">
                  {t("homeProducts.homeDecoration")}
                </label>
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
                    {t("homeProducts.category")} : {product.category}
                  </p>
                  <p className="my-prod-info-limit">
                    {t("homeProducts.quantity")} : {product.quantity}
                  </p>
                  {/* Render the like icon */}
                  <p className="shop-prod-likes my-prod-info-limit">
                    {likeIcon(product._id)}
                    {product.likes ? product.likes.length : 0}
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

export default SingleShop;
