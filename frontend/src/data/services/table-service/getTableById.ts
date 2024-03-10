import axios from "axios";
import { url } from "../../../utils/Url";
import { TableResponse } from "../../../models/data/table";
import api from "../config";

export const getTableById = async (tableId: string) => {
  try {
    const response = await api.post<TableResponse>(`${url}/table/get-id`, {
      tableId,
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
