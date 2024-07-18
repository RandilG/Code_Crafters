import React from "react";
import "./chatListPoster.css";
import { Button, List, ListItemButton } from "@mui/material";
import MainChatPoster from "../mainChatPoster/MainChatPoster";

const ChatListPoster = ({
  handleChats,
  name,
  lastMessage,
  chats,
  posterName,
  userName,
}) => {
  return (
    <div
      className="containerChatList"
      onClick={() => handleChats(chats, posterName, userName)}
    >
      <div>
        <h3>{name}</h3>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatListPoster;
