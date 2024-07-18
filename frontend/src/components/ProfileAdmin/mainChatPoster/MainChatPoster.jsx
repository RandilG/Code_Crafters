// src/components/MainChatPoster.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mainChatPoster.css";
import PosterChat from "../posterChat/PosterChat";
import AdminChatPoster from "../adminChatPoster/AdminChatPoster";
import ChatListPoster from "../chatListPoster/ChatListPoster";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Input, Button, message as AntMessage } from "antd";

const socket = io("http://localhost:8000");

const MainChatPoster = () => {
  const navigate = useNavigate();

  const [posters, setPosters] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [displayChats, setDisplayChats] = useState([]);
  const [posterName, setPosterName] = useState("");
  const [posterUserName, setPosterUserName] = useState("");
  const [message, setMessage] = useState("");

  const handleChats = (chats, posterName, userName) => {
    setDisplayChats(chats);
    setPosterName(posterName);
    setPosterUserName(userName);
  };

  useEffect(() => {
    fetchPosters();
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const resp = await axios.get("http://localhost:8000/fetchPosterChats");
      setAllChats(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosters = async () => {
    try {
      const response = await axios.get("http://localhost:8000/fetchPosters");
      setPosters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (posters.length !== 0) {
      for (const poster of posters) {
        socket.emit("joinPosterChatroom", poster);
      }
    }

    socket.on("posterChatStarted", (data) => {
      const availableIdx = allChats.findIndex(
        (chat) => chat.userName === data.userName
      );
      if (availableIdx !== -1) {
        setAllChats((prev) => {
          const newChats = [...prev];
          newChats[availableIdx].message.push(data.message[0]);
          const updatedElement = newChats.splice(availableIdx, 1)[0];
          newChats.unshift(updatedElement);
          return newChats;
        });
      } else {
        setAllChats((prev) => [data, ...prev]);
      }
    });

    socket.on("newMessagePoster", (data) => {
      setAllChats((prev) => {
        const newChats = [...prev];
        const chatIndex = newChats.findIndex(
          (chat) => chat.userName === data.userName
        );
        if (chatIndex !== -1) {
          newChats[chatIndex].message.push(data.message);
          const updatedElement = newChats.splice(chatIndex, 1)[0];
          newChats.unshift(updatedElement);
        }
        return newChats;
      });

      if (data.userName === posterUserName) {
        setDisplayChats((prev) => [...prev, data.message]);
      }
    });

    return () => {
      socket.off("posterChatStarted");
      socket.off("newMessagePoster");
    };
  }, [posters, posterUserName]);

  const handleSendBtn = async () => {
    try {
      const newMessage = {
        userName: posterUserName,
        name: "Admin",
        role: "admin",
        message: message,
      };

      setMessage("");

      // Update local state immediately
      setDisplayChats((prev) => [...prev, newMessage]);
      setAllChats((prev) => {
        const newChats = [...prev];
        const chatIndex = newChats.findIndex(
          (chat) => chat.userName === posterUserName
        );
        if (chatIndex !== -1) {
          newChats[chatIndex].message.push(newMessage);
          const updatedElement = newChats.splice(chatIndex, 1)[0];
          newChats.unshift(updatedElement);
        }
        return newChats;
      });

      // Send message to server
      await axios.post("http://localhost:8000/sendMessagePoster", newMessage);

      // Emit socket event
      socket.emit("sendMessagePoster", newMessage);
    } catch (error) {
      console.log(error);
      AntMessage.error("Failed to send message");
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
          <ChatListPoster
            key={index}
            handleChats={handleChats}
            name={chat.name}
            lastMessage={chat.message[chat.message.length - 1].message}
            posterName={chat.name}
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
          <span className="poster-name">{posterName}</span>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>

    <div className="msgContainerCenter">
      {displayChats.map((chat, index) =>
        chat.role === "poster" ? (
          <PosterChat
            key={index}
            message={chat.message}
            timeStamp={chat.timeStamp}
          />
        ) : (
          <AdminChatPoster
            key={index}
            message={chat.message}
            timeStamp={chat.timeStamp}
          />
        )
      )}
    </div>

    <div className="msgContainerBottom">
      <Input
        type="text"
        placeholder="Type a message"
        className="msgInput"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onPressEnter={handleSendBtn}
      />
      <Button
        type="primary"
        onClick={handleSendBtn}
        disabled={posterUserName === "" || message === ""}
      >
        Send
      </Button>
    </div>
  </div>
</div>
  );
};

export default MainChatPoster;
