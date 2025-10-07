import { useState } from "react";
import useGetUser from "../features/auth/getCurrentUser";
import EducationSingle from "./EducationSingle";
import useUpdateUserData from "../features/auth/useUpdateUserData";

function EducationForm() {
  const { profile } = useGetUser();
  const { updateData } = useUpdateUserData();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      title,
      subTitle,
      startYear,
      endYear,
      description,
    };
    const updatedEducation = [...(profile?.education || []), obj];
    updateData({ education: updatedEducation });
  }
  return (
    <div className="bg-gray-50 p-[2rem] rounded-2xl shadow-sm">
      <h1 className="text-[1.2rem] font-medium">Education</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <div className="flex flex-col gap-3 w-1/2">
            <label>Degree</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <label>College Name</label>
            <input
              type="text"
              onChange={(e) => setSubTitle(e.target.value)}
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-3 w-1/2">
            <label>Starting Year</label>
            <input
              type="text"
              onChange={(e) => setStartYear(e.target.value)}
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-3 w-1/2">
            <label>Ending Year</label>
            <input
              type="text"
              onChange={(e) => setEndYear(e.target.value)}
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label>Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-5 mt-2 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500 w-full"
          />
        </div>
        <button className="w-full bg-blue-500 font-semibold  duration-300 text-[1rem] text-gray-50 py-3  rounded-xl mt-[1rem] hover:bg-blue-600 cursor-pointer">
          Submit
        </button>
      </form>
      <div className="mt-[1rem] flex flex-col gap-[1rem]">
        {profile?.education?.map((obj) => (
          <EducationSingle educationObj={obj} />
        ))}
      </div>
    </div>
  );
}

export default EducationForm;
