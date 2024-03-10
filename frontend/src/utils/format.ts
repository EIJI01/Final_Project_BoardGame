import { format } from "date-fns-tz";
import moment from "moment";

export const formatTime = (value: string) => {
  const x = format(new Date(`${value}`), "HH:mm:ss");
  return x;
};
export const formatDateTimes = (value: string) => {
  const x = format(new Date(`${value}`), "dd-MM-yyyy HH:mm:ss");
  return x;
};

export const formatDate = (value: string) => {
  const date = format(new Date(value), "dd/MM/yyyy");
  return date;
};
export const formatDateTimeLocal = (value: string) => {
  const date = format(new Date(value), "yyyy-MM-ddThh:mm");
  return date;
};

// export const formatDateTime = (value: string) => {
//   const date = format(new Date(value), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
//   return date;
// };

export const formatDateTimeToLocal = (value: string) => {
  const date = moment(`${value}Z`, "YYYY-MM-DDTHH:mm:ssZ");
  return date.format("DD/MM/YYYY HH:mm:ss");
};

export const formatTimeToLocal = (value: string) => {
  const date = moment(value).format("dddd, MMMM Do YYYY, h:mm A");
  return date;
};
export const formatDateTime = (value: string) => {
  const date = moment(value).format("YYYY-MM-DDTHH:mm");
  return date;
};
