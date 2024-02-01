import { User } from "../models/user";
import { Role } from "../models/value-type/enum-type";
import profile1 from "../assets/avatar/avatar1.jpg";
import profile2 from "../assets/avatar/avatar2.jpg";

export const Member: User = {
  id: "112233",
  name: "chanyut",
  username: "chan_aa@gmail.com",
  role: Role.MEMBER,
  image: profile1,
  tel: "0982312164",
};

export const Gm: User = {
  id: "Gm112255",
  name: "Michel",
  username: "_michel2251",
  role: Role.GM,
  image: profile2,
};

export const Guest: null = null;
