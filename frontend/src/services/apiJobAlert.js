import axios from "axios";

export const getAllJobAlerts = async function () {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/jobalerts", {
      withCredentials: true,
    });
    return response.data.data.jobalerts;
  } catch (error) {
    console.error("ERROR->", error);
    throw new error(error.message);
  }
};

export const deleteJobAlert = async function (id) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/jobalerts/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("ERROR->", error);
    throw new error(error.message);
  }
};
