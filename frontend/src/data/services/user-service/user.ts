import axios from "axios";
import { User } from "../../../models/data/user";
import { url } from "../../../utils/Url";
import { Role } from "../../../models/value-type/enum-type";
import api from "../config";
import { FromEmail } from "../../../pages/forget-password/ForgetPassword";

export const getUserById = async () => {
  try {
    const response = await api.get(`${url}/user`);
    const userData: User = {
      id: response.data.id,
      name: `${response.data.name}`,
      username: response.data.userName,
      email: response.data.email,
      role: response.data.role as Role,
      image: response.data.image,
      tel: response.data.phoneNumber,
      salary: response.data.salary,
    };
    return userData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export const getUserByEmail = async ({ email }: FromEmail) => {
  try {
    const response = await axios.post(`${url}/authentication/findEmail-forgetPassword`, {
      email,
    });
    const userData: User = {
      id: response.data.id,
      name: `${response.data.name}`,
      username: response.data.userName,
      email: response.data.email,
      role: response.data.role as Role,
      image: response.data.image,
      tel: response.data.phoneNumber,
      salary: response.data.salary,
    };
    return userData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export const sendEmail = async ({ email }: FromEmail) => {
  try {
    const response = await axios.post(`${url}/authentication/forgetPassword-sentEmail`, {
      email,
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
