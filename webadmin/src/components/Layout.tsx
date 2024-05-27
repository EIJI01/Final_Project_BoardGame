import * as React from "react";
import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppbarDefault from "./appbar/Appbar";
import DrawerDefault from "./drawer/Drawer";
import DrawerHeaderDefault from "./drawer/DrawerHeader";
import Logo from "../assets/logo-boardgame.png";
import { sidebarData } from "../data/sidebar-data";
import { getAllBranch } from "../data/services/branch-service/get-all";
import { BranchAllIdResponse } from "../models/data/branch";
// import { Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { IoIosArrowDown } from "react-icons/io";
// import { IoIosArrowUp } from "react-icons/io";
import DrawerHeader from "./drawer/DrawerHeader";
import RightDrawerInsidePage from "./drawer/RightDrawerInsidePage";
import useReducerDispatch from "../hooks/use.reducer";

interface Props {
  children: React.ReactNode;
}
export const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
  drawerWidth: number;
}>(({ theme, open, drawerWidth }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  marginRight: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
  position: "relative",
}));

export default function Layout({ children }: Props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<BranchAllIdResponse[]>([]);
  // const [openBranch, setOpenBranch] = React.useState(false);
  const navigate = useNavigate();
  // const [arrow, setArrow] = React.useState<boolean>(false);
  const { state } = useReducerDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  // const handleBranchOpen = () => {
  //   setOpenBranch(!openBranch);
  //   setArrow(!arrow);
  // };

  // const handleBranchClickSendId = (id: string) => {
  //   navigate(`/branch-manage/${id}`);
  // };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        var result = await getAllBranch();
        if (result) {
          setData(result);
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppbarDefault open={open} handleDrawerOpen={handleDrawerOpen} />
      <DrawerDefault open={open}>
        <DrawerHeaderDefault>
          <img src={Logo} alt="logo" style={{ height: "50px", width: "auto" }} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeaderDefault>
        <Divider />
        <List>
          {sidebarData(data).map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                {open ? (
                  ""
                ) : (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {text.icon && <text.icon size={20} />}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={text.name}
                  sx={{ opacity: open ? 1 : 0 }}
                  onClick={() => navigate(text.route!)}
                />
                {/* {open && text.branch && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      ml: 3,
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      text.branch && handleBranchOpen();
                    }}
                  >
                    {arrow ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </ListItemIcon>
                )} */}
              </ListItemButton>
              {/* {open && text.branch && (
                <Collapse in={openBranch} timeout="auto" unmountOnExit>
                  {text.branch.map((b, i) => {
                    return (
                      <List
                        component="div"
                        disablePadding
                        onClick={() => handleBranchClickSendId(b.id)}
                      >
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={b.branchName} key={i} />
                        </ListItemButton>
                      </List>
                    );
                  })}
                </Collapse>
              )} */}
            </ListItem>
          ))}
        </List>
        <Divider />
      </DrawerDefault>
      <Main open={state.openRightDrawer} drawerWidth={state.drawerWidth}>
        <DrawerHeader />
        {children}
      </Main>
      <RightDrawerInsidePage />
    </Box>
  );
}
