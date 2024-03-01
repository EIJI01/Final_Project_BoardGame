import { CircularProgress } from "@mui/material";
import { useThemeContext } from "../../hooks/use.context";

type Props = {
  size?: number;
};

export default function Spinner({ size }: Props) {
  const { state } = useThemeContext();
  return <CircularProgress sx={{ color: state.themeColor }} size={size} />;
}
