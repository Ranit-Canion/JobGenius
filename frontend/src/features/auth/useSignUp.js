import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useSignUp = function () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: signup } = useMutation({
    mutationFn: (userObj) => signupApi(userObj),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
      toast.success("Account is successfully created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, signup };
};
export default useSignUp;
