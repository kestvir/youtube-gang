import React, { createContext, useReducer, useEffect } from "react";
import { watchQueueAndHistoryReducer } from "../reducers/watchQueueAndHistoryReducer";
import { resetQueueAndHistory } from "../actions/watchQueueAndHistoryActions";
import { prodFrontendUrl, devFrontendUrl } from "../../shared/constants";

export const WatchQueueAndHistoryContext = createContext();

const initialState = {
  queue: [],
  history: [],
};

const WatchQueueAndHistoryContextProvider = (props) => {
  const [state, dispatch] = useReducer(
    watchQueueAndHistoryReducer,
    initialState
  );

  let homePage = devFrontendUrl;

  if (process.env.REACT_APP_MY_ENV === "production") {
    homePage = prodFrontendUrl;
  }

  useEffect(() => {
    if (homePage === window.location.href) {
      dispatch(resetQueueAndHistory());
    }
  }, [window.location.href]);

  return (
    <WatchQueueAndHistoryContext.Provider value={{ state, dispatch }}>
      {props.children}
    </WatchQueueAndHistoryContext.Provider>
  );
};

export default WatchQueueAndHistoryContextProvider;
