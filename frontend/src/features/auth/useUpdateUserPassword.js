import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUserPassword as updateUserPasswordApi } from "../../services/apiAuth";

const useUpdateUserPassword = function () {
  const { isPending, mutate: updateUserPassword } = useMutation({
    mutationFn: (passwordObj) => updateUserPasswordApi(passwordObj),
    onSuccess: () => {
      toast.success("Password has been changed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, updateUserPassword };
};
export default useUpdateUserPassword;
