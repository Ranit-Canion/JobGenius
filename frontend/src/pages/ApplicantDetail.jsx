import { useLocation, useParams } from "react-router-dom";
import ApplicantDetailHeader from "../features/dashboard/applications/ApplicantDetailHeader";
import ApplicantDetailBox from "../ui/ApplicantDetailBox";
import { useGetUserDetails } from "../features/auth/useGetUserDetails";
import EducationSingle from "../ui/EducationSingle";
import WorkExperienceSingle from "../ui/WorkExperienceSingle";
import AwardSingle from "../ui/AwardSingle";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function ApplicantDetail() {
  const { applicantId } = useParams();
  const { isPending, userData } = useGetUserDetails(applicantId);
  const location = useLocation();
  const { resume } = location.state || {};
  console.log("resume here->", resume);
  if (isPending) return <p>Loading...</p>;
  if (!userData) return <p>No applicant found</p>;
  const profile = userData?.profile;
  console.log("applicant->", userData);
  return (
    <>
      <ApplicantDetailHeader userData={userData} resume={resume} />
      <div className="mx-auto container px-[3.2rem] py-[7rem]">
        {/* {isOpen && (
          // <ApplicationModal onHandleIsOpen={handleIsOpen} jobpost={jobpost} />
          <Modal>
            <ApplicationModal onHandleIsOpen={handleIsOpen} jobpost={jobpost} />
          </Modal>
        )} */}

        <div className="flex gap-[8rem]">
          <div>
            <h1 className="text-2xl font-bold mb-2">About</h1>
            <p className="text-[1.3rem]">
              Passionate software engineer with 3+ years of experience building
              scalable web applications and APIs. Skilled in JavaScript, React,
              Node.js, and MongoDB, with a strong foundation in data structures
              and algorithms. Adept at problem-solving, writing clean and
              efficient code, and collaborating in agile teams to deliver
              high-quality software. Continuously learning and excited to work
              on challenging projects that create real-world impact.
            </p>
            <div className="mt-[1rem]">
              <h1 className="text-2xl font-bold mb-[1rem]">Education</h1>
              <div className="flex flex-col gap-[2rem] ">
                {profile.education.map((el) => (
                  <EducationSingle educationObj={el} />
                ))}
              </div>
            </div>
            <div className="mt-[1rem]">
              <h1 className="text-2xl font-bold mb-[1rem]">Work Experience</h1>
              <div className="flex flex-col gap-[2rem] ">
                {profile.workExperience.map((el) => (
                  <WorkExperienceSingle educationObj={el} />
                ))}
              </div>
            </div>
            <div className="mt-[1rem]">
              <h1 className="text-2xl font-bold mb-[1rem]">Awards</h1>
              <div className="flex flex-col gap-[2rem] ">
                {profile.awards.map((el) => (
                  <AwardSingle educationObj={el} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[1.5rem]">
            <ApplicantDetailBox userData={userData} />
            <div className="bg-blue-50 p-[1rem] rounded-xl">
              <h1 className="text-xl mb-4 font-medium">Professional Skills</h1>
              <div className="grid grid-cols-3 gap-2">
                {profile?.skills?.map((skill) => (
                  <p className="bg-gray-50 rounded-xl w-fit p-2 text-gray-700">
                    {skill}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex justify-between bg-blue-50 px-[1.3rem] py-[1.5rem]">
              <h1 className="font-medium text-lg text-gray-800 rounded-2xl">
                Social Media
              </h1>
              <div className="flex justify-center items-center gap-[1.5rem]">
                <FaFacebook className="text-gray-600 text-[1.6rem]" />
                <FaTwitter className="text-gray-600 text-[1.6rem]" />
                <FaInstagram className="text-gray-600 text-[1.6rem]" />
                <FaLinkedin className="text-gray-600 text-[1.6rem]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicantDetail;
