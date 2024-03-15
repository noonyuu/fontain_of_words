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
  const allData = [
    "IT","ああ"
  ]

  const [name, setName] = useState("");           // カテゴリー名を保持する変数
  const [btnBool, setBtnBool] = useState(false);  // モーダルの表示切替
  const [datas, setDatas] = useState(allData);       // データの追加をする変数

  // 要素追加
  const addData = () => {
    setDatas([...datas, name]);
    setBtnBool(false);
  }

  return (
    <main className="overflow-y-auto">
        <div><RiArrowGoBackFill className='size-5 m-4 mt-20' onClick={returnPage}/></div>
        <div className='lg:my-8 ml-4 lg:ml-10'><SearchBox /></div>
        <div className='mt-5 border-t-[1px] border-gray-300 mx-5 lg:mx-10'>
          {datas.map((index) => (
            <div><WardsDictionary word={index}/></div>
          ))}
            {/* <div><WardsDictionary word='IT'/></div>
            <div><WardsDictionary word='あああ'/></div> */}
        </div>
        <div className='absolute bottom-0 py-5 w-dvw text-center bg-white'>
            <button className='mb-7 w-3/4 h-10 bg-gray-300 rounded-xl' onClick={() => btnBool ? setBtnBool(false) : setBtnBool(true)}>カテゴリーの追加</button>
        </div>
        {/* モーダル */}
        <div className={btnBool ? 'z-1' : 'hidden'}>
          <div className='absolute text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-36 w-60 border-4 border-mark bg-white rounded-3xl text-xl'>
            <button className='float-right size-8 bg-white border-2 border-mark rounded-full m-1 font-bold' onClick={() => setBtnBool(false)}>✕</button>
            <div className='py-2 w-full border-b-2 border-mark' onClick={() => addData}>追加するカテゴリー</div>
            <input className='h-7 w-[80%] my-3 text-sm bg-gray-300 rounded-sm' placeholder={"カテゴリー名の入力"} onChange={(event) => setName(event.target.value)}></input>
            <button className='float-right mr-5 p-1 rounded-md text-base text-white bg-mark' onClick={addData}>追加する</button>
          </div>
        </div>
    </main>
  )
}

export default CategoryPage_category
