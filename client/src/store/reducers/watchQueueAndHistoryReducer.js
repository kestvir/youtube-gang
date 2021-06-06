import {
  ADD_TO_QUEUE,
  ADD_TO_HISTORY,
  DELETE_FROM_QUEUE,
  DELETE_FROM_HISTORY,
  RESET_QUEUE_AND_HISTORY,
} from "../actions/actionTypes";

const deleteItem = (arr, id) => arr.filter((item) => item.id !== id);

const findItem = (arr, id) => arr.find((item) => item.id === id);

export const watchQueueAndHistoryReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_QUEUE:
      const inQueue = findItem([...state.queue], action.vidObj.id);
      return {
        ...state,
        queue: inQueue ? [...state.queue] : [action.vidObj, ...state.queue],
      };
    case ADD_TO_HISTORY:
      const inHistory = findItem([...state.history], action.vidObj.id);
      return {
        ...state,
        history: inHistory
          ? [...state.history]
          : [...state.history, action.vidObj],
      };
    case DELETE_FROM_QUEUE:
      const filteredQueue = deleteItem([...state.queue], action.vidId);
      return {
        ...state,
        queue: filteredQueue,
      };
    case DELETE_FROM_HISTORY:
      const filteredHistory = deleteItem([...state.history], action.vidId);
      return {
        ...state,
        history: filteredHistory,
      };
    case RESET_QUEUE_AND_HISTORY:
      return {
        ...state,
        queue: [],
        history: [],
      };
    default:
      return state;
  }
};
