import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getMessageFromChatBot } from "../../services/apiAuth";

export const useChatBot = function () {
  const { isPending, mutate: sendMssgToChatBot } = useMutation({
    mutationFn: (userMssg) => getMessageFromChatBot(userMssg),
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, sendMssgToChatBot };
};
