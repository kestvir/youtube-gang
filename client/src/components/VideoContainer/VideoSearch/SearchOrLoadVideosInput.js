import React, { useState, useContext } from "react";
import { InputGroup, InputRightElement, Input, Button } from "@chakra-ui/react";
import { SocketContext } from "../../../store/contexts/SocketContext";
import { getVideosInfoURL } from "../../shared/constants";

const validYoutubeLink = /^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*$/;

const SearchOrLoadVideosInput = ({ setFoundVideos }) => {
  const { state } = useContext(SocketContext);
  const { socket } = state;
  const [videoSearchInputOrURL, setVideoSearchInputOrURL] = useState("");

  const searchVideos = async (searchInput) => {
    if (!searchInput) return;
    try {
      const res = await fetch(getVideosInfoURL(searchInput));
      if (!res.ok) {
        throw new Error(res.error);
      }
      const data = await res.json();
      setFoundVideos([...data.items]);
    } catch (err) {
      console.error(err);
    }
  };

  const loadOrSearchVideo = (input) => {
    if (validYoutubeLink.test(input)) {
      socket.emit("loadVideo", input);
    } else {
      searchVideos(input);
    }
    setVideoSearchInputOrURL("");
  };

  return (
    <InputGroup mt={4} size="md">
      <Input
        id="searchOrSubmitInput"
        value={videoSearchInputOrURL}
        onKeyPress={(e) =>
          e.key === "Enter" && loadOrSearchVideo(e.target.value)
        }
        onChange={(e) => setVideoSearchInputOrURL(e.target.value)}
        pr="4.5rem"
        type="text"
        placeholder="Load video"
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={() => loadOrSearchVideo(videoSearchInputOrURL)}
        >
          Submit
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchOrLoadVideosInput;
