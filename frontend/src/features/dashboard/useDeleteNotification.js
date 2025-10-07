import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotification as deleteNotificationApi } from "../../services/apiNotification";
import { toast } from "react-toastify";

export const useDeleteNotification = function () {
  const queryClient = useQueryClient();
  const { mutate: deleteNotification } = useMutation({
    mutationFn: (id) => deleteNotificationApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      toast.success("Notification deleted successfully");
    },
  });
  return { deleteNotification };
};
