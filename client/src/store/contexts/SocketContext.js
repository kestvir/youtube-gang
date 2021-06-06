import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import {
  prodFrontendUrl,
  prodBackendUrl,
  devFrontendUrl,
} from "../../shared/constants";

let frontEndUrl = devFrontendUrl;
let backEndUrl = prodBackendUrl;

if (process.env.REACT_APP_MY_ENV === "production") {
  frontEndUrl = prodFrontendUrl;
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
    console.log(socket);
  }, [location.pathname]);

  return (
    <SocketContext.Provider value={{ state }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
