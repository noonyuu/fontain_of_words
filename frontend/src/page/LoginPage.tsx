import React from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

// コンポーネントのインポート
import LoginBtn from "../component/loginBtn";
import NewAccountBtn from "../component/SiteBtn";
import Footer from "../component/Footer";
// アイコンのインポート
import { FcGoogle } from "react-icons/fc"; // Google
import { BsDiscord } from "react-icons/bs"; // Discord
import { SiGithub } from "react-icons/si"; // GitHub
import { FaLine } from "react-icons/fa"; // Line
import { IoLogoMicrosoft } from "react-icons/io5"; // Microsoft

const LoginPage = () => {
  const history = useNavigate();
  //  ログイン処理用関数
  const Login = (name: string) => {
    console.log(name);
  };

  const register = () => {
    console.log("register");
    history("/NewAccountPage");
  };

  const a = () => {
    console.log("test");
    history("/secret/HomePage");
  }

  return (
    <>
      <main>
        <div className="Kaisei Tokumin mt-[44px] text-center text-5xl text-login lg:ml-[40px] lg:text-left">
          言葉の泉
        </div>
        <div className="Kaisei Tokumin my-[40px] text-center text-[32px] lg:my-[20px]">
          ログイン
        </div>
        <div className="text-center">
          <LoginBtn
            name="Google"
            icon={<FcGoogle />}
            login={() => Login("Google")}
          />
          <LoginBtn
            name="Discord"
            icon={<BsDiscord color="#5865F2" />}
            login={() => Login("Discord")}
          />
          <LoginBtn
            name="GitHub"
            icon={<SiGithub />}
            login={() => Login("GitHub")}
          />
          <LoginBtn
            name="Line"
            icon={<FaLine color="#4ECB71" />}
            login={() => Login("Line")}
          />
          <LoginBtn
            name="Microsoft"
            icon={<IoLogoMicrosoft />}
            login={() => Login("Microsoft")}
          />
        </div>
        <div className="mt-[120px] text-center lg:my-[50px]" onClick={register}>
          <NewAccountBtn text="アカウントの新規登録はこちらから" />
        </div>
        <button onClick={a}>ろぐいん</button>
      </main>
      <footer className="absolute bottom-0 h-[25px] w-dvw">
        <Footer />
      </footer>
    </>
  );
};

export default LoginPage;
