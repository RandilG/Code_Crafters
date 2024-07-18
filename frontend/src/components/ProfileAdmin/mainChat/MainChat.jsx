import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mainChat.css";
import ChatList from "../chatList/ChatList";
import AdminChat from "../adminChat/AdminChat";
import SeekerChat from "../seekerChat/SeekerChat";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const MainChat = () => {
  const navigate = useNavigate();

  const [seekers, setSeekers] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [displayChats, setDisplayChats] = useState([]);
  const [seekerName, setSeekerName] = useState("");
  const [seekerUserName, setSeekerUserName] = useState("");
  const [message, setMessage] = useState("");

  const handleChats = (chats, seekerName, userName) => {
    setDisplayChats(chats);
    setSeekerName(seekerName);
    setSeekerUserName(userName);
  };

  useEffect(() => {
    fetchSeekers();
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const resp = await axios.get("http://localhost:8000/fetchSeekerChats");
      setAllChats(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSeekers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/fetchSeekers");
      setSeekers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (seekers.length !== 0) {
      for (const seeker of seekers) {
        socket.emit("joinSeekerChatroom", seeker);
      }
    }

    socket.on("seekerChatStarted", (data) => {
      const availableIdx = allChats.findIndex(
        (chat) => chat.userName === data.userName
      );
      if (availableIdx !== -1) {
        const newChats = [...allChats];
        newChats[availableIdx].message.push(data.message[0]);
        const updatedElement = newChats.splice(availableIdx, 1)[0];
        newChats.unshift(updatedElement);
        setAllChats(newChats);
      } else {
        setAllChats((prev) => [data, ...prev]);
      }
    });

    return () => {
      socket.off("seekerChatStarted");
    };
  }, [seekers, allChats]);

  const handleSendBtn = async () => {
    if (seekerUserName === "" || message === "") return;

    const request = {
      userName: seekerUserName,
      name: "Admin",
      role: "admin",
      message: message,
    };

    try {
      await axios.post("http://localhost:8000/sendMessageSeeker", request);
      setMessage("");

      const updatedChats = allChats.map((chat) =>
        chat.userName === seekerUserName
          ? { ...chat, message: [...chat.message, request] }
          : chat
      );

      setAllChats(updatedChats);
      setDisplayChats((prevChats) => [...prevChats, request]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendBtn();
    }
  };

  return (
    <div className="mainChatContainer">
      <div className="chatListContainer">
        <div className="listContainerTop">
          <h2 className="chatHeader">Chat With Us</h2>
        </div>
        <div className="listContainerBottom">
          {allChats.length !== 0 ? (
            allChats.map((chat, index) => (
              <ChatList
                key={index}
                handleChats={handleChats}
                name={chat.name}
                lastMessage={chat.message[chat.message.length - 1].message}
                seekerName={chat.name}
                chats={chat.message}
                userName={chat.userName}
              />
            ))
          ) : (
            <p>No messages to show</p>
          )}
        </div>
      </div>

      <div className="msgContainer">
        <div className="msgContainerTop">
          <div className="user">
            <img src="./img/avatar.png" alt="" />
            <div className="texts">
              <span className="poster-name">{seekerName}</span>
            </div>
          </div>
          <button className="back-button" onClick={() => navigate("/")}>
            Back to Home{" "}
          </button>
        </div>

        <div className="msgContainerCenter">
          {displayChats.map((chat, index) =>
            chat.role === "seeker" ? (
              <SeekerChat
                key={index}
                message={chat.message}
                timeStamp={chat.timeStamp}
              />
            ) : (
              <AdminChat
                key={index}
                message={chat.message}
                timeStamp={chat.timeStamp}
              />
            )
          )}
        </div>

        <div className="msgContainerBottom">
          <input
            type="text"
            placeholder="Type a message"
            className="msgInput"
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            value={message}
          />
          <button
            className="sendBtn"
            onClick={handleSendBtn}
            disabled={seekerUserName === "" || message === ""}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
