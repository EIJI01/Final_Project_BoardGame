import { Role } from "../value-type/enum-type";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: Role;
  image?: string;
  tel?: string;
  salary?: number;
}

export interface UserRequest {
  id: string;
}
