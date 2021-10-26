import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import FoundVideos from "./FoundVideos";
import Pagination from "./Pagination";
import SearchOrLoadVideosInput from "./SearchOrLoadVideosInput";
import Instructions from "../Instructions/Instructions";

const VideoSearch = () => {
  const [foundVideos, setFoundVideos] = useState([]);
  const [currPage, setCurrPage] = useState(0);

  const itemLimit = 8;
  const pagesQuantity = Math.ceil(foundVideos.length / itemLimit);

  return (
    <Box px={4}>
      <SearchOrLoadVideosInput setFoundVideos={setFoundVideos} />
      {foundVideos.length ? (
        <>
          <FoundVideos
            foundVideos={foundVideos}
            curPage={currPage}
            itemLimit={itemLimit}
          />
          <Pagination
            foundVideos={foundVideos}
            pagesQuantity={pagesQuantity}
            setCurPage={setCurrPage}
          />
        </>
      ) : (
        <Instructions />
      )}
    </Box>
  );
};

export default VideoSearch;
