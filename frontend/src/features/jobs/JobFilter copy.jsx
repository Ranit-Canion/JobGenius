import { useState } from "react";
import {
  BriefcaseIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useAnalyseResume } from "./useAnalyseResume";

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

function JobFilter({ jobs }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedExpLevel, setSelectedExpLevel] = useState([]);
  const [resumeData, setResumeData] = useState({});
  const [resume, setResume] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
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

  const { isPending, analyzeResume } = useAnalyseResume();

  function handleParamForExpLevel(val) {
    setSelectedExpLevel(val);
    searchParams.delete("experienceLevel");
    val.map((obj) => searchParams.append("experienceLevel", obj.value));
    setSearchParams(searchParams);
  }
  function handleParamForJobType(val) {
    setSelectedJobTypes(val);
    searchParams.delete("jobType");
    val.map((obj) => searchParams.append("jobType", obj.value));
    setSearchParams(searchParams);
  }
  function handlParamSalary(e) {
    const value = e.target.value;
    setSalary(value);
    searchParams.set("salary", value);
    setSearchParams(searchParams);
  }

  function handleLocation(e) {
    const value = e.target.value;
    setLocation(value);
    if (value.trim() === "") {
      searchParams.delete("location");
    } else {
      searchParams.set("location", value);
    }
    setSearchParams(searchParams);
  }

  function handleKeyword(e) {
    const value = e.target.value;
    setKeyword(value);
    if (value.trim() === "") {
      searchParams.delete("title");
    } else {
      searchParams.set("title", value);
    }
    setSearchParams(searchParams);
  }

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
  console.log(resumeData);
  return (
    <div className="w-[52rem] bg-gray-100 px-[2rem] mt-[2rem] py-[2rem] shadow-md rounded-xl h-fit">
      <form
        className="flex flex-col gap-[2rem] w-full max-w-xl"
        // onSubmit={handleSubmit}
      >
        {/* Keyword Search */}
        <div className="flex flex-col gap-2">
          <label htmlFor="search" className="text-lg font-medium text-gray-700">
            Search By Keywords
          </label>
          <div className="flex items-center w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-4 focus-within:ring-2 focus-within:ring-blue-500">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              id="search"
              value={keyword}
              onChange={handleKeyword}
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
              onChange={handleLocation}
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
            value={selectedJobTypes}
            onChange={handleParamForJobType}
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
            onChange={handleParamForExpLevel}
            styles={customStyles}
            placeholder="e.g., JavaScript, React, Node.js"
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
            value={salary}
            onChange={handlParamSalary}
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
          {isPending ? "Analyzing..." : resume?.name || "Upload your resume"}
        </label>
        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          className="hidden"
          disabled={isPending}
        />
        <button
          onClick={handleAnalyzeResume}
          disabled={isPending}
          className={`py-2 px-3 rounded-2xl text-white mt-3 duration-300 cursor-pointer font-semibold
    ${isPending ? "bg-blue-300 animate-pulse" : "bg-blue-500 hover:bg-blue-600"}
  `}
        >
          {isPending ? "Analyzing..." : "Analyse Resume"}
        </button>
      </div>
    </div>
  );
}

export default JobFilter;
