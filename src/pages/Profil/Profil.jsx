import "./Profil.css";
import SideBar from "../../components/SideBar/SideBar";
import { Link } from "react-router-dom";
const Profil = () => {
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
        <h1>Welcome To Your Profile </h1>
        {user ? (
          <div className="profil">
            <div className="user-profil">
              <img
                src={user.image}
                alt="image not found"
                className="profil-image"
              />
              <div className="profil-user-info">
                <h3>User Name : {user.username}</h3>
                <h3>E.mail : {user.email}</h3>
                <h3> Joined On: {formatDate(user.createdAt)} </h3>
              </div>
            </div>
            <Link to="/settings">
              <button>Edit Profil</button>
            </Link>
          </div>
        ) : (
          <p>User not found</p>
        )}
      </div>
    </>
  );
};

export default Profil;
