import axios from "axios";

export const getAllPosts = async function (queryData) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/post?${queryData}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.message);
  }
};

export const createNewJobPost = async function (postObj) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/post",
      postObj,
      { withCredentials: true }
    );
    return response.data.data.post;
  } catch (error) {
    console.error("ERROR->", error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

export const getJobPostById = async function (id) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/post/${id}`,
      { withCredentials: true }
    );

    return response.data.data.post;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.response.data.message);
  }
};

export const generateDescription = async function (genAiObj) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/generatedescription",
      genAiObj,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("ERROR->", error);
    throw new Error(error.response.data.message);
  }
};

export const analyzeResume = async function (fileData) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/post/analyze-resume",
      fileData,
      { withCredentials: true }
    );
    return response.data.structuredData;
  } catch (error) {
    console.log("ERROR->", error);
    throw new Error(error.response.data.message);
  }
};

export const getRecruiterPostedJobs = async function () {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/post/getrecruiterpostedjobs",
      { withCredentials: true }
    );
    return response.data.data.posts;
  } catch (error) {
    console.error("ERROR->", error);

    throw new Error(error.message);
  }
};

export const deleteJobPost = async function (id) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/post/${id}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR->", error);
    throw new Error(error.response.data.message);
  }
};

export const updateJobPost = async function (id, updateObj) {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/v1/post/${id}`,
      updateObj,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR->", error);
    throw new Error(error.response.data.message);
  }
};
