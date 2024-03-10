import axios from "axios";
import { url } from "../../../utils/Url";
import api from "../config";

export const updateQueueCancel = async () => {
  try {
    const response = await api.patch(`${url}/queue/update-queueCancelQueue`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export const updateQueueNotSuccessOk = async () => {
  try {
    const response = await api.patch(`${url}/queue/update-queueNotSuccessOk`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
