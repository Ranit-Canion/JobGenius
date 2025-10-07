import { Link } from "react-router-dom";
import useJobPosts from "../features/jobs/useJobPosts";
import RecommendedJobSingle from "./RecommendedJobSingle";
import Spinner from "./Spinner";
function RecommendedJobs() {
  const { isPending, jobPosts } = useJobPosts();
  if (!jobPosts)
    return (
      <p className="text-center text-xl text-gray-600">There is no jobs</p>
    );
  const recentJobs = jobPosts?.data?.posts
    .slice() // 🔁 optional: avoids mutating the original array
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // 🕒 newest first
    .slice(0, 5); // 🎯 get top 5

  return (
    <div className=" py-[7rem] transition-all bg-gray-100 relative">
      {/* <div className="absolute top-[3rem] left-0 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[150px] -translate-x-[80%] -translate-y-1/2 z-[-1]"></div> */}

      <div className="flex justify-between mx-auto container items-center mb-[3rem] transition-all">
        <h1 className="text-2xl text-gray-600 font-medium">
          Recently Posted Jobs
        </h1>
        <Link
          to="/jobs"
          className="text-blue-400 font-medium underline hover:text-blue-600 duration-300 "
        >
          Browse All Jobs
        </Link>
      </div>
      {isPending ? (
        <Spinner />
      ) : (
        recentJobs.map((job) => <RecommendedJobSingle job={job} />)
      )}
    </div>
  );
}

export default RecommendedJobs;
