import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../services/apiAuth";

export const useGetUserDetails = function (id) {
  const { isPending, data: userData } = useQuery({
    queryKey: ["userdetails", id], // cache based on id
    queryFn: () => getUserDetails(id),
    enabled: !!id, // don't fetch if id is undefined/null
  });

  return { isPending, userData };
};
