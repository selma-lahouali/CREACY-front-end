import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./ShopEditing.css";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";

const ShopEditing = () => {
  // shop update states / shop update states / shop update states / shop update states
  const [shop, setShop] = useState({
    name: "",
    description: "",
    category: "",
    image: null,
  });
  const [shopId, setShopId] = useState("");
  const [setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // get user id and token from local storage
  const userData = JSON.parse(localStorage.getItem("user"));
  const ownerId = userData ? userData._id : null;

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;
  // API call to get user by id / API call to get user by id / API call to get user by id
  useEffect(() => {
    axios
      .get(`${API}/shop/owner/${ownerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setShop(res.data);
        const shopData = res.data;
        if (shopData._id) {
          setShopId(shopData._id);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load Shop.");
      });
  }, [ownerId, token, API,setError]);
  // update shop / update shop / update shop / update shop
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", shop.name);
    formData.append("description", shop.description);
    formData.append("category", shop.category);
    formData.append("image", shop.image);

    try {
      const response = await axios.put(
        `${API}/shop/${ownerId}/${shopId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("User's Shop updated successfully");
        setIsLoading(false);
        navigate("/home");
        // sweet alet success message / sweet alet success message / sweet alet success message
        Swal.fire({
          title: "Success!",
          text: "Your Shop Has Been Updated!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error updating user's shop:", error);
      setIsLoading(false);
      setError("Failed to update user's Shop.");
      // sweet alet faild message / sweet alet faild message / sweet alet faild message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  // handdle the changes in the inputs / handdle the changes in the inputs
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setShop({
        ...shop,
        name: e.target.value,
      });
    } else if (e.target.name === "description") {
      setShop({
        ...shop,
        description: e.target.value,
      });
    } else if (e.target.name === "category") {
      setShop({
        ...shop,
        category: e.target.value,
      });
    } else if (e.target.name === "image") {
      setShop({
        ...shop,
        image: e.target.files[0],
      });
    }
  };
  //   delete shop

  const deleteProd = async () => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmResult.isConfirmed) {
        const response = await axios.delete(
          `${API}/shop/${ownerId}/${shopId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data, "Shop deleted successfully");
          navigate("/myShop");
          Swal.fire({
            title: "Success!",
            text: "Your Shop Has Been Deleted!",
            icon: "success",
          });
        } else {
          setError("Failed to delete Shop.");
        }
      }
    } catch (error) {
      console.error("Error deleting Shop:", error);
      setError("Failed to delete Shop.");
    }
  };

  return (
    <>
      {isLoading && <Loader></Loader>}
      <div className="update-shop-position">
        <h1>Edit Your Shop :</h1>
        {shopId ? (
          <div className="update-shop-profile">
            <form onSubmit={handleSubmit} className="update-shop-profile-form">
              <label>Shop Name : </label>
              <input
                type="text"
                value={shop ? shop.name : ""}
                name="name"
                onChange={handleChange}
                className="update-shop-profile-input"
              />
              <label>Shop Description : </label>
              <input
                type="text"
                name="description"
                value={shop ? shop.description : ""}
                onChange={handleChange}
                className="update-shop-profile-input"
              />
              {/* shop Category / shop Category / shop Category / shop Category / shop Category / shop Category */}
              <label>Shop Category :</label>
              <select
                id="category"
                name="category"
                value={shop ? shop.category : ""}
                onChange={handleChange}
                className="update-shop-category"
              >
                <option value="cloth">clothing</option>
                <option value="accessory">accessory</option>
                <option value="shoes">shoes</option>
                <option value="home decoration">home decoration</option>
              </select>
              {/* shop image upload / shop image upload / shop image upload */}
              <div className="update-shop-profile-image">
                <label>New Shop Picture:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="update-shop-profile-btn">
                Update Shop
              </button>
            </form>
            <button className="delete-shop-btn" onClick={deleteProd}>
              Delete Shop
            </button>
          </div>
        ) : (
            <h3 className="updat-shop-noShop">
            Your Don&apos;t Have A Shop!
            <span className="updat-shop-creatShop-link">
              <Link to="/CreatShop">  Creat A Shop.</Link>
            </span>
          </h3>
        )}
      </div>
    </>
  );
};

export default ShopEditing;
