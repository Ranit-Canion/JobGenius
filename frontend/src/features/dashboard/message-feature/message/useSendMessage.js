import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConversation } from "../../../../context/useConversation";
import { sendMessage as sendMessageApi } from "../../../../services/apiMessage";
import { toast } from "react-toastify";

const useSendMessage = function () {
  const queryClient = useQueryClient();
  const { selectedConversation } = useConversation();
  const { isPending, mutate: sendMessage } = useMutation({
    mutationFn: (message) => sendMessageApi(selectedConversation?._id, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", selectedConversation._id]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, sendMessage };
};

export default useSendMessage;
