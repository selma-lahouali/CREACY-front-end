import "./Profil.css";
import SideBar from "../../components/SideBar/SideBar";
import ShopProfil from "../../components/ShopProfil/ShopProfil";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Profil = () => {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <>
      <SideBar></SideBar>
      <div className="profil-box">
        <h1>{t("profil.WelcomeToYourProfile")} </h1>
        {user ? (
          <div className="profil">
            <div className="user-profil">
              <img
                src={user.image}
                alt="image not found"
                className="profil-image"
              />
              <div className="profil-user-info">
                <h3>{t("profil.UserName")} : {user.username}</h3>
                <h3>{t("profil.E.mail")} : {user.email}</h3>
                <h3> {t("profil.JoinedOn")} : {formatDate(user.createdAt)} </h3>
              </div>
            </div>
            <Link to="/settings">
              <button>{t("profil.EditProfil")}</button>
            </Link>
          </div>
        ) : (
          <p>{t("profil.UserNotFound")}</p>
        )}
      </div>
      <div className="shop-profil">
        <ShopProfil></ShopProfil>
      </div>
    </>
  );
};

export default Profil;
