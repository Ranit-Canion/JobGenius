import axios from "axios";

export const getUserBookmarks = async function () {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/bookmark/currentuserbookmarks",
      { withCredentials: true }
    );
    return response.data.data.bookmarks;
  } catch (error) {
    console.log("ERROR->", error);
    throw new Error(error.message);
  }
};

export const deleteUserBookmark = async function (id) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/bookmark/${id}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR->", error);
    throw new Error(error.message);
  }
};

export const createUserBookmark = async function (bookmarkObj) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/bookmark",
      bookmarkObj,
      { withCredentials: true }
    );
    return response.data.data.bookmark;
  } catch (error) {
    console.log("ERROR->", error);
    throw new Error(error.response.data.message);
  }
};
