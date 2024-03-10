import axios from "axios";
import { CreateBranchRequest } from "../../../models/data/branch";
import { url } from "../../../utils/url";
import api from "../../config";

export const createBranch = async (request: CreateBranchRequest) => {
  try {
    const response = await api.post(`${url}/BranchAdmin/admin/create-branch`, request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
