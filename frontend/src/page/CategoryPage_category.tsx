// 単語帳カテゴリーページ
import React from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";   // 戻るボタン
import SearchBox from '../component/SearchBox';       // 検索ボックス
import WardsDictionary from '../component/WardsDictionary';

const CategoryPage_category = () => {
  return (
    <>
    <main>
        <div className=' bg-blue-300 w-dvw h-[51.97px] lg:h-[70px]'>header</div>
        <RiArrowGoBackFill className='size-5 m-4'/>
        <div className='lg:my-8 ml-4 lg:ml-10'><SearchBox /></div>
        <div className='mt-5 border-t-[1px] border-gray-300 mx-5 lg:mx-10'>
            <div><WardsDictionary word='IT'/></div>
            <div><WardsDictionary word='あああ'/></div>
        </div>
        <div className='absolute bottom-0 py-5 w-dvw text-center bg-white'>
            <button className='mx-5 w-3/4 h-10 bg-gray-300 rounded-xl'>カテゴリーの追加</button>
        </div>
    </main>
    </>
  )
}

export default CategoryPage_category
