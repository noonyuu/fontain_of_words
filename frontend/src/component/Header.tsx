import React, { useContext, useState } from "react";
import mainIcon from "../assets/app.webp";
import { GlobalContext } from "../context/GlobalContext";

const Header = () => {
  const {profileModal,setProfileModal} = useContext(GlobalContext)

  // プロフィールアイコンをクリックした時の処理
  const onClickProfileIcon = () => {
    setProfileModal(!profileModal);
  };

  return (
    <header className="fixed top-0 z-50 my-auto flex h-16 w-full border-b-2 border-main bg-white py-2">
      <button
        className="ml-4 size-10 justify-start rounded-full z-50"
        onClick={onClickProfileIcon}
      >
        <img src={mainIcon} alt="mainIcon" />
      </button>
      <div className="mb-1 mr-4 flex flex-grow justify-end">
        <div className="flex items-center">三</div>
      </div>

      {/* profile modal */}
      <nav
        className={
          profileModal
            ? "fixed left-0 top-0 flex h-full w-2/3 items-center justify-center bg-white md:w-2/5 lg:w-1/3"
            : "hidden"
        }
      >
        <div className="flex h-full w-full flex-col justify-between">
          {/* 画面上部に配置 */}
          <div>
            {/* <img
              src={mainIcon}
              alt=""
              className="my-2 ml-4 size-10 justify-start rounded-full"
            /> */}
            <img
              src={mainIcon}
              alt="UserIcon"
              className="mx-auto mt-16 size-24 rounded-full"
            />
            <p className="mt-4 text-center text-base">
              user:<span>kento</span>
            </p>
            <div className="mt-2 flex justify-center">
              <button type="button" className="px-2 py-1 text-sm">
                アカウントを管理
              </button>
            </div>
          </div>
          {/* 画面下部に配置 */}
          <div className="mb-8 mt-auto">
            <div className="flex justify-center">
              <button
                type="button"
                className="px-2 py-1 text-sm"
                onClick={onClickProfileIcon}
              >
                ログアウト
              </button>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="mt-8 px-2 py-1 text-sm"
                onClick={onClickProfileIcon}
              >
                アカウントを削除する
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
