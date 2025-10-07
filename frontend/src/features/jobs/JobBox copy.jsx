import JobFilter from "./JobFilter";
import JobList from "./JobList";

function JobBox() {
  return (
    <div className="">
      <div className="w-full py-[4rem] bg-blue-100">
        <h1 className="text-center text-3xl font-medium">Find Jobs</h1>
      </div>
      <div className="flex flex-col md:flex-row  gap-[2rem] mx-auto container px-[5rem]">
        <JobFilter />
        <JobList />
      </div>
    </div>
  );
}

export default JobBox;
