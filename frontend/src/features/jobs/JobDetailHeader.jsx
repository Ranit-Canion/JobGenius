import {
  BanknotesIcon,
  BookmarkIcon,
  BriefcaseIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { getSimpleRelativeTime } from "../../utils/DateService";
import CreateApplication from "./CreateApplication";

function JobDetailHeader({ jobpost }) {
  const {
    createdAt,
    location,
    title,
    salary,
    jobType,
    experienceLevel,
    companyLogo,
    companyName,
  } = jobpost;

  const DatePosted = getSimpleRelativeTime(createdAt);

  return (
    <div className="w-full py-[4rem] animated-lightblue-bg">
      <div className="container mx-auto flex justify-between">
        <div className="flex flex-col">
          <div className="flex  ">
            <div className="w-[6rem]">
              <img src="/com1.jpg" alt="" className="rounded-lg" />
            </div>
            <div className="flex gap-[0.8rem] ml-[2rem]  flex-col ">
              <h1 className="text-2xl font-medium">{title}</h1>
              <div className="flex gap-[1rem] w-[20%]">
                <div className="flex gap-1 items-center justify-center text-gray-500">
                  <BriefcaseIcon className="w-[1.3rem]" />
                  <p>{companyName}</p>
                </div>
                <div className="flex gap-1 items-center justify-center text-gray-500">
                  <MapPinIcon className="w-[1.3rem]" />
                  <p>{location}</p>
                </div>
                <div className="flex gap-1 items-center justify-center text-gray-500">
                  <ClockIcon className="w-[1.3rem]" />
                  <p className="w-[5.5rem]">{DatePosted}</p>
                </div>
                <div className="flex gap-1 items-center justify-center text-gray-500">
                  <BanknotesIcon className="w-[1.3rem]" />
                  <p>{salary}LPA</p>
                </div>
              </div>
              <div className="flex gap-[1.2rem]">
                <p className="py-1 px-3 font-semibold w-fit text-[0.9rem] rounded-full bg-blue-100 text-blue-400">
                  {jobType}
                </p>
                <p className="py-1 px-3 font-semibold w-fit text-[0.9rem] rounded-full bg-green-100 text-green-500">
                  {experienceLevel}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[1.5rem] justify-center items-center transition-all">
          <CreateApplication jobpost={jobpost} />
          <BookmarkIcon className="w-[3.7rem] py-3 px-4 hover:bg-blue-500 duration-300 cursor-pointer hover:text-gray-50 rounded-xl text-blue-500 bg-blue-100" />
        </div>
      </div>
    </div>
  );
}

export default JobDetailHeader;
