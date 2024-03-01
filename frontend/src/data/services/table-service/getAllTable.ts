import axios from "axios";
import { url } from "../../../utils/Url";
import { TableResponse } from "../../../models/data/table";

export const getAllTable = async (branchId: string) => {
  try {
    console.log(branchId);
    const response = await axios.post<TableResponse[]>(`${url}/table/get-all`, {
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
