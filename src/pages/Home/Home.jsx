import HomeProducts from "../../components/HomeProducts/HomeProducts";
import SideBar from "../../components/SideBar/SideBar";
// import Products from "../../components/Products/Products";

const Home = () => {
  return (
    <div>
      <SideBar></SideBar>
      <HomeProducts></HomeProducts>
      {/* <Products></Products> */}
    </div>
  );
};

export default Home;
