import React from "react";
import useSWR, { Fetcher } from "swr";
import LoginBtn from "../component/loginBtn";
import NewAccountBtn from "../component/SiteBtn";
import Footer from "../component/Footer";
import { FcGoogle } from "react-icons/fc";
import { BsDiscord } from "react-icons/bs";
import { SiGithub } from "react-icons/si";
import { FaLine } from "react-icons/fa";
import { IoLogoMicrosoft } from "react-icons/io5";

interface Content {
  id: number;
  name: string;
  href: string;
  image: string;
}

interface Pageable {
  currentPage: number;
  elementsOnPage: number;
  totalElements: number;
  totalPages: number;
  previousPage: string;
  nextPage: string;
}

interface Response {
  content: Content[];
  pageable: Pageable;
}

const fetcher: Fetcher<Response, string> = (url) =>
  fetch(url).then((res) => res.json());

const NewAccountPage = () => {
  // useSWRフックを使ってデータを取得
  // const { data, error } = useSWR<Response>(
  //   `https://digi-api.com/api/v1/digimon/digimon`,
  //   fetcher,
  // );

  // 新規登録処理用関数
  const handleLogin = async (name: string) => {
    try {
      const response = await fetch(
        `https://digi-api.com/api/v1/digimon/digimon`,
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <div className="Kaisei Tokumin mt-[44px] text-center text-5xl text-login lg:ml-[40px] lg:text-left">
          言葉の泉
        </div>
        <div className="Kaisei Tokumin my-[40px] text-center text-[32px] lg:my-[20px]">
          新規登録
        </div>
        <div className="text-center">
          <LoginBtn
            name="Google"
            icon={<FcGoogle />}
            login={() => handleLogin("Google")}
          />
          <LoginBtn
            name="Discord"
            icon={<BsDiscord color="#5865F2" />}
            login={() => handleLogin("Discord")}
          />
          <LoginBtn
            name="GitHub"
            icon={<SiGithub />}
            login={() => handleLogin("GitHub")}
          />
          <LoginBtn
            name="Line"
            icon={<FaLine color="#4ECB71" />}
            login={() => handleLogin("Line")}
          />
          <LoginBtn
            name="Microsoft"
            icon={<IoLogoMicrosoft />}
            login={() => handleLogin("Microsoft")}
          />
        </div>
        <div className="mt-[120px] text-center lg:my-[50px]">
          <NewAccountBtn text="ログインはこちら" />
        </div>
      </main>
      <footer className="absolute bottom-0 h-[25px] w-dvw">
        <Footer />
      </footer>
    </>
  );
};

export default NewAccountPage;
