import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/apiNotification";

export const useNotifications = function () {
  const { isPending, data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });
  return { isPending, notifications };
};
