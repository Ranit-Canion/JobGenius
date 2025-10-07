import axios from "axios";

export const login = async function ({ email, password }) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/login",
      { email, password },
      { withCredentials: true }
    );
    console.log(response);
    return response.data.data.user;
  } catch (error) {
    console.log("ERROR->", error);
    throw new Error(error.response.data.message);
  }
};

export const updateData = async function (updateData) {
  try {
    const response = await axios.patch(
      "http://localhost:5000/api/v1/users/updateuser",
      updateData,
      { withCredentials: true }
    );
    return response.data.data.user;
  } catch (error) {
    console.error("ERROR->", error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

export const getCurrentUser = async function () {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/users/getuser",
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("ERROR->", error);
    throw new Error(error.response.data.message);
  }
};
export const updateUserPassword = async function (passwordObj) {
  try {
    const response = await axios.patch(
      "http://localhost:5000/api/v1/users/updatePassword",
      passwordObj,
      { withCredentials: true }
    );
    return response.data.data.user;
  } catch (error) {
    console.error("ERROR->", error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

export const updateCompanyDetails = async function (companyObj) {
  try {
    const response = await axios.patch(
      "http://localhost:5000/api/v1/users/updatecompanydetails",
      companyObj,
      { withCredentials: true }
    );
    return response.data.data.company;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.response.data.message);
  }
};

export const logout = async function () {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/logout",
      {},
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.message);
  }
};

export const signup = async function (userData) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/signup",
      userData,
      { withCredentials: true }
    );
    return response.data.data.user;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.response.data.message);
  }
};
export const getConversations = async function () {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/users/getmessageusers",
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.message);
  }
};

export const getJobRecruiterStatList = async function () {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/users/getjobrecruiterstats",
      { withCredentials: true }
    );
    console.log("here->>", response);
    return response.data.data.JobRecruiterStatsObj;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

// export const getUserDetails = async function () {
//   try {
//     const response = await axios.get(
//       "http://localhost:5000/api/v1/users/getuser",
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error(error.message);
//   }
// };

export const getUserDetails = async function (id) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/users/${id}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
/*

export const resetPassword = async function () {
  try {
  } catch (error) {}
};
export const forgotPassword = async function () {
  try {
  } catch (error) {}
};
export const updateUserData = async function () {
  try {
  } catch (error) {}
};
*/

export const generateApplicantAbout = async function (userData) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/generateabout",
      userData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("GenerateAbout-ERROR->", error);
    throw new Error(error.response.data.message);
  }
};

export const getMessageFromChatBot = async function (userMssg) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/chatbot",
      userMssg,
      { withCredentials: true }
    );
    return response.data.cleanedReply;
  } catch (error) {
    console.error("GenerateAbout-ERROR->", error);
    throw new Error(error.response.data.message);
  }
};

export const removeEducationAwardWorkExpObj = async function (dataObj) {
  try {
    const response = await axios.patch(
      "http://localhost:5000/api/v1/users/removeobj",
      dataObj,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("GenerateAbout-ERROR->", error);
    throw new Error(error.response.data.message);
  }
};
