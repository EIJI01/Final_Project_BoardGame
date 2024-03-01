import axios from "axios";
import { url } from "../../../utils/Url";
import { BranchAllIdResponse } from "../../../models/data/branch";

export const getAllBranchId = async () => {
  try {
    const response = await axios.get<BranchAllIdResponse[]>(`${url}/branch/get-all`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
