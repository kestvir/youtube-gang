import React, { useContext } from "react";
import { SocketContext } from "../store/contexts/SocketContext";
import { Flex, Image, Text, Icon, useToast } from "@chakra-ui/react";
import { ImPlus } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { WatchQueueAndHistoryContext } from "../store/contexts/WatchQueueAndHistorytContext";
import {
  addVideoToQueue,
  deleteVideoFromQueue,
  deleteVideoFromHistory,
} from "../store/actions/watchQueueAndHistoryActions";
import { standardVideoURL, toastMsg } from "./constants";

const VideoInfo = ({ video, isParentComponentOptions, isQueue }) => {
  const { state } = useContext(SocketContext);
  const { socket } = state;
  const { dispatch } = useContext(WatchQueueAndHistoryContext);

  const toast = useToast();

  const shortenStrIfTooLong = (str) => {
    if (str.length <= 78) {
      return str;
    }
    return str.slice(0, 78) + "...";
  };

  const adjustVidURLAndLoad = (videoId) => {
    const adjustedVidURL = standardVideoURL(videoId);
    socket.emit("loadVideo", adjustedVidURL);
  };

  const addVideo = (video) => {
    dispatch(addVideoToQueue(video));
    toast(toastMsg("Video added to queue.", "success"));
  };

  const deleteVideo = (id) => {
    if (isQueue) dispatch(deleteVideoFromQueue(id));
    else dispatch(deleteVideoFromHistory(id));
  };

  return (
    <Flex
      id="video-info-flex-container"
      flexDirection="column"
      px={isParentComponentOptions && 10}
    >
      <Image
        onClick={() => adjustVidURLAndLoad(video.id)}
        cursor="pointer"
        maxH="180"
        w={"100%"}
        fit="cover"
        src={video.thumbnail}
      />
      <Text color="white">{shortenStrIfTooLong(video.title)}</Text>
      <Flex mt={1} alignItems="center" justifyContent="space-between">
        <Text color="lightestGrey">{shortenStrIfTooLong(video.channel)}</Text>
        <Icon
          onClick={
            isParentComponentOptions
              ? () => deleteVideo(video.id)
              : () => addVideo(video)
          }
          mr={2.5}
          cursor="pointer"
          color="lightestGrey"
          as={isParentComponentOptions ? MdDelete : ImPlus}
        />
      </Flex>
    </Flex>
  );
};

export default VideoInfo;
