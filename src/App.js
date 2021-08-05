import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { AuthContext } from "./helpers/AuthContext";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import Profile from "./components/Profile";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Switch>
            <Route path="/" exact>
              {!authState.status ? (
                <Login />
              ) : (
                <>
                  <Navbar />
                  <Home />
                </>
              )}
            </Route>
            <Route path="/accounts/emailsignup" exact>
              <Register />
            </Route>
            <Route path="/accounts/login" exact>
              <Login />
            </Route>
            {/* <Route path="/upload" exact>
              {!authState.status ? (
                <Login />
              ) : (
                <>
                  <Navbar />
                  <Upload />
                </>
              )}
            </Route> */}
            <Route path="/upload" exact>
              <Navbar />
              <Upload />
            </Route>
            <Route path="/:id">
              <Navbar />
              <Profile />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
