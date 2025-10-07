import Spinner from "../../../ui/Spinner";
import RecentJobSingle from "./RecentJobSingle";
import useRecentlyAppliedApplications from "../useRecentlyAppliedApplications";

function JobAppliedRecently() {
  const { isPending, recentApplications } = useRecentlyAppliedApplications();
  if (!recentApplications) return;
  return (
    <div className="h-[70%] bg-gray-50">
      <div className="mx-auto container p-[2rem]">
        <h1 className="text-xl font-medium">Jobs Applied Recently</h1>
        <div className="grid grid-cols-2 gap-[1rem] mt-[4rem]">
          {isPending ? (
            <Spinner />
          ) : (
            recentApplications?.map((appliedJob) => (
              <RecentJobSingle appliedJob={appliedJob} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default JobAppliedRecently;
