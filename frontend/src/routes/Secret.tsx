import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import { ContextWrapper } from "../context/ContextWrapper";
import Footer from "../component/Footer";
// 画面インポート
import HomePage from "../page/HomePage";
import VoicePage from "../page/VoicePage";
import SavePage from "../page/SavePage";
import UploadPage from "../page/UploadPage";
import TabBar from "../component/TabBar";
import CategoryPage from "../page/CategoryPage";
import Modal from "../component/Modal";

const Secret = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (token) {
    //   navigate("/login");
    // }
  }, [navigate]);
  return (
    <>
      <ContextWrapper>
        <Header />
        <Routes>
          {/* <Route> */}
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/VoicePage" element={<VoicePage />} />
          <Route path="/SavePage" element={<SavePage />} />
          <Route path="/UploadPage" element={<UploadPage />} />
          <Route path="/TabBar" element={<TabBar />} />
          <Route path="/CategoryPage" element={<CategoryPage />} />
          {/* </Route> */}
        </Routes>
        <Footer />
      </ContextWrapper>
    </>
  );
};

export default Secret;
