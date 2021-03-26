import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../store/contexts/SocketContext";
import { generate as generateRandomUsername } from "canihazusername";
import { Flex, Box } from "@chakra-ui/react";
import SidePanel from "../components/SidePanel/SidePanel";
import VideoContainer from "../components/VideoContainer/VideoContainer";

const Room = ({ match }) => {
  const { state } = useContext(SocketContext);
  const { socket } = state;
  const [selfName, setSelfName] = useState("");

  useEffect(() => {
    if (!socket) return;
    else {
      if (socket.disconnected) socket.connect();
      const randomName = generateRandomUsername();
      const room = match.params.roomID;
      setSelfName(randomName);
      socket.emit("join", { name: randomName, room });

      return () => {
        socket.off();
        socket.close();
      };
    }
  }, [socket]);

  if (!socket) return <h1>LOADING...</h1>;

  return (
    <Flex h="100vh" w="100vw">
      <Box overflow="auto" w="75vw" bg="tomato">
        <VideoContainer />
      </Box>
      <Box w="25vw">
        <SidePanel name={selfName} setName={setSelfName} />
      </Box>
    </Flex>
  );
};

export default Room;
