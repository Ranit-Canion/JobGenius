import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppliedJob as deleteAppliedJobApi } from "../../../services/apiAppliedJobs";
import { toast } from "react-toastify";

export const useDeleteAppliedJob = function () {
  const queryClient = useQueryClient();
  const { mutate: deleteAppliedJob } = useMutation({
    mutationFn: (id) => deleteAppliedJobApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["appliedjobs"]);
      toast.success("Application deleted successfully");
    },
  });
  return { deleteAppliedJob };
};
