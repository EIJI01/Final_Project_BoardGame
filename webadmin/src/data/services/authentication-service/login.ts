import axios from "axios";
import { LoginAdminRequest, LoginResponse } from "../../../models/data/auth";
import { url } from "../../../utils/url";

export const login = async ({ username, password }: LoginAdminRequest) => {
  try {
    const response = await axios.post<LoginResponse>(`${url}/authentication/login`, {
      email: username,
      password,
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
