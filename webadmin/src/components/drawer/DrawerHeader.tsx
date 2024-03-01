import { styled } from "@mui/material/styles";

type Props = {
  children?: React.ReactNode;
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function DrawerHeaderDefault({ children }: Props) {
  return (
    <DrawerHeader
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </DrawerHeader>
  );
}
