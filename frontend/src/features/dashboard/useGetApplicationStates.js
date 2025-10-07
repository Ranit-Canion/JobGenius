import { useQuery } from "@tanstack/react-query";
import { getApplicantStates } from "../../services/apiApplication";

export const useGetApplicationStates = function () {
  const { isPending, data: applicationStates } = useQuery({
    queryKey: ["applicationstates"],
    queryFn: getApplicantStates,
  });
  return { isPending, applicationStates };
};
