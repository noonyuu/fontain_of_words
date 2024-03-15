// 保存詳細ページ
import React, { useEffect } from "react";
import { RiArrowGoBackFill } from "react-icons/ri"; // 戻るボタン
import { FaPlusSquare } from "react-icons/fa"; // 保存ボタン
import TabBar from "../component/TabBar";
import { useNavigate } from "react-router-dom";

const SavePage = () => {
  const history = useNavigate();

  // useEffect(() => {
  //   localStorage.getItem("wordsList");
  // });

  return (
    <main>
      <div className="h-[51.97px] w-dvw bg-blue-300 lg:h-[70px]">header</div>
      <RiArrowGoBackFill
        className="m-4 size-5 lg:size-8"
        onClick={() => history(-1)}
      />
      <div className="ml-7 mr-5 lg:ml-44 lg:mr-32">
        <TabBar />
      </div>
      <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8">
        <button>
          <FaPlusSquare className="size-12 text-mark lg:size-16" />
        </button>
      </div>
    </main>
  );
};

export default SavePage;
