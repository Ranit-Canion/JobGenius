import { useQuery } from "@tanstack/react-query";
import { getRecentlyAppliedApplications } from "../../services/apiApplication";

const useRecentlyAppliedApplications = function () {
  const { isPending, data: recentApplications } = useQuery({
    queryKey: ["recentapplications"],
    queryFn: () => getRecentlyAppliedApplications(),
  });
  return { isPending, recentApplications };
};

export default useRecentlyAppliedApplications;
