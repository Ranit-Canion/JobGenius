import { useQuery } from "@tanstack/react-query";
import { getRecruiterPostedJobs } from "../../../services/apiJobPosts";

const useGetRecruiterPostedJobs = function () {
  const { isPending, data: postedjobs } = useQuery({
    queryKey: ["postedjobs"],
    queryFn: () => getRecruiterPostedJobs(),
  });
  return { isPending, postedjobs };
};

export default useGetRecruiterPostedJobs;
