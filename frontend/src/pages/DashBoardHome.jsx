import useGetUser from "../features/auth/getCurrentUser";
import ApplicantsRecently from "../features/dashboard/applications/ApplicantsRecently";
import Chart from "../features/dashboard/Chart";
import JobAppliedRecently from "../features/dashboard/jobs/JobAppliedRecently";
import Notifications from "../features/dashboard/Notifications";
import StateList from "../features/dashboard/StateList";

function DashBoardHome() {
  const { user } = useGetUser();
  return (
    <div className="flex flex-col gap-[7rem] h-screen">
      <StateList />

      <div className="flex gap-[1rem]">
        <Chart />
        <Notifications />
      </div>
      {user?.role === "job-seeker" ? (
        <JobAppliedRecently />
      ) : (
        <ApplicantsRecently />
      )}
    </div>
  );
}

export default DashBoardHome;
