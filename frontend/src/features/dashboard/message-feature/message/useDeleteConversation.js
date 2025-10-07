import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteConversation as deleteConversationApi } from "../../../../services/apiMessage";
import { useConversation } from "../../../../context/useConversation";
import { toast } from "react-toastify";

const useDeleteConversation = function () {
  const { selectedConversation } = useConversation();
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteConversation } = useMutation({
    mutationFn: () => deleteConversationApi(selectedConversation?._id),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"], selectedConversation?._id);
      queryClient.invalidateQueries(
        ["conversations"],
        selectedConversation?._id
      );

      toast.success("Conversation deleted succcessfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, deleteConversation };
};

export default useDeleteConversation;
