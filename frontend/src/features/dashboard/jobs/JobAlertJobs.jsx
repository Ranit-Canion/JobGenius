import Spinner from "../../../ui/Spinner";
import JobAlertJobSingle from "./JobAlertJobSingle";
import { useGetJobAlerts } from "./useGetJobAlerts";

function JobAlertJobs() {
  const { isPending, jobalerts } = useGetJobAlerts();
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold mb-12">Applied Jobs!</h1>
        <p>Relevant jobs based on your jobs</p>
      </div>

      <div className="h-[80%] bg-gray-50 rounded-xl shadow-md p-6">
        <header className="grid grid-cols-[5fr_1fr_1fr_1fr] gap-4 px-4 py-3  font-medium text-blue-400 bg-blue-50">
          <div>Job Title</div>
          <div>Created</div>
          <div>Expired</div>
          <div>Action</div>
        </header>

        {/* Placeholder for job entries */}
        {isPending ? (
          <Spinner />
        ) : (
          jobalerts?.map((jobalert) => (
            <JobAlertJobSingle jobalert={jobalert} key={jobalert._id} />
          ))
        )}
      </div>
    </>
  );
}

export default JobAlertJobs;
