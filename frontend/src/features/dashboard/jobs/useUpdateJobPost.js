import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJobPost } from "../../../services/apiJobPosts";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const useUpdateJobPost = function () {
  const { jobPostId } = useParams();

  const queryClient = useQueryClient();
  const { isPending, mutate: updateJob } = useMutation({
    mutationFn: (updateObj) => updateJobPost(jobPostId, updateObj),
    onSuccess: () => {
      queryClient.invalidateQueries(["jobpost"]);
      toast.success("Job successfully updated");
    },
  });
  return { isPending, updateJob };
};
