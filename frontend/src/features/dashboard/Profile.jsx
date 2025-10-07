import JobRecruiterProfile from "./JobRecruiterProfile";
import useGetUser from "../auth/getCurrentUser";
import JobSeekerProfile from "./JobSeekerProfile";

function Profile() {
  const { user } = useGetUser();
  return (
    <>
      <h1 className="text-2xl font-medium mb-[2rem] text-gray-700">Profile</h1>
      <>
        {user?.role === "job-recruiter" ? (
          <JobRecruiterProfile />
        ) : (
          <JobSeekerProfile />
        )}
      </>
    </>
  );
}

export default Profile;
