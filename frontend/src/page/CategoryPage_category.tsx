// 単語帳カテゴリーページ
import React from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";   // 戻るボタン
import SearchBox from '../component/SearchBox';       // 検索ボックス
import WardsDictionary from '../component/WardsDictionary';
import { useNavigate } from 'react-router-dom';

const CategoryPage_category = () => {
  const history = useNavigate();
  return (
    <>
      <main>
        <div className=" h-[51.97px] w-dvw bg-blue-300 lg:h-[70px]">header</div>
        <RiArrowGoBackFill className="m-4 size-5" onClick={() => history(-1)} />
        <div className="ml-4 lg:my-8 lg:ml-10">
          <SearchBox />
        </div>
        <div className="mx-5 mt-5 border-t-[1px] border-gray-300 lg:mx-10">
          <div>
            <WardsDictionary word="IT" />
          </div>
          <div>
            <WardsDictionary word="あああ" />
          </div>
        </div>
        <div className="absolute bottom-0 w-dvw bg-white py-5 text-center">
          <button className="mx-5 h-10 w-3/4 rounded-xl bg-gray-300">
            カテゴリーの追加
          </button>
        </div>
      </main>
    </>
  );
}

export default CategoryPage_category
