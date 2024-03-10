import axios from "axios";
import { CardResponseLower } from "../../../models/data/card";
import { url } from "../../../utils/Url";

export const getAllCards = async () => {
  try {
    const response = await axios.get<CardResponseLower[]>(`${url}/card/get-cards`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
