import axios from "axios";
import { url } from "../../../utils/url";
import { RegisterGmForm } from "../../../models/data/auth";
import api from "../../config";

export const registerGmAccount = async (request: RegisterGmForm) => {
  try {
    const response = await api.post(`${url}/authentication/gm/register-gm`, request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
