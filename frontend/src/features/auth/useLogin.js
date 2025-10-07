import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogin = function () {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
      toast.success("Successfully logged in");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isPending, login };
};
export default useLogin;
