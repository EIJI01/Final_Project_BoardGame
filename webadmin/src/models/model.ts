import { Role } from "./value-type/enum-type";

export interface Admin {
  id: string;
  username: string;
  image: string;
  email: string;
  role: Role;
}
