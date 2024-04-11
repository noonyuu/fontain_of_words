// 保存詳細ページ
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// コンポーネントのインポート
import { RiArrowGoBackFill } from "react-icons/ri"; // 戻るボタン
import { FaPlusSquare } from "react-icons/fa"; // 保存ボタン
import TabBar from "../component/TabBar"; // タブ
import NewModal from "../component/NewModal"; // モーダル
import { GlobalContext } from "../context/GlobalContext";
import { RegisterWord, Create_word_book, Get_books } from "../scripts/word";

const SavePage = () => {
  const history = useNavigate();
  const { selectedItem, words } = useContext(GlobalContext);

  // 前画面に戻る処理
  const returnPage = () => {
    console.log("returnPage");
    history("/secret/VoicePage");
  };

  const HomePage = async () => {
    console.log("returnPage");
    if (selectedItem[0]?.id === 0) {
      await Create_word_book(selectedItem[0]?.name).then(
        (bookId) => {
           for (let i = 0; i < words.length; i++) {
             if (words[i].bookmark) {
               RegisterWord(bookId, words[i].word);
             }
           }
        }
      )
    } else {
      for (let i = 0; i < words.length; i++) {
        if (words[i].bookmark) {
          RegisterWord(selectedItem[0]?.id, words[i].word);
        }
      }
    }
    localStorage.removeItem("result_result");
    localStorage.removeItem("recode");
    localStorage.removeItem("wordsList");
    history("/secret/HomePage");
  };

  // モーダルの切り替え
  const [btnBool, setBtnBool] = useState(false);

  return (
    <main className="h-[calc(100%-4rem)]">
      <div onClick={returnPage}>
        <RiArrowGoBackFill className="m-4 mt-20 size-5 lg:size-8" />
      </div>
      {/* <div className='mr-5 ml-7 lg:mr-32 lg:ml-44'><TabBar/></div> */}
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
