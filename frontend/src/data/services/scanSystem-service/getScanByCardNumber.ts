import axios from "axios";
import {
  GetScanSystemByCardNumber,
  ScanSystemResponseLower,
} from "../../../models/data/scanSystem";
import { url } from "../../../utils/Url";

export const getScanSystemByCardNumber = async (request: GetScanSystemByCardNumber) => {
  try {
    const response = await axios.post<ScanSystemResponseLower>(
      `${url}/scansystem/get-scanByCardNumber`,
      {
        cardNumber: request.cardNumber,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
