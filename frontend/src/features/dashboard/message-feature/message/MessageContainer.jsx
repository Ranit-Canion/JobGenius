import { useConversation } from "../../../../context/useConversation";
import useGetUser from "../../../auth/getCurrentUser";
import Message from "./Message";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import useDeleteConversation from "./useDeleteConversation";
import SpinnerMini from "../../../../ui/SpinnerMini";
import { useSocketContext } from "../../../../context/SocketContext";
function MessageContainer() {
  const { selectedConversation } = useConversation();
  const { isPending, deleteConversation } = useDeleteConversation();
  const { onlineUsers } = useSocketContext();
  const { user } = useGetUser();
  const isOnline = onlineUsers.includes(selectedConversation?._id);
  console.log(selectedConversation);
  return (
    <div className="w-[50rem] h-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <header className="mt-6 pb-3.5 ">
            <div className="flex justify-between items-center transition-all">
              <div className="flex gap-5 items-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src={`http://localhost:5000/user/${selectedConversation.photo}`}
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="font-medium flex items-center gap-2">
                    {selectedConversation.name}
                    {isOnline && (
                      <span className="relative flex h-3 w-3 mb-1">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                      </span>
                    )}
                  </p>

                  <p className="text-gray-600 text-sm">
                    {user?.role === "job-seeker" ? "Recruiter" : "Applicant"}
                  </p>
                </div>
              </div>
              <p
                onClick={deleteConversation}
                className={`${
                  isPending && "animate-pulse"
                }  bg-red-500 text-white font-semibold rounded-2xl py-2 px-4 cursor-pointer hover:bg-red-700 transition-colors`}
              >
                Delete Conversation
              </p>
            </div>
          </header>

          {/* Middle scrollable messages area */}
          <div className="flex-grow overflow-y-auto">
            <Messages />
          </div>

          {/* Bottom input area */}
          <footer className="mt-auto mb-[2rem] w-full ">
            <MessageInput />
          </footer>
        </>
      )}
    </div>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const { user } = useGetUser();

  return (
    <div className="flex flex-1 items-center justify-center  ">
      <div className="text-center max-w-md w-full bg-gray-50 shadow-md rounded-xl p-8 border border-blue-500">
        <TiMessages className="mx-auto text-blue-500 dark:text-blue-500 text-6xl mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {user?.name} 👋
        </h2>
        <p className="text-gray-600 mb-4">
          Select a conversation to start messaging.
        </p>
        <p className="text-xs text-gray-400">
          Your messages will show up here 💬
        </p>
      </div>
    </div>
  );
};
