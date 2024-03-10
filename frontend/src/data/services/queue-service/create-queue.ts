import axios from "axios";
import { QueueRequest } from "../../../models/data/queue";
import { url } from "../../../utils/Url";
import api from "../config";

export const createQueue = async ({ email, tableType, numberOfPeople, branchId }: QueueRequest) => {
  try {
    const response = await api.post(`${url}/queue/create-queue`, {
      email,
      tableType,
      numberOfPeople,
      branchId,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
