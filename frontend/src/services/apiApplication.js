import axios from "axios";
export const createApplication = async function (applicationObj) {
  try {
    console.log(applicationObj);
    const response = await axios.post(
      "http://localhost:5000/api/v1/application",
      applicationObj,
      { withCredentials: true }
    );
    return response.data.data.application;
  } catch (error) {
    console.log("ERROR->", error);
    throw new Error(error.response.data.message);
  }
};

export const getCurrentUserApplications = async function () {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/application/currentuserapplications",
      { withCredentials: true }
    );
    return response.data.data.applications;
  } catch (error) {
    console.log("ERROR->", error);
    throw new Error(error.message);
  }
};
export const getRecentlyAppliedApplications = async function () {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/application/recentlyappliedjobs",
      { withCredentials: true }
    );
    return response.data.data.applications;
  } catch (error) {
    console.log("ERROR->", error);
    throw new Error(error.message);
  }
};

export const getAllApplicants = async function (queryData) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/application/getallapplicants?${queryData}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.message);
  }
};

export const deleteApplication = async function (id) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/application/${id}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const updateApplicationStatus = async function (id, status) {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/v1/application/${id}`,
      { status },
      { withCredentials: true }
    );
    return response.data.data.application;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.message);
  }
};

export const getStatusOfApplicant = async function () {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/application/getApplicantStatus",
      { withCredentials: true }
    );
    return response.data.data.statusOutput;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.message);
  }
};

export const getApplicantStates = async function () {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/application/getapplicationstates`,
      { withCredentials: true }
    );

    return response.data.data;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.message);
  }
};
