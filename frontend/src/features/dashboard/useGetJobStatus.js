import { useQuery } from "@tanstack/react-query";
import { getStatusOfApplicant } from "../../services/apiApplication";

export const useGetJobStatus = function () {
  const { isPending, data: statusObj } = useQuery({
    queryKey: ["applicantjobstatus"],
    queryFn: getStatusOfApplicant,
  });
  return { isPending, statusObj };
};
