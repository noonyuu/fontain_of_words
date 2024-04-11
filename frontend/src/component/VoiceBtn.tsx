// 録音ボタン
import React, { useContext, useEffect, useState } from "react";
import { MdKeyboardVoice } from "react-icons/md"; // 録音アイコン
// コンポーネント
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
// コンテキスト
import { GlobalContext } from "../context/GlobalContext";

import { Init, Start, Stop } from "../scripts/stt";

interface Btnprops {
  voice: boolean;
}

const VoiceBtn = () => {
  const history = useNavigate();
  const { openModal, record, selectedItem, setRecord, setOpenModal } =
    useContext(GlobalContext);

  const [r, setR] = useState("");
  const henkan = () => {
    const text: string =
      "もちろんです。||--Golang--||、||--別名Go--||は、||--Google--||によって||--開発--||された||--プログラミング言語--||です。||--2009年--||に||--公開--||され、||--システムプログラミング--||に適した||--静的型付け言語--||として||--設計--||されました。その||--主--||な||--特徴--||は||--以下--||の||--通り--||です。||--Go--||は、||--シンプル--||で読みやすい||--文法--||を持っており、||--C言語--||の||--よう--||な||--伝統的--||な||--構文--||に基づいていますが、||--冗長--||な||--要素--||を取り除いています。||--Go--||は||--ゴルーチン--||と呼ばれる||--軽量スレッド--||を||--使用--||し、||--チャネル--||を介して||--通信--||する||--こと--||で、||--並行処理--||を||--容易--||にします。||--Go--||は||--コンパイル速度--||が||--非常--||に速い||--こと--||で知られており、大||--規模--||な||--プロジェクト--||でも||--迅速--||な||--ビルド--||が||--可能--||です。||--自動メモリ管理--||を||--提供--||し、||--開発者--||が||--メモリリーク--||を||--心配--||する||--こと--||なく||--コード--||を書く||--こと--||ができます。||--Go--||には||--豊富--||な||--標準ライブラリ--||があり、||--ネットワーキング--||、||--暗号化--||、||--文字列処理--||など、||--多く--||の||--標準的--||な||--機能--||を||--提供--||しています。||--Go--||は||--静的型付け言語--||であり、||--型安全性--||が||--保証--||されている||--ため--||、||--実行時エラー--||よりも||--コンパイル時--||に||--多く--||の||--エラー--||を||--検出--||する||--こと--||ができます。||--Go--||の||--プログラム--||は、||--さまざま--||な||--オペレーティングシステム--||や||--アーキテクチャ--||で||--コンパイル--||して||--実行--||する||--こと--||ができます。||--Go--||には||--フォーマットツール--||（||--gofmt--||）、||--ドキュメントツール--||（||--godoc--||）、||--パッケージ管理--||（||--go--|| ||--get--||）など、||--効率的--||な||--開発--||を||--サポート--||する||--ツール--||が含まれています。||--Go--||は、特に||--ネットワークサーバー--||、||--データベース--||、||--分散システム--||、||--クラウドサービス--||などの||--分野--||で好んで||--使用--||されています。その||--効率性--||と||--シンプルさ--||から、||--多く--||の||--企業--||や||--オープンソースプロジェクト--||で||--採用--||されています。";
    let result = text.replace(/\|\|--/g, "<span className='text-red-500'>");
    result = result.replace(/--\|\|/g, "</span>");
    setR(result);
  };

  const ClickBtn = () => {
    if (!openModal) {
      setOpenModal(true);
    }
  };

  // 保存ページへ
  const Save = () => {
    setOpenModal(false);
    if (selectedItem[0]?.name === undefined) {
      alert("カテゴリーを選択してください");
    }else{
      Stop();
      setRecord(false);
      history("../SavePage");
    }
  };

  // 録音
  const Record = () => {
    Init();
    console.log("録音開始");
    Start();
    if (!openModal) {
      setRecord(true);
      henkan();
    } else {
      setRecord(true);
      setOpenModal(false);
    }
  };

  const NowCancel = () => {
    // Stop();
    setOpenModal(false);
    setRecord(false);
  };

  const DownCancel = () => {
    Stop();
    setOpenModal(false);
    setRecord(false);
  };

  useEffect(() => {
    console.log("open updated:", openModal);
  }, [record, openModal]);

  return (
    <>
      <div className="">
        {!record ? (
          <Modal
            title="開始・継続しますか？"
            word1="いいえ"
            word2="はい"
            now={Record}
            down={NowCancel}
          />
        ) : (
          <Modal
            title="どうしますか？"
            word1="停止"
            word2="保存"
            now={Save}
            down={DownCancel}
          />
        )}
      </div>
      <div className="flex justify-end pr-[5%] lg:justify-start lg:pl-[5%]">
        {record ? (
          <MdKeyboardVoice
            className="mt-0 size-16 rounded-full bg-mark text-justify text-5xl lg:size-20"
            onClick={ClickBtn}
          />
        ) : (
          <MdKeyboardVoice
            className="mt-0 size-16 rounded-full bg-gray-400 text-justify text-5xl lg:size-20"
            onClick={ClickBtn}
          />
        )}
      </div>
    </>
  );
};

export default VoiceBtn;
