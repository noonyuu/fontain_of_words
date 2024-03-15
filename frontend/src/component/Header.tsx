import React, { useContext, useState } from "react";
import mainIcon from "../assets/app.webp";
import { GlobalContext } from "../context/GlobalContext";

import { Logout } from "../scripts/Auth";

const Header = () => {
  const { profileModal, setProfileModal } = useContext(GlobalContext);
  const [openMenu, setOpenMenu] = useState(false);

  // メニューを開く処理
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
    setProfileModal(!profileModal);
  };

  // ログアウト処理
  const handleLogout = async () => {
    const result = await Logout();
    if (result) {
      console.log("ログアウトしました");
    }
  };

  return (
    <header className="fixed top-0 z-50 my-auto flex h-16 w-full border-b-2 border-main bg-white py-2">
      <button className="z-50 ml-4 size-10 justify-start rounded-full">
        <img src={mainIcon} alt="mainIcon" />
      </button>
      <div className="mr-4 flex flex-grow justify-end">
        <button
          onClick={handleMenuOpen}
          type="button"
          className="z-50 space-y-2"
        >
          <div
            className={
              openMenu
                ? "h-0.5 w-8 translate-y-2.5 rotate-45 bg-gray-600 transition duration-500 ease-in-out"
                : "h-0.5 w-8 bg-gray-600 transition duration-500 ease-in-out"
            }
          />
          <div
            className={
              openMenu
                ? "opacity-0 transition duration-500 ease-in-out"
                : "h-0.5 w-8 bg-gray-600 transition duration-500 ease-in-out"
            }
          />
          <div
            className={
              openMenu
                ? "h-0.5 w-8 -rotate-45 bg-gray-600 transition duration-500 ease-in-out"
                : "h-0.5 w-8 bg-gray-600 transition duration-500 ease-in-out"
            }
          />
        </button>
      </div>

      {/* profile modal */}
      <nav
        className={
          profileModal
            ? "fixed right-0 top-0 flex h-full w-2/3 items-center justify-center bg-white md:w-2/5 lg:w-1/3"
            : "hidden"
        }
      >
        <div className="flex h-full w-full flex-col justify-between">
          {/* 画面上部に配置 */}
          <div>
            <img
              src={mainIcon}
              alt="UserIcon"
              className="mx-auto mt-16 size-24 rounded-full"
            />
            <p className="mt-4 text-center text-base">
              user:<span>kento</span>
            </p>
          </div>
          {/* 画面下部に配置 */}
          <div className="mb-8 mt-auto">
            <div className="flex justify-center">
              <button
                type="button"
                className="px-2 py-1 text-sm"
                onClick={handleLogout}
              >
                ログアウト
              </button>
            </div>
            {/* <div className="flex justify-center">
              <button
                type="button"
                className="mt-8 px-2 py-1 text-sm"
                onClick={onClickProfileIcon}
              >
                アカウントを削除する
              </button>
            </div> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
