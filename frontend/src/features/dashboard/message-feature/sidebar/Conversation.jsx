import { useSocketContext } from "../../../../context/SocketContext";
import { useConversation } from "../../../../context/useConversation";

function Conversation({ conversation }) {
  const { name, _id, photo } = conversation;
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === _id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <div
      className={`flex justify-between items-center rounded-xl py-2.5 px-6 cursor-pointer ${
        isSelected ? "bg-gray-200" : ""
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className="flex gap-5 items-center">
        <img
          src={`http://localhost:5000/user/${photo}`}
          className="w-[20%] rounded-full"
          alt=""
        />
        <div className="flex flex-col gap-1">
          <p>{name}</p>
          {isOnline ? (
            <span className="text-green-600 font-semibold">Online</span>
          ) : (
            <span className="text-gray-500">Offline</span>
          )}
        </div>
      </div>
      {conversation?.unseenCount > 0 && (
        <p className="text-gray-50 text-[0.9rem] font-medium rounded-full px-[0.7rem] py-1 bg-blue-500 w-fit">
          {conversation?.unseenCount}
        </p>
      )}
    </div>
  );
}

export default Conversation;
