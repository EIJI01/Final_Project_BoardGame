import axios from "axios";
import { QueueResponseLower } from "../../../models/data/queue";
import { url } from "../../../utils/Url";
import api from "../config";

export const getQueueInformation = async () => {
  try {
    const response = await api.get<QueueResponseLower>(`${url}/queue/get-queue`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
