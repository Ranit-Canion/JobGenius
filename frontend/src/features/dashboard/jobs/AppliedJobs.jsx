import {
  BriefcaseIcon,
  EyeIcon,
  MapIcon,
  MapPinIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import AppliedSingleJob from "./AppliedSingleJob";
import Spinner from "../../../ui/Spinner";
import { useAppliedJobs } from "./useAppliedJobs";

function AppliedJobs() {
  const { isPending, appliedJobs } = useAppliedJobs();
  return (
    <>
      <h1 className="text-3xl font-semibold mb-12">Applied Jobs!</h1>

      <div className="h-[80%] bg-gray-50 rounded-xl shadow-md p-6">
        <header className="grid grid-cols-[5fr_1fr_1fr_1fr] gap-4 px-4 py-3  font-medium text-blue-400 bg-blue-50">
          <div>Job Title</div>
          <div>Date Applied</div>
          <div>Status</div>
          <div>Action</div>
        </header>

        {/* Placeholder for job entries */}
        {isPending ? (
          <Spinner />
        ) : (
          appliedJobs?.map((appliedJob) => (
            <AppliedSingleJob appliedJob={appliedJob} key={appliedJob._id} />
          ))
        )}
      </div>
    </>
  );
}

export default AppliedJobs;

{
  /* <div className="flex justify-between ml-[3.4rem]">
  <div>mao</div>
  <div className="flex gap-[5rem] items-center mr-[6rem]">
    <p>Dec 5, 2020</p>
    <p>Active</p>
    <div className="flex gap-4">
      <EyeIcon className="h-[1.3rem]" />
      <TrashIcon className="h-[1.3rem]" />
    </div>
  </div>
</div> */
}
