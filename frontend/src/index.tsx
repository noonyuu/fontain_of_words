import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// ページのインポート
import Btn from "./component/btn"; // test
import App from "./App";
import VoicePage from "./page/VoicePage";
import HomePage from "./page/HomePage";
import SavePage from "./page/SavePage";
import UploadPage from "./page/UploadPage";
import TabBar from "./component/TabBar";
import CategoryPage_category from "./page/CategoryPage_category";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {/* 呼び出すページ */}
    {/* <RoginPage /> ログインページ */}
    {/* <NewAccountPage /> 新規登録 */}
    {/* <HomePage /> ホームページ */}
    {/* <VoicePage /> 録音ページ */}
    {/* <UploadPage />　テキストアップロードページ */}
    <SavePage /> 結果保存ページ
    {/* <CategoryPage_category /> 単語帳カテゴリーページ */}
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
