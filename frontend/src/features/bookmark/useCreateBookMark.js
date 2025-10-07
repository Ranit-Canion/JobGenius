import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserBookmark } from "../../services/apiBookmark";
import { toast } from "react-toastify";

const useCreateBookMark = function () {
  const queryClient = useQueryClient();
  const { isPending, mutate: createBookMark } = useMutation({
    mutationFn: (bookmarkData) => createUserBookmark(bookmarkData),
    onSuccess: () => {
      toast.success("Bookmark successfully added");
      queryClient.invalidateQueries(["bookmarks"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, createBookMark };
};

export default useCreateBookMark;
