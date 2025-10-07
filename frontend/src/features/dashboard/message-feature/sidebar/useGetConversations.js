import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../../../../services/apiAuth";

const useGetConversations = function () {
  const { isPending, data: conversations } = useQuery({
    queryFn: () => getConversations(),
    queryKey: ["conversations"],
  });
  return { isPending, conversations };
};

export default useGetConversations;
