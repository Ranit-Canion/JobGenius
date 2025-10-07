import Message from "./Message";
import MessageLoader from "./MessageLoader";
import useGetMessages from "./useGetMessages";
// import useListenForMessages from "./useListeningForMessages";

function Messages() {
  const { isPending, messages } = useGetMessages();
  // useListenForMessages();

  return (
    <div className="px-4 flex-1 overflow-auto">
      {isPending
        ? [...Array(3)].map((_, idx) => <MessageLoader key={idx} />)
        : messages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
    </div>
  );
}

export default Messages;
