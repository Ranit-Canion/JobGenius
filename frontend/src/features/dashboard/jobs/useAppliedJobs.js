import { useQuery } from "@tanstack/react-query";
import { getAllAppliedJobs } from "../../../services/apiAppliedJobs";

export const useAppliedJobs = function () {
  const { isPending, data: appliedJobs } = useQuery({
    queryKey: ["appliedjobs"],
    queryFn: () => getAllAppliedJobs(),
  });
  return { isPending, appliedJobs };
};
