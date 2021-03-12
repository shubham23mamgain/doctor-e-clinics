import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@material-ui/core";
import database from "./firebase";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setChatInfo } from "./features/appSlice";
function Chats({ addChat, id, name,image }) {
  const [messages, setmessages] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      database
        .collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const addnewChat = () => {
    const chatName = prompt("Enter A name");
    const imageUrl = prompt("Enter Image URL");

    if (chatName) {
      database.collection("rooms").add({
        name: chatName,
        image: imageUrl
      });
    }
  };

  return !addChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="chats" onClick={() =>
        dispatch(
          setChatInfo({
            chatId: id,
            chatName: name,
          })
        )}>
        <Avatar src={image} />
        <div className="chats__info">
          <h3>{name}</h3>
          <p>{messages[0] && messages[0].message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={addnewChat} className="chats">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default Chats;
