import { useSearchParams } from "react-router-dom";
import {
  ArrowRightCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
function Pagination({ totalCount = 0 }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 6;
  const page = Number(searchParams.get("page")) || 1;

  const totalPage = Math.ceil((totalCount || 1) / itemsPerPage);

  function handlePage(val) {
    if (val >= 1 && val <= totalPage && page !== val) {
      searchParams.set("page", val);
      setSearchParams(searchParams);
    }
  }

  //   if (totalPage <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <span
        onClick={() => handlePage(page - 1)}
        className={`px-2 py-2 border-2 rounded-xl cursor-pointer duration-300 ${
          page === 1
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 hover:bg-blue-500 hover:text-white"
        }`}
      >
        <ChevronLeftIcon className="w-5" />
      </span>

      {[...Array(totalPage)].map((_, i) => (
        <span
          key={i}
          onClick={() => handlePage(i + 1)}
          className={`cursor-pointer py-2 px-4 border-2 rounded-xl duration-300 ${
            page === i + 1
              ? "bg-blue-500 text-white border-blue-500"
              : "border-gray-300 hover:bg-blue-500 hover:text-white"
          }`}
        >
          {i + 1}
        </span>
      ))}

      <span
        onClick={() => handlePage(page + 1)}
        className={`px-2 py-2 border-2 rounded-xl cursor-pointer duration-300 ${
          page === totalPage
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 hover:bg-blue-500 hover:text-white"
        }`}
      >
        <ChevronRightIcon className="w-5" />
      </span>
    </div>
  );
}

export default Pagination;
