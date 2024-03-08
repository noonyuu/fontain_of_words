import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// ページのインポート
import RoginPage from "./page/LoginPage";
import NewAccountPage from "./page/NewAccountPage";
import HomePage from "./page/HomePage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {/* 呼び出すページ */}
    {/* <RoginPage /> ログインページ*/}
    {/* <NewAccountPage /> 新規登録*/}
    <HomePage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
