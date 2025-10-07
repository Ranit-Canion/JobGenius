import Spinner from "./Spinner";
import NotificationSingle from "../features/dashboard/NotificationSingle";
import { useNotifications } from "../features/dashboard/useNotifications";
import { Link } from "react-router-dom";

function NotificationsAlert() {
  const { isPending, notifications } = useNotifications();
  const limitedNotification = notifications?.slice(0, 5);
  return (
    <div className="w-[40%] mx-auto h-[30rem] bg-gray-50  p-4 rounded-xl shadow-lg z-[1000] relative overflow-y-hidden">
      <h2 className="mb-3 text-xl font-medium text-gray-700">Notifications</h2>

      {isPending ? (
        <Spinner />
      ) : (
        <div className="w-[30rem] h-[30rem] overflow-y-auto flex flex-col  gap-[1rem]">
          {limitedNotification.map((notification) => (
            <NotificationSingle
              key={notification._id}
              notification={notification}
            />
          ))}
        </div>
      )}
      {notifications?.length > 5 ? (
        <Link
          to="./dashboard"
          className="absolute bottom-2 left-[45%] text-lg text-gray-600 cursor-pointer"
        >
          More..
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}

export default NotificationsAlert;
