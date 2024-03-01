import { Box } from "@mui/material";
import Spinner from "../spinner/Spinner";

export default function Loading() {
  return (
    <Box
      sx={{
        height: `calc(100vh - 114px)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "inherit",
        width: `calc(100% - 44px)`,
      }}
    >
      <Spinner size={50} />
    </Box>
  );
}
