import React, { useEffect, useRef, useState, useContext } from "react";
import { WatchQueueAndHistoryContext } from "../../../store/contexts/WatchQueueAndHistorytContext";
import {
  addVideoToHistory,
  deleteVideoFromQueue,
} from "../../../store/actions/watchQueueAndHistoryActions";
import ReactPlayer from "react-player";
import { SocketContext } from "../../../store/contexts/SocketContext";
import {
  getSingleVideoInfoURL,
  standardVideoURL,
} from "../../shared/constants";
import Video from "../../../models/Video";
import VolumeAlert from "./VolumeAlert";

const initialVideoURL = "https://www.youtube.com/watch?v=WUqDezHZ7B0";

const VideoPlayer = () => {
  const { state: socketState } = useContext(SocketContext);
  const { state: watchAndQueueState, dispatch } = useContext(
    WatchQueueAndHistoryContext
  );
  const { socket } = socketState;
  const { queue } = watchAndQueueState;

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [vidURL, setVidURL] = useState(initialVideoURL);
  const [playedSecs, setPlayedSecs] = useState(0);
  const [syncData, setSyncData] = useState(null);
  const [displayVideoPlayer, setDisplayVideoPlayer] = useState(false);

  const playerRef = useRef(null);
  const playerWrapperRef = useRef(null);

  useEffect(() => {
    if (playerReady) {
      socket.on("load", (sendenderVidURL) => {
        setVidURL(sendenderVidURL);
        setDisplayVideoPlayer(true);
        playerWrapperRef.current.style.paddingTop = "56.25%";

        addToHistory()
          .then(() => {
            // alert("Video Added To History!");
          })
          .catch((err) => {
            console.error(err);
          });
      });

      socket.on("seek", (senderTime) => {
        playerRef.current.seekTo(senderTime, "seconds");
        setPlayedSecs(senderTime);
      });

      socket.on("play", () => {
        setPlaying(true);
      });

      socket.on("pause", () => {
        setPlaying(false);
      });
    } else playerWrapperRef.current.style.paddingTop = "0";
  }, [playerReady]);

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      const currentPlayer = playerRef?.current;

      if (users.length > 1 && users[0].id === socket.id) {
        const syncUserId = users[users.length - 1].id;
        socket.emit(
          "syncVideoOnJoin",
          syncUserId,
          currentPlayer.props.url,
          currentPlayer.getCurrentTime(),
          currentPlayer.props.playing
        );
      }
    });
    socket.on("syncOnJoin", (senderVidURL, senderTime, isSenderPlaying) => {
      const syncDataObj = {
        url: senderVidURL,
        time: senderTime,
        isPlaying: isSenderPlaying,
      };
      setSyncData(syncDataObj);
    });
  }, []);

  useEffect(() => {
    if (playerReady && syncData !== null) {
      const { url, time, isPlaying } = syncData;

      if (url !== vidURL) {
        console.log("videos are not the same");
        setVidURL(syncData.url);
        setDisplayVideoPlayer(true);
      }
      playerRef.current.seekTo(time, "seconds");
      if (isPlaying) setPlaying(true);
    }
  }, [syncData, playerReady]);

  const handleProgress = (state) => {
    const currentPlayedSecs = state.playedSeconds;
    const timeDif = currentPlayedSecs - playedSecs;
    if (timeDif >= 1.1 || timeDif < -1.1) {
      socket.emit("seekVideo", currentPlayedSecs);
    }
    setPlayedSecs(currentPlayedSecs);
  };

  const handleReady = () => {
    setPlayerReady(true);
  };

  const handlePlay = () => {
    setPlaying(true);
    socket.emit("playVideo");
  };

  const handlePause = () => {
    setPlaying(false);
    socket.emit("pauseVideo");
  };

  const handleEnded = () => {
    console.log(queue.length);
    if (queue.length) {
      const videoIdToPlay = queue[0].id;
      socket.emit("loadVideo", standardVideoURL(videoIdToPlay));
      dispatch(deleteVideoFromQueue(videoIdToPlay));
    } else {
      setPlaying(false);
      playerRef.current.seekTo(0);
    }
  };

  const addToHistory = async () => {
    try {
      const res = await fetch(
        getSingleVideoInfoURL(playerRef.current.props.url)
      );
      if (!res.ok) {
        throw new Error(res.error);
      }
      const data = await res.json();
      const dataObj = data.items[0];
      const videoData = new Video(
        dataObj.id.videoId,
        dataObj.snippet.title,
        dataObj.snippet.thumbnails.medium.url,
        dataObj.snippet.channelTitle
      );
      dispatch(addVideoToHistory(videoData));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {displayVideoPlayer && <VolumeAlert setMuted={setMuted} />}
      <div ref={playerWrapperRef} className="player-wrapper">
        <ReactPlayer
          //   style={{ display: !displayVideoPlayer && "none" }}
          ref={playerRef}
          url={vidURL}
          className="react-player"
          width="100%"
          height="100%"
          playing={playing}
          muted={muted}
          controls={true}
          onReady={handleReady}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          onEnded={handleEnded}
        />
      </div>
    </>
  );
};

export default VideoPlayer;
