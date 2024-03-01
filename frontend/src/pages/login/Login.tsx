import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Spinner,
} from "@material-tailwind/react";
import { ButtonCustom } from "../../components";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "../../data/services/authentication-service/login";
import { useEffect, useState } from "react";
import { ErrorResponseData } from "../../models/errors/error";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "universal-cookie";

type FromLogin = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
      "Invalid email format"
    ),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const { currentColor, currentMode } = useStateDispatchContext();
  const [error, setError] = useState<ErrorResponseData | undefined>(undefined);
  const [check, setCheck] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(check);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FromLogin>({ resolver: yupResolver(schema) });

  useEffect(() => {
    const cookies = new Cookies();
    const username = cookies.get("myusername");
    const password = cookies.get("mypass");
    if (username && password) {
      setValue("email", username);
      setValue("password", password);
    }
  }, []);

  const onSubmit: SubmitHandler<FromLogin> = async (data) => {
    try {
      setIsLoading(true);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
      var result = await login(data);
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      const cookies = new Cookies(null, {
        path: "/login",
        expires: new Date(Date.now() + 7200000),
      });
      if (check) {
        cookies.set("myusername", data.email);
        cookies.set("mypass", data.password);
      } else {
        cookies.remove("myusername");
        cookies.remove("mypass");
      }
      setInterval(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err: any) {
      setInterval(() => {
        setError(err);
      }, 2000);
    }
  };
  return (
    <div
      id="container"
      className="flex items-center justify-center h-screen bg-blue-gray-100"
      style={{ backgroundColor: currentMode.modes === "Dark" ? "#292929" : "" }}
    >
      <Card
        placeholder={""}
        className="lg:w-96 w-full h-screen lg:h-auto"
        style={{ backgroundColor: currentMode.modes === "Dark" ? "#1d1d1d" : "" }}
      >
        <CardHeader
          placeholder={""}
          variant="gradient"
          className="mb-4 grid h-28 place-items-center mt-6 lg:-mt-6"
          style={{ backgroundColor: currentColor }}
        >
          <Typography placeholder={""} variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody placeholder={""} className="flex flex-col gap-4">
            <Input
              id="email"
              {...register("email")}
              crossOrigin={""}
              label="Email / Username"
              size="lg"
              color={currentMode.modes === "Dark" ? "white" : undefined}
            />
            {errors.email && (
              <Typography placeholder={""} className="text-red-500 text-xs -mt-3 -mb-1">
                {errors.email.message}
              </Typography>
            )}
            <Input
              id="password"
              {...register("password")}
              crossOrigin={""}
              label="Password"
              size="lg"
              type="password"
              color={currentMode.modes === "Dark" ? "white" : undefined}
            />
            {errors.password && (
              <Typography placeholder={""} className="text-red-500 text-xs -mt-3 -mb-1">
                {errors.password.message}
              </Typography>
            )}
            <div className="-ml-2.5 flex items-center justify-between">
              <Checkbox
                crossOrigin={""}
                label="Remember Me"
                checked={check}
                onChange={() => setCheck(!check)}
              />

              <Typography
                placeholder={""}
                className="text-xs -mb-1 hover:underline cursor-pointer"
                onClick={() => (window.location.href = "/forget-password")}
              >
                Forget password
              </Typography>
            </div>
            <ButtonCustom type="submit" variant="gradient" fullWidth color={currentColor}>
              {isLoading ? <Spinner color="blue" className="mx-auto" /> : "Sign in"}
            </ButtonCustom>

            {error && <p className="text-red-500 text-center text-xs">{error.title}</p>}
          </CardBody>
        </form>

        <CardFooter placeholder={""} className="pt-0">
          <Typography
            placeholder={""}
            variant="small"
            className={`${error ? "mt-0" : "mt-6"} flex justify-center`}
          >
            Don&apos;t have an account?
            <Typography
              placeholder={""}
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold hover:underline"
              style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
            >
              <Link to={"/register"}>Sign up</Link>
            </Typography>
          </Typography>

          <Typography
            placeholder={""}
            as={"div"}
            className=" text-xs text-center mt-4 hover:underline cursor-pointer font-semibold"
            onClick={() => (window.location.href = "/")}
          >
            Back to home page.
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
