import axios from "axios";

export const getAllAppliedJobs = async function () {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/appliedjobs",
      { withCredentials: true }
    );
    return response.data.data.appliedjobs;
  } catch (error) {
    console.error("Error->", error);
    throw new Error(error.message);
  }
};

export const deleteAppliedJob = async function (id) {
  try {
    console.log("ID->", id);
    const response = await axios.delete(
      `http://localhost:5000/api/v1/appliedjobs/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error->", error);
    throw new Error(error.message);
  }
};
