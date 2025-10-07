import { useQuery } from "@tanstack/react-query";
import { getJobRecruiterStatList } from "../../services/apiAuth";

export const useGetJobRecruiterStats = function () {
  const { isPending, data: jobRecruiterStatsObj } = useQuery({
    queryKey: ["jobrecruiterstats"],
    queryFn: () => getJobRecruiterStatList(),
  });
  return { isPending, jobRecruiterStatsObj };
};
