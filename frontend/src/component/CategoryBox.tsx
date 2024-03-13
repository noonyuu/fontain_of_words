// プルダウンメニューと検索ボックス
import React from 'react'

interface Btnprops {
  elseCategory: boolean
}

const CategoryBox:React.FC<Btnprops> = ({elseCategory}) => {
  return (
    // true：入力ボックス false：プルダウンメニュー(初期値)
    <>
    {elseCategory
    ?<input type="text" id="category" placeholder={"例）IT"} className='h-7 lg:h-10 w-[100%] bg-gray-100 rounded-md'></input>
    :<select id="category" className='h-7 lg:h-10 w-[100%] lg:w-56 bg-gray-100 rounded-md'><option value="option1">IT</option></select>}
    </>
  )
}

export default CategoryBox
