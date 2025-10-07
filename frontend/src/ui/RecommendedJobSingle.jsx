import {
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { getSimpleRelativeTime } from "../utils/DateService";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function RecommendedJobSingle({ job }) {
  useEffect(function () {
    Aos.init();
  }, []);
  const DatePosted = getSimpleRelativeTime(job?.createdAt);

  return (
    <div className="flex justify-center transition-all">
      <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-[70%] p-7   bg-white shadow-xl hover:border-l-2 hover:border-blue-400 duration-50">
        {/* Left - Logo */}
        <img
          src={`http://localhost:5000/company/${job?.companyLogo}`}
          alt={job?.company || "Company"}
          className="w-16 h-16 rounded-full object-cover"
        />

        {/* Middle - Job Details */}
        <div className="flex-1 flex flex-col gap-3 md:ml-6">
          <Link
            to={`/jobs/${job?._id}`}
            className="text-lg font-semibold hover:text-blue-500 transition-colors"
          >
            {job?.title}
          </Link>

          <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
            <span className="flex items-center gap-1">
              <BriefcaseIcon className="w-5 h-5" />
              {job?.companyName || "Company Name"}
            </span>
            <span className="flex items-center gap-1">
              <MapPinIcon className="w-5 h-5" />
              {job?.location || "Location"}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-5 h-5" />
              {DatePosted}
            </span>
            <span className="flex items-center gap-1">
              <BanknotesIcon className="w-5 h-5" />
              {job?.salary || "Not Disclosed"}
            </span>
            <span className="bg-blue-100 text-blue-500 px-4 py-1 rounded-full text-xs font-medium">
              {job?.jobType}
            </span>
          </div>
        </div>

        {/* Right - Apply Button */}
        <Link
          to={`/jobs/${job?._id}`}
          className="mt-[1.2rem] md:mt-0 bg-blue-100 duration-300 text-blue-500 px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-500 hover:text-gray-50 cursor-pointer "
        >
          Apply Job
        </Link>
      </div>
    </div>
  );
}

export default RecommendedJobSingle;
