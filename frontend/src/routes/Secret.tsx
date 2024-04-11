import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// コンポーネント
import Header from "../component/Header";
import Footer from "../component/Footer";
// 画面
import HomePage from "../page/HomePage";
import NotFound from "../page/NotFound";
import WordbookDetails from "../page/WordbookDetails";
import TabBar from "../component/TabBar";
// コンテキスト
import { ContextWrapper } from "../context/ContextWrapper";
import VoicePage from "../page/VoicePage";
import SavePage from "../page/SavePage";
import CategoryPage from "../page/CategoryPage";

const Secret = () => {
  return (
    <>
      <ContextWrapper>
        <Header />
        <Routes>
          {/* <Route> */}
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/WordbookDetails/:id" element={<WordbookDetails />} />
          <Route path="/VoicePage" element={<VoicePage />} />
          <Route path="/SavePage" element={<SavePage />} />
          <Route path="/CategoryPage" element={<CategoryPage />} />
          <Route path="/*" element={<NotFound />} />
          {/* </Route> */}
        </Routes>
        <Footer />
      </ContextWrapper>
    </>
  );
};

export default Secret;
