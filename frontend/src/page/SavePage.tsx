// 保存詳細ページ
import React, { useEffect, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri"; // 戻るボタン
import { FaPlusSquare } from "react-icons/fa"; // 保存ボタン
import TabBar from "../component/TabBar";
import { useNavigate } from "react-router-dom";
import NewModal from "../component/NewModal";

const SavePage = () => {
  const history = useNavigate();
  const [btnBool, setBtnBool] = useState(false);

  const HomePage = () => {
    console.log("returnPage");
    history("/secret/HomePage");
  };

  // useEffect(() => {
  //   localStorage.getItem("wordsList");
  // });

  return (
    <main>
      <RiArrowGoBackFill
        className="m-4 size-5 lg:size-8"
        onClick={() => history(-1)}
      />
      <div className="ml-7 mr-5 max-h-full lg:ml-44 lg:mr-32">
        <TabBar />
      </div>
      <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8">
        <button>
          <FaPlusSquare
            className="size-12 text-mark lg:size-16"
            onClick={() => (btnBool ? setBtnBool(false) : setBtnBool(true))}
          />
        </button>
      </div>
      <div className={btnBool ? "z-1" : "hidden"}>
        <NewModal
          word1="続ける"
          word2="終了"
          next={HomePage}
          down={() => setBtnBool(false)}
        />
      </div>
    </main>
  );
};

export default SavePage;
