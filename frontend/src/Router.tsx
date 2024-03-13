import { Route, Routes, useNavigate } from "react-router-dom";
// import { Login } from "./pages/Login";
import Secret from "./routes/Secret";
import Notfound from "./page/NotFound";
import LoginPage from "./page/LoginPage";
import NewAccountPage from "./page/NewAccountPage";
import { useEffect } from "react";
import { GetInfo, Refresh_Token } from "./auth/Auth";

const Router = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 現在のパスが/ならloginへ遷移
    if (window.location.pathname === "/") {
      console.log("login");
      const token = GetInfo();
      // console.log(token);
      if (token) {
        console.log("token");
        console.log(token);
        navigate("/secret/HomePage");
      } else {
        navigate("/LoginPage");
      }
    }

    Refresh_Token();
  }, [navigate]);
  return (
    <Routes>
      <Route path="/NewAccountPage" element={<NewAccountPage />} />
      {/* <Route path="/" element={<LoginPage />} /> */}
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="secret/*" element={<Secret />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};
export default Router;
