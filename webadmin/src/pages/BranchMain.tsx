import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function BranchMain() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
