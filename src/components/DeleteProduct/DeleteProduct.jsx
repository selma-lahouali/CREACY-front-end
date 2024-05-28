import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const DeleteProduct = ({ _id }) => {
  const { t } = useTranslation();
    const [setError] = useState("");
  const API = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const deleteProd = async () => {
    const token = localStorage.getItem("token");
    try {
      // Show a confirmation dialog to ensure the user wants to delete the product
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      // If the user confirms the deletion
      if (confirmResult.isConfirmed) {
        // Proceed with deleting the product
        const response = await axios.delete(`${API}/products/${_id}`, {
          // Use _id from props
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          console.log(response.data, "product deleted successfully");
          navigate("/myShop");
          Swal.fire({
            title: "Success!",
            text: "Your Product Has Been Deleted!",
            icon: "success",
          });
        } else {
          setError("Failed to delete product.");
        }
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product.");
    }
  };
  return (
    <>
      <button className="delete-product-btn" onClick={deleteProd}>
      {t("deleteProduct")}
      </button>
    </>
  );
};

export default DeleteProduct;
