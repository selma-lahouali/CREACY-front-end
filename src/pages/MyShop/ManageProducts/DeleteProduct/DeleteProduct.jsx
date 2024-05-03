import axios from "axios";
import Swal from "sweetalert2";

const deleteProduct = async (_id, setError, navigate) => {
  try {
    // Show a confirmation dialog to ensure the user wants to delete the product
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    // If the user confirms the deletion
    if (confirmResult.isConfirmed) {
      // Proceed with deleting the product
      const response = await axios.delete(`http://localhost:3000/products/${_id}`);
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
    // Handle error here if deletion fails
  }
};

export default deleteProduct;
