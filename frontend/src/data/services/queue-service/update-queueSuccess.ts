import axios from "axios";
import { QueueRequestUpdateStatus } from "../../../models/data/queue";
import { url } from "../../../utils/Url";
import api from "../config";

export const updateQueueSuccessComing = async (request: QueueRequestUpdateStatus) => {
  try {
    console.log(request);
    const response = await api.patch(`${url}/queue/update-queueComingSuccess`, request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
