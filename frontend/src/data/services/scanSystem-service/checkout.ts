import axios from "axios";
import { CheckoutRequest } from "../../../models/data/scanSystem";
import api from "../config";
import { url } from "../../../utils/Url";

export const checkout = async ({ scanSystemId }: CheckoutRequest) => {
  try {
    var result = await api.patch(`${url}/scansystem/checkout`, {
      scanSystemId,
    });
    return result.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
