import {
  ArrowRightEndOnRectangleIcon,
  BookmarkIcon,
  BriefcaseIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  HomeIcon,
  LockClosedIcon,
  PaperAirplaneIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import useLogout from "../features/auth/useLogout";
import useGetUser from "../features/auth/getCurrentUser";

function SidebarNavigations() {
  const { logout } = useLogout();
  const { user } = useGetUser();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col gap-[3rem] transition-all">
      <Link
        to="/dashboard"
        className={` ${
          isActive("/dashboard") ? "bg-blue-100 text-blue-500" : ""
        }  flex items-center text-lg font-medium gap-2.5  w-[70%] pl-[1rem] py-3 duration-200 rounded-xl hover:bg-blue-100 hover:text-blue-500 `}
      >
        <HomeIcon className="w-[13%]" />
        <h2 className="">Dashboard</h2>
      </Link>
      <Link
        to="dashboard/profile"
        className={` ${
          isActive("/dashboard/profile") ? "bg-blue-100 text-blue-500" : ""
        }  flex items-center text-lg font-medium gap-2.5  w-[70%] pl-[1rem] py-3 duration-200 rounded-xl hover:bg-blue-100 hover:text-blue-500 `}
      >
        <UserIcon className="w-[13%]" />
        <h2>My Profile</h2>
      </Link>
      {user?.role === "job-seeker" ? (
        <Link
          to="dashboard/appliedjobs"
          className={` ${
            isActive("/dashboard/appliedjobs")
              ? "bg-blue-100 text-blue-500"
              : ""
          }  flex items-center text-lg font-medium gap-2.5  w-[70%] pl-[1rem] py-3 duration-200 rounded-xl hover:bg-blue-100 hover:text-blue-500 `}
        >
          <BriefcaseIcon className="w-[13%]" />
          <h2>Applied Jobs</h2>
        </Link>
      ) : (
        ""
      )}
      {user?.role === "job-seeker" ? (
        <Link
          to="dashboard/jobalerts"
          className={` ${
            isActive("/dashboard/appliedjobs")
              ? "bg-blue-100 text-blue-500"
              : ""
          }  flex items-center text-lg font-medium gap-2.5  w-[70%] pl-[1rem] py-3 duration-200 rounded-xl hover:bg-blue-100 hover:text-blue-500 `}
        >
          <BriefcaseIcon className="w-[13%]" />
          <h2>Job Alerts</h2>
        </Link>
      ) : (
        ""
      )}
      {user?.role === "job-recruiter" ? (
        <Link
          to="dashboard/managejobs"
          className={` ${
            isActive("/dashboard/managejobs") ? "bg-blue-100 text-blue-500" : ""
          }  flex items-center text-lg font-medium gap-2.5  w-[70%] pl-[1rem] py-3 duration-200 rounded-xl hover:bg-blue-100 hover:text-blue-500 `}
        >
          <BriefcaseIcon className="w-[13%]" />
          <h2>Manage Jobs</h2>
        </Link>
      ) : (
        ""
      )}
      {user?.role === "job-recruiter" ? (
        <Link
          to="dashboard/allapplicants"
          className={` ${
            isActive("/dashboard/allapplicants")
              ? "bg-blue-100 text-blue-500"
              : ""
          }  flex items-center text-lg font-medium gap-2.5  w-[70%] pl-[1rem] py-3 duration-200 rounded-xl hover:bg-blue-100 hover:text-blue-500 `}
        >
          <DocumentTextIcon className="w-[13%]" />
          <h2>All Applicants</h2>
        </Link>
      ) : (
        ""
      )}
      {user?.role === "job-recruiter" ? (
        <Link
          to="dashboard/postjob"
          className={` ${
            isActive("/dashboard/postjob") ? "bg-blue-100 text-blue-500" : ""
          }  flex items-center text-lg font-medium gap-2.5  w-[70%] pl-[1rem] py-3 duration-200 rounded-xl hover:bg-blue-100 hover:text-blue-500 `}
        >
          <PaperAirplaneIcon className="w-[13%]" />
          <h2>Post Job</h2>
        </Link>
      ) : (
        ""
      )}
      <Link
        to="dashboard/message"
        className={` ${
          isActive("/dashboard/message") ? "bg-blue-100 text-blue-500" : ""
        }  flex items-center text-lg font-medium gap-2.5  w-[70%] pl-[1rem] py-3 duration-200 rounded-xl hover:bg-blue-100 hover:text-blue-500 `}
      >
        <ChatBubbleLeftIcon className="w-[13%]" />

        <h2>Message</h2>
      </Link>
      <Link
        to="/dashboard/changepassword"
        className={` ${
          isActive("/dashboard/changepassword")
            ? "bg-blue-100 text-blue-500"
            : ""
        }  flex items-center text-lg font-medium gap-2.5  w-[70%] pl-[1rem] py-3 duration-200 rounded-xl hover:bg-blue-100 hover:text-blue-500 `}
      >
        <LockClosedIcon className="w-[13%]" />
        <h2>Change Password</h2>
      </Link>
      <div
        className={`  flex items-center text-lg font-medium gap-2.5 cursor-pointer  w-[70%] pl-[1rem] py-3 duration-200 rounded-xl hover:bg-blue-100 hover:text-blue-500 `}
        onClick={() => logout()}
      >
        <ArrowRightEndOnRectangleIcon className="w-[14%]" />
        <h2>Logout</h2>
      </div>
      <div
        className={` cursor-pointer flex items-center text-lg font-medium gap-2.5  w-[70%] pl-[1rem] py-3 duration-200 rounded-xl hover:bg-blue-100 hover:text-blue-500 `}
      >
        <TrashIcon className="w-[14%]" />
        <h2>Delete Profile</h2>
      </div>
    </div>
  );
}

export default SidebarNavigations;
