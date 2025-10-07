import { CheckIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { FaReact } from "react-icons/fa";

function FindJob() {
  return (
    <div className="container mx-auto py-[9rem] px-[4rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[7rem]">
        <div>
          <h1 className="text-[2rem] font-semibold">
            Where Great Companies Hire
          </h1>
          <h1 className="text-[2rem] font-semibold mb-[2rem]">Great People</h1>

          <p className="text-lg text-gray-500 mb-[1.5rem] w-[35rem]">
            Training your memory, executive control, and visuospatial reasoning
            can help to boost your intelligence levels. The best way to train
            these areas of your brain is to engage in thoughtful activities and
            games, learn new skills.
          </p>
          <div className="flex flex-col gap-[1rem]">
            <div className="flex  gap-3">
              <CheckIcon className="w-[4%] text-blue-500" />
              <p>Post your job to 100+ job search sites.</p>
            </div>
            <div className="flex  gap-3">
              <CheckIcon className="w-[4%] text-blue-500" />
              <p>Post your job to 100+ job search sites.</p>
            </div>
            <div className="flex  gap-3">
              <CheckIcon className="w-[4%] text-blue-500" />
              <p>Post your job to 100+ job search sites.</p>
            </div>
          </div>
          <button className="px-4 py-3 bg-blue-400 rounded-lg text-xl text-gray-50 mt-[2rem]">
            Find Jobs
          </button>
        </div>
        <div className="find-job-img-box flex justify-center items-center relative">
          <img src="/findjob.jpg" className="w-[80%] rounded-xl" />
          <div className="flex absolute left-0 translate-y-[7rem] justify-center gap-[1rem] items-center w-[15rem] py-5 px-2 rounded-lg bg-gray-50 shadow-xl">
            <GlobeAltIcon className="w-[20%] text-gray-50  px-2 py-2 rounded-full bg-blue-500" />
            <div>
              <p className="text-lg font-semibold">110+</p>
              <p className="text-lg font-semibold">popular companies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindJob;
