// プルダウンメニューと検索ボックス
import React from 'react'

const CategoryBox = () => {
  return (
    // プルダウンメニュー
    <select id="category" className='h-7 lg:h-10 w-[100%] lg:w-56 bg-gray-100 rounded-md'>
          <option value="option1">IT</option>
    </select>

    // 入力ボックス
    // <input type="text" id="category" placeholder={"例）IT"} className='h-7 lg:h-10 w-[100%] bg-gray-100 rounded-md'></input>
  )
}

export default CategoryBox
