import Products from "../../components/Products/Products";
import Profil from "../../components/Profil/Profil";
import SideBar from "../../components/SideBar/SideBar";

const Home = () => {
  return (
    <div>
      <SideBar></SideBar>
      <Products></Products>
      <Profil></Profil>
    </div>
  );
};

export default Home;
