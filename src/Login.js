import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import logo from "./images/logo.png";
function Login() {
  const signin = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
    <div className="login__body">
      <img
        alt="Doctor e-clinics logo"
        src={logo}
      />
      

      <Button onClick={signin}>SignIn with Google</Button>
     
    </div>
  </div>
  );
}

export default Login;
