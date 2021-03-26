import {
  ADD_TO_QUEUE,
  ADD_TO_HISTORY,
  DELETE_FROM_QUEUE,
  DELETE_FROM_HISTORY,
  RESET_QUEUE_AND_HISTORY,
} from "./actionTypes";

export const addVideoToQueue = (vidObj) => {
  return { type: ADD_TO_QUEUE, vidObj };
};

export const addVideoToHistory = (vidObj) => {
  return { type: ADD_TO_HISTORY, vidObj };
};

export const deleteVideoFromQueue = (vidId) => {
  return { type: DELETE_FROM_QUEUE, vidId };
};

export const deleteVideoFromHistory = (vidId) => {
  return { type: DELETE_FROM_HISTORY, vidId };
};

export const resetQueueAndHistory = () => {
  return { type: RESET_QUEUE_AND_HISTORY };
};
