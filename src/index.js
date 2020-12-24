import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { Provider } from 'react-redux';
import store from "./app/store";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  // <Provider store={store}>
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  // </Provider>,
  document.getElementById("root")
);
