import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { ButtonCustom } from "../../components";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorResponseData } from "../../models/errors/error";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAccount } from "../../data/services/authentication-service/register";

export type FormRegister = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup.string().required("First name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
      "Invalid email format"
    ),
  phoneNumber: yup
    .string()
    .required("Phone is a required field")
    .matches(
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Invalid phone number format"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password length should be at least 8 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .min(8, "Confirm Password length should be at least 8 characters")
    .max(12, "Confirm Password cannot exceed more than 12 characters")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export default function RegisterPage() {
  const { currentColor, currentMode } = useStateDispatchContext();
  const [error, setError] = useState<ErrorResponseData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegister>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormRegister> = async (data) => {
    try {
      setIsLoading(true);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
      const result = await registerAccount(data);
      console.log(result);
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
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
            Register
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody placeholder={""} className="flex flex-col gap-4">
            <Input
              {...register("name")}
              crossOrigin={""}
              label="Name"
              size="lg"
              color={currentMode.modes === "Dark" ? "white" : undefined}
            />
            {errors.name && (
              <Typography placeholder={""} className="text-red-500 text-xs -mt-3 -mb-3">
                {errors.name.message}
              </Typography>
            )}
            <Input
              {...register("email")}
              crossOrigin={""}
              label="Email"
              size="lg"
              color={currentMode.modes === "Dark" ? "white" : undefined}
            />
            {errors.email && (
              <Typography placeholder={""} className="text-red-500 text-xs -mt-3 -mb-3">
                {errors.email.message}
              </Typography>
            )}
            <Input
              {...register("phoneNumber")}
              crossOrigin={""}
              label="Phone Number"
              size="lg"
              color={currentMode.modes === "Dark" ? "white" : undefined}
            />
            {errors.phoneNumber && (
              <Typography placeholder={""} className="text-red-500 text-xs -mt-3 -mb-3">
                {errors.phoneNumber.message}
              </Typography>
            )}
            <Input
              {...register("password")}
              type="password"
              crossOrigin={""}
              label="Password"
              size="lg"
              color={currentMode.modes === "Dark" ? "white" : undefined}
            />
            {errors.password && (
              <Typography placeholder={""} className="text-red-500 text-xs -mt-3 -mb-3">
                {errors.password.message}
              </Typography>
            )}
            <Input
              {...register("confirmPassword")}
              crossOrigin={""}
              type="password"
              label="Confirm Password"
              size="lg"
              color={currentMode.modes === "Dark" ? "white" : undefined}
            />
            {errors.confirmPassword && (
              <Typography placeholder={""} className="text-red-500 text-xs -mt-3 -mb-3">
                {errors.confirmPassword.message}
              </Typography>
            )}
            <ButtonCustom variant="gradient" fullWidth color={currentColor} type="submit">
              {isLoading ? <Spinner color="blue" className="mx-auto" /> : "Sign up"}
            </ButtonCustom>
            {error && <p className="text-red-500 text-center text-xs">{error.title}</p>}
          </CardBody>
        </form>
        <CardFooter placeholder={""} className="pt-0">
          <Typography placeholder={""} variant="small" className="mt-6 flex justify-center">
            Have an account?
            <Link to={"/login"}>
              <Typography
                placeholder={""}
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold hover:underline"
                style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
              >
                Sign in
              </Typography>
            </Link>
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
