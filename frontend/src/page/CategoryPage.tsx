// 単語帳カテゴリーページ
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

import { RiArrowGoBackFill } from "react-icons/ri";   // 戻るボタン
import SearchBox from '../component/SearchBox';       // 検索ボックス
import WardsDictionary from '../component/WardsDictionary';
import NewCategoryModal from '../component/NewCategoryModal';

const CategoryPage_category = () => {

  const history = useNavigate();

  const returnPage = () => {
    console.log("returnPage");
    history("/secret/HomePage");
  };

  // 全データ
  const Data = [
    [
      "プロジェクト",
      "プロジェクトは、特定の目標を達成するために一時的に行われる取り組みや作業のことを指します。プロジェクトは一定のスコープや期間、予算を持ち、それらの制約の中で目標を達成するための計画が立てられます。プロジェクトは、新しい製品やサービスの開発、インフラストラクチャの構築、組織内の変革など、さまざまな目的で実施されます。プロジェクトは通常、プロジェクトマネージャーがリーダーシップを取り、関係者とのコミュニケーションや進捗管理を行いながら進行します。",
      "http://~~~~",
    ],
    ["アジャイル開発", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
  ]

  const [name, setName] = useState("");           // カテゴリー名を保持する変数
  const [btnBool, setBtnBool] = useState(false);  // モーダルの表示切替
  

  return (
    <main className="overflow-y-auto">
        <div><RiArrowGoBackFill className='size-5 m-4 mt-20' onClick={returnPage}/></div>
        <div className='lg:my-8 ml-4 lg:ml-10'><SearchBox /></div>
        <div className='mt-5 border-t-[1px] border-gray-300 mx-5 lg:mx-10'>
            <div><WardsDictionary word='IT'/></div>
            <div><WardsDictionary word='あああ'/></div>
        </div>
        <div className='absolute bottom-0 py-5 w-dvw text-center bg-white'>
            <button className='mb-7 w-3/4 h-10 bg-gray-300 rounded-xl' onClick={() => btnBool ? setBtnBool(false) : setBtnBool(true)}>カテゴリーの追加</button>
        </div>
        <div className={btnBool ? 'z-1' : 'hidden'}>
          <div className='absolute text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-36 w-60 border-4 border-mark bg-white rounded-3xl text-xl'>
            <button className='float-right size-8 bg-white border-2 border-mark rounded-full m-1 font-bold' onClick={() => setBtnBool(false)}>✕</button>
            <div className='py-2 w-full border-b-2 border-mark'>追加するカテゴリー</div>
            <input className='h-7 w-[80%] my-3 text-sm bg-gray-300 rounded-sm' placeholder={"カテゴリー名の入力"} onChange={(event) => setName(event.target.value)}></input>
            <button className='float-right mr-5 p-1 rounded-md text-base text-white bg-mark'>追加する</button>
          </div>
        </div>
    </main>
  )
}

export default CategoryPage_category
