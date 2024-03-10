import axios from "axios";
import { url } from "../../../utils/Url";
import api from "../config";
import { SendNotSuccessRequest } from "../../../models/data/notification";

export const sendNotSuccess = async (request: SendNotSuccessRequest) => {
  try {
    const response = await api.post(`${url}/notification/send-notificationNotSuccess`, request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
