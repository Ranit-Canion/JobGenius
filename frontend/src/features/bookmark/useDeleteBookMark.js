import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserBookmark } from "../../services/apiBookmark";
import { toast } from "react-toastify";

const useDeleteBookMark = function () {
  const queryClient = useQueryClient();
  const { isPending, mutate: removeBookMark } = useMutation({
    mutationFn: (postId) => deleteUserBookmark(postId),
    onSuccess: () => {
      toast.success("Bookmark successfully removed");
      queryClient.invalidateQueries(["bookmarks"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, removeBookMark };
};
export default useDeleteBookMark;
