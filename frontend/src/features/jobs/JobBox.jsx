import JobFilter from "./JobFilter";
import JobList from "./JobList";
import { useAnalyseResume } from "./useAnalyseResume";
import { useState } from "react";
import useJobPosts from "./useJobPosts";
import makeAnimated from "react-select/animated";
import {
  BriefcaseIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Select from "react-select";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#f1f3f5",
    width: "100%",
    borderColor: state.isFocused ? "#339af0" : "#d1d5db",
    borderWidth: state.isFocused ? "2px" : "1px",
    borderStyle: "solid",
    borderRadius: "1rem",
    padding: "0.25rem 0.5rem",
    minHeight: "3rem",
    boxShadow: "none",
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: "#e0f2fe",
    borderRadius: "1rem",
    // padding: "0.3rem rem",
    color: "#2563eb",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#2563eb",
    fontWeight: 500,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#2563eb",
    cursor: "pointer",
    backgroundColor: "transparent",
    ":hover": {
      color: "#dc2626",
      backgroundColor: "transparent",
    },
  }),
};

function JobBox() {
  useEffect(function () {
    Aos.init();
  }, []);
  const { isPending: isPending1, jobPosts } = useJobPosts();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedExpLevel, setSelectedExpLevel] = useState([]);
  const [resumeData, setResumeData] = useState({});
  const [resume, setResume] = useState();
  const animatedComponents = makeAnimated();
  const optionsForJobTypes = [
    { value: "Full-Time", label: "Full-Time" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Work-From-Home", label: "Work-From-Home" },
  ];
  const optionForExpLevels = [
    { value: "Entry-Level", label: "Entry-Level" },
    { value: "Intermediate-Level", label: "Intermediate-Level" },
    { value: "Experienced-Level", label: "Experienced-Level" },
  ];

  const { isPending: isPending2, analyzeResume } = useAnalyseResume();
  function handleAnalyzeResume() {
    const formData = new FormData();
    formData.append("resume", resume);

    analyzeResume(formData, {
      onSuccess: (data) => {
        setResumeData(data);
      },
    });
    setResume("");
  }
  if (isPending1) console.log("loading..");
  console.log(jobPosts);
  if (!jobPosts?.data?.posts) return null;
  let filteredJobs = jobPosts.data.posts || [];

  if (keyword.trim() !== "") {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.companyName.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  if (location.trim() !== "") {
    filteredJobs = filteredJobs.filter((job) =>
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (salary !== "") {
    filteredJobs = filteredJobs.filter(
      (job) => Number(job.salary) >= Number(salary)
    );
  }

  if (selectedJobTypes.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      selectedJobTypes.some((type) => type.value === job.jobType)
    );
  }

  if (selectedExpLevel.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      selectedExpLevel.some((level) => level.value === job.experienceLevel)
    );
  }

  if (resumeData.skills && resumeData.skills.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      resumeData.skills.some((skill) =>
        job.skillsRequired?.some(
          (jobSkill) =>
            jobSkill &&
            skill &&
            jobSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  }

  function handleClear(e) {
    e.preventDefault();
    setKeyword("");
    setLocation("");
    setResume("");
    setResumeData("");
    setSelectedExpLevel([]);
    setSelectedJobTypes([]);
    setSalary("");
  }
  console.log("level->", resumeData);
  return (
    <div className="">
      <div className="w-full py-[4rem] animated-lightblue-bg">
        <h1 className="text-center text-3xl font-medium">Find Jobs</h1>
      </div>
      <div className="flex flex-col md:flex-row  gap-[2rem] mx-auto container px-[5rem]">
        <div
          className="w-[52rem] bg-gray-100 px-[2rem] mt-[2rem] py-[2rem] shadow-md rounded-xl h-fit"
          data-aos="fade-right"
        >
          <form
            className="flex flex-col gap-[2rem] w-full max-w-xl"
            // onSubmit={handleSubmit}
          >
            {/* Keyword Search */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="search"
                className="text-lg font-medium text-gray-700"
              >
                Search By Keywords
              </label>
              <div className="flex items-center w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-4 focus-within:ring-2 focus-within:ring-blue-500">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enter job title or company"
                  className="ml-3 w-full bg-gray-50 outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Location Search */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="location"
                className="text-lg font-medium text-gray-700"
              >
                Search By Location
              </label>
              <div className="flex items-center w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-4 focus-within:ring-2 focus-within:ring-blue-500">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter Location"
                  className="ml-3 w-full bg-gray-50 outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[1rem]">
              <label>Job Type</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={optionsForJobTypes}
                onChange={(selected) => setSelectedJobTypes(selected || [])}
                value={selectedJobTypes}
                styles={customStyles}
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>
            <div className="flex flex-col gap-[1rem]">
              <label>Experience-Level</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={optionForExpLevels}
                value={selectedExpLevel}
                styles={customStyles}
                onChange={(selected) => setSelectedExpLevel(selected || [])}
                placeholder="e.g., Work-From-Home, Full-Time, Hybrid"
              />
            </div>

            <div className="w-full px-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Expected Salary Range
              </label>
              <input
                type="range"
                min="2"
                max="100"
                step="1"
                onChange={(e) => setSalary(e.target.value)}
                value={salary}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="mt-3 flex justify-center">
                <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-md font-semibold text-sm shadow-sm">
                  {salary} LPA
                </span>
              </div>
            </div>
          </form>
          <div className="flex flex-col mt-4 ">
            <label className="mb-4"> Resume-Based Job Recommendations</label>
            <label
              htmlFor="resume-upload"
              className="py-6 px-7 border-2 border-dotted border-blue-400 cursor-pointer text-gray-600 rounded-lg text-center"
            >
              {isPending1
                ? "Analyzing..."
                : resume?.name || "Upload your resume"}
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              disabled={isPending1}
              onChange={(e) => setResume(e.target.files[0])}
            />
            <button
              onClick={handleAnalyzeResume}
              disabled={isPending2}
              className={`py-2 px-3 rounded-2xl text-white mt-3 duration-300 cursor-pointer font-semibold
    ${
      isPending2 ? "bg-blue-300 animate-pulse" : "bg-blue-500 hover:bg-blue-600"
    }
  `}
            >
              {isPending2 ? "Analyzing..." : "Analyse Resume"}
            </button>
          </div>
        </div>

        <JobList
          jobPosts={jobPosts}
          filteredJobs={filteredJobs}
          isPending={isPending1}
          onClear={handleClear}
        />
      </div>
    </div>
  );
}

export default JobBox;
