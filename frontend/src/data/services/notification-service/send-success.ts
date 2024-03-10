import axios from "axios";
import { url } from "../../../utils/Url";
import api from "../config";
import { SendSuccessRequest } from "../../../models/data/notification";

export const sendSuccess = async (request: SendSuccessRequest) => {
  try {
    const response = await api.post(`${url}/notification/send-notificationSuccess`, request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
