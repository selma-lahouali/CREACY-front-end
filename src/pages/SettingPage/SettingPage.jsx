import ProfilUpdate from "../../components/ProfilUpdate/ProfilUpdate";
import SideBar from "../../components/SideBar/SideBar";
import "./SettingPage.css";

const SettingPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <SideBar></SideBar>
      {/* <div className="settings">
        <h1>Settings</h1>
        <div className="settingProfil">
          <h1>Profil Settings : </h1>
          {user ? (
            <>
              <h3>User Name : {user.username}</h3>
              <h3>Email: {user.email}</h3>
            </>
          ) : (
            <p>User data not available</p>
          )}
        </div>
        <div className="settingShop">
          <h1>Shop Settings : </h1>
        </div>
      </div> */}
      <ProfilUpdate></ProfilUpdate>
    </>
  );
};

export default SettingPage;
