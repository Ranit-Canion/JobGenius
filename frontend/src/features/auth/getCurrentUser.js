import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

const useGetUser = function () {
  const { isPending, data: userObj } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const user = userObj?.data?.user;
  const profile = userObj?.data?.profile;

  return { isPending, user, profile };
};

export default useGetUser;
