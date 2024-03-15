import React, { useContext, useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import {
  BsFillBookmarkDashFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { GlobalContext } from "../context/GlobalContext";
import parse from "html-react-parser";
import { get } from "http";

const TabBar: React.FC = () => {
  const { words, setWords } = useContext(GlobalContext);
  const [saveTest, setSaveTest] = useState("");

  // ローカルストレージからデータを取得
  useEffect(() => {
    const savedWordsList = JSON.parse(
      localStorage.getItem("wordsList") || "[]",
    );

    setSaveTest(localStorage.getItem("result_result") || "");

    // ブックマークの初期状態を設定
    const initialBookmarks = savedWordsList.map(() => false);
    // 単語とブックマークの状態をまとめる
    const wordsWithBookmarks = savedWordsList.map(
      (word: string, index: number) => ({
        word,
        bookmark: initialBookmarks[index],
      }),
    );
    setWords(wordsWithBookmarks);
  }, []);

  const toggleBookmark = (index: number) => {
    // 現在の単語とブックマークの状態をコピー
    const newWords = [...words];
    // ブックマークの状態をトグル
    newWords[index].bookmark = !newWords[index].bookmark;
    // 状態を更新
    setWords(newWords);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "全文",
      children: parse(saveTest),
    },
    {
      key: "2",
      label: "単語のみ",
      children: (
        <ul className="h-full ">
          {words.map((word, index) => (
            <li
              key={index}
              className="flex h-10 list-none justify-between border-b-2 border-gray-300 p-1 text-xl text-mark underline"
            >
              <div>{word.word}</div>
              <div className="mx-2" onClick={() => toggleBookmark(index)}>
                <button>
                  {word.bookmark ? (
                    <BsFillBookmarkCheckFill className="size-7 text-yellow-300" />
                  ) : (
                    <BsFillBookmarkDashFill className="size-7 text-gray-300" />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ),
    },
    // {
    //   key: "3",
    //   label: "検索履歴",
    //   children: (
    //     <ul className="overflow-y-scroll">
    //       {words.map((word, index) => (
    //         <li
    //           key={index}
    //           className="flex h-10 list-none justify-between border-b-2 border-gray-300 p-1 text-xl text-mark underline"
    //         >
    //           <div>{word}</div>
    //           <div className="mx-2" onClick={() => toggleBookmark(index)}>
    //             <button>
    //               {bookmarks[index] ? (
    //                 <BsFillBookmarkCheckFill className="size-7 text-yellow-300" />
    //               ) : (
    //                 <BsFillBookmarkDashFill className="size-7 text-gray-300" />
    //               )}
    //             </button>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   ),
    // },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default TabBar;
