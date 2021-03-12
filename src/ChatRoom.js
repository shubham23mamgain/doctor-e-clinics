import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./ChatRoom.css";
import MessageType from "./MessageType"; 
import AttachmentIcon from "@material-ui/icons/Attachment";
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import SendIcon from "@material-ui/icons/Send";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CallIcon from '@material-ui/icons/CallOutlined';
import VideocamIcon from '@material-ui/icons/VideocamOutlined'; 
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import database from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function ChatRoom() {
  const user = useSelector(selectUser);
  const [input, setinput] = useState("");
  const { roomid } = useParams();
  const [roomname, setroomname] = useState("");
  const [message, setmessages] = useState([]);
  const [showAttachments, setShowAttachments]= useState(true);

  const toggleAttachments = (e)=> {
    e.preventDefault();
    setShowAttachments(!showAttachments);
  }
  useEffect(() => {
    if (roomid) {
      database
        .collection("rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => {
            setroomname( snapshot.data().name)
        })
;
      database
        .collection("rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomid]);

  const SendMessage = (event) => {
    event.preventDefault();

    database.collection("rooms").doc(roomid).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
  };

  const SendAudioCall = (event) => {
    event.preventDefault();

    database.collection("rooms").doc(roomid).collection("messages").add({
      type:" Audio call invite",
      message: "Audio call invite",
      icon: "audio",
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
  };

  const SendVideoCall = (event) => {
    event.preventDefault();

    database.collection("rooms").doc(roomid).collection("messages").add({
      type: "Video call invite",
      message: "Video call invite",
      icon:"video",
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
  };

  return (
    <div className="chatroom">
      <div className="chatroom__header">
        <div className="chatroom__headerinfoleft">
          <h3>{roomname}</h3>
          <p>
            last seen{" "}
            {new Date(
              message[message.length - 1] && message[message.length - 1].timestamp && message[message.length - 1].timestamp.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chatroom__header__inforight">
          <VideocamIcon onClick={SendVideoCall} />
          <CallIcon onClick={SendAudioCall} /> 
        </div>
      </div>
      <div className="chatroom__body">
        {message.map((message) => (
          <p
            className={`chatroom__message ${
              message.name === user.displayName && `chatroom__messagerecierver`
            }`}
          >
            <span className="chatroom__username">{message.name}</span>
            {message.type && <MessageType name={message.type} icon={message.icon}/>}
            {message.message}
            <span className="chatroom__messagetimestamp ">
              {new Date(message.timestamp && message.timestamp.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chatroom__bottom">
       {showAttachments && <div className="chatroom__attachments">
         <div className="chatroom__attachments_1">
          <button type="submit">
            <CameraAltIcon />
           </button>
          <h6>Camera</h6>
         </div>
         
         <div className="chatroom__attachments_1">
          <button  type="submit">
            <FolderIcon />
          </button>
          <h6>Folder</h6>
         </div>

         <div className="chatroom__attachments_1">
          <button  type="submit">
            <InsertDriveFileIcon />
          </button>
          <h6>Lab Report</h6>
         </div>

         <div className="chatroom__attachments_1">
          <button  type="submit">
            <LocalParkingIcon />     
          </button>
          <h6>Prescription</h6>
         </div>
         
       </div> }
       <div className="chatroom__footer">
        <SentimentVerySatisfiedIcon />
        <form>
          <input
            value={input}
            onChange={(event) => setinput(event.target.value)}
            placeholder="Type your message here"
          />
          <button onClick={toggleAttachments} type="submit">
            <AttachmentIcon />
          </button>

          <button onClick={SendMessage} type="submit">
            <SendIcon />
          </button>
        </form>
        <MicIcon />
       </div>
      </div>
    </div>
  );
}

export default ChatRoom;
