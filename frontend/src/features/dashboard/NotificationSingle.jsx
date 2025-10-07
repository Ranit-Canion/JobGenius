import { XMarkIcon } from "@heroicons/react/24/outline";
import useGetUser from "../auth/getCurrentUser";
import { formatDistanceToNow } from "date-fns";
import { useDeleteNotification } from "./useDeleteNotification";

function NotificationSingle({ notification }) {
  const { user } = useGetUser();
  const { deleteNotification } = useDeleteNotification();
  const { data, createdAt } = notification;
  const timeAgo = formatDistanceToNow(createdAt);
  return (
    <div className="flex  justify-between items-center transition-all">
      <div className="flex items-center gap-6">
        <lord-icon
          src="https://cdn.lordicon.com/apmrcxtj.json"
          trigger="hover"
          colors="primary:#1663c7,secondary:#3080e8"
          style={{ width: "30px", height: "30px" }}
        ></lord-icon>
        <div className="flex flex-col  ">
          {user?.role === "job-recruiter" ? (
            <p>
              <span className="font-medium">{data?.userName}</span> applied for
              a job <span className="text-blue-600">{data?.postTitle}</span>
            </p>
          ) : (
            <p>
              <span>You've been </span>
              <span className="font-medium">
                {data?.status?.charAt(0).toUpperCase() + data?.status?.slice(1)}
              </span>{" "}
              <span>for </span>
              <span className="text-blue-600">{data?.postTitle}</span> at{" "}
              <span>{data.companyName}</span>
            </p>
          )}
          <p className="text-gray-600">{timeAgo} ago</p>
        </div>
      </div>
      <XMarkIcon
        onClick={() => deleteNotification(notification?._id)}
        className="text-gray-500 mb-5  w-[4.4%] bg-gray-200 rounded-full py-1 px-1 hover:text-gray-50 hover:bg-red-500 duration-300 cursor-pointer"
      />
    </div>
  );
}

export default NotificationSingle;
