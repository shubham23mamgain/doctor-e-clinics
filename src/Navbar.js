import React from 'react';
import "./Navbar.css";
import logo from "./images/logo.png";
import steth from "./images/steth.png";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
const Navbar = () => {
    return (
        <div className="navbar">
           <div className="navbar__left">
             <img src={logo} alt="logo"/>
             <h2>Doctor e-clinics</h2>
           </div>

           <div className="navbar__right">
               <div className="navbar__links">
                <img src={steth} alt="doctor"/>
                <h6>Find a Doctor</h6>
               </div>
               <div className="navbar__links">
                 <AccessTimeIcon/>
                 <h6>Appointments</h6>
               </div>
               <div className="navbar__links">
                   <WhatsAppIcon/>
                 <h6>Chat with Doctor</h6>
               </div>
             
           </div>
        </div>
    )
}

export default Navbar
