import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApplications } from "../../services/apiApplication";

const useGetUserApplications = function () {
  const { isPending, data: applications } = useQuery({
    queryKey: ["appliedjobs"],
    queryFn: () => getCurrentUserApplications(),
  });
  return { isPending, applications };
};
export default useGetUserApplications;
