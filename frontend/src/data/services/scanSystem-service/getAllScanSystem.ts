import axios from "axios";
import { ScanSystemResponse } from "../../../models/data/scanSystem";
import { url } from "../../../utils/Url";
import api from "../config";

export const getAllScanSystem = async () => {
  try {
    const response = await api.get<ScanSystemResponse[]>(`${url}/scansystem/get-all`);
    console.log(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
