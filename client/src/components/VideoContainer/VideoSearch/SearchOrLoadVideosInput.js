import React, { useState, useContext } from "react";
import { InputGroup, InputRightElement, Input, Button } from "@chakra-ui/react";
import { SocketContext } from "../../../store/contexts/SocketContext";
import { getVideosInfoURL } from "../../shared/constants";

const validYoutubeLink = /^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*$/;

const SearchOrLoadVideosInput = ({ setFoundVideos }) => {
  const { state } = useContext(SocketContext);
  const { socket } = state;

  //   const [loadingSearch, setLoading] = useState(false);
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
        placeholder="Load or search for a video"
        _placeholder={{ color: "lighterGrey.400" }}
        _focus={{ outline: "0" }}
        _autofill={{ bg: "transparent" }}
        borderColor="lighterGrey.500"
        color="white"
        variant="outline"
      />
      <InputRightElement width="4.5rem">
        <Button
          h="100%"
          colorScheme="brand"
          borderRightRadius="0.375rem"
          borderRadius={0}
          onClick={() => loadOrSearchVideo(videoSearchInputOrURL)}
        >
          Submit
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchOrLoadVideosInput;
