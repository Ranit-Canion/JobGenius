import { useQuery } from "@tanstack/react-query";
import { getUserBookmarks } from "../../services/apiBookmark";

const useGetUserBookMars = function () {
  const { isPending, data: bookmarks } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getUserBookmarks(),
  });
  return { isPending, bookmarks };
};

export default useGetUserBookMars;
