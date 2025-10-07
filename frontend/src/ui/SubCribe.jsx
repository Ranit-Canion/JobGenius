import { BriefcaseIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function SubCribe() {
  return (
    /*
    <div className="w-full bg-blue-100 ">
      <div className="container p-[9.8rem]  mx-auto relative">
        <div className="flex justify-center items-center flex-col ">
          <h1 className="text-4xl font-bold mb-3">
            Get The Latest <span className="text-blue-500">News & Updates</span>{" "}
            From
          </h1>
          <h1 className="text-4xl font-bold">Our Company</h1>
          <form className="mt-[3rem]">
            <input className="text-gray-500 py-3 rounded-l-lg bg-gray-50 w-[40rem] focus:outline-none focus:ring-3 focus:ring-blue-500" />
            <button className="text-gray-50 bg-blue-400 py-3 px-8 rounded-r-2xl">
              Subcribe
            </button>
          </form>
        </div>
        <div className="absolute top-4 left-[-5rem]">
          <BriefcaseIcon className="w-[70%] rotate-320 text-blue-300" />
        </div>
        <div className="absolute  right-[-8rem] bottom-[16rem]">
          <EnvelopeIcon className="w-[70%] rotate-45  text-blue-300" />
        </div>
      </div>
    </div>
    */

    <div className="container mx-auto px-6 mt-[6rem] md:px-20">
      <div className="bg-blue-100 p-8 md:p-12  rounded-xl relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text Content */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Recruiting?
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Advertise your jobs to millions of monthly users and search 15.8
              million CVs in our database.{" "}
            </p>
            <Link
              to="/signup"
              className="w-fit text-gray-50 bg-blue-500 text-primary-500 py-2 px-4 rounded-lg  text-md font-medium hover:bg-blue-600 transition-colors"
            >
              Start Recruiting
            </Link>
          </div>

          {/* Illustration */}
        </div>
        <div className="absolute right-5 top-[-1.6rem]">
          <img
            src="./newsletter.png"
            alt="Newsletter illustration"
            className="w-[20rem]"
          />
        </div>
      </div>
    </div>
  );
}

export default SubCribe;
