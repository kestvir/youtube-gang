import React, { createContext, useReducer, useEffect } from "react";
import { watchQueueAndHistoryReducer } from "../reducers/watchQueueAndHistoryReducer";
import { resetQueueAndHistory } from "../actions/watchQueueAndHistoryActions";

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
  const homePage = "http://localhost:3000/";

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
