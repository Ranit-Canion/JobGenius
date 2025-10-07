import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShowMessageNotification(newMessage) {
  toast(
    <div className="flex items-center gap-3">
      <img
        src={newMessage?.senderId?.photoUrl || "/default-avatar.png"}
        alt={newMessage?.senderId?.name}
        className="w-10 h-10 rounded-full border border-gray-300"
      />
      <div>
        <p className="font-semibold">{newMessage?.senderId?.name}</p>
        <p className="text-sm text-gray-600">{newMessage?.message}</p>
      </div>
    </div>,
    {
      position: "top-right", // like a popup
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "rounded-xl shadow-lg bg-white text-black p-3",
    }
  );
}

export default ShowMessageNotification;
