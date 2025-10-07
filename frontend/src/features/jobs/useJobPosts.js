import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/apiJobPosts";
import { useSearchParams } from "react-router-dom";

const useJobPosts = function () {
  const [searchParams] = useSearchParams();

  // Get all selected jobType values (can be multiple)
  const jobTypes = searchParams.getAll("jobType");
  const expLevels = searchParams.getAll("experienceLevel");
  const salary = searchParams.get("salary");
  const title = searchParams.get("title");
  const location = searchParams.get("location");
  const page = searchParams.get("page");
  const filterObj = {};

  if (jobTypes.length) filterObj["jobType"] = jobTypes;
  if (expLevels.length) filterObj["experienceLevel"] = expLevels;
  if (salary) filterObj["salary"] = [salary];
  if (title) filterObj["title"] = [title];
  if (location) filterObj["location"] = [location];
  if (page) filterObj["page"] = [page];

  // filterObj["jobType"] = [];
  // filterObj
  // jobTypes.map((el) => filterObj["jobType"].push(el));

  // Construct query string: ?jobType=Full-Time&jobType=Hybrid
  // let queryData = jobTypes.length
  //   ? `?${jobTypes.map((val) => `jobType=${val}`).join("&")}`
  //   : "";
  const queryData = Object.entries(filterObj)
    .flatMap(([key, values]) =>
      values.map((val) => `${key}=${encodeURIComponent(val)}`)
    )
    .join("&");

  console.log(queryData);
  // queryData=expLevel.length?
  const { isPending, data: jobPosts } = useQuery({
    queryFn: () => getAllPosts(queryData),
    queryKey: ["jobposts", queryData], // add queryData to key to refetch properly
  });

  return { isPending, jobPosts };
};
export default useJobPosts;
