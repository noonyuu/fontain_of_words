// 単語帳の単語
import React from 'react'
import { FaChevronRight } from "react-icons/fa";

interface Btnprops {
    word: string
    id : string
    move_click : (id : string) => void
    remove_click : (id : string) => void
}

const WardsDictionary: React.FC<Btnprops> = ({id,word,move_click,remove_click }) => {
    return (
        <div className='flex justify-between items-center h-10 border-b-[1px] border-gray-300 text-xl px-8 underline'>
            <div>{word}</div>
            <div className='mx-2'>
                <button className='mr-5' onClick={() => remove_click(id)}>
                    削除
                </button>
                <button onClick={() => move_click(id)}>
                    <FaChevronRight className='text-gray-300' />
                </button>
            </div>
        </div>
    )
}

export default WardsDictionary
