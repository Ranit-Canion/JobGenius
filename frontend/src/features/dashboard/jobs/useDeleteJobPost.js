import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobPost as deleteJobPostApi } from "../../../services/apiJobPosts";
import { toast } from "react-toastify";

const useDeleteJobPost = function () {
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteJobPost } = useMutation({
    mutationFn: (postId) => deleteJobPostApi(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postedjobs"] });
      toast.success("Post successfully deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, deleteJobPost };
};

export default useDeleteJobPost;
