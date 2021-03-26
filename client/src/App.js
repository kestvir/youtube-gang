import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import Home from "./routes/Home";
import Room from "./routes/Room";
import SocketContextProvider from "./store/contexts/SocketContext";
import WatchQueueAndHistorytContextProvider from "./store/contexts/WatchQueueAndHistorytContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SocketContextProvider>
          <WatchQueueAndHistorytContextProvider>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/room/:roomID" component={Room} />
            </Switch>
          </WatchQueueAndHistorytContextProvider>
        </SocketContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
