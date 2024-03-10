import axios from "axios";
import { BranchAllIdResponse } from "../../../models/data/branch";
import { url } from "../../../utils/url";

export const getAllBranch = async () => {
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
