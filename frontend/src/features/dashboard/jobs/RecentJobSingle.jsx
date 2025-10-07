import {
  BanknotesIcon,
  BriefcaseIcon,
  ClockIcon,
  MapIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
function RecentJobSingle({ appliedJob }) {
  const { post } = appliedJob;
  if (!post) return;
  const { title, jobType, location, experienceLevel, createdAt, salary } = post;
  return (
    <div className="flex flex-col">
      <div className="flex py-[1.8rem] px-[2rem] border-1 border-gray-200 rounded-2xl">
        <div className="w-[3rem]">
          <img src="/com1.jpg" alt="" className="rounded-lg" />
        </div>
        <div className="flex gap-1.5 ml-[2rem]  flex-col ">
          <h1 className="text-xl font-medium">{title}</h1>
          <div className="flex gap-2 w-[20%]">
            <div className="flex gap-1 items-center justify-center text-gray-500">
              <BriefcaseIcon className="w-[0.9rem]" />
              <p>Atlassian</p>
            </div>
            <div className="flex gap-1 items-center justify-center text-gray-500">
              <MapPinIcon className="w-[0.9rem]" />
              <p>{location}</p>
            </div>
            <div className="flex gap-1 items-center justify-center text-gray-500">
              <ClockIcon className="w-[0.9rem]" />
              <p>11hours</p>
            </div>
            <div className="flex gap-1 items-center justify-center text-gray-500">
              <BanknotesIcon className="w-[0.9rem]" />
              <p>{salary}LPA</p>
            </div>
          </div>
          <div className="flex gap-2">
            <p className="py-1 px-3 font-semibold w-fit text-[0.9rem] rounded-full bg-blue-100 text-blue-400">
              {jobType}
            </p>
            <p className="py-1 px-3 font-semibold w-fit text-[0.9rem] rounded-full bg-green-100 text-green-600">
              {experienceLevel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentJobSingle;
