import axios from "axios";
import { QueueRequestOkSuccess } from "../../../models/data/queue";
import { url } from "../../../utils/Url";
import api from "../config";

export const updateQueueOkSuccessStatusComing = async (request: QueueRequestOkSuccess) => {
  try {
    console.log(request);
    const response = await api.patch(`${url}/queue/update-queueUserOk`, {
      notificationId: request.notificationId,
      userId: "",
      tableId: request.tableId,
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
