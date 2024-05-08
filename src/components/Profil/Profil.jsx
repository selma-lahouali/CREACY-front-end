import "./Profil.css";
import { useSelector } from "react-redux";

const Profil = () => {
  // Access user data from the Redux store
  const user = useSelector((state) => state.auth.user);
  // console.log("test",user);

  return (
    <div>
      {user? (
        <>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          {/* Add more user data fields as needed */}
        </>
      ) : (
        <p>User data not available</p>
      )}
    </div>
  );
};

export default Profil;
