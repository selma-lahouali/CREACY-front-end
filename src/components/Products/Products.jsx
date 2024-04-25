import logo from "../../assets/logo.png";
import "./Products.css";
import { IoMdHeart } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
const Products = () => {
  return (
    <>
      <div className="products-display">
        {/* card 1 */}
        <div className="products">
          <img src={logo} alt="image not found" className="product-image" />
          <div className="product-info">
            <div className="prod-name-price">
              <h4>Name</h4>
              <h4>Price $</h4>
            </div>
            <p>Deivery Price/Free</p>
            <div className="prod-fav-like">
              <p className="product-reaction">
                <IoMdHeart />
                Favorit
              </p>
              <p className="product-reaction">
                <BiSolidLike />
                Like
              </p>
            </div>
            <h4 className="add-to-cart">
              <FaShoppingCart />
              Add To Cart
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
