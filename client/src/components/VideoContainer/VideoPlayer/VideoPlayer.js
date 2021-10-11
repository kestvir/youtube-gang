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
} from "../../../shared/constants";
import Video from "../../../models/Video";
import VolumeAlert from "./VolumeAlert";

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
  const [vidURL, setVidURL] = useState("");
  const [playedSecs, setPlayedSecs] = useState(0);
  const [syncData, setSyncData] = useState(null);
  const [displayVolumeEnableModal, setDisplayVolumeEnableModal] =
    useState(false);

  const playerRef = useRef(null);
  const playerWrapperRef = useRef(null);

  useEffect(() => {
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

    if (socket)
      socket.on("load", (sendenderVidURL) => {
        setVidURL(sendenderVidURL);
        setDisplayVolumeEnableModal(true);

        addToHistory()
          .then(() => {
            console.log("Video Added To History!");
          })
          .catch((err) => {
            console.error(err);
          });
      });

    if (playerReady) {
      socket.on("seek", (senderTime) => {
        playerRef.current.seekTo(senderTime);
        setPlayedSecs(senderTime);
      });

      socket.on("play", () => {
        setPlaying(true);
      });

      socket.on("pause", () => {
        setPlaying(false);
      });
    }
  }, [playerReady, socket, dispatch]);

  useEffect(() => {
    if (socket)
      socket.on("roomData", ({ users }) => {
        const currentPlayer = playerRef?.current;

        if (users.length > 1 && users[0].id === socket.id && playerReady) {
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
  }, [playerReady, socket]);

  useEffect(() => {
    if (syncData !== null) {
      setVidURL(syncData.url);
      setDisplayVolumeEnableModal(true);
    }
  }, [syncData]);

  useEffect(() => {
    if (vidURL.length && playerReady && syncData) {
      playerRef.current.seekTo(syncData.time);

      if (syncData.isPlaying) setPlaying(true);
    }
  }, [playerReady, vidURL, syncData]);

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
    if (queue.length) {
      const videoIdToPlay = queue[0].id;

      socket.emit("loadVideo", standardVideoURL(videoIdToPlay));
      dispatch(deleteVideoFromQueue(videoIdToPlay));
    } else {
      setPlaying(false);
      playerRef.current.seekTo(0);
    }
  };

  return (
    <>
      {displayVolumeEnableModal && <VolumeAlert setMuted={setMuted} />}
      {vidURL.length && (
        <div ref={playerWrapperRef} className="player-wrapper">
          <ReactPlayer
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
      )}
    </>
  );
};

export default VideoPlayer;
