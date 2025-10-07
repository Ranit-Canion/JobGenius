import {
  BanknotesIcon,
  BookmarkIcon,
  BriefcaseIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
function ApplicantDetailHeader({ userData, resume }) {
  const user = userData?.user;
  function handleDownload() {
    const link = document.createElement("a");
    link.href = `http://localhost:5000/resume/${resume}`;
    link.setAttribute("download", resume);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="w-full py-[4rem] animated-lightblue-bg">
      <div className="container mx-auto px-[6rem] flex justify-between">
        <div className="flex flex-col">
          <div className="flex  ">
            <div className="w-[6rem]">
              <img
                src={`http://localhost:5000/user/${user?.photo}`}
                alt=""
                className="rounded-full"
              />
            </div>
            <div className="flex gap-[0.8rem] ml-[2rem]  flex-col ">
              <h1 className="text-2xl font-medium">{user?.name}</h1>
              {/* <div className="flex gap-[1rem] w-[20%]">
                <div className="flex gap-1 items-center justify-center text-gray-500">
                  <BriefcaseIcon className="w-[1.3rem]" />
                  <p>{""}</p>
                </div>
                <div className="flex gap-1 items-center justify-center text-gray-500">
                  <MapPinIcon className="w-[1.3rem]" />
                  <p>{""}</p>
                </div>
                <div className="flex gap-1 items-center justify-center text-gray-500">
                  <ClockIcon className="w-[1.3rem]" />
                  <p className="w-[5.5rem]">{""}</p>
                </div>
                <div className="flex gap-1 items-center justify-center text-gray-500">
                  <BanknotesIcon className="w-[1.3rem]" />
                  <p>{""}LPA</p>
                </div>
              </div> */}
              <div className="flex gap-[1.2rem]">
                <p className="py-1 px-3 font-semibold w-fit text-[0.9rem] rounded-full bg-blue-100 text-blue-400">
                  {""}
                </p>
                <p className="py-1 px-3 font-semibold w-fit text-[0.9rem] rounded-full bg-green-100 text-green-500">
                  {""}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center transition-all">
          <button
            onClick={handleDownload}
            className="py-3 px-[2.8rem] bg-blue-500 text-gray-50 rounded-lg text-[1.2rem] cursor-pointer hover:bg-blue-600 duration-300"
          >
            Download CV
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicantDetailHeader;
