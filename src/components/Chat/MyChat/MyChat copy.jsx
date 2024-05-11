import axios from "axios";
import { useEffect, useState } from "react";

const MyChat = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchChats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          "http://localhost:3000/api/chat",
          config
        );
        setChats(data);
        console.log("data", data);
      } catch (error) {
        // Handle error
        console.error("Error fetching chats:", error);
      }
    };

    setLoggedUser(JSON.parse(localStorage.getItem("user")));

    if (token) {
      fetchChats();
    }
  }, []);

  return (
    <>
      {/* You can use loggedUser and chats states here */}
      <div>
        <h2>Welcome, {loggedUser ? loggedUser.username : "Guest"}</h2>
        {/* Render your chats here */}
        {chats.map((chat) => (
          <div key={chat.id}>
            <p>{chat.message}</p>
            {/* Render other chat details */}
          </div>
        ))}
      </div>
    </>
  );
};

export default MyChat;
