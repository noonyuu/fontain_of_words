import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// ページのインポート
import App from "./App";
import VoicePage from "./page/VoicePage";
import HomePage from "./page/HomePage";
import SavePage from "./page/SavePage";
import UploadPage from "./page/UploadPage";
import TabBar from "./component/TabBar";
import CategoryPage_category from "./page/CategoryPage_category";
import Modal from "./component/Modal";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
