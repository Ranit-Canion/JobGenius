import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import JobSingle from "./JobSingle";
import useJobPosts from "./useJobPosts";
import { useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import {
  ArrowRightCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

function JobList() {
  const { isPending, jobPosts } = useJobPosts();
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick() {
    setSearchParams({});
  }
  const page = Number(searchParams.get("page")) || 1;
  function handlePage(val) {
    const totalPage = Math.ceil(jobPosts.data.totalCount / 10);
    if (val >= 1 && val <= totalPage && page !== val) {
      searchParams.set("page", val);
      setSearchParams(searchParams);
    }
  }
  console.log(jobPosts);
  return isPending ? (
    <Spinner />
  ) : (
    <div className="p-4">
      <div className="flex justify-between mb-[1.5rem]">
        <p className="text-gray-500 ">
          Show{" "}
          <span className="text-gray-700 font-semibold">
            {jobPosts.results}
          </span>{" "}
          jobs
        </p>
        <div className="flex gap-4 transition-all">
          <button
            className="text-gray-50 bg-red-600 rounded-md py-2 px-4 duration-300 hover:bg-red-700 cursor-pointer"
            onClick={handleClick}
          >
            Clear All
          </button>
          <select className="py-3 px-5 text-lg bg-gray-100 rounded-lg text-gray-600  ">
            <option>SortBy default</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobPosts.data.posts.map((post) => (
          <JobSingle post={post} key={post._id} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-[1rem] transition-all mt-[2rem]">
        <span
          onClick={() => handlePage(page - 1)}
          className="px-2 py-2 border-2 cursor-pointer border-gray-300 rounded-xl hover:bg-blue-500 hover:text-white   duration-300"
        >
          <ChevronLeftIcon className="w-[1.4rem]  " />
        </span>

        {[...Array(Math.ceil(jobPosts.data.totalCount / 10))].map((_, i) => (
          <span
            onClick={() => handlePage(i + 1)}
            className={`cursor-pointer py-2 px-4 border-2 border-gray-300 rounded-xl duration-300 ${
              page === i + 1
                ? "text-gray-50 bg-blue-500 border-none"
                : "hover:bg-blue-500 hover:text-gray-50"
            }`}
            key={i}
          >
            {i + 1}
          </span> // show 1-based page numbers
        ))}

        <span
          className="px-2 py-2 border-2 cursor-pointer border-gray-300 rounded-xl hover:bg-blue-500 hover:text-white   duration-300"
          onClick={() => handlePage(page + 1)}
        >
          <ChevronRightIcon className="w-[1.4rem]" />
        </span>
      </div>
    </div>
  );
}

export default JobList;
