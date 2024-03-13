// ブックマークボタン
import React from 'react'
import { BsFillBookmarkDashFill } from "react-icons/bs";   // ブックマーク無
import { BsFillBookmarkCheckFill } from "react-icons/bs";   // ブックマーク有

interface Btnprops {
    bookmark: boolean
}

const BookMark:React.FC<Btnprops> = ({bookmark}) => {
  return (
    <div>
      {bookmark
      ? <BsFillBookmarkCheckFill className='text-yellow-300 size-7'/>
      : <BsFillBookmarkDashFill className='text-gray-300 size-7'/>}
    </div>
  )
}

export default BookMark


