import { EnvelopeIcon, BriefcaseIcon } from "@heroicons/react/16/solid";
function Hero() {
  return (
    <div className="py-20 bg-blue-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-[15rem] px-4">
        {/* Left Section */}
        <div className="max-w-[45rem]">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
            The Easiest Way
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-700">
            to Get Your New Job
          </h1>
          <p className="text-gray-500 mb-8">
            Each month, more than 3 million job seekers turn to our website in
            their search for work, making over 140,000 applications every single
            day.
          </p>

          {/* Search Form */}
          <form className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-lg shadow-md transition-all ">
            <input
              type="text"
              className="flex-1 py-3 px-3 bg-gray-50 rounded-md focus:outline-none"
              placeholder="Job title, keywords, or company"
            />
            <input
              type="text"
              className="flex-1 py-3 px-3 bg-gray-50 rounded-md focus:outline-none"
              placeholder="City, state, or zip code"
            />
            <button className="px-6 py-3 duration-300 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
              Find Jobs
            </button>
          </form>

          <p className="mt-[1.5rem] text-gray-500 text-sm ">
            <span className="font-medium">Popular Searches:</span> Designer,
            Developer, Web, IOS, PHP, Senior, Engineer
          </p>
        </div>
        {/* ------------------------------------------------------------------------------------------------------- */}
        <div className="relative">
          {/* <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 z-[-1]"></div> */}

          <div className="w-[110%]">
            <img src="/heroimg.png" />
          </div>
          <div className="flex gap-6 w-[17rem] py-[1rem] items-center justify-center rounded-lg bg-gray-50 absolute bottom-[60%] left-[-6rem] shadow-xl">
            <EnvelopeIcon className="w-[22%] text-yellow-500 bg-amber-100 px-4 py-3 rounded-lg" />
            <p className="font-medium">Get mail's Everyday</p>
          </div>
          <div className="flex gap-6 w-[17rem] py-[1rem] items-center justify-center rounded-lg bg-gray-50 absolute  bottom-1 shadow-xl">
            <BriefcaseIcon className="w-[22%] text-red-400 bg-red-100 px-4 py-4 rounded-full" />
            <p className="font-medium">Creative Agency</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
