import axios from "axios";
import { LoginRequest, LoginResponse } from "../../../models/authentication/login";
import { url } from "../../../utils/Url";

export const login = async ({ email, password }: LoginRequest) => {
  try {
    const response = await axios.post<LoginResponse>(`${url}/authentication/login`, {
      email,
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
