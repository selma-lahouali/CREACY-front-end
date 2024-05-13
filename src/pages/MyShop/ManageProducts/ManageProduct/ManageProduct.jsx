import { useEffect, useState } from "react";
import MyShopSideBar from "../../../../components/MyShopSideBar/MyShopSideBar";
import "./ManageProduct.css";
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const ownerId = user ? user._id : null;
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;
  useEffect(() => {
    axios
      .get(`${API}/products/owner/${ownerId}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      });
  }, [ownerId, page, token, API]);

  return (
    <>
      <MyShopSideBar></MyShopSideBar>
      <div className="manag-prod-position">
        <ul className="manag-prod-display">
          {products.map((product, index) => (
            <div key={index}>
              <li className="manag-products">
                <img
                  src={product.image}
                  alt="image not found"
                  className="manag-prod-image"
                />
                <div className="manag-prod-info">
                  <div className="manag-prod-name-price">
                    <h4 className="manag-prod-name-limit">{product.name}</h4>
                    <h4 className="manag-prod-price-limit">
                      {product.price} $
                    </h4>
                  </div>
                  <p className="manag-prod-info-limit">
                    Category : {product.category}
                  </p>
                  <p className="manag-prod-info-limit">
                    {" "}
                    Quantity {product.quantity}
                  </p>
                  <p className="manag-prod-likes , manag-prod-info-limit">
                    <BiSolidLike className="manag-prod-icon" /> {product.likes}
                  </p>
                  {/* Link to ManageProducts page with product ID as parameter */}
                  <Link
                    to={`/updateProduct/${product._id}`}
                    className="manag-prod-link"
                  >
                    {/* update product link / update product link / update product link  */}
                    <h4 className="modify-Product">
                      <RiEdit2Fill className="manag-prod-icon" /> Modify Product
                    </h4>
                  </Link>

                  {/* show product detail / show product detail */}
                  <Link to={`/myShop/${product._id}`}>
                    <button>Details</button>
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
          className="manage-prod-pagination"
        />
      </div>
    </>
  );
};

export default ManageProduct;
