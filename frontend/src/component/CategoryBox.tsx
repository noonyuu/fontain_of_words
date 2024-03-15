// プルダウンメニューと検索ボックス
import useConfig from "antd/es/config-provider/hooks/useConfig";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

interface Book {
  Id: number;
  Name: string;
}

// Define the structure of your fetched data
interface BooksResponse {
  books: Book[];
}

interface Btnprops {
  elseCategory: boolean;
}

const CategoryBox: React.FC<Btnprops> = ({ elseCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedItem, setSelectedItem } = useContext(GlobalContext);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItem(event.target.value);
  };

  const [items, setItems] = useState<BooksResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fountain-of-words.noonyuu.com/app/wordbook/get_books",
        );
        const data: BooksResponse = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setItems(null); // Ensure state is updated even on error
      }
    };

    fetchData();
  }, []);

  return (
    // true：入力ボックス false：プルダウンメニュー(初期値)
    <>
      {elseCategory ? (
        <input
          type="text"
          id="category"
          placeholder={"例）IT"}
          className="h-7 w-[100%] rounded-md bg-gray-100 lg:h-10"
        ></input>
      ) : (
        <div className="relative">
          <div className="flex items-center">
            <input
              type="text"
              value={selectedItem}
              onChange={handleInputChange}
              readOnly={!isOpen}
              className="h-10 w-full flex-grow cursor-pointer rounded-l-md bg-gray-100 px-4"
              onClick={() => setIsOpen(!isOpen)}
            />
            {/* 展開矢印 */}
            <div
              className="flex h-10 cursor-pointer items-center rounded-r-md bg-white px-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform ${isOpen && "rotate-180"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {isOpen && items && items.books ? (
            <div className="absolute z-10 w-full border bg-white">
              {items.books.map((item) => (
                <div
                  key={item.Id}
                  className="p-2 hover:bg-gray-100"
                  onClick={() => handleItemClick(item.Name)}
                >
                  {item.Name}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default CategoryBox;
