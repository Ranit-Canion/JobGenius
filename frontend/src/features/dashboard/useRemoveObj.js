import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeEducationAwardWorkExpObj } from "../../services/apiAuth";
import { toast } from "react-toastify";

export const useRemoveObj = function () {
  const queryClient = useQueryClient();
  const { isPending, mutate: removeObj } = useMutation({
    mutationFn: (dataObj) => removeEducationAwardWorkExpObj(dataObj),
    onSuccess: (dataObj) => {
      queryClient.invalidateQueries(["user"]);
      toast.success(`${dataObj?.field} removed successfully`);
    },
  });
  return { isPending, removeObj };
};
