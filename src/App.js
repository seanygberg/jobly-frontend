import React, { useState, useEffect } from 'react';
import NavBar from "./navBar/NavBar.js"
import { BrowserRouter } from "react-router-dom";
import UserContext from './UserContext';
import NavRoutes from './routes/NavRoutes.js';
import useLocalStorage from "./hooks/useLocalStorage";
import { decode } from 'jsonwebtoken';
const crypto = require('crypto-browserify');
import JoblyApi from "./api"
import './App.css';

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = decode(token);
          const user = await JoblyApi.getUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Error loading user info:", err);
        }
      }
    }
    getCurrentUser();
  }, [token]);

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  }

  const signup = async (data) => {
    if (!data) {
      console.error("Signup data is undefined");
      return;
    }
    try {
      const token = await JoblyApi.signup(data);
      console.log("User is signed up")
      setToken(token);
    } catch (err) {
      console.error("Signup failed:", err);
    }
  }

  const login = async (data) => {
    if (!data) {
      console.error("Login data is undefined");
      return;
    }
    try {
      const token = await JoblyApi.login(data);
      console.log("User is logged in")
      setToken(token);
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <NavBar logout={logout}></NavBar>
          <NavRoutes signup={signup} login={login}></NavRoutes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
