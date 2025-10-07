import {
  BellAlertIcon,
  BookmarkIcon,
  BriefcaseIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useGetUnseenMssgCount } from "./message-feature/message/useGetUnseenMssgCounts";
import useGetUser from "../auth/getCurrentUser";
import { useGetJobRecruiterStats } from "./useGetJobRecruiterStats";
import { useGetJobAlerts } from "../dashboard/jobs/useGetJobAlerts";

function StateList() {
  const { jobseekerStateObj } = useGetUnseenMssgCount();
  const { isPending, jobRecruiterStatsObj } = useGetJobRecruiterStats();
  const { jobalerts } = useGetJobAlerts;
  const { user } = useGetUser();
  if (isPending) console.log("loading..");
  console.log("mao2->", jobRecruiterStatsObj?.postedJobsCount);
  const jobalertCount = jobalerts > 0 ? jobalerts.length : 0;
  return (
    <div className="flex gap-[1.5rem]">
      <div className="flex justify-between py-8 px-6 bg-gray-50 rounded-xl w-[35rem] shadow-lg">
        <BriefcaseIcon className="w-[5rem] py-[0.7rem] px-[1rem] rounded-xl bg-blue-100 text-blue-600" />
        <div className="flex flex-col gap-[0.4rem] justify-center ">
          <h1 className="text-[2rem] font-semibold text-blue-600 text-end">
            {user?.role === "job-seeker"
              ? jobseekerStateObj?.appliedJobCount
              : jobRecruiterStatsObj?.postedJobsCount}
          </h1>
          <p className="text-gray-600">
            {user?.role === "job-seeker" ? "Applied Jobs" : "Posted Jobs"}
          </p>
        </div>
      </div>
      {/* ------------------------------ */}
      <div className="flex justify-between py-8 px-6 bg-gray-50 rounded-xl w-[35rem] shadow-lg">
        {user?.role === "job-recruiter" ? (
          <DocumentTextIcon className="w-[5rem] py-[0.7rem] px-[1rem] rounded-xl bg-red-100 text-red-600" />
        ) : (
          <BellAlertIcon className="w-[5rem] py-[0.7rem] px-[1rem] rounded-xl bg-red-100 text-red-600" />
        )}
        <div className="flex flex-col gap-[0.4rem] justify-center ">
          <h1 className="text-[2rem] font-semibold text-red-600 text-end">
            {user?.role === "job-recruiter"
              ? jobRecruiterStatsObj?.applicationsCount
              : jobalertCount}
          </h1>
          <p className="text-gray-600">
            {user?.role === "job-recruiter" ? "Applications" : "Job Alerts"}
          </p>
        </div>
      </div>
      {/* -------------------------------------------- */}
      <div className="flex justify-between py-8 px-6 bg-gray-50 rounded-xl w-[35rem] shadow-lg">
        <ChatBubbleLeftEllipsisIcon className="w-[5rem] py-[0.7rem] px-[1rem] rounded-xl bg-green-100 text-green-600" />
        <div className="flex flex-col gap-[0.4rem] justify-center ">
          <h1 className="text-[2rem] font-semibold text-green-600 text-end">
            {user?.role === "job-seeker"
              ? jobseekerStateObj?.messageCount
              : jobRecruiterStatsObj?.messageCount}
          </h1>
          <p className="text-gray-600">Messages</p>
        </div>
      </div>
      {/* ----------------------------------------------------- */}
      <div className="flex justify-between py-8 px-6 bg-gray-50 rounded-xl w-[35rem] shadow-lg">
        {user?.role === "job-seeker" ? (
          <UserPlusIcon className="w-[5rem] py-[0.7rem] px-[1rem] rounded-xl bg-yellow-100 text-yellow-600" />
        ) : (
          <BookmarkIcon className="w-[5rem] py-[0.7rem] px-[1rem] rounded-xl bg-yellow-100 text-yellow-600" />
        )}
        <div className="flex flex-col gap-[0.4rem] justify-center ">
          <h1 className="text-[2rem] font-semibold text-yellow-600 text-end">
            {user?.role === "job-seeker"
              ? jobseekerStateObj?.bookmarkCount
              : jobRecruiterStatsObj?.shortlistedCount}
          </h1>
          <p className="text-gray-600">
            {user?.role === "job-seeker" ? "Bookmarks" : "Shorlisted"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StateList;
