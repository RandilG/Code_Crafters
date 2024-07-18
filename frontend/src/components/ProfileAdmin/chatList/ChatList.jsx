import React from "react";
import "./chatList.css";
import { List, ListItemButton } from "@mui/material";

const ChatList = ({
  handleChats,
  name,
  lastMessage,
  chats,
  seekerName,
  userName,
}) => {
  return (
    <div
      className="containerChatList"
      onClick={() => handleChats(chats, seekerName, userName)}
    >
      <div>
        <h3>{name}</h3>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatList;
