import axios from "axios";
import MyShopSideBar from "../../../../components/MyShopSideBar/MyShopSideBar";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./UpdateProduct.css";
import Loader from "../../../../components/Loader/Loader";
import DeleteProduct from "../../../../components/DeleteProduct/DeleteProduct";
import { useTranslation } from "react-i18next";
const UpdateProduct = () => {
  const { t } = useTranslation();
  const { _id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    image: null,
  });
  const [error, setError] = useState("");
  // loading state / loading state / loading state  / loading state  / loading state
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;
  useEffect(() => {
    axios
      .get(`${API}/products/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product.");
      });
  }, [_id, token, API]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("quantity", product.quantity);
    formData.append("image", product.image);

    try {
      const response = await axios.put(`${API}/products/${_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("product updated successfully");
        setIsLoading(false);
        navigate("/myShop");
        Swal.fire({
          title: "Success!",
          text: "Your Product Has Been Updated!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product.");
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({
        ...product,
        image: e.target.files[0],
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  //  delete Product / delete Product / delete Product / delete Product / delete Product / delete Product

  return (
    <>
      <MyShopSideBar />
      {isLoading && <Loader></Loader>}
      <div className="update-product-position">
      <form onSubmit={handleSubmit} className="update-product">
        <label>{t("AddNewProd.productName")}:</label>
        <input
          type="text"
          placeholder={t("AddNewProd.productNamePlaceholder")}
          required
          name="name"
          value={product.name}
          onChange={handleChange}
          className="add-product-input"
        />

        <label>{t("AddNewProd.productPrice")} :</label>
        <input
          type="number"
          placeholder={t("AddNewProd.productPricePlaceholder")}
          required
          name="price"
          value={product.price}
          onChange={handleChange}
          className="update-product-input"
        />
        <label>{t("AddNewProd.productCategory")} :</label>
        <select
          id="category"
          name="category"
          value={product.category}
          required
          onChange={handleChange}
        >
          <option value="cloth">clothing</option>
          <option value="accessory">accessory</option>
          <option value="shoes">shoes</option>
          <option value="home decoration">home decoration</option>
        </select>
        <label>{t("AddNewProd.productQuantity")} :</label>
        <input
          type="number"
          placeholder={t("AddNewProd.productQuantityPlaceholder")}
          required
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          className="update-product-input"
        />
        <label>{t("AddNewProd.productImage")} :</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          name="image"
          className="update-product-image"
        />
        <div className="my-product-btn">
          <Link to="/myShop">
            <button type="button" className="back-update-product-btn">
            {t("AddNewProd.cancelButton")}
            </button>
          </Link>
          <button type="submit" className="update-product-btn">
          {t("updateProduct.UpdateProduct")}
          </button>
        </div>
      </form>
      </div>
      <div className="error">{error}</div>
      <div className="delet-product">
        <h3>{t("updateProduct.DeleteYourProduct")} :</h3>
        <p>
          <span>{t("updateProduct.Caution")} :</span> {t("updateProduct.warningMessage")}
        </p>
        <DeleteProduct _id={_id}></DeleteProduct>
      </div>
    </>
  );
};

export default UpdateProduct;
