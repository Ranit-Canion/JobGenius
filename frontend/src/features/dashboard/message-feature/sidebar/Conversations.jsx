import Spinner from "../../../../ui/Spinner";
import Conversation from "./Conversation";
import useGetConversations from "./useGetConversations";

function Conversations() {
  const { isPending, conversations } = useGetConversations();
  return (
    <div className="flex flex-col gap-[2rem]">
      {isPending ? (
        <Spinner />
      ) : (
        conversations?.map((conversation) => (
          <Conversation key={Conversation.id} conversation={conversation} />
        ))
      )}
    </div>
  );
}

export default Conversations;
