import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
// icon
import { BsArrowReturnLeft } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { LiaTimesSolid } from "react-icons/lia";
import { FaLink } from "react-icons/fa6";

import { Get_words, } from "../scripts/word";
import { useParams } from "react-router-dom";

const WordbookDetails = () => {
    const [title, setTitle] = useState("");
    const [wordid, setID] = useState("");
    const [link, setLink] = useState("");
    const [selected, setSelected] = useState(false);
    const [isshow, SetAIShow] = useState(false);
    const [refresh_isshow, refresh_SetAIShow] = useState(true);
    const [btn_text, SetText] = useState("");
    const [refresh_btn_text, RefreshSetText] = useState("もう一度聞く");
    const [words, setWord] = useState([
        {
            "Word": "",
            "WordID": ""
        }
    ]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = React.useState(true);
    let is_refresh = false;
    const { id } = useParams()

    React.useEffect(() => {
        // すでに初期化されていたら処理を抜ける
        if (!loading) {
            return;
        }

        Get_words(id).then((data: any) => {
            setWord(data.data);
        });
        // 初期化済みのフラグを立てる
        setLoading(false);
    }, [loading]);

    const CallAI = (word_str: string) => {
        if (word_str == "") {
            return;
        }

        SetText("AIに聞いています");

        //{ message: 'スイッチは、回路内の電流の経路を変更する電気機械式デバイスです。電流をオンまたはオフしたり、回路の別の部分に経路を切り替えるために使用できます。', result: 'ok', status: 'success' }
        fetch("https://localhost:8443/app/ai?refresh=0", {
            method: "POST",
            body: JSON.stringify({
                "Text": word_str
            })
        }).then((res) => res.json()).then((json) => {
            if (json["status"] == "success") {
                setR(json["message"]);
                SetAIShow(false);
                refresh_SetAIShow(true);
            }
        })
    }

    const Call_Refresh_AI = (word_str: string) => {
        console.log(word_str);
        if (word_str == "") {
            return;
        }

        RefreshSetText("AIに聞いています");

        //{ message: 'スイッチは、回路内の電流の経路を変更する電気機械式デバイスです。電流をオンまたはオフしたり、回路の別の部分に経路を切り替えるために使用できます。', result: 'ok', status: 'success' }
        fetch("https://localhost:8443/app/ai?refresh=1", {
            method: "POST",
            body: JSON.stringify({
                "Text": word_str
            })
        }).then((res) => res.json()).then((json) => {
            console.log(json);
            if (json["status"] == "success") {
                setR(json["message"]);
                RefreshSetText("もう一度聞く");
            }
        })
    }

    const Detail = (index: number) => {
        console.log(words[index]["Word"]);
        setTitle(words[index]["Word"]);
        fetch("https://localhost:8443/app/description/" + words[index]["WordID"], {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            // ここを修正
            .then((json) => {
                SetAIShow(false);
                setID("");
                SetText("");

                if (json["description"] == undefined) {
                    SetAIShow(true);
                    setID(words[index]["Word"]);
                    json["description"] = "";
                    SetText("AIに聞く");

                    refresh_SetAIShow(false);
                } else {
                    setID(words[index]["Word"]);
                }

                setR(json["description"]);
            })
            .catch(() => console.log("error"));

        //setWord(words[index]["Word"]);
        setLink("https://google.com/search?q=" + words[index]["Word"]);
        setSelected(true);
        handleClick();
    };

    const [r, setR] = useState("");
    const henkan = () => {
        const text: string =
            "もちろんです。||--Golang--||、||--別名Go--||は、||--Google--||によって||--開発--||された||--プログラミング言語--||です。||--2009年--||に||--公開--||され、||--システムプログラミング--||に適した||--静的型付け言語--||として||--設計--||されました。その||--主--||な||--特徴--||は||--以下--||の||--通り--||です。||--Go--||は、||--シンプル--||で読みやすい||--文法--||を持っており、||--C言語--||の||--よう--||な||--伝統的--||な||--構文--||に基づいていますが、||--冗長--||な||--要素--||を取り除いています。||--Go--||は||--ゴルーチン--||と呼ばれる||--軽量スレッド--||を||--使用--||し、||--チャネル--||を介して||--通信--||する||--こと--||で、||--並行処理--||を||--容易--||にします。||--Go--||は||--コンパイル速度--||が||--非常--||に速い||--こと--||で知られており、大||--規模--||な||--プロジェクト--||でも||--迅速--||な||--ビルド--||が||--可能--||です。||--自動メモリ管理--||を||--提供--||し、||--開発者--||が||--メモリリーク--||を||--心配--||する||--こと--||なく||--コード--||を書く||--こと--||ができます。||--Go--||には||--豊富--||な||--標準ライブラリ--||があり、||--ネットワーキング--||、||--暗号化--||、||--文字列処理--||など、||--多く--||の||--標準的--||な||--機能--||を||--提供--||しています。||--Go--||は||--静的型付け言語--||であり、||--型安全性--||が||--保証--||されている||--ため--||、||--実行時エラー--||よりも||--コンパイル時--||に||--多く--||の||--エラー--||を||--検出--||する||--こと--||ができます。||--Go--||の||--プログラム--||は、||--さまざま--||な||--オペレーティングシステム--||や||--アーキテクチャ--||で||--コンパイル--||して||--実行--||する||--こと--||ができます。||--Go--||には||--フォーマットツール--||（||--gofmt--||）、||--ドキュメントツール--||（||--godoc--||）、||--パッケージ管理--||（||--go--|| ||--get--||）など、||--効率的--||な||--開発--||を||--サポート--||する||--ツール--||が含まれています。||--Go--||は、特に||--ネットワークサーバー--||、||--データベース--||、||--分散システム--||、||--クラウドサービス--||などの||--分野--||で好んで||--使用--||されています。その||--効率性--||と||--シンプルさ--||から、||--多く--||の||--企業--||や||--オープンソースプロジェクト--||で||--採用--||されています。";
        let result = text.replace(/\|\|--/g, "<span className='text-red-500'>");
        result = result.replace(/--\|\|/g, "</span>");
        setR(result);
    };

    const handleClick = () => {
        //henkan();
        setSelected(!selected);
        setModal(!modal);
        console.log(modal);
    };

    return (
        <main className="h-full overflow-y-auto	bg-fixed bg-bottom pb-[30px] pt-16">
            <div
                className={`${modal ? "h-full bg-gray-50 opacity-50 lg:bg-white lg:opacity-100" : ""}`}
            >
                <div className="ml-4 h-5 pt-4">
                    {/* TODO:仮アイコン */}
                    <BsArrowReturnLeft size={24} />
                </div>
                <h2 className="relative mr-6 mt-8 flex h-10 w-24 items-center justify-center bg-main font-bold leading-4 text-white after:absolute after:-right-10 after:top-0 after:block after:h-10 after:border-[20px] after:border-r-[20px] after:border-solid after:border-main after:border-r-transparent">
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
                                        <span>{word["Word"]}</span>
                                        <button type="button" className="pr-4">
                                            <CiCircleQuestion size={24} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* ディスクトップ単語説明 */}
                    <div
                        className={`${selected ? "mr-4 hidden h-full w-3/5 rounded-[3rem] border-2 shadow-lg lg:inline-block" : "hidden"}`}
                    >
                        <div className="flex h-[10%] items-center justify-end rounded-t-[3rem] border-b-2 bg-main pr-8">
                            <LiaTimesSolid size={32} onClick={handleClick} />
                        </div>
                        <div className="h-[70%] rounded-b-[3rem]">
                            <div className="mt-3 text-center text-[3rem] underline">
                                {title}
                            </div>
                            <div className="mx-10 mt-8 h-[95%] overflow-auto text-center text-2xl">
                                {parse(r)}
                                <button className={`${isshow ? "" : "hidden"}`} onClick={() => {
                                    CallAI(wordid);
                                }}>{btn_text}</button>
                                <button className={`${refresh_isshow ? "" : "hidden"}`} onClick={() => {
                                    Call_Refresh_AI(wordid);
                                }}>{refresh_btn_text}</button>
                            </div>
                            <div className="mx-10 mt-4 flex text-2xl text-blue-300">
                                <FaLink color="gray" size={32} />
                                <a href={link} target="_blank" rel="noopener noreferrer">検索リンク</a>
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
                <div className="h-[60%] rounded-b-[2rem]">
                    <div className="mt-3 text-center text-2xl underline">{title}</div>
                    <div className="text-1xl mx-6 mt-8 h-[95%] overflow-auto text-center">
                        {parse(r)}
                        {parse(r)}
                    </div>
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
