import Spinner from "../../../ui/Spinner";
import SingleApplicant from "./SingleApplicant";
import useGetAllApplicants from "./useGetAllApplicants";

function ApplicantsRecently() {
  const { isPending, data } = useGetAllApplicants();
  const applications = data?.data?.applications;

  return (
    <div className="h-[70%] bg-gray-50">
      <div className="mx-auto container p-[2rem]">
        <h1 className="text-xl font-medium">Recent Applicants</h1>
        <div className="grid grid-cols-2 gap-[1rem] mt-[4rem]">
          {isPending ? (
            <Spinner />
          ) : (
            applications?.map((application) => (
              <SingleApplicant
                key={application._id}
                application={application}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicantsRecently;
