import { useState } from "react";
import useProvideCompanyDetails from "../features/auth/useProvideCompanyDetails";

function CompanyDetails() {
  const [companyName, setCompanyName] = useState("");
  const [size, setSize] = useState(null);
  const [industry, setIndustry] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyAbout, setCompanyAbout] = useState("");
  const [foundedIn, setFoundedIn] = useState(null);
  const [companyLogo, setCompanyLogo] = useState("");
  const { isPending, provideCompanyData } = useProvideCompanyDetails();
  function handleSubmit(e) {
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

  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className=" bg-gray-50 w-[60%] h-[60%] py-6  rounded-xl shadow-2xl">
        <h1 className="text-center text-3xl text-blue-500 font-bold mb-3">
          Welcome Back
        </h1>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-3">
              <label>Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500 "
              />
            </div>
            <div className="flex flex-col gap-3">
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
            <div className="flex flex-col gap-3">
              <label>Size</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-3">
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
            <div className="flex flex-col gap-3">
              <label>Found-In</label>
              <input
                type="text"
                value={foundedIn}
                onChange={(e) => setFoundedIn(e.target.value)}
                className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-3">
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
              className="px-6 py-4 mt- bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500 w-full"
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CompanyDetails;
