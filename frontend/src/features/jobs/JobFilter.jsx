import { useEffect, useState } from "react";
import Select from "react-select";
import { useAnalyseResume } from "./useAnalyseResume";

const jobTypes = [
  { value: "Full-Time", label: "Full-Time" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Work-From-Home", label: "Work-From-Home" },
];

const experienceLevels = [
  { value: "Entry-Level", label: "Entry-Level" },
  { value: "Intermediate-Level", label: "Intermediate-Level" },
  { value: "Experienced-Level", label: "Experienced-Level" },
];

function JobFilter({ jobs, setFilteredJobs }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState(0);
  const [jobType, setJobType] = useState([]);
  const [expLevel, setExpLevel] = useState([]);
  const [resumeSkills, setResumeSkills] = useState([]);
  const [resume, setResume] = useState(null);

  const { isPending, analyzeResume } = useAnalyseResume();

  // 🔍 Filtering logic
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchKeyword =
        keyword === "" ||
        job.title.toLowerCase().includes(keyword.toLowerCase());
      const matchLocation =
        location === "" ||
        job.location.toLowerCase().includes(location.toLowerCase());
      const matchSalary = !salary || job.salary <= Number(salary) * 100000;
      const matchJobType =
        jobType.length === 0 || jobType.some((t) => t.value === job.type);
      const matchExp =
        expLevel.length === 0 ||
        expLevel.some((e) => e.value === job.experienceLevel);
      const matchResume =
        resumeSkills.length === 0 ||
        job.skills?.some((s) =>
          resumeSkills.some((rs) => rs.toLowerCase() === s.toLowerCase())
        );

      return (
        matchKeyword &&
        matchLocation &&
        matchSalary &&
        matchJobType &&
        matchExp &&
        matchResume
      );
    });

    setFilteredJobs(filtered);
  }, [jobs, keyword, location, salary, jobType, expLevel, resumeSkills]);

  function handleResumeAnalyse() {
    if (!resume) return;

    const formData = new FormData();
    formData.append("resume", resume);

    analyzeResume(formData, {
      onSuccess: (data) => {
        setResumeSkills(data.skills || []);
      },
    });

    setResume(null);
  }

  return (
    <div className="w-full max-w-xl bg-gray-100 p-6 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 mb-2 rounded"
      />
      <label className="text-sm font-semibold mb-1">
        Salary (LPA): {salary}
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="w-full mb-2"
      />
      <Select
        isMulti
        options={jobTypes}
        value={jobType}
        onChange={setJobType}
        placeholder="Select Job Type"
        className="mb-2"
      />
      <Select
        isMulti
        options={experienceLevels}
        value={expLevel}
        onChange={setExpLevel}
        placeholder="Select Experience Level"
        className="mb-2"
      />

      <input
        type="file"
        onChange={(e) => setResume(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleResumeAnalyse}
        className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        disabled={isPending || !resume}
      >
        {isPending ? "Analyzing..." : "Analyze Resume"}
      </button>
    </div>
  );
}

export default JobFilter;
