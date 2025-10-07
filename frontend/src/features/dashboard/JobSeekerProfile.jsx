import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import useUpdateUserData from "../auth/useUpdateUserData";
import { useEffect, useState } from "react";
import useGetUser from "../auth/getCurrentUser";
import { useGetApplicantAboutByAI } from "./useGetApplicantAboutByAI";
import EducationForm from "../../ui/EducationForm";
import WorkExperienceForm from "../../ui/WorkExperienceForm";
import AwardForm from "../../ui/AwardForm";

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

function JobSeekerProfile() {
  const { isPending, updateData } = useUpdateUserData();
  const { isPending: isGenerating, generateApplicantAbout } =
    useGetApplicantAboutByAI();
  const { isPending: isFetching, user, profile } = useGetUser();
  if (isFetching) console.log("loading");
  console.log("user->", user);
  console.log("Profile->", profile);
  // Personal info
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.photo || "");

  // Profile-specific
  const [experience, setExperience] = useState(profile?.experience || "");
  const [age, setAge] = useState(profile?.age || "");
  const [gender, setGender] = useState(profile?.gender || "");
  const [currentPackage, setCurrentPackage] = useState(
    profile?.currentPackage || ""
  );
  const [expectedPackage, setExpectedPackage] = useState(
    profile?.expectedPackage || ""
  );
  const [about, setAbout] = useState(profile?.about || "");
  const [languages, setLanguages] = useState(profile?.languages || []);
  const [skills, setSkills] = useState(profile?.skills || []);
  const [generatedData, setGeneratedData] = useState("");
  useEffect(() => {
    if (!user || !profile) return;

    setName(user.name || "");
    setAvatar(user.photo || "");
    setExperience(profile.experience || "");
    setAge(profile.age || "");
    setGender(profile.gender || "");
    setCurrentPackage(profile.currentPackage || "");
    setExpectedPackage(profile.expectedPackage || "");
    setAbout(profile.about || "");

    // languages & skills (already done in your code)
    setLanguages(
      (profile.languages || []).map((lang) => ({
        value: lang,
        label: lang,
      }))
    );

    setSkills(
      (profile.skills || []).map((skill) => ({
        value: skill,
        label: skill,
      }))
    );
  }, [user, profile]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("photo", avatar);
    data.append("experience", experience);
    data.append("age", age);
    data.append("gender", gender);
    data.append("currentPackage", currentPackage);
    data.append("expectedPackage", expectedPackage);
    data.append("about", about);
    languages.forEach((lang) => {
      data.append("languages", lang.value);
    });
    skills.forEach((skill) => {
      data.append("skills", skill.value);
    });

    updateData(data);
  }
  function handleGenerateAbout(e) {
    e.preventDefault();
    const applicantData = {
      experience,
      skills,
      currentPackage,
      expectedPackage,
      age,
      gender,
    };
    generateApplicantAbout(applicantData, {
      onSuccess: (data) => {
        setGeneratedData(data);
        setAbout(generatedData.about);
      },
    });
  }
  console.log("here->", generatedData.about);
  return (
    <div className="mx-auto container flex flex-col gap-[1.6rem]">
      <div className="bg-gray-50 p-[2rem] rounded-2xl shadow-2xs">
        <h1 className="text-xl font-medium mb-[1rem] text-gray-600">
          Applicant Profile
        </h1>

        {/* Profile Form */}
        <form className="flex flex-col gap-[2rem]" onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className="flex flex-col gap-[1rem] w-1/2">
              <label className="text-lg font-medium text-gray-600">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-[1rem]">
              <div className="flex justify-between items-center ">
                <label>Profile Picture</label>
                <img
                  src={`http://localhost:5000/user/${user?.photo}`}
                  className="w-[3rem] h-[3rem] rounded-full border-2 border-blue-600"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="text-blue-400 bg-blue-100 cursor-pointer py-2 px-3 rounded-xl font-medium duration-300 hover:text-gray-50 hover:bg-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-3 w-1/2">
              <label>Experience</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <label>Age</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="px-6 py-4 w-full bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-3 w-1/2">
              <label>Current Salary (LPA)</label>
              <input
                type="text"
                value={currentPackage}
                onChange={(e) => setCurrentPackage(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <label>Expected Salary (LPA)</label>
              <input
                type="text"
                value={expectedPackage}
                onChange={(e) => setExpectedPackage(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-3 w-1/2">
              <label>Gender</label>
              {/* <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              /> */}
              <select
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-lg font-medium text-gray-600">
              Languages
            </label>
            <CreatableSelect
              isMulti
              components={animatedComponents}
              value={languages}
              onChange={(newValue) => setLanguages(newValue || [])}
              placeholder="e.g., English, Hindi"
              noOptionsMessage={() => "Type and press Enter to add"}
              formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
              styles={customStyles}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-lg font-medium text-gray-600">Skills</label>
            <CreatableSelect
              isMulti
              components={animatedComponents}
              value={skills}
              onChange={(newValue) => setSkills(newValue || [])}
              placeholder="e.g., JavaScript, React, Node.js"
              noOptionsMessage={() => "Type and press Enter to add"}
              formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
              styles={customStyles}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between transition-all">
              <label>Applicant About</label>
              <p
                onClick={handleGenerateAbout}
                className="bg-blue-500 text-white py-2 px-4 rounded-2xl duration-300 cursor-pointer hover:bg-blue-600 disabled:opacity-50"
                disabled={isGenerating || !generatedData}
              >
                {isGenerating ? "Generating..." : "Generate with AI"}
              </p>
            </div>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="px-4 py-5 mt-2 h-[13rem] bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500 w-full"
            />
          </div>
          {/* Education---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

          <button
            disabled={isPending}
            className="w-full bg-blue-500 font-semibold  duration-300 text-[1rem] text-gray-50 py-3  rounded-xl mt-[1rem] hover:bg-blue-600 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
      <EducationForm />
      <WorkExperienceForm />
      <AwardForm />
    </div>
  );
}

export default JobSeekerProfile;
