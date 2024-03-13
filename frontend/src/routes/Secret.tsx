import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// コンポーネント
import Header from "../component/Header";
import Footer from "../component/Footer";
// 画面
import HomePage from "../page/HomePage";
import NotFound from "../page/NotFound";
import WordbookDetails from "../page/WordbookDetails";
// コンテキスト
import { ContextWrapper } from "../context/ContextWrapper";
import Footer from "../component/Footer";

const Secret = () => {
  return (
    <>
      <ContextWrapper>
        <Header />
        <Routes>
          {/* <Route> */}
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/WordbookDetails" element={<WordbookDetails />} />
          <Route path="/*" element={<NotFound />} />
          {/* </Route> */}
        </Routes>
        <Footer />
      </ContextWrapper>
    </>
  );
};

export default Secret;
