import { useState } from "react";

function ToolTip({ children, textInfo }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      {isOpen && (
        <div className="absolute left-1/2 bottom-[2.4rem] -translate-x-1/2 mt-2 w-max px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg z-10">
          {textInfo}
        </div>
      )}
    </div>
  );
}

export default ToolTip;
