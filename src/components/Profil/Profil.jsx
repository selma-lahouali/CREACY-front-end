import "./Profil.css";

const Profil = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="test">
        {user ? (
          <>
            <h3>User Name : {user.username}</h3>
            <h3>Email: {user.email}</h3>
          
          </>
        ) : (
          <p>User data not available</p>
        )}
      </div>
    </>
  );
};

export default Profil;
