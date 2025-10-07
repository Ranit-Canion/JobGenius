import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { setPosition, open, close, openId } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.right + 8, // right offset
      y: rect.bottom + 8, // below the button
    });

    openId === "" || id !== openId ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded cursor-pointer bg-gray-100 transition mb-1 "
    >
      <HiEllipsisVertical className="text-xl text-gray-600" />
    </button>
  );
}

function List({ children, id }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);

  if (id !== openId || !position) return null;

  return (
    <ul
      ref={ref}
      className="fixed z-50 min-w-[160px] bg-white border border-gray-200 shadow-xl rounded-md p-2 space-y-1"
      style={{
        top: `${position.y}px`,
        right: `${position.x}px`,
      }}
    >
      {children}
    </ul>
  );
}

function Button({ children, onClick, icon }) {
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm text-gray-700"
    >
      <span className="w-[14%] text-gray-500">{icon}</span>
      <span className="text-sm font-medium">{children}</span>
    </button>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
