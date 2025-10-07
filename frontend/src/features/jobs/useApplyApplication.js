import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplication } from "../../services/apiApplication";
import { toast } from "react-toastify";

const useApplyApplication = function () {
  const queryClient = useQueryClient();
  const { isPending, mutate: applyApplication } = useMutation({
    mutationFn: (applicationData) => createApplication(applicationData),
    onSuccess: () => {
      toast.success("Application Successfully Submitted");
      queryClient.invalidateQueries({
        queryKey: ["appliedjobs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["recentapplications"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, applyApplication };
};

export default useApplyApplication;
