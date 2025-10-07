import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../../../services/apiMessage";
import { useConversation } from "../../../../context/useConversation";

const useGetMessages = function () {
  const { selectedConversation, setMessages } = useConversation();
  const { isPending, data: messages } = useQuery({
    queryKey: ["messages", selectedConversation?._id],
    queryFn: () => getMessages(selectedConversation?._id),
    enabled: !!selectedConversation?._id,
    onSuccess: (data) => {
      setMessages(data);
    },
  });
  return { isPending, messages };
};

export default useGetMessages;
