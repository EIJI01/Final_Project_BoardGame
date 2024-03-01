import axios from "axios";
import { GetScanSystemByTableId, ScanSystemResponse } from "../../../models/data/scanSystem";
import { url } from "../../../utils/Url";
import api from "../config";

export const getAllScanSystemByTableId = async (request: GetScanSystemByTableId) => {
  try {
    const response = await api.post<ScanSystemResponse[]>(`${url}/scansystem/get-tableId`, {
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
