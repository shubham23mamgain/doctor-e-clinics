import React ,{useState} from 'react';
import "./MessageType.css";
import {VideocamOutlined, CallOutlined} from "@material-ui/icons";
import {Button} from "@material-ui/core";
const MessageType = ({name ,icon}) => {
    const [text, setText] = useState("");
    const [showText,setShowText] = useState(false)
    const [showButton, setShowButton] = useState(true);
    const [showInsideButton, setShowInsideButton] = useState(false);
    const acceptCall=()=>{
        setShowInsideButton(true);
        setShowButton(false);
        setShowText(false);
    };

    const rejectCall=()=>{
        setShowText(true);
        setText("Missed By Dr");
        setShowInsideButton(false);
        setShowButton(false);
    };

    const endCall=()=>{
        setText("Ended in t minutes");
        setShowText(true);
        setShowInsideButton(false);
    };
    return (
        <div className="messageType">
            <div className="messageType__upper">
              <h5> {name} </h5>
              {icon === 'audio' ? (<CallOutlined/>) : (<VideocamOutlined/>) }
            </div>

           {showButton && (<div className="messageType__lower">
                <Button onClick={acceptCall}> Accept Call </Button>
                <Button onClick={rejectCall}> Reject Call</Button>
            </div> )} 
           {showInsideButton && (<div className="messageType__lower__inside">
                <Button onClick={endCall}> End Call</Button>
            </div> )}

           {showText && <Button disabled className="text__btn">{text} </Button> }
        </div>
    )
}

export default MessageType
