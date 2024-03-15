// 録音ページ
import { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
// コンポーネント
import { RiArrowGoBackFill } from "react-icons/ri"; // 戻るボタン
import VoiceBtn from "../component/VoiceBtn"; // 録音ボタン
import CategoryBox from "../component/CategoryBox"; // カテゴリー選択ボックス
import { useNavigate } from "react-router-dom";
// コンテキスト

const VoicePage = () => {
  const history = useNavigate();
  const [voice, setVoice] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const text: string | null = localStorage.getItem("recode");
      if (text) {
        console.log(text);
        let result = text.replace(/\|\|--/g, "<span className='text-red-500'>");
        result = result.replace(/--\|\|/g, "</span>");
        console.log(result);
        setVoice(result);
      }
    }, 1000); // 1秒ごとに更新

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-dvh w-dvw overflow-y-auto bg-blue-300 pt-16">
      <RiArrowGoBackFill
        className="m-4 size-5 lg:size-8"
        onClick={() => history(-1)}
      />
      <div className="h-[calc(100%-5.25rem-25px-10%)] lg:flex">
        <div className="Kaisei Tokumin mx-[10%] my-6 text-base lg:mx-16 lg:ml-10 lg:mt-[10%] lg:w-1/4 lg:text-lg">
          <p className="mb-2">カテゴリー入力</p>
          <CategoryBox elseCategory={false} />
        </div>
        <div className="relative mx-[10%] my-3.5 flex h-[70%] w-[80%] rounded-3xl bg-white p-4 text-black shadow-[inset_0px_6px_2px_rgba(0,4,4,0.25)] lg:mx-10 lg:h-full lg:w-3/4 lg:p-8">
          <div className="h-full overflow-auto">{parse(voice)}</div>
        </div>
      </div>
      <div className="flex h-[10%] w-full justify-end lg:w-1/4 lg:justify-center">
        <VoiceBtn />
      </div>
    </main>
  );
};

export default VoicePage;
