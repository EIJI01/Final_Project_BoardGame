import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ImageLogo from "../assets/logo-boardgame.png";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterGmForm } from "../models/data/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerGmAccount } from "../data/services/authentication-service/register-gm";

const defaultTheme = createTheme();

export default function DialogRegister() {
  const [isLoadingButton, setIsLoadingButton] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Username is require"),
    phoneNumber: yup
      .string()
      .required("Phone number is require")
      .matches(
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Invalid phone number format"
      ),
    password: yup.string().required("Password is require"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterGmForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterGmForm> = async (data) => {
    try {
      setIsLoadingButton(true);
      var result = await registerGmAccount(data);
      if (result) {
        setTimeout(() => {
          setIsLoadingButton(false);
          window.location.reload();
        }, 2000);
      }
    } catch (err: any) {
      setTimeout(() => {
        setIsLoadingButton(false);
        setError(err.message);
      }, 2000);
      console.log(err);
    }
    console.log(data);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={ImageLogo} alt="logo" style={{ width: "120px", height: "70px" }} />
          <Typography component="h1" variant="h5">
            Create GM
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  {...register("name")}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
                {errors.name && (
                  <Typography sx={{ color: "red", fontSize: "10px" }}>
                    {errors.name.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("email")}
                  id="username"
                  label="Username"
                  autoComplete="Username"
                />
                {errors.email && (
                  <Typography sx={{ color: "red", fontSize: "10px" }}>
                    {errors.email.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("phoneNumber")}
                  label="Phone Number"
                  id="phoneNumber"
                  autoComplete="new-password"
                />
                {errors.phoneNumber && (
                  <Typography sx={{ color: "red", fontSize: "10px" }}>
                    {errors.phoneNumber.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("password")}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <Typography sx={{ color: "red", fontSize: "10px" }}>
                    {errors.password.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("confirmPassword")}
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <Typography sx={{ color: "red", fontSize: "10px" }}>
                    {errors.confirmPassword.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <LoadingButton
              sx={{ marginTop: 2, marginBottom: 2 }}
              size="large"
              loading={isLoadingButton}
              fullWidth
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              type="submit"
            >
              Save
            </LoadingButton>
            {error && <Typography sx={{ color: "red", fontSize: "10px" }}>{error}</Typography>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
