import axios from "axios";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { shopCreation } from "../../../redux/slices/CreatShopSlice";

const CreatShop = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("clothing");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Create An Account For Free",
        text: "Sorry, you need to create an account",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else {
          navigate("/home");
        }
      });
    }
  }, [isAuthenticated, navigate]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/shop/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data, "Shop created successfully");
        dispatch(shopCreation(response?.data));
        setName("");
        setDescription("");
        setCategory("");
        setSelectedFile(null);

        Swal.fire({
          title: "CONGRATULATIONS!",
          text: "Your Shop Has Been Created!",
          icon: "success",
        });
        navigate("/myShop");
      } else {
        setError("Failed to create shop.");
      }
    } catch (error) {
      console.error("Error creating shop:", error);
      setError("Failed to create shop.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <>
      <MyShopSideBar />
      <form onSubmit={handleSubmit} className="add-new-product">
        <label>Shop Name :</label>
        <input
          type="text"
          placeholder="Enter Your Shop Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="add-product-input"
        />
        <label>Shop Description :</label>
        <input
          type="text"
          placeholder="Enter Your Shop Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="add-product-input"
        />
        <label>Shop Category :</label>
        <select
          id="category"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="cloth">clothing</option>
          <option value="accessory">accessory</option>
          <option value="shoes">shoes</option>
          <option value="home decoration">home decoration</option>
        </select>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <div className="my-product-btn">
          <Link to="/myShop">
            <button type="submit" className="cancel-add-product-btn">
              Back
            </button>
          </Link>
          <button type="submit" className="add-product-btn">
            Create My Shop
          </button>
        </div>
      </form>
      <div className="error">{error}</div>
    </>
  );
};

export default CreatShop;
