import axios from "axios";
import { url } from "../../../utils/Url";
import api from "../config";
import { UpdateScanSystemRequest } from "../../../models/data/scanSystem";

export const updateScanSystem = async ({
  scanSystemId,
  startTime,
  stopTime,
  totalPrice,
}: UpdateScanSystemRequest) => {
  try {
    var result = await api.patch(`${url}/scansystem/update-information-scanSystem`, {
      scanSystemId: scanSystemId,
      startTime: startTime ? startTime : "",
      stopTime: stopTime ? stopTime : "",
      totalPrice: totalPrice ? totalPrice : 0,
    });
    return result.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
