const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const getVideosInfoURL = (searchInput) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=16&q=${searchInput}&type=video&key=${YOUTUBE_API_KEY}`;

export const getSingleVideoInfoURL = (videoURL) =>
  `https://www.googleapis.com/youtube/v3/search/?key=${YOUTUBE_API_KEY}&part=snippet&q=${videoURL}`;

export const standardVideoURL = (videoId) =>
  `https://www.youtube.com/watch?v=${videoId}`;

export const selectedTabStyles = { color: "white", bg: "brand.500" };

export const successMsg = (description) => ({
  description,
  status: "success",
  duration: 1500,
  isClosable: true,
});
