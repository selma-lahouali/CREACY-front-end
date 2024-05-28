import { Link } from "react-router-dom";
import "./ProfilBtn.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Profil = () => {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));

  const [profilOptions, setProfilOptions] = useState(true);
  const toggleProfilOptions = () => {
    setProfilOptions(!profilOptions);
  };
  return (
    <>
      <div className="profil-Btn-box">
        {user ? (
          <>
            <div className="profil-Btn" onClick={toggleProfilOptions}>
              <img
                src={user.image}
                alt="image not found"
                className="profil-Btn-image"
              />
              <h1>
                {profilOptions ? (
                  <h1>{user.username}</h1>
                ) : (
                  <ul>
                    <li className="username-name">{user.username}</li>
                    <Link to="/profil">
                    <li>{t("profileButton.account")}</li>
                    </Link>
                    <Link to="/contactUs">
                    <li>{t("profileButton.contactUs")}</li>
                    </Link>
                  </ul>
                )}
              </h1>
            </div>
          </>
        ) : (
          <p>{t("profileButton.noUserData")}</p>
        )}
      </div>
    </>
  );
};

export default Profil;
