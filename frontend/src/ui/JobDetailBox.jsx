import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import {
  getFormattedExpDate,
  getSimpleRelativeTime,
} from "../utils/DateService";

function JobDetailBox({ jobpost }) {
  const { createdAt, expirationDate, location, skillsRequired, salary, _id } =
    jobpost;

  const formattedDate = getFormattedExpDate(expirationDate);
  const DatePosted = getSimpleRelativeTime(createdAt);

  return (
    <div className="w-[26rem] bg-blue-50 h-[40rem] px-[2rem] py-[1.3rem] rounded-xl">
      <h1 className="text-xl font-medium mb-[1rem]">Job Overview</h1>
      <div className="flex flex-col gap-[1rem]">
        <div className="flex gap-[1rem]  ">
          <CalendarDateRangeIcon className="w-[1.7rem] text-blue-500" />
          <div className="flex flex-col mt-[0.8rem] ">
            <p className="font-medium">Date Posted </p>
            <p className="text-gray-700">{DatePosted}</p>
          </div>
        </div>
        <div className="flex gap-[1rem]  ">
          <CalendarDateRangeIcon className="w-[1.7rem] text-blue-500" />
          <div className="flex flex-col mt-[0.8rem] ">
            <p className="font-medium">Expiration Date</p>
            <p className="text-gray-700">{formattedDate}</p>
          </div>
        </div>
        <div className="flex gap-[1rem]  ">
          <CalendarDateRangeIcon className="w-[1.7rem] text-blue-500" />
          <div className="flex flex-col mt-[0.8rem] ">
            <p className="font-medium">Location</p>
            <p className="text-gray-700">{location}</p>
          </div>
        </div>
        <div className="flex gap-[1rem]  ">
          <CalendarDateRangeIcon className="w-[1.7rem] text-blue-500" />
          <div className="flex flex-col mt-[0.8rem] ">
            <p className="font-medium">Salary</p>
            <p className="text-gray-700">{salary} LPA</p>
          </div>
        </div>
        {/* <div className="flex gap-[1rem]  ">
          <CalendarDateRangeIcon className="w-[1.7rem] text-blue-500" />
          <div className="flex flex-col mt-[0.8rem] ">
            <p className="font-medium">Date Posted :</p>
            <p className="text-gray-700">Posted 1 hours ago</p>
          </div>
        </div> */}
      </div>
      <div className="mt-[1.7rem]">
        <h1 className="text-lg mb-[1rem] font-medium">Job Skills</h1>
        <div className="flex flex-col ">
          <div className="grid grid-cols-4 gap-[0.7rem]">
            {skillsRequired.map((el, idx) => (
              <p
                key={`${el}-${idx}`}
                className="h-fit py-1 px-1.5 rounded-xl bg-white w-fit"
              >
                {el}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailBox;
