import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobAlert as deleteJobAlertApi } from "../../../services/apiJobAlert";
import { toast } from "react-toastify";

export const useDeleteJobAlert = function () {
  const queryClient = useQueryClient();
  const { mutate: deleteJobAlert } = useMutation({
    mutationFn: (id) => deleteJobAlertApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["jobalerts"]);
      toast.success("Job Alert deleted successfully");
    },
  });
  return { deleteJobAlert };
};
