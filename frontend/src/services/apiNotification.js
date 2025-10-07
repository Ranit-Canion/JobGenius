import axios from "axios";
export const getNotifications = async function () {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/notifications",
      { withCredentials: true }
    );
    return response.data.data.notifications;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.message);
  }
};

export const deleteNotification = async function (id) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/notifications/${id}`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.message);
  }
};
