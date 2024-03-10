import axios from "axios";
import { url } from "../../../utils/Url";
import api from "../config";
import { QueueRequestUpdateStatus } from "../../../models/data/queue";

export const updateQueueStatusCancel = async (request: QueueRequestUpdateStatus) => {
  try {
    console.log(request);
    const response = await api.patch(`${url}/queue/update-queue`, request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export const updateQueueUserStatusCancel = async (request: QueueRequestUpdateStatus) => {
  try {
    console.log(request);
    const response = await api.patch(`${url}/queue/update-queueUserCancel`, request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
