import {
  ArrowDownIcon,
  BellIcon,
  ChevronDownIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { FaRegHeart } from "react-icons/fa";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import useGetUser from "../features/auth/getCurrentUser";
import Spinner from "../ui/Spinner";
import useGetUserBookMarks from "../features/bookmark/useGetUserBookMarks";
import { useState } from "react";
import SideBar from "./SideBar";
import SidebarNavigations from "./SidebarNavigations";
import NotificationsAlert from "./NotificationAlert";
function Header() {
  const { isPending, user } = useGetUser();
  const { bookmarks = [] } = useGetUserBookMarks();
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  if (isPending) return <Spinner />;
  function handleClickSideBar() {
    setIsOpenSideBar((prev) => !prev);
  }
  function handleClinkNotification() {
    setIsOpenNotification((prev) => !prev);
  }
  return (
    <header className="sticky top-0 z-50 flex justify-between py-[1rem] bg-blue-50 shadow-lg items-center mx-auto px-[4rem] backdrop-blur-md">
      <div className="flex gap-[12rem] items-center justify-center">
        <Logo />
        <Navigation />
      </div>

      {/* <div className="flex items-center justify-center gap-[2rem]"> */}
      {!user ? (
        <div className="flex items-center justify-center gap-[2rem] transition-all">
          <Link
            to="/login"
            className="py-3 px-8 text-lg bg-blue-500 duration-300 text-gray-50 rounded-md font-semibold hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="flex gap-[2rem] justify-center items-center transition-all">
          <Link to="/bookmarks" className="relative cursor-pointer">
            {bookmarks?.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-md">
                {bookmarks.length}
              </span>
            )}
            <FaRegHeart className="text-[2.5rem] text-gray-600 hover:text-blue-500 p-2 hover:bg-blue-100 rounded-lg transition" />
          </Link>

          <div className="relative">
            <BellIcon
              className="cursor-pointer text-gray-600 w-[2.5rem] duration-300 hover:text-blue-500 p-1 hover:bg-blue-100 rounded-lg"
              strokeWidth={2}
              onClick={handleClinkNotification}
            />

            {isOpenNotification && (
              <div className="absolute right-0 translate-x-[28rem] top-full mt-2 z-50 w-[81rem] duration-300">
                <NotificationsAlert />
              </div>
            )}
          </div>

          <div className="flex items-center gap-[1rem]">
            <img
              src={`http://localhost:5000/user/${user?.photo}`}
              className="w-[3rem] h-[3rem] rounded-full"
            />
            <p>{user?.name}</p>
            <div className="relative transition-all">
              <ChevronDownIcon
                onClick={handleClickSideBar}
                strokeWidth={3}
                className="w-[1.5rem] cursor-pointer text-blue-500 "
              />
              {isOpenSideBar && (
                <div className="w-[17rem] duration-500 rounded-xl absolute right-[50%] translate-y-[1.4rem] p-4 bg-white border-2 border-gray-200 z-[1000]">
                  {" "}
                  <SidebarNavigations />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* </div> */}
    </header>
  );
}

export default Header;
