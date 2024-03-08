import { Route, Routes } from "react-router-dom";
// import { Login } from "./pages/Login";
import Secret from "./routes/Secret";
import Notfound from "./page/NotFound"
import RoginPage from "./page/LoginPage";
import NewAccountPage from "./page/NewAccountPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<RoginPage />} />
      <Route path="/NewAccountPage" element={<NewAccountPage />} />
      <Route path="/RoginPage" element={<RoginPage />} />
      <Route path="secret/*" element={<Secret />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};
export default Router;
