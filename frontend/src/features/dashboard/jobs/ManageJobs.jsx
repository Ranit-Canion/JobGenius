import {
  BriefcaseIcon,
  EyeIcon,
  MapIcon,
  MapPinIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Spinner from "../../../ui/Spinner";
import useGetRecruiterPostedJobs from "./useGetRecruiterPostedJobs";
import ManageJobSingle from "./ManageJobSingle";
import Pagination from "../../../ui/Pagination";

function ManageJobs() {
  const { isPending, postedjobs } = useGetRecruiterPostedJobs();
  return (
    <>
      <h1 className="text-3xl font-semibold mb-12">Applied Jobs!</h1>

      <div className="h-[80%] bg-gray-50 rounded-xl shadow-md p-6 relative">
        <header className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 px-4 py-3  font-medium text-blue-400 bg-blue-50">
          <div>Job Title</div>
          <div>Applications</div>
          <div>Created & Expired</div>
          <div className="ml-3">Status</div>
        </header>
        {isPending ? (
          <Spinner />
        ) : (
          postedjobs.map((postedjob) => (
            <ManageJobSingle postedjob={postedjob} />
          ))
        )}
        {/* Placeholder for job entries */}
        <div className="absolute bottom-4 right-5">
          <Pagination />
        </div>
      </div>
    </>
  );
}

export default ManageJobs;

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
