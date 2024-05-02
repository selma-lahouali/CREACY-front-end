import { useEffect, useState } from "react";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import "./MyShop.css";
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { Pagination } from "@mui/material";

const MyShop = () => {
  const [products, setProducts] = useState([]);
  // pagination / pagination / pagination / pagination / pagination / pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // get all products / get all products / get all products / get all products / get all products
  useEffect(() => {
    axios.get(`http://localhost:3000/products?page=${page}`).then((res) => {
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    });
  }, [page]);

  return (
    <>
      <MyShopSideBar></MyShopSideBar>
      <div className="my-products-position">
        <ul className="my-products-display">
          {products.map((product, index) => (
            <div key={index}>
              <li className="my-products">
                {/* Display image */}
                <img
                  src={product.image}
                  alt="image not found"
                  className="my-product-image"
                />
                <div className="my-product-info">
                  <div className="my-prod-name-price">
                    <h4>{product.name}</h4>
                    <pattern>{product.price} $</pattern>
                  </div>
                  <p>Category : {product.category}</p>
                  <p> Quantity {product.quantity}</p>
                  <p className="my-product-likes">
                    <BiSolidLike className="my-product-icon" /> {product.likes}
                  </p>
                  <h4 className="modify-Product">
                    <RiEdit2Fill className="my-product-icon" /> Modify Product
                  </h4>
                </div>
              </li>
            </div>
          ))}
        </ul>
        <Pagination
          page={page}
          count={totalPages}
          onChange={handlePageChange}
          className="pagination"
        />
      </div>
    </>
  );
};

export default MyShop;
