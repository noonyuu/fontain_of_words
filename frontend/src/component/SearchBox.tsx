// 検索ボックス
import React from 'react'
import { IoSearch } from "react-icons/io5";   // 検索アイコンボタン

const SearchBox = () => {
  return (
    <div>
      <input type="text" id="category" placeholder={"検索"} className='float-left h-10px w-10px bg-gray-200 text-gray-700'></input>
      <button className='bg-gray-200 text-gray-400 size-6'><IoSearch /></button>
    </div>
  )
}

export default SearchBox
