import SingleApplicant from "./SingleApplicant";
import useGetAllApplicants from "./useGetAllApplicants";
import Spinner from "../../../ui/Spinner";
import { useState } from "react";
import Pagination from "../../../ui/Pagination";
import { useGetJobRecruiterStats } from "../useGetJobRecruiterStats";

function AllApplicants() {
  const { isPending, data } = useGetAllApplicants();
  const { jobRecruiterStatsObj } = useGetJobRecruiterStats();
  const applications = data?.data?.applications;
  const [posttitle, setPostTitle] = useState("");
  const [status, setStatus] = useState("");
  let filteredApplications;
  if (posttitle === "") filteredApplications = applications;
  if (posttitle !== "")
    filteredApplications = applications.filter(
      (application) => application.post?.title === posttitle
    );

  if (status === "Active")
    filteredApplications = filteredApplications.filter(
      (application) => application.post?.isExpired === false
    );

  if (status === "In-Active")
    filteredApplications = filteredApplications.filter(
      (application) => application.post?.isExpired === true
    );

  const totalApplicants = filteredApplications?.length;

  return (
    <>
      <h1 className="text-3xl font-md mb-12">All Applicants!</h1>

      <div className="h-full bg-gray-50 rounded-xl shadow-md p-6 relative">
        <div className="flex justify-between mb-4">
          <h1 className="text-gray-700 text-lg font-md">Applicant</h1>
          <form className="flex gap-2">
            <select
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-fit focus:outline-none focus:ring-3 focus:ring-blue-500 py-4 px-3 bg-gray-100 text-gray-500 rounded-lg"
            >
              <option value={""}>Select jobs</option>
              {applications?.map((application) => (
                <option value={application.post?.title}>
                  {application.post?.title}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="w-fit focus:outline-none focus:ring-3 focus:ring-blue-500 py-4 px-3 bg-gray-100 text-gray-500 rounded-lg"
            >
              <option value={""}>All status</option>
              <option value="Active">Active</option>
              <option value="In-Active">In-Active</option>
            </select>
          </form>
        </div>
        <header className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 px-4 py-6 text-lg items-center  font-medium  bg-blue-50">
          <div className="text-blue-500">{posttitle}</div>
          <div className=" py-1 rounded-2xl w-fit px-3 text-blue-600 bg-blue-100 ">
            Total(s): {jobRecruiterStatsObj?.applicationsCount}
          </div>
          <div className=" py-1 rounded-2xl w-fit px-3 text-green-600 bg-green-50 ">
            Shortlisted(s): {jobRecruiterStatsObj?.shortlistedCount}
          </div>
          <div className=" py-1 rounded-2xl w-fit px-3 text-red-700 bg-red-100 ">
            Rejected(s): {jobRecruiterStatsObj?.rejectedCount}
          </div>
        </header>
        <div className="grid grid-cols-2 gap-[1rem] mt-[3rem]">
          {isPending ? (
            <Spinner />
          ) : (
            filteredApplications?.map((application) => (
              <SingleApplicant
                key={application._id}
                application={application}
              />
            ))
          )}
        </div>
        <div className="absolute bottom-4 right-5">
          <Pagination totalCount={data?.totalCount} data={applications} />
        </div>
      </div>
    </>
  );
}

export default AllApplicants;
