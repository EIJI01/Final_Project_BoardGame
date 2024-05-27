import axios from "axios";
import { User } from "../../../models/data/user";
import { url } from "../../../utils/url";
import api from "../../config";

export const getAllGm = async () => {
  try {
    const response = await api.get<User[]>(`${url}/gm`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
