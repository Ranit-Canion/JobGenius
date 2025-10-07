import {
  AcademicCapIcon,
  BanknotesIcon,
  CalendarDateRangeIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  LanguageIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
// import { HourglassIcon } from "@heroicons/react/24/solid";

function ApplicantDetailBox({ userData }) {
  const profile = userData?.profile;
  return (
    <div className="w-[26rem] bg-blue-50 h-[40rem] px-[2rem] py-[1.3rem] rounded-xl">
      <div className="flex flex-col gap-[1rem]">
        <div className="flex gap-[1rem]  ">
          <CalendarIcon className="w-[1.7rem] text-blue-500" />
          <div className="flex flex-col mt-[0.8rem] ">
            <p className="font-medium">Experience: </p>
            <p className="text-gray-700">{profile?.experience}</p>
          </div>
        </div>
        <div className="flex gap-[1rem]  ">
          <ClockIcon className="w-[1.7rem] text-blue-500" />
          <div className="flex flex-col mt-[0.8rem] ">
            <p className="font-medium">Age:</p>
            <p className="text-gray-700">{profile?.age}</p>
          </div>
        </div>
        <div className="flex gap-[1rem]  ">
          <CurrencyRupeeIcon className="w-[1.7rem] text-blue-500" />
          <div className="flex flex-col mt-[0.8rem] ">
            <p className="font-medium">Current Salary:</p>
            <p className="text-gray-700">{profile?.currentPackage}</p>
          </div>
        </div>
        <div className="flex gap-[1rem]  ">
          <BanknotesIcon className="w-[1.7rem] text-blue-500" />
          <div className="flex flex-col mt-[0.8rem] ">
            <p className="font-medium">Expected Salary</p>
            <p className="text-gray-700">{profile?.expectedPackage}</p>
          </div>
        </div>
        <div className="flex gap-[1rem]  ">
          <UserIcon className="w-[1.7rem] text-blue-500" />
          <div className="flex flex-col mt-[0.8rem] ">
            <p className="font-medium">Gender:</p>
            <p className="text-gray-700">{profile?.gender} </p>
          </div>
        </div>
        <div className="flex gap-[1rem]  ">
          <LanguageIcon className="w-[1.7rem] text-blue-500" />
          <div className="flex flex-col mt-[0.8rem] ">
            <p className="font-medium">Language:</p>
            <p className="text-gray-700">
              {" "}
              {profile?.languages?.join(", ") || "No languages specified"}
            </p>
          </div>
        </div>
        <div className="flex gap-[1rem]  ">
          <AcademicCapIcon className="w-[1.7rem] text-blue-500" />
          <div className="flex flex-col mt-[0.8rem] ">
            <p className="font-medium">Educational Level:</p>
            <p className="text-gray-700">{profile?.educationLevel}</p>
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
      {/* <div className="mt-[1.7rem]">
        <h1 className="text-lg mb-[1rem] font-medium">Job Skills</h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            {skillsRequired.map((el, idx) => (
              <p key={`${el}-${idx}`} className="px-2 py-1 bg-white">
                {el}
              </p>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default ApplicantDetailBox;
