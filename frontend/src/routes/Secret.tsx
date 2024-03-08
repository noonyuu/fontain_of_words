import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import HomePage from "../page/HomePage";
import { ContextWrapper } from "../context/ContextWrapper";

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
          {/* </Route> */}
        </Routes>
      </ContextWrapper>
    </>
  );
};

export default Secret;
