import { FaCodeBranch } from "react-icons/fa";
import { BranchAllIdResponse } from "../models/data/branch";
import { FaPeopleGroup } from "react-icons/fa6";

export const sidebarData = (data: BranchAllIdResponse[]) => {
  return [
    {
      icon: FaCodeBranch,
      name: "Branch Management",
      route: "/branch-manage",
      branch: data.map((data: BranchAllIdResponse) => ({
        id: data.id,
        branchName: data.branchName,
        address: data.address,
        playPricePerHour: data.playPricePerHour,
        buffetPrice: data.buffetPrice,
      })),
    },
    {
      icon: FaPeopleGroup,
      name: "GM Management",
      route: "/register-gm",
    },
  ];
};
