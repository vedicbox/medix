import { CssBaseline, StyledEngineProvider } from "@mui/material";
import App from "App";
import { env_props } from "env";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "scss/index.scss";
import ThemeProvider from "themes";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <StyledEngineProvider injectFirst>
      <ThemeProvider basetheme={env_props.BASE_THEME}>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
