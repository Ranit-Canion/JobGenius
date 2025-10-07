import { BsSend } from "react-icons/bs";
import useSendMessage from "./useSendMessage";
import { useState } from "react";
import SpinnerMini from "../../../../ui/SpinnerMini";
function MessageInput() {
  const { isPending, sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // ✅
    sendMessage(message, {
      onSuccess: (data) => {
        console.log("MSSG->", data);
      },
    });
    setMessage("");
  }
  return (
    <form className="flex gap-[1rem]" onSubmit={handleSubmit}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="bg-gray-100 w-[70%] py-[1.2rem] px-[1.5rem] rounded-2xl focus:outline-none focus-within:ring-2 focus-within:ring-blue-500"
      />
      <button
        className={`${
          isPending && "animate-pulse"
        } px-[1rem] text-md text-gray-50 bg-blue-500 rounded-2xl font-semibold`}
      >
        Send Message
      </button>
    </form>
  );
}

export default MessageInput;
