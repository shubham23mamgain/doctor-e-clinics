import db from "./firebase";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { Avatar } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Chats from "./Chats";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Sidebar.css";
function Sidebar() {
  const user = useSelector(selectUser);
  console.log(user);

  const [rooms, setrooms] = useState([]);

  useEffect(() => {
    const unsubsctibe = db.collection("rooms").onSnapshot((snapshot) =>
      setrooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubsctibe();
    };
  }, []);
 
  return (
    <div className="sidebar">
      <div className="sidebar__header">
       <Avatar onClick={() => auth.signOut()} src={user.photo} />
        <div className="sidebar__headerright">
          <DonutLargeIcon />
          <ChatIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div className="siebar__search">
        <div className="sidebar__searchcontainer">
          <SearchIcon />
          <input placeholder="chats" type="text" />
        </div>
      </div>

      <div className="sidebar__chhatsGroups">
        <Chats addChat />
        {rooms.map((room) => (
          <Chats key={room.id} id={room.id} name={room.data.name} image={room.data.image}/>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
