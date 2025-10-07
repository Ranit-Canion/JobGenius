import {
  BanknotesIcon,
  BookmarkIcon,
  BriefcaseIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import useCreateBookMark from "../bookmark/useCreateBookMark";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { getSimpleRelativeTime } from "../../utils/DateService";

function JobSingle({ post }) {
  useEffect(function () {
    Aos.init();
  }, []);
  const {
    title,
    location,
    jobType,
    description,
    experienceLevel,
    createdAt,
    _id: jobId,
    companyName,
    companyLogo,
  } = post;
  const { createBookMark } = useCreateBookMark();
  console.log(companyLogo);
  function handleBookmark() {
    const bookmarkObj = {
      post: jobId,
    };
    createBookMark(bookmarkObj);
  }
  const DatePosted = getSimpleRelativeTime(createdAt);

  return (
    <div
      className="flex flex-col gap-[1.3rem] p-[1.5rem] shadow-2xl w-full rounded-xl"
      data-aos="fade-up"
    >
      <div className="flex justify-between">
        <div className="w-[4rem] ">
          <img
            src={`http://localhost:5000/company/${companyLogo}`}
            alt=""
            className="rounded-lg"
          />
        </div>{" "}
        <BookmarkIcon
          onClick={handleBookmark}
          className="w-[3.7rem] py-3 px-4 hover:bg-blue-500 duration-300 cursor-pointer hover:text-gray-50 rounded-xl text-blue-500 bg-blue-100"
        />
      </div>
      {/* ---------------- */}
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-lg">{title}</h2>
        <div className="flex gap-1 items-center justify-center text-gray-500">
          <ClockIcon className="w-[1.3rem]" />
          <p>{DatePosted}</p>
        </div>
      </div>
      <div className="flex gap-[1rem] w-[20%]">
        <div className="flex gap-1 items-center justify-center text-gray-500">
          <BriefcaseIcon className="w-[1.3rem]" />
          <p>{companyName}</p>
        </div>
        <div className="flex gap-1 items-center justify-center text-gray-500">
          <MapPinIcon className="w-[1.3rem]" />
          <p>{location}</p>
        </div>
        {/* <div className="flex gap-1 items-center justify-center text-gray-500">
                <ClockIcon className="w-[1.3rem]" />
                <p>11hours</p>
              </div> */}
        <div className="flex gap-1 items-center justify-center text-gray-500">
          <BanknotesIcon className="w-[1.3rem]" />
          <p>24LPA</p>
        </div>
      </div>
      <p>
        The E-Commerce Executive contributes to the growth of E-Commerce
        business by enhancing the customer experience, executing.
      </p>
      <div className="flex gap-[1rem] items-center">
        <p className="rounded-3xl py-1 px-3 bg-blue-200 text-blue-500">
          {jobType}
        </p>
        <p className="rounded-3xl py-1 px-3 bg-yellow-200 text-yellow-500">
          Hybrid
        </p>
      </div>
      <div className="transition-all flex items-center justify-center mt-3">
        <Link
          to={`/jobs/${jobId}`}
          className="bg-blue-200 text-lg font-medium text-blue-500 px-[6rem] py-3 duration-300 cursor-pointer rounded-xl hover:bg-blue-500 hover:text-gray-50"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export default JobSingle;
