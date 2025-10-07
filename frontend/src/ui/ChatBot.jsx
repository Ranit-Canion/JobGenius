import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useChatBot } from "../features/auth/useChatBot";
import useGetUser from "../features/auth/getCurrentUser";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { isPending, sendMssgToChatBot } = useChatBot();
  const { user } = useGetUser();
  const sendMessageByUser = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    sendMssgToChatBot(
      { message: input },
      {
        onSuccess: (data) => {
          // Add chatbot's reply
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: data || "No reply received." },
          ]);
        },
      }
    );

    setInput("");
  };

  return (
    <div className="w-[30rem] h-[40rem] flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-blue-500 flex items-center gap-3 px-4 py-3 text-white">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="bot"
          className="w-8 h-8"
        />
        <p className="text-lg font-semibold">AI Assistant</p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto h-[25rem] bg-blue-50">
        {messages.length === 0 && (
          <p className="text-center text-lg text-gray-500 font-medium">
            Start Conversation with Chat Bot
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-xl ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-white border border-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isPending && (
          <div className="flex items-center gap-2 bg-white border border-gray-200 max-w-[60%] px-4 py-2 rounded-xl">
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white transition-all">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={user ? false : true}
          placeholder="Type your message..."
          className="flex-1 px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && sendMessageByUser()}
        />
        <button
          onClick={sendMessageByUser}
          disabled={isPending}
          className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600 duration-300 cursor-pointer disabled:opacity-50"
        >
          <PaperAirplaneIcon className="text-white w-[1.2rem]" />
        </button>
      </div>
    </div>
  );
}
