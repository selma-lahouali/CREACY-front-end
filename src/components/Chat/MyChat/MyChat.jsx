import axios from "axios";
import { useEffect, useState } from "react";
// import { getSender } from "../../../config/ChatLogics";
const MyChat = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {};

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // Assuming your response data contains chats
        setChats(res.data);
       console.log("res.data",res.data);
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  }, [token]);

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
    fetchChats();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* You can use loggedUser and chats states here */}
      <div>
        <h2>Welcome, {loggedUser ? loggedUser.username : "Guest"}</h2>
        {/* Render your chats here */}
        {chats.map((chat, _id) => (
          <div key={_id}>
            <p>{chat.users.username}</p>
         
        
            {/* Render other chat details */}
          </div>
        ))}
      </div>
      {/* fnzjfnzofzifhzrifhzfihzrifhzrifzifzifzfzizifzri */}
      {/* <div>
      {chats ? (
        <div style={{ overflowY: "scroll" }}>
          {chats.map((chat) => (
            <div key={chat._id}>
              <div>
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName}
              </div>
              {chat.latestMessage && (
                <div>
                  <b>{chat.latestMessage.sender.name} : </b>
                  {chat.latestMessage.content.length > 50
                    ? chat.latestMessage.content.substring(0, 51) + "..."
                    : chat.latestMessage.content}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
      <p>lalalala</p>
      )}
    </div> */}
    </>
  );
};

export default MyChat;
