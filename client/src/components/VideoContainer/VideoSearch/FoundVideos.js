import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import VideoInfo from "../../../shared/VideoInfo";
import Video from "../../../models/Video";

const FoundVideos = ({ foundVideos, curPage, itemLimit }) => {
  const [currItems, setCurrItems] = useState([]);

  useEffect(() => {
    const offset = curPage * itemLimit;
    const getList = (itemLimit) => {
      setCurrItems(foundVideos.slice(offset, offset + itemLimit));
    };

    getList(itemLimit);
  }, [curPage, itemLimit, foundVideos]);

  return (
    <Box id="found-videos-box" h="60vh" py={6}>
      <Grid
        id="found-videos-grid"
        gap={5}
        templateColumns="repeat(4, 1fr)"
        spacing={4}
      >
        {currItems.map((vidData) => {
          const videoToRender = new Video(
            vidData.id.videoId,
            vidData.snippet.title,
            vidData.snippet.thumbnails.medium.url,
            vidData.snippet.channelTitle
          );

          return (
            <GridItem key={vidData.id.videoId}>
              <VideoInfo
                video={videoToRender}
                isParentComponentOptions={false}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FoundVideos;
