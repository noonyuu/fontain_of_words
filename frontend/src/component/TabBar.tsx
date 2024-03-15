// 全文、単語のみ、検索履歴を選択する時の下線
import React, { useContext, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { GlobalContext } from "../context/GlobalContext";

// コンポーネントのインポート
import BookMark from './BookMark'
import WardsVoice from './WardsVoice';
import { BsFillBookmarkDashFill } from "react-icons/bs";   // ブックマーク無
import { BsFillBookmarkCheckFill } from "react-icons/bs";   // ブックマーク有

const TabBar = () => {

  // 全データ
  const words = [
    [
      "プロジェクト",
      "プロジェクトは、特定の目標を達成するために一時的に行われる取り組みや作業のことを指します。プロジェクトは一定のスコープや期間、予算を持ち、それらの制約の中で目標を達成するための計画が立てられます。プロジェクトは、新しい製品やサービスの開発、インフラストラクチャの構築、組織内の変革など、さまざまな目的で実施されます。プロジェクトは通常、プロジェクトマネージャーがリーダーシップを取り、関係者とのコミュニケーションや進捗管理を行いながら進行します。",
      "http://~~~~",
    ],
    ["アジャイル開発", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],
    ["スプリント", "", "http://~~~~"],

  ];

  // テスト：保存している有無を保持する
  const test =  [];

  // 初期値をすべてfalseにする
  for(let i = 0; i < words.length; i++){
    test[i] = false;
  }
  
  // ブックマークボタンの切り替え
  const [selected, setSelected] = useState(test);

  useEffect(()=>{
    console.log()
  })
    
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '全文',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: '単語のみ',
      // ここで単語回す
      children: 
      <ul className='h-full overflow-auto'>
        {words.map((word,index) => ( 
          <li
            key={index}
            className='flex justify-between h-10 border-b-2 p-1 border-gray-300 text-mark text-xl underline list-none overflow-y-auto'
          >
            <div>{word[0]}</div>
            <div 
              className='mx-2' 
              onClick={() => setSelected(selected.map((item,selectIndex) => (index === selectIndex ? !selected[selectIndex] : selected[selectIndex])))}
            >
              <button>
                {selected[index]
                ? <BsFillBookmarkCheckFill className='text-yellow-300 size-7'/>
                : <BsFillBookmarkDashFill className='text-gray-300 size-7'/>}
              </button>
            </div>
          </li>
        ))}
      </ul>

    },
    {
      key: '3',
      label: '検索履歴',
      children:
      <ul className='overflow-y-scroll'>

        {words.map((word,index) => (
          <li
            key={index}
            className='flex justify-between h-10 border-b-2 p-1 border-gray-300 text-mark text-xl underline list-none'
          >
            <div>{word[0]}</div>
            <div 
              className='mx-2' 
              onClick={() => setSelected(selected.map((item,selectIndex) => (index === selectIndex ? !selected[selectIndex] : selected[selectIndex])))}
            >
              <button>
                {selected[index]
                ? <BsFillBookmarkCheckFill className='text-yellow-300 size-7'/>
                : <BsFillBookmarkDashFill className='text-gray-300 size-7'/>}
              </button>
            </div>
          </li>
        ))}
      </ul>

    },
  ];

  return(
    <Tabs defaultActiveKey="1" items={items}/>
  )
}

export default TabBar
