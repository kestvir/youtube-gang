import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const frontEndUrl = "http://localhost:3000/";
const backendUrl = "http://localhost:8000/";

// const frontEndUrl = "https://youtubegang.netlify.app/";
// const backendUrl = "https://youtubegang.herokuapp.com/";

export const SocketContext = createContext();

const initialState = {
  socket: null,
};

const SocketContextProvider = (props) => {
  const location = useLocation();
  const [state, setState] = useState(initialState);

  const homePage = frontEndUrl;

  useEffect(() => {
    if (homePage === window.location.href) {
      setState({ ...initialState });
      return;
    }
    const socket = io(backendUrl);
    setState({ socket });
  }, [location.pathname]);

  return (
    <SocketContext.Provider value={{ state }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
