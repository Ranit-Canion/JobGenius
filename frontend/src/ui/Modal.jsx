import { createContext, useContext, useState, cloneElement } from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { close, openName } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (name !== openName) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all duration-500" />
      {/* Modal */}
      <div
        ref={ref}
        className="relative bg-white rounded-xl shadow-2xl px-8 py-[4rem] transition-all duration-500"
      >
        <button
          onClick={close}
          className="absolute  rounded-xl top-6 duration-300 cursor-pointer right-4 bg-gray-200 p-2 hover:bg-blue-500 hover:text-gray-50  "
        >
          <HiXMark className="w-6 h-6 " />
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;

Modal.Open = Open;
Modal.Window = Window;
