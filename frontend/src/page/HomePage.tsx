import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import HomeBtn from "../component/HomeBtn";
import HomeBtn_circle from "../component/HomeBtn_circle";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const history = useNavigate();

  const { profileModal } = useContext(GlobalContext);

  return (
    <main
      className={`${profileModal ? "bg-gray-300 opacity-50" : ""} h-full overflow-y-auto bg-mainBg bg-cover bg-fixed bg-bottom pt-16 md:bg-mainBg_md lg:bg-mainBg_lg`}
    >
      <div className="Kaisei Tokumin mt-20 text-center text-6xl text-white drop-shadow-mainShadow lg:text-8xl">
        言葉の泉
      </div>
      <div className="mt-28 flex items-center justify-center">
        <div
          className="text-center drop-shadow-mainShadow"
          onClick={() => history("../VoicePage")}
        >
          <HomeBtn text="新規作成" />
        </div>
        <HomeBtn_circle position="translate-x-[6.7rem] lg:translate-x-[8.5rem] size-10 bg-[#C5FFF8]" />
        <HomeBtn_circle position="translate-x-36 lg:translate-x-[11.4rem] size-5 bg-[#7BFFEF]" />
      </div>
      <div className="mt-9 flex items-center justify-center">
        <div
          className="text-center drop-shadow-mainShadow"
          onClick={() => history("../WordbookDetails")}
        >
          <HomeBtn text="単語帳" />
        </div>
        <HomeBtn_circle position="-translate-x-[6.7rem] lg:-translate-x-[8.5rem] size-10  bg-[#C5FFF8]" />
        <HomeBtn_circle position="-translate-x-36 lg:-translate-x-[11.4rem] size-5 bg-[#7BFFEF]" />
      </div>
    </main>
  );
};

export default HomePage;
