import React from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import { Box } from "@chakra-ui/react";
import VideoSearch from "./VideoSearch/VideoSearch";

const VideoContainer = () => {
  return (
    <Box>
      <VideoPlayer />
      <VideoSearch />
    </Box>
  );
};

export default VideoContainer;
