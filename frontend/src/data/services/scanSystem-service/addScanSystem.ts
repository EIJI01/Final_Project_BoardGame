import axios from "axios";
import { url } from "../../../utils/Url";
import api from "../config";
import { ScanSystemByNumberRequest, ScanSystemRequest } from "../../../models/data/scanSystem";

export const addScanSystem = async (request: ScanSystemRequest) => {
  try {
    const response = await api.post(`${url}/scansystem/add`, {
      cardId: request.cardId,
      tableId: request.tableId,
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

export const addScanSystemByNumber = async (request: ScanSystemByNumberRequest) => {
  try {
    console.warn(request.tableId);
    console.warn(request.cardNumber);
    const response = await api.post(`${url}/scansystem/add-number`, {
      cardNumber: request.cardNumber,
      tableId: request.tableId,
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
