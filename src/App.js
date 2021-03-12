import React, { useEffect } from "react";
import "./App.css";
import ChatRoom from "./ChatRoom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import Login from "./Login";
import { login, logout } from "./features/userSlice";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is ", authUser);
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      {user ? (
        <div className="app__header">
          <Navbar/>
          <div className="app__container">
           <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomid">
                <ChatRoom />
              </Route>
              <Route path="/">
                <ChatRoom />
              </Route>
            </Switch>
           </Router>
          </div>
         </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
