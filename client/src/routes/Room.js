import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../store/contexts/SocketContext";
import { generate as generateRandomUsername } from "canihazusername";
import { Box, Flex, Progress } from "@chakra-ui/react";
import SidePanel from "../components/SidePanel/SidePanel";
import VideoContainer from "../components/VideoContainer/VideoContainer";

const Room = ({ match }) => {
  const { state } = useContext(SocketContext);
  const { socket } = state;
  const [selfName, setSelfName] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!socket) return;
    else {
      setIsLoading(true);
      if (socket.disconnected) socket.connect();
      const randomName = generateRandomUsername();
      const room = match.params.roomID;
      setSelfName(randomName);
      socket.emit("join", { name: randomName, room }, () => {
        if (room) setIsLoading(false);
      });

      return () => {
        socket.off();
        socket.close();
      };
    }
  }, [socket]);

  if (!socket || isLoading)
    return (
      <Box w="100%" h="100vh" bg="almostBlack">
        <Progress colorScheme="brand" isIndeterminate />;
      </Box>
    );

  return (
    <Flex id="main-container" h="100vh" w="100vw">
      <Box id="video-container-box" overflowY="auto" w="75vw" bg="almostBlack">
        <VideoContainer />
      </Box>
      <Box id="side-panel-box" w="25vw">
        <SidePanel name={selfName} setName={setSelfName} />
      </Box>
    </Flex>
  );
};

export default Room;
