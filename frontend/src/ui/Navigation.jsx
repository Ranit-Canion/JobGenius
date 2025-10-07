import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="justify-between flex items-center transition-all">
      <ul className="flex gap-[5rem] transition-all">
        <Link
          to="/"
          className="font-semibold duration-200 hover:text-blue-500 cursor-pointer text-[1.2rem]"
        >
          Home
        </Link>
        <Link
          to="/jobs"
          className="font-semibold duration-200 hover:text-blue-500 cursor-pointer text-[1.2rem] "
        >
          Jobs
        </Link>
      </ul>
    </nav>
  );
}

export default Navigation;
