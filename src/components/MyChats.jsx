import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    const token = localStorage.getItem("token");

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <div>
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
        <ChatLoading />
      )}
    </div>
  );
};

export default MyChats;
