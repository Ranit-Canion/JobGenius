import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex justify-center items-center h-screen px-[4rem] mx-auto container">
      <div className="flex flex-col gap-2 transition-all justify-center items-center">
        <h1 className="text-[4rem] font-bold">404!</h1>
        <h2 className="text-[1.5rem] font-medium text-gray-600">
          The page you are looking for could not be found.
        </h2>
        <Link
          className="bg-blue-50 uppercase font-semibold rounded-xl border-gray-200 border-2 text-blue-500 py-2 px-4 hover:bg-blue-500 hover:text-gray-50 duration-300"
          to="/"
        >
          back to home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
