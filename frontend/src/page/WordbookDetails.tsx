import React, { useState } from "react";
// icon
import { BsArrowReturnLeft } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { LiaTimesSolid } from "react-icons/lia";
import { FaLink } from "react-icons/fa6";

const WordbookDetails = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [selected, setSelected] = useState(false);
  const [word, setWord] = useState("");
  const [modal, setModal] = useState(false);
  const words = [
    [
      "プロジェクト",
      "プロジェクトは、特定の目標を達成するために一時的に行われる取り組みや作業のことを指します。プロジェクトは一定のスコープや期間、予算を持ち、それらの制約の中で目標を達成するための計画が立てられます。プロジェクトは、新しい製品やサービスの開発、インフラストラクチャの構築、組織内の変革など、さまざまな目的で実施されます。プロジェクトは通常、プロジェクトマネージャーがリーダーシップを取り、関係者とのコミュニケーションや進捗管理を行いながら進行します。",
      "http://~~~~",
    ],
    ["アジャイル開発", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
  ];

  const Detail = (index: number) => {
    setTitle(words[index][0]);
    setWord(words[index][1]);
    setLink(words[index][2]);
    setSelected(true);
    handleClick();
  };

  const henkan = () => {
    console.log("変換");
  };

  // const [openMenu, setOpenMenu] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    setModal(!modal);
    console.log(modal);
  };

  return (
    <main className="h-full overflow-y-auto	bg-fixed bg-bottom pb-[30px] pt-16">
      <div
        className={`${modal ? "bg-gray-50 opacity-50 lg:bg-white lg:opacity-100 h-full" : ""}`}
      >
        <div className="ml-4 mt-4 h-5">
          {/* TODO:仮アイコン */}
          <BsArrowReturnLeft size={24} />
        </div>
        <h2 className="relative mr-6 mt-4 flex h-10 w-24 items-center justify-center bg-main font-bold leading-4 text-white after:absolute after:-right-10 after:top-0 after:block after:h-10 after:border-[20px] after:border-r-[20px] after:border-solid after:border-main after:border-r-transparent">
          #IT
        </h2>
        <div className="lg:flex lg:h-[calc(100%-7.75rem)]">
          {/* 検索欄 */}
          <div className="w-full lg:w-2/5">
            <div className="my-2 flex justify-center lg:ml-8 lg:justify-start">
              <div className="relative mt-2 rounded-md shadow-sm">
                {/* icon */}
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-md bg-gray-200 pl-3">
                  <span className="flex items-center text-gray-500 sm:text-sm">
                    <IoMdSearch />
                  </span>
                </div>
                {/* 入力 */}
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 bg-gray-200 py-1.5 pl-9 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 lg:pr-32"
                  placeholder="検索"
                />
              </div>
            </div>
            {/* list */}
            <div className="mt-4 lg:ml-8 lg:mr-24">
              <ul className="w-full">
                <li className="w-full border-t-[1px] border-gray-300"></li>
                {words.map((word, index) => (
                  <li
                    key={index}
                    className="flex w-full items-center justify-between border-b-[1px] border-gray-300 py-4 pl-8 lg:border-[1px]"
                    onClick={() => Detail(index)}
                  >
                    <span>{word[0]}</span>
                    <button type="button" className="pr-4">
                      <CiCircleQuestion size={24} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* 単語説明 */}
          <div
            className={`${selected ? "mr-4 hidden w-3/5 rounded-[5rem] border-2 shadow-lg lg:inline-block" : "hidden"}`}
          >
            <div className="flex h-[10%] items-center justify-end rounded-t-[5rem] border-b-2 bg-main pr-8">
              <LiaTimesSolid size={32} onClick={handleClick} />
            </div>
            <div className="rounded-b-[5rem]">
              <div className="mt-3 text-center text-[3rem] underline">
                {title}
              </div>
              <div className="mx-10 mt-8 text-center text-2xl">{word}</div>
              <div className="mx-10 mt-4 flex text-2xl text-blue-300">
                <FaLink color="gray" size={32} />
                {link}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* モバイル単語説明 */}
      <div
        className={
          selected
            ? "absolute left-1/2 top-1/2 z-50 mr-4 h-3/4 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border-2 bg-white shadow-lg lg:hidden"
            : "hidden"
        }
      >
        <div className="flex h-[10%] items-center justify-end rounded-t-[2rem] border-b-2 bg-main pr-8">
          <LiaTimesSolid size={32} onClick={handleClick} />
        </div>
        <div className="rounded-b-[2rem]">
          <div className="mt-3 text-center text-2xl underline">{title}</div>
          <div className="text-1xl mx-10 mt-8 text-center">{word}</div>
          <div className="text-1xl mx-10 mt-4 flex text-blue-300">
            <FaLink color="gray" size={24} />
            {link}
          </div>
        </div>
      </div>
    </main>
  );
};

export default WordbookDetails;
