import Spinner from "../../ui/Spinner";
import NotificationSingle from "./NotificationSingle";
import { useNotifications } from "./useNotifications";

function Notifications() {
  const { isPending, notifications } = useNotifications();
  console.log(notifications);
  return (
    <div className="w-[40%] mx-auto h-[30rem] bg-gray-50  p-4 rounded-xl shadow-lg ">
      <h2 className="mb-3 text-xl font-medium text-gray-700">Notifications</h2>

      {isPending ? (
        <Spinner />
      ) : (
        <div className="w-[30rem] h-[30rem] overflow-y-auto flex flex-col gap-[1rem]">
          {notifications?.map((notification) => (
            <NotificationSingle
              key={notification._id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
