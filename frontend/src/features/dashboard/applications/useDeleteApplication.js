import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplication as deleteApplicationApi } from "../../../services/apiApplication";
import { toast } from "react-toastify";

const useDeleteApplication = function () {
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteApplication } = useMutation({
    mutationFn: (applicationId) => deleteApplicationApi(applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
      toast.success("Application successfully deleted");
    },
  });
  return { isPending, deleteApplication };
};

export default useDeleteApplication;
