import ProfilUpdate from "../../components/ProfilUpdate/ProfilUpdate";
import ShopEditing from "../../components/ShopEditing/ShopEditing";
import SideBar from "../../components/SideBar/SideBar";
import "./SettingPage.css";

const SettingPage = () => {
  return (
    <>
      <SideBar></SideBar>
      <ProfilUpdate></ProfilUpdate>
      <ShopEditing></ShopEditing>
    </>
  );
};

export default SettingPage;
