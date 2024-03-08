import { Route, Routes } from "react-router-dom";
// import { Login } from "./pages/Login";
import Secret from "./routes/Secret";
import Notfound from "./page/NotFound"

const Router = () => {
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="secret/*" element={<Secret />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};
export default Router;
