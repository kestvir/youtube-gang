import React, { useContext } from "react";
import { WatchQueueAndHistoryContext } from "../../../store/contexts/WatchQueueAndHistorytContext";
import { Flex } from "@chakra-ui/react";
import VideoInfo from "../../../shared/VideoInfo";

const QueueOrHistory = ({ isQueue }) => {
  const { state } = useContext(WatchQueueAndHistoryContext);
  const { queue, history } = state;

  const arrToMap = isQueue ? queue : history;

  return (
    <Flex flexDirection="column">
      {arrToMap.map((vidObj) => {
        return (
          <VideoInfo
            key={vidObj.id}
            video={vidObj}
            isParentComponentOptions={true}
            isQueue={isQueue}
          />
        );
      })}
    </Flex>
  );
};

export default QueueOrHistory;
