import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import CancelIcon from "@mui/icons-material/Cancel";
import useReducerDispatch from "../../hooks/use.reducer";
import { Box, Container, TextField, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBranch } from "../../data/services/branch-service/create-branch";

type FormCreateBranch = {
  branchName: string;
  playPricePerHour: number;
  buffetPrice: number;
  address: string;
};

const RightDrawerInsidePage = () => {
  const { state, setState } = useReducerDispatch();
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const schema = yup.object().shape({
    branchName: yup.string().required("Branch name is required"),
    playPricePerHour: yup.number().required("").typeError("This field is require number"),
    buffetPrice: yup.number().required("").typeError("This field is require number"),
    address: yup.string().required("Address is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCreateBranch>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormCreateBranch> = async (data) => {
    try {
      setLoadingButton(true);
      var result = await createBranch(data);
      if (result) {
        setTimeout(() => {
          setLoadingButton(false);
          window.location.reload();
        }, 2000);
      }
    } catch (err: any) {
      setTimeout(() => {
        setLoadingButton(false);
        setError(err.message);
      }, 2000);
      console.log(err);
    }
  };

  const handleDrawerClose = () => {
    setState.setOpenRightDrawer(false);
  };

  return (
    <Drawer
      sx={{
        width: state.drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: state.drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={state.openRightDrawer}
    >
      <Toolbar />

      <List>
        <Box
          onClick={handleDrawerClose}
          sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
        >
          <Typography sx={{ fontSize: "30px", marginLeft: 2, fontWeight: "bold" }}>
            Create Brach
          </Typography>
          <CancelIcon
            sx={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              ":hover": { bgcolor: "lightgray" },
              marginRight: 2,
            }}
          />
        </Box>
      </List>
      <Divider />
      <Container sx={{ marginTop: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ fontWeight: "bold", marginBottom: 1 }}>Branch Name</Typography>
          <TextField
            {...register("branchName")}
            id="outlined-textarea"
            fullWidth
            label="Branch Name"
            placeholder="Central"
            multiline
          />
          {errors.branchName && (
            <Typography sx={{ color: "red" }}>{errors.branchName.message}</Typography>
          )}
          <Box sx={{ display: "flex", marginTop: 1, justifyContent: "space-between", gap: 2 }}>
            <Box>
              <Typography sx={{ fontWeight: "bold", marginBottom: 1 }}>Price / Hour</Typography>

              <TextField
                {...register("playPricePerHour")}
                id="outlined-number"
                placeholder="39"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors.playPricePerHour && (
                <Typography sx={{ color: "red" }}>{errors.playPricePerHour.message}</Typography>
              )}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "bold", marginBottom: 1 }}>Buffet Price</Typography>
              <TextField
                {...register("buffetPrice")}
                id="outlined-number"
                placeholder="139"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors.buffetPrice && (
                <Typography sx={{ color: "red" }}>{errors.buffetPrice.message}</Typography>
              )}
            </Box>
          </Box>
          <Typography sx={{ fontWeight: "bold", marginBottom: 1, marginTop: 1 }}>
            Address
          </Typography>
          <TextField
            id="outlined-multiline-static"
            {...register("address")}
            label="Address"
            multiline
            rows={4}
            fullWidth
          />
          {errors.address && (
            <Typography sx={{ color: "red" }}>{errors.address.message}</Typography>
          )}
          <LoadingButton
            sx={{ marginTop: 2 }}
            size="large"
            loading={loadingButton}
            fullWidth
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
          >
            Save
          </LoadingButton>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </form>
      </Container>
    </Drawer>
  );
};

export default RightDrawerInsidePage;
