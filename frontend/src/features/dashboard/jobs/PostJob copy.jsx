import { useState } from "react";
import usePostNewJob from "../../jobs/usePostNewJob";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import JoditEditor from "jodit-react";
import Samplep2 from "../../../ui/Samplep2";
import Sample from "../../../ui/Sample";
import useGenAiData from "../../jobs/useGenAiData";
import SpinnerMini from "../../../ui/SpinnerMini";
import Test from "../../../ui/Test";
import { SparklesIcon } from "@heroicons/react/24/outline";

const animatedComponents = makeAnimated();
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

function PostJob() {
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [expDate, setExpDate] = useState("");
  const [jobtype, setJobType] = useState("");
  const [exeLevel, setExeLevel] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [description, setDescription] = useState("");
  const [genAidata, setGenAiData] = useState("");
  const { isPending, postNewJob } = usePostNewJob();
  const { isPending: isLoading, getGenAiData } = useGenAiData();
  function handleSubmit(e) {
    e.preventDefault();
    const skillsValues = selectedSkills.map((obj) => obj.value);
    const postObj = {
      title,
      salary,
      location,
      expirationDate: expDate,
      jobType: jobtype,
      experienceLevel: exeLevel,
      skillsRequired: skillsValues,
      description,
    };
    console.log(postObj);
    postNewJob(postObj);

    // Reset form
    setTitle("");
    setSalary("");
    setLocation("");
    setExpDate("");
    setJobType("");
    setExeLevel("");
    setSelectedSkills([]);
    setDescription("");
  }
  function handleGetDescription(htmlData) {
    setDescription(htmlData);
  }
  function handleGetGenAiData(e) {
    e.preventDefault();
    const skillsValues = selectedSkills.map((obj) => obj.value);

    const genAiBodyObj = {
      title,
      location,
      skills: skillsValues,
      experienceLevel: exeLevel,
    };
    getGenAiData(genAiBodyObj, {
      onSuccess: (data) => {
        setGenAiData(data.content); // set HTML from backend
        setDescription(data.content);
      },
    });
  }

  return (
    <>
      <h1 className="mb-12 text-3xl font-bold">Post a New Job!</h1>
      <div className="mx-auto container bg-gray-50 p-6 rounded-2xl">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          {/* TITLE & SALARY */}
          <div className="flex gap-6">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-lg font-medium text-gray-600">Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-lg font-medium text-gray-600">
                Salary (LPA)
              </label>
              <input
                type="text"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* LOCATION & DATE */}
          <div className="flex gap-6">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-lg font-medium text-gray-600">
                Location
              </label>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-lg font-medium text-gray-600">
                Expiration Date
              </label>
              <input
                type="date"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* JOB TYPE & EXPERIENCE */}
          <div className="flex gap-6">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-lg font-medium text-gray-600">
                Job Type
              </label>
              <select
                value={jobtype}
                onChange={(e) => setJobType(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              >
                <option value="" disabled hidden>
                  Select Job Type
                </option>
                <option value="Full-Time">Full-Time</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Work-From-Home">Work-From-Home</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-lg font-medium text-gray-600">
                Experience Level
              </label>
              <select
                value={exeLevel}
                onChange={(e) => setExeLevel(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              >
                <option value="" disabled hidden>
                  Select Job Type
                </option>
                <option value="Entry-Level">Entry-Level</option>
                <option value="Intermediate-Level">Intermediate -Level</option>
                <option value="Experienced-Level">Experienced-Level</option>
              </select>
            </div>
          </div>

          {/* SKILLS INPUT */}
          <div className="flex flex-col gap-4">
            <label className="text-lg font-medium text-gray-600">
              Skills Required
            </label>
            <CreatableSelect
              isMulti
              components={animatedComponents}
              value={selectedSkills}
              onChange={(newValue) => setSelectedSkills(newValue || [])}
              placeholder="e.g., JavaScript, React, Node.js"
              noOptionsMessage={() => "Type and press Enter to add"}
              formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
              styles={customStyles}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between transition-all">
              <label className="text-lg font-medium text-gray-600">
                Description
              </label>
              <button
                onClick={handleGetGenAiData}
                disabled={isPending}
                className={`flex items-center gap-2 py-2 px-4 rounded-2xl text-white mt-3 duration-300 cursor-pointer font-semibold
    ${isPending ? "bg-blue-300 animate-pulse" : "bg-blue-500 hover:bg-blue-600"}
  `}
              >
                <SparklesIcon
                  className={`transition-all duration-300 ${
                    isPending ? "w-10 h-10" : "w-4 h-4"
                  }`}
                  strokeWidth={2}
                />
                {isLoading ? "Generating..." : "Generate with AI"}
                {isLoading && <SpinnerMini />}
              </button>
            </div>

            <Sample
              onhandleGetDescription={handleGetDescription}
              genAiHTMLdata={genAidata}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="py-3 px-6 mt-4 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={isPending}
          >
            {isPending ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </>
  );
}

export default PostJob;
