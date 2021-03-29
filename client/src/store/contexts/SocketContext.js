import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

let frontEndUrl = "http://localhost:3000/";
let backEndUrl = "http://localhost:8000/";

const prodFrontEndUrl = "https://youtubegang.netlify.app/";
const prodBackendUrl = "https://youtubegang.herokuapp.com/";

if (process.env.MY_ENV === "production") {
  frontEndUrl = prodFrontEndUrl;
  backEndUrl = prodBackendUrl;
}

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
    const socket = io(backEndUrl);
    setState({ socket });
  }, [location.pathname]);

  return (
    <SocketContext.Provider value={{ state }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
