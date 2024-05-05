import axios from "axios";
import MyShopSideBar from "../../../../components/MyShopSideBar/MyShopSideBar";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./UpdateProduct.css";
import deleteProduct from "../../../../components/DeleteProduct/DeleteProduct";

const UpdateProduct = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    image: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${_id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product.");
      });
  }, [_id]);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("quantity", product.quantity);
    formData.append("image", product.image);

    try {
      const response = await axios.put(
        `http://localhost:3000/products/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data, "product updated successfully"),
          navigate("/myShop");
        Swal.fire({
          title: "Success!",
          text: "Your Product Has Been Updated!",
          icon: "success",
        });
      } else {
        setError("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product.");
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
  const handleDelete = async () => {
    try {
      await deleteProduct(_id, setError, navigate);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product.");
    }
  };

  return (
    <>
      <MyShopSideBar />
      <form onSubmit={handleSubmit} className="update-product">
        <label>Product Name :</label>
        <input
          type="text"
          placeholder="Enter Your Product Name"
          required
          name="name"
          value={product.name}
          onChange={handleChange}
          className="add-product-input"
        />
        <label>Product Description :</label>
        <input
          type="text"
          placeholder="Enter Your Product Description"
          required
          name="description"
          value={product.description}
          onChange={handleChange}
          className="update-product-input"
        />
        <label>Product Price :</label>
        <input
          type="number"
          placeholder="Enter The Price"
          required
          name="price"
          value={product.price}
          onChange={handleChange}
          className="update-product-input"
        />
        <label>Product Category :</label>
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
        <label>Product Quantity :</label>
        <input
          type="number"
          placeholder="Enter The Quantity"
          required
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          className="update-product-input"
        />
        <label>Product Image :</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          name="image"
          className="update-product-input"
        />
        <div className="my-product-btn">
          <Link to="/myShop">
            <button type="button" className="back-update-product-btn">
              Back
            </button>
          </Link>
          <button type="submit" className="update-product-btn">
            Update Product
          </button>
        </div>
      </form>
      <div className="error">{error}</div>
      <div className="delet-product">
        <h3>Delete Your Product :</h3>
        <p>
          <span>Caution:</span> Once you delete this product, it will be
          permanently removed from our inventory. This action cannot be
          reversed. Please ensure that you intend to delete this product before
          proceeding.
        </p>
        <button className="delete-product-btn" onClick={handleDelete}>
          Delete Product
        </button>
      </div>
    </>
  );
};

export default UpdateProduct;
