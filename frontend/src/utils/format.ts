import { format } from "date-fns";

export const formatTime = (value: string) => {
  const date = format(new Date(value), "HH:mm:ss");
  return date;
};

export const formatDate = (value: string) => {
  const date = format(new Date(value), "dd/MM/yyyy");
  return date;
};
