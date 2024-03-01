import axios from "axios";
import { url } from "../../../utils/Url";
import { TableResponse } from "../../../models/data/table";
import api from "../config";

export const getTableById = async (tableId: string) => {
  try {
    console.log(tableId);
    const response = await api.post<TableResponse>(`${url}/table/get-id`, {
      tableId,
    });
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
