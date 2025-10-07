import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getJobPostById } from "../../services/apiJobPosts";

const useJobPost = function () {
  const { jobPostId } = useParams();

  const { isPending, data: jobpost } = useQuery({
    queryKey: ["jobpost", jobPostId],
    queryFn: () => getJobPostById(jobPostId),
  });
  return { isPending, jobpost };
};
export default useJobPost;
