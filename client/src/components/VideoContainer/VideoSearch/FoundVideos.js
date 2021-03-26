import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import VideoInfo from "../../shared/VideoInfo";
import Video from "../../../models/Video";

const FoundVideos = ({ foundVideos, curPage, itemLimit }) => {
  const [curItems, setCurItems] = useState([]);

  useEffect(() => {
    const offset = curPage * itemLimit;
    const getList = (itemLimit) => {
      setCurItems(foundVideos.slice(offset, offset + itemLimit));
    };
    getList(itemLimit);
  }, [curPage, itemLimit, foundVideos]);

  return (
    <Box h="60vh" py={6}>
      <Grid gap={5} templateColumns="repeat(4, 1fr)" spacing={4}>
        {curItems.map((vidData) => {
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
