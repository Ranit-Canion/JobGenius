import SpinnerMini from "../../ui/SpinnerMini";
import useGetUser from "../auth/getCurrentUser";
import useProvideCompanyDetails from "../auth/useProvideCompanyDetails";
import useUpdateUserData from "../auth/useUpdateUserData";
import { useState } from "react";

function JobRecruiterProfile() {
  const { user, profile } = useGetUser();

  const [name, setName] = useState(user?.name);
  const [avatar, setAvatar] = useState(user?.photo);
  // const [experience, setExperience] = useState("");
  const { isPending, updateData } = useUpdateUserData();
  //------------------------------------------------------------------------------------------------------------------------
  const [companyName, setCompanyName] = useState(profile?.companyName || "");
  const [size, setSize] = useState(profile?.size || "");
  const [industry, setIndustry] = useState(profile?.industry || "");
  const [companyLocation, setCompanyLocation] = useState(
    profile?.companyLocation || ""
  );
  const [companyAbout, setCompanyAbout] = useState(profile?.companyAbout || "");
  const [foundedIn, setFoundedIn] = useState(profile?.foundedIn || "");
  const [companyLogo, setCompanyLogo] = useState(null);
  const { provideCompanyData } = useProvideCompanyDetails();
  function handleCompanyProfileSubmit(e) {
    e.preventDefault();
    const companyData = new FormData();
    companyData.append("companyName", companyName);
    companyData.append("size", size);
    companyData.append("companyLocation", companyLocation);
    companyData.append("companyAbout", companyAbout);
    companyData.append("companyLogo", companyLogo);
    companyData.append("foundedIn", foundedIn);
    companyData.append("industry", industry);
    provideCompanyData(companyData);
  }
  function handleUserProfileSubmit(e) {
    e.preventDefault();
    const userData = new FormData();
    userData.append("name", name);
    // userData.append("experience", experience);
    userData.append("photo", avatar);
    updateData(userData);
    setName("");
    setAvatar("");
  }
  return (
    <div className="flex flex-col gap-[1.5rem] mx-auto container">
      <div className="p-[2rem] bg-gray-50 rounded-2xl shadow-sm">
        <h1 className="text-xl font-medium mb-[1rem] text-gray-600">
          Employee Profile
        </h1>
        <form
          className="flex flex-col gap-[2rem]"
          onSubmit={handleUserProfileSubmit}
        >
          <div className=" flex gap-3">
            <div className="flex flex-col gap-[1rem] w-1/2">
              <label className="text-lg font-medium text-gray-600">Name</label>
              <input
                placeholder="Name"
                type="text"
                disabled={isPending}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-6 py-4  bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500 "
              />
            </div>

            {/* ----------------------------------------------------------------------- */}
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
                name="photo"
                accept="imagle/*"
                id="photo"
                onChange={(e) => setAvatar(e.target.files[0])}
                disabled={isPending}
                className="text-blue-400 bg-blue-100 cursor-pointer py-2 px-3  rounded-xl font-medium duration-300 hover:text-gray-50 hover:bg-blue-500"
              />
            </div>
          </div>
          <div className="transition-all">
            <button className="w-full bg-blue-500 font-semibold  duration-300 text-[1rem] text-gray-50 py-3  rounded-xl mt-[1rem] hover:bg-blue-600 cursor-pointer">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* -------------------------------------------------------------------------------------------------------------------------- */}
      <div className="mx-auto container p-[2rem] bg-gray-50">
        <h1 className="text-xl font-medium mb-[1rem] text-gray-600 mt-[1rem]">
          Company Profile
        </h1>
        <form
          className=" flex flex-col w-full gap-[1rem]"
          onSubmit={handleCompanyProfileSubmit}
        >
          <div className="flex gap-2 ">
            <div className="flex flex-col gap-3 w-1/2">
              <label>Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500 "
              />
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <label>Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="px-6 py-4 w-full bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-3 w-1/2">
              <label>Size</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <label>Location</label>
              <input
                type="text"
                value={companyLocation}
                onChange={(e) => setCompanyLocation(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-3 w-1/2">
              <label>Found-In</label>
              <input
                type="text"
                value={foundedIn}
                onChange={(e) => setFoundedIn(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <label>Company Logo</label>
              <input
                type="file"
                accept="imagle/*"
                onChange={(e) => setCompanyLogo(e.target.files[0])}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label>Company About</label>
            <textarea
              onChange={(e) => setCompanyAbout(e.target.value)}
              value={companyAbout}
              className="px-4 py-5 h-[17rem] mt- bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500 w-full"
            />
          </div>
          <button className="w-full bg-blue-500 font-semibold  duration-300 text-[1rem] text-gray-50 py-3  rounded-xl mt-[1rem] hover:bg-blue-600 cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobRecruiterProfile;
