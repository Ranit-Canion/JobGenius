import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateData as updateDataApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

const useUpdateUserData = function () {
  const queryClient = useQueryClient();
  const { isPending, mutate: updateData } = useMutation({
    mutationFn: (userData) => updateDataApi(userData),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("User data updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isPending, updateData };
};

export default useUpdateUserData;
