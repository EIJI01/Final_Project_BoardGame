import {
  Box,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { bgGradient } from "../../theme/css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "../../data/services/authentication-service/login";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";

type FormLogin = {
  username: string;
  password: string;
};

export default function Login() {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  // const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormLogin> = async (data) => {
    try {
      // setIsLoadingButton(true);
      var result = await login({ username: data.username, password: data.password });
      if (result) {
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        setTimeout(() => {
          // setIsLoadingButton(false);
          window.location.href = "/";
        }, 500);
      }
    } catch (err: any) {
      setTimeout(() => {
        // setIsLoadingButton(false);
      }, 2000);
      setError(err.message);
      console.log(err);
    }
  };

  const renderForm = (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Box>
            <TextField {...register("username")} label="Username" fullWidth />
            {errors.username && (
              <Typography sx={{ fontSize: "10px", color: "red" }}>
                {errors.username.message}
              </Typography>
            )}
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <IoEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <Typography sx={{ fontSize: "10px", color: "red" }}>
                {errors.password.message}
              </Typography>
            )}
          </Box>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          sx={{ marginTop: 5 }}
        >
          Login
        </LoadingButton>
      </form>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.8),
          imgUrl: "src/assets/background/overlay_4.jpg",
        }),
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        m: 0,
        p: 0,
      }}
    >
      <Card
        sx={{
          p: 5,
          width: 1,
          maxWidth: 420,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <img src="src/assets/logo-boardgame.png" style={{ height: "60px", width: "110px" }} />
          </Box>
          <Typography variant="h4">Sign in</Typography>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Board Game Web Admin
          </Typography>
        </Divider>

        {renderForm}
        {error && <Typography sx={{ color: "red", fontSize: "10px" }}>{error}</Typography>}
      </Card>
    </Box>
  );
}
