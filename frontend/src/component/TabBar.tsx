import React, { useEffect } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import WardsVoice from "./WardsVoice";

import parse from "html-react-parser";

const TabBar = () => {
  const [result, setResult] = React.useState("");

  useEffect(() => {
    const storedResult = localStorage.getItem("result_result");
    if (storedResult) {
      setResult(storedResult);
    }
  }, []);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "全文",
      children: parse(result),
    },
    {
      key: "2",
      label: "単語のみ",
      children: <WardsVoice word="2" />,
    },
    {
      key: "3",
      label: "検索履歴",
      children: <WardsVoice word="3" />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default TabBar;
