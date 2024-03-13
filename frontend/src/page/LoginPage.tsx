import { useNavigate } from "react-router-dom";

// コンポーネントのインポート
import LoginBtn from "../component/LoginBtn";
import NewAccountBtn from "../component/SiteBtn";
import Footer from "../component/Footer";
// アイコンのインポート
import { FcGoogle } from "react-icons/fc"; // Google
import { BsDiscord } from "react-icons/bs"; // Discord
import { SiGithub } from "react-icons/si"; // GitHub
import { FaLine } from "react-icons/fa"; // Line
import { IoLogoMicrosoft } from "react-icons/io5"; // Microsoft

import { Refresh_Token, Logout, GetInfo } from "../auth/Auth";

const LoginPage = () => {
  const history = useNavigate();
  
  const register = () => {
    console.log("register");
    history("/NewAccountPage");
  };

  const a = () => {
    console.log("test");
    history("/secret/HomePage");
  };

  return (
    <>
      <main>
        <div className="Kaisei Tokumin mt-[44px] text-center text-5xl text-login lg:ml-[40px] lg:text-left pb-[25px]">
          言葉の泉
        </div>
        <div className="Kaisei Tokumin my-[40px] text-center text-[32px] lg:my-[20px]">
          ログイン
        </div>
        <div className="text-center">
          <LoginBtn name="Google" icon={<FcGoogle />} loginLink="google" />
          <LoginBtn
            name="Discord"
            icon={<BsDiscord color="#5865F2" />}
            loginLink="discord"
          />
          <LoginBtn name="GitHub" icon={<SiGithub />} loginLink="github" />
          <LoginBtn
            name="Line"
            icon={<FaLine color="#4ECB71" />}
            loginLink="line"
          />
          <LoginBtn
            name="Microsoft"
            icon={<IoLogoMicrosoft />}
            loginLink="microsoft"
          />
        </div>
        <div className="mt-[120px] text-center lg:my-[50px]" onClick={register}>
          <NewAccountBtn text="アカウントの新規登録はこちらから" />
        </div>
        <button onClick={a}>ろぐいん</button>
      </main>
    </>
  );
};

export default LoginPage;
