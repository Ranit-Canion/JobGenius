import { TrashIcon } from "@heroicons/react/24/outline";
import { useRemoveObj } from "../features/dashboard/useRemoveObj";

function EducationSingle({ educationObj }) {
  const { title, subTitle, startYear, endYear, description } = educationObj;
  const { removeObj } = useRemoveObj();
  function handleClick(e) {
    e.preventDefault();
    const dataObj = {
      field: "education",
      titleName: title,
    };
    removeObj(dataObj);
  }
  return (
    <div className="py-4 px-2 bg-gray-50 border-2 border-gray-200 rounded-2xl transition-all">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-[1rem]">
          <p className="text-[1.2rem] font-semibold text-gray-700">{title}</p>
          <p className="px-3 py-1 text-red-500 rounded-2xl bg-red-100">
            {startYear}-{endYear}
          </p>
        </div>
        <div
          onClick={handleClick}
          className="bg-red-200 px-2 py-2 cursor-pointer text-red-600 rounded-xl hover:bg-red-600 hover:text-gray-50 duration-300"
        >
          <TrashIcon className="w-[1.2rem] " />
        </div>
      </div>
      <p className="text-[1.2rem] font-semibold text-red-400">{subTitle}</p>
      <p>{description}</p>
    </div>
  );
}

export default EducationSingle;
