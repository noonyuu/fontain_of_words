import { Route, Routes, useNavigate } from "react-router-dom";
// import { Login } from "./pages/Login";
import Secret from "./routes/Secret";
import Notfound from "./page/NotFound";
import LoginPage from "./page/LoginPage";
import NewAccountPage from "./page/NewAccountPage";
import { useEffect } from "react";
import { GetInfo, Refresh_Token } from "./scripts/Auth";

const Router = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const [loggedIn, userInfo] = await GetInfo();
        if (loggedIn && userInfo) {
          Refresh_Token();
          // ログイン成功時の処理
          if (
            window.location.pathname === "/LoginPage" ||
            window.location.pathname === "/"
          ) {
            navigate("/secret/HomePage");
          } else {
            navigate(window.location.pathname, { replace: true });
          }
        } else {
          navigate("/LoginPage");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    //TODO 絶対戻す
    fetchUserInfo();
  }, []);

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
