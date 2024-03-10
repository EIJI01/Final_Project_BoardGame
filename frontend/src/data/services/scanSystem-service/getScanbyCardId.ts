import axios from "axios";
import { GetScanSystemByCardId, ScanSystemResponseLower } from "../../../models/data/scanSystem";
import { url } from "../../../utils/Url";

export const getScanSystemByCardId = async (request: GetScanSystemByCardId) => {
  try {
    const response = await axios.post<ScanSystemResponseLower>(`${url}/scansystem/get-scanByCard`, {
      cardId: request.cardId,
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
