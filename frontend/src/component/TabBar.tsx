// 全文、単語のみ、検索履歴を選択する時の下線
import React from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Wards from './Wards';

const onChange = (key: string) => {
    console.log(key);
  };
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '全文',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: '単語のみ',
      children: <Wards word='auto word'/>,
    },
    {
      key: '3',
      label: '検索履歴',
      children: <Wards word='search word'/>,
    },
  ];

const TabBar = () => {
   return(
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
   )
}

export default TabBar
