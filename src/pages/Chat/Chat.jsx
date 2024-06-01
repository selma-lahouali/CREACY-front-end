import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import axios from "axios";
import Conversation from "../../components/Conversation/Conversation";
import ChatBox from "../../components/ChatBox/ChatBox";
import "../../components/ChatBox/ChatStyle.css";
import SideBar from "../../components/SideBar/SideBar";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  //
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  // Retrieve user ID and token from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const API = import.meta.env.VITE_API;

  // get chats
  useEffect(() => {
    if (userId) {
      axios
        .get(`${API}/chat/${userId}`)
        .then((res) => {
          setChats(res.data);
        })
        .catch((error) => {
          console.error("Error fetching Chats:", error);
        });
    }
  }, [userId, API]);
  // Connect to Socket.io
  useEffect(() => {
    if (userId) {
      socket.current = io(API);
      socket.current.emit("new-user-add", user._id);
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [userId]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
    <SideBar></SideBar>
      <div className="Chat">
        {/* Left Side */}
        <div className="Left-side-chat">
          <div className="Chat-container">
            <h2>Chats</h2>

            <div className="Chat-list">
              {chats.map((chat, index) => (
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                  key={index}
                >
                  <Conversation
                    data={chat}
                    currentUser={userId}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="Right-side-chat">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}>
            <div className="navIcons"></div>
          </div>

          <ChatBox
            chat={currentChat}
            currentUser={userId}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
