import { Role } from "../value-type/enum-type";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: Role;
  image?: string;
  phoneNumber?: string;
  salary?: number;
}

export interface UserRequest {
  id: string;
}

export interface MemberModel {
  id: string;
  userName: string;
  name: string;
  email: string;
  role: string;
  image: string;
  phoneNumber: string;
}

export interface FromEmail {
  email: string;
}
