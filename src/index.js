import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
//mui
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
// router
import { BrowserRouter } from "react-router-dom";
// redux
import store from "./redux/store";
import { Provider } from "react-redux";
// components
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </>
);
