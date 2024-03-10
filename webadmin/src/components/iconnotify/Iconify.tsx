import { Box } from "@mui/material";
import { forwardRef } from "react";

interface Props {
  icon?: any;
  sx?: any;
  width?: number;
  [other: string]: any;
}
const Iconify = forwardRef(({ icon, width = 20, sx, ...other }: Props, ref) => (
  <Box
    ref={ref}
    component={icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

export default Iconify;
