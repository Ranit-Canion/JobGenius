import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

const useLogout = function () {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.setQueriesData(["user"], null);
      navigate("/", { replace: true });

      toast.success("you logged out successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isLoading, logout };
};
export default useLogout;
