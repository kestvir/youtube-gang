import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  ChakraProvider,
  extendTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";

const theme = extendTheme({
  shadows: { ...chakraTheme.shadows, outline: "0" },
  colors: {
    brand: {
      50: "#ffe6e1",
      100: "#ffbbb1",
      200: "#ff8b7f",
      300: "#ff574c",
      400: "#ff221a",
      500: "#e60000",
      600: "#b40c00",
      700: "#811100",
      800: "#501000",
      900: "#210900",
    },

    almostBlack: "#181818",
    darkGrey: "#212121",
    lighterGrey: {
      50: "#fbf0f2",
      100: "#dcd8d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#595959",
      700: "#404040",
      800: "#282626",
      900: "#150a0d",
    },
    lightestGrey: "#aaa",
    white: "#fff",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
