// 録音ページ
import { useContext, useState } from "react";
import parse from "html-react-parser";
// コンポーネント
import { RiArrowGoBackFill } from "react-icons/ri"; // 戻るボタン
import VoiceBtn from "../component/VoiceBtn"; // 録音ボタン
import CategoryBox from "../component/CategoryBox"; // カテゴリー選択ボックス
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
// コンテキスト

const VoicePage = () => {
  const history = useNavigate();
  const { openModal, record, setRecord, setOpenModal } = useContext(GlobalContext);

  // const [r, setR] = useState("");
  // const henkan = () => {
  //   const text: string =
  //     "もちろんです。||--Golang--||、||--別名Go--||は、||--Google--||によって||--開発--||された||--プログラミング言語--||です。||--2009年--||に||--公開--||され、||--システムプログラミング--||に適した||--静的型付け言語--||として||--設計--||されました。その||--主--||な||--特徴--||は||--以下--||の||--通り--||です。||--Go--||は、||--シンプル--||で読みやすい||--文法--||を持っており、||--C言語--||の||--よう--||な||--伝統的--||な||--構文--||に基づいていますが、||--冗長--||な||--要素--||を取り除いています。||--Go--||は||--ゴルーチン--||と呼ばれる||--軽量スレッド--||を||--使用--||し、||--チャネル--||を介して||--通信--||する||--こと--||で、||--並行処理--||を||--容易--||にします。||--Go--||は||--コンパイル速度--||が||--非常--||に速い||--こと--||で知られており、大||--規模--||な||--プロジェクト--||でも||--迅速--||な||--ビルド--||が||--可能--||です。||--自動メモリ管理--||を||--提供--||し、||--開発者--||が||--メモリリーク--||を||--心配--||する||--こと--||なく||--コード--||を書く||--こと--||ができます。||--Go--||には||--豊富--||な||--標準ライブラリ--||があり、||--ネットワーキング--||、||--暗号化--||、||--文字列処理--||など、||--多く--||の||--標準的--||な||--機能--||を||--提供--||しています。||--Go--||は||--静的型付け言語--||であり、||--型安全性--||が||--保証--||されている||--ため--||、||--実行時エラー--||よりも||--コンパイル時--||に||--多く--||の||--エラー--||を||--検出--||する||--こと--||ができます。||--Go--||の||--プログラム--||は、||--さまざま--||な||--オペレーティングシステム--||や||--アーキテクチャ--||で||--コンパイル--||して||--実行--||する||--こと--||ができます。||--Go--||には||--フォーマットツール--||（||--gofmt--||）、||--ドキュメントツール--||（||--godoc--||）、||--パッケージ管理--||（||--go--|| ||--get--||）など、||--効率的--||な||--開発--||を||--サポート--||する||--ツール--||が含まれています。||--Go--||は、特に||--ネットワークサーバー--||、||--データベース--||、||--分散システム--||、||--クラウドサービス--||などの||--分野--||で好んで||--使用--||されています。その||--効率性--||と||--シンプルさ--||から、||--多く--||の||--企業--||や||--オープンソースプロジェクト--||で||--採用--||されています。";
  //   let result = text.replace(/\|\|--/g, "<span className='text-red-500'>");
  //   result = result.replace(/--\|\|/g, "</span>");
  //   setR(result);
  // };

  // 音声の処理
  const Recording = () => {
    // console.log("録音開始");
    // console.log("openModal", openModal);
    // if (!openModal) {
    //   setRecord(true);
    //   henkan();
    // }else {
    //   // setRecord(false);
    //   // setOpenModal(true);
    // }
  };

  return (
    <main className="h-dvh w-dvw overflow-y-auto bg-blue-300 pt-16">
      <RiArrowGoBackFill
        className="m-4 size-5 lg:size-8"
        onClick={() => history(-1)}
      />
      <div className="lg:flex h-[calc(100%-5.25rem-25px-10%)]">
        <div className="Kaisei Tokumin mx-[10%] my-6 text-base lg:mx-16 lg:ml-10 lg:mt-[10%] lg:w-1/4 lg:text-lg">
          <p className="mb-2">カテゴリー入力</p>
          <CategoryBox elseCategory={false} />
        </div>
        <div
          // type="text"
          // id="record"
          className="relative mx-[10%] my-3.5 flex h-[70%] w-[80%] rounded-3xl bg-white p-4 text-black shadow-[inset_0px_6px_2px_rgba(0,4,4,0.25)] lg:mx-10 lg:h-full lg:w-3/4 lg:p-8"
        >
          <div className="h-full overflow-auto">
            {/* {parse(r)} */}
            {/* {parse(r)} */}
          </div>
        </div>
      </div>
      {/* TODO: あとで位置変えたい */}
      <div className="h-[10%] w-full lg:w-1/4 flex justify-end lg:justify-center">
        <VoiceBtn />
      </div>
    </main>
  );
};

export default VoicePage;
