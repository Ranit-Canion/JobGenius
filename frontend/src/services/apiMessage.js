import axios from "axios";

export const sendMessage = async function (receiverId, message) {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/message/send/${receiverId}`,
      { message },
      { withCredentials: true }
    );

    return response.data.data.newMessage;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.message);
  }
};

export const getMessages = async function (id) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/message/${id}`,
      { withCredentials: true }
    );
    return response.data.data.messages;
  } catch (error) {
    console.error("ERROR->", error);
    throw new Error(error.message);
  }
};

export const deleteConversation = async function (id) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/message/${id}`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("ERROR->", error.message);
    throw new Error(error.message);
  }
};

export const getUnseenMessageCounts = async function () {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/message/getunseenmssgcounts",
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
