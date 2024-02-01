import { Role } from "./model-type/model-type";

export interface User {
  id: string;
  name: string;
  username: string;
  role: Role;
  image: string;
  tel?: string;
}
