import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplicationStatus } from "../../../services/apiApplication";
import { toast } from "react-toastify";

const useUpdateApplicationStatus = function () {
  const queryClient = useQueryClient();
  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }) => updateApplicationStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
      toast.success("Applicant is shortlisted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateStatus };
};

export default useUpdateApplicationStatus;
