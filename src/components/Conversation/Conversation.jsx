import axios from "axios";
import { useEffect, useState } from "react";
import "../ChatBox/ChatStyle.css"
const Conversation = ({ data, currentUser,online }) => {
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);

    const getUserData = async () => {
      axios
        .get(`${API}/chat/${userId}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    };
    getUserData();
  }, []);
  
  // get sender's info (username + profil pic)
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUserInfo = async () => {
      axios
        .get(`${API}/auth/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserInfo(res.data);
          
        })
        .catch((error) => {
          console.error("Error fetching user' info'", error);
        });
    };

    getUserInfo();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
        {online && <div className="online-dot"></div>}
          <img
            src={userInfo?.image}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />

          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>{userInfo?.username}</span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
