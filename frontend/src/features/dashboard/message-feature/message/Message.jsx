import { useConversation } from "../../../../context/useConversation";
import { extractTime } from "../../../../utils/DateService";
import useGetUser from "../../../auth/getCurrentUser";

function Message({ message }) {
  const { user } = useGetUser();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === user._id;
  const profilePic = fromMe ? user.photo : selectedConversation.photo;
  const profileName = fromMe ? "You" : selectedConversation.name;
  const formattedTime = extractTime(message.createdAt);
  return (
    <div
      className={`flex w-full ${fromMe ? "justify-end" : "justify-start"} mb-6`}
    >
      <div className="flex flex-col max-w-[75%] gap-3">
        <div
          className={`flex items-center gap-2 ${
            fromMe ? "justify-end" : "justify-start"
          }`}
        >
          <img
            src={`http://localhost:5000/user/${profilePic}`}
            className="w-[3rem] rounded-full"
          />
          <p className="font-medium">{profileName}</p>
          <p>{formattedTime}</p>
        </div>
        <div
          className={`px-5 py-3 text-md rounded-2xl w-fit  ${
            fromMe
              ? "bg-blue-400 text-white rounded-br-none"
              : "bg-gray-200 text-gray-800 rounded-bl-none"
          }`}
        >
          {message.message}
        </div>
      </div>
    </div>
  );
}

export default Message;
