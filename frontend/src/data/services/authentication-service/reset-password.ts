import axios from "axios";
import { url } from "../../../utils/Url";
import { FormResetPassword } from "../../../pages/reset-password/ResetPassword";

export const resetPassword = async ({
  email,
  token,
  password,
  confirmPassword,
}: FormResetPassword) => {
  try {
    const response = await axios.post(`${url}/authentication/resetPassword`, {
      email,
      token,
      password,
      confirmPassword,
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
