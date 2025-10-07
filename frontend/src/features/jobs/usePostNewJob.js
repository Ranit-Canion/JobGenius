import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewJobPost } from "../../services/apiJobPosts";
import { toast } from "react-toastify";

const usePostNewJob = function () {
  const queryClient = useQueryClient();
  const { isPending, mutate: postNewJob } = useMutation({
    mutationFn: (postObj) => createNewJobPost(postObj),
    onSuccess: () => {
      toast.success("New Job is successfully posted");
      queryClient.invalidateQueries({ queryKey: ["jobposts"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isPending, postNewJob };
};
export default usePostNewJob;
