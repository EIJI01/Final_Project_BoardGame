import axios from "axios";
import { ChangeTableRequest } from "../../../models/data/scanSystem";
import api from "../config";
import { url } from "../../../utils/Url";

export const changeTable = async ({ scanSystemId, tableId }: ChangeTableRequest) => {
  try {
    var result = await api.patch(`${url}/scansystem/change-table`, {
      scanSystemId,
      tableId,
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
