import axios from "axios";
import { FromUser } from "../../../components/ComponentPage/Customer/ProfileUser";
import { url } from "../../../utils/Url";
import api from "../config";

export const updateInformationUser = async (request: FromUser) => {
  try {
    const response = await api.patch(`${url}/user/update-information`, request, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
