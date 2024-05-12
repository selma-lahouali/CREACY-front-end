import { Link } from "react-router-dom";
import "./ProfilBtn.css";
import { useState } from "react";

const Profil = () => {
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
                    <Link to="/profil">
                      <li>{user.username}</li>
                    </Link>
                    <Link to="/contactUs">
                      <li>Contac Us</li>
                    </Link>
                  </ul>
                )}
              </h1>
            </div>
          </>
        ) : (
          <p>User data not available</p>
        )}
      </div>
    </>
  );
};

export default Profil;
