import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

export const SocketContext = createContext();

const initialState = {
  socket: null,
};

const SocketContextProvider = (props) => {
  const location = useLocation();
  const [state, setState] = useState(initialState);

  const homePage = "http://localhost:3000/";

  useEffect(() => {
    if (homePage === window.location.href) {
      setState({ ...initialState });
      return;
    }
    const socket = io("http://localhost:8000/");
    setState({ socket });
  }, [location.pathname]);

  return (
    <SocketContext.Provider value={{ state }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
