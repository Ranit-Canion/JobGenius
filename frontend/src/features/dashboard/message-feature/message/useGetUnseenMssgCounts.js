import { useQuery } from "@tanstack/react-query";
import { getUnseenMessageCounts } from "../../../../services/apiMessage";

export const useGetUnseenMssgCount = function () {
  const { isPending, data: jobseekerStateObj } = useQuery({
    queryKey: ["unseenmssgcounts"],
    queryFn: () => getUnseenMessageCounts(),
  });
  return { isPending, jobseekerStateObj };
};
