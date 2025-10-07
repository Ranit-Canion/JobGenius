// import { useState } from "react";
import CompanyDetailBox from "../../ui/CompanyDetailBox";
import JobDetailBox from "../../ui/JobDetailBox";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import ApplicationModal from "./ApplicationModal";
import JobDetailHeader from "./JobDetailHeader";
import useJobPost from "./useJobPost";
import parse from "html-react-parser";
import Modal from "../../ui/Modal";
import { useGetUserDetails } from "../auth/useGetUserDetails";
import RelateJob from "../../ui/RelateJob";

function JobDetail() {
  const { isPending: isPendingForJobPosts, jobpost } = useJobPost();
  const { isPending, userData } = useGetUserDetails(jobpost?.postingUserId);
  // const [isOpen, setIsOpen] = useState(false);
  if (isPendingForJobPosts) return <Spinner />;
  // function handleIsOpen() {
  //   setIsOpen((prev) => !prev);
  console.log("hello->", userData);
  console.log(jobpost);
  // }

  return (
    <>
      <JobDetailHeader
        // onHandleIsOpen={handleIsOpen}
        jobpost={jobpost}
        isPending={isPendingForJobPosts}
      />
      <div className="mx-auto container px-[3.2rem] py-[7rem]">
        {/* {isOpen && (
          // <ApplicationModal onHandleIsOpen={handleIsOpen} jobpost={jobpost} />
          <Modal>
            <ApplicationModal onHandleIsOpen={handleIsOpen} jobpost={jobpost} />
          </Modal>
        )} */}

        <div className="flex gap-[8rem]">
          <div className="flex flex-col gap-[4rem]">
            <div className="tiptap ">{parse(jobpost.description)}</div>
            <div>
              <h1 className="text-2xl font-medium">Related Jobs</h1>
              <RelateJob />
            </div>
          </div>
          <div className="flex flex-col gap-[1.5rem]">
            <JobDetailBox jobpost={jobpost} isPending={isPendingForJobPosts} />
            <CompanyDetailBox
              userData={userData}
              jobpost={jobpost}
              isPending={isPending}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetail;
