import { useQuery } from "@tanstack/react-query";
import { getAllJobAlerts } from "../../../services/apiJobAlert";

export const useGetJobAlerts = function () {
  const { isPending, data: jobalerts } = useQuery({
    queryKey: ["jobalerts"],
    queryFn: () => getAllJobAlerts(),
  });
  return { isPending, jobalerts };
};
