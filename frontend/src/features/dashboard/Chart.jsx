import Spinner from "../../ui/Spinner";
import useGetUser from "../auth/getCurrentUser";
import ApplicationsBarChart from "./ApplicationsChart";
import StatusChart from "./StatusChart";
import { useGetApplicationStates } from "./useGetApplicationStates";
import { useGetJobStatus } from "./useGetJobStatus";

function Chart() {
  const { isPending: isPending1, statusObj } = useGetJobStatus();
  const { isPending: isPending2, applicationStates } =
    useGetApplicationStates();
  useGetApplicationStates();

  const { user } = useGetUser();
  return (
    <div className="w-[60%] bg-gray-50 shadow-2xl ">
      <p className="ml-4 mt-4 text-lg text-gray-600">
        Your Applied Jobs Status
      </p>

      {user?.role === "job-recruiter" ? (
        <div>
          {isPending2 ? (
            <Spinner />
          ) : (
            <ApplicationsBarChart applicationStates={applicationStates} />
          )}
          {/* {user?.role==="job-recruiter"?} */}
        </div>
      ) : (
        <div>{isPending1 ? <Spinner /> : <StatusChart data={statusObj} />}</div>
      )}
    </div>
  );
}

export default Chart;
