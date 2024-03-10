import axios from "axios";
import { MemberModel, User } from "../../../models/data/user";
import { url } from "../../../utils/Url";
import { Role } from "../../../models/value-type/enum-type";
import api from "../config";

export const getAllMember = async () => {
  try {
    const response = await api.get<MemberModel[]>(`${url}/user/get-member`);
    const userData: User[] = response.data.map((res: MemberModel) => ({
      id: res.id,
      name: `${res.name}`,
      username: res.userName,
      email: res.email,
      role: res.role as Role,
      image: res.image,
      tel: res.phoneNumber,
    }));
    return userData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
