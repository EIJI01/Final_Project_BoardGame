import axios from "axios";
import { DeleteScanSystemRequest } from "../../../models/data/scanSystem";
import api from "../config";
import { url } from "../../../utils/Url";

export const deleteScanSystem = async ({ scanSystemId }: DeleteScanSystemRequest) => {
  try {
    var result = await api.delete(`${url}/scansystem/delete-scanSystem`, {
      data: { scanSystemId: scanSystemId },
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
