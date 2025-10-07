import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import useApplyApplication from "./useApplyApplication";
import useGetUser from "../auth/getCurrentUser";
import { toast } from "react-toastify";

function ApplicationModal({ onHandleIsOpen, jobpost }) {
  const [resume, setResume] = useState("");
  const [message, setMessage] = useState("");
  const { isPending, applyApplication } = useApplyApplication();
  const { user } = useGetUser();

  function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to apply.");
      return;
    }

    if (!resume || !(resume instanceof File)) {
      toast.error("Please upload a valid resume file.");
      return;
    }

    const applicationData = new FormData();
    applicationData.append("resume", resume);
    applicationData.append("message", message);
    applicationData.append("user", user._id);
    applicationData.append("post", jobpost._id);

    // Debug: Log FormData content
    for (let pair of applicationData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    applyApplication(applicationData);

    setResume("");
    setMessage("");
  }
  return (
    // <div className="h-screen flex justify-center items-center">
    <div className="  w-[33rem]   rounded-2xl transition-all  relative">
      <h1 className="text-center text-2xl mb-[1rem] font-medium">
        Apply For Job
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[2rem] ">
        <div className="flex flex-col gap-5 text-lg font-normal">
          <label>Upload Resume</label>
          <label
            htmlFor="resume-upload"
            className="py-6 px-7 border-2 border-dotted border-blue-400 cursor-pointer text-gray-600 rounded-lg text-center"
          >
            {resume ? resume.name : "Upload CV (doc, docx, pdf)"}
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            className="hidden"
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-lg font-normal">Message</label>
          <textarea
            placeholder="Message.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isPending}
            className="py-3 px-5 text-gray-700 bg-gray-100 w-full h-[8rem] rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500 focus:bg-gray-50
            "
          />
        </div>
        <p className="text-center text-gray-500">
          You accept our{" "}
          <span className="text-gray-700 font-semibold">
            Terms and Conditions and Privacy Policy
          </span>
        </p>
        <button className="w-full bg-blue-600 text-gray-50 py-4 rounded-xl ">
          Apply For Job
        </button>
      </form>
    </div>
    // </div>
  );
}

export default ApplicationModal;
