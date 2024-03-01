import { Card, CardBody, CardHeader, Input, Spinner, Typography } from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";
import { ButtonCustom } from "../../components";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorResponseData } from "../../models/errors/error";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { resetPassword } from "../../data/services/authentication-service/reset-password";

export interface FormResetPassword {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const { currentMode, currentColor } = useStateDispatchContext();
  const [error, setError] = useState<ErrorResponseData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(undefined);

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    token: yup.string().required("Token is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password length should be at least 8 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .min(8, "Confirm Password length should be at least 8 characters")
      .max(12, "Confirm Password cannot exceed more than 12 characters")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormResetPassword>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormResetPassword> = async (data) => {
    try {
      setIsLoading(true);
      const result = await resetPassword(data);
      console.log(result);
      setInterval(() => {
        setIsLoading(false);
        setData(result);
      }, 2000);
    } catch (err: any) {
      setIsLoading(false);
      setError(err);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-blue-gray-100"
      style={{ backgroundColor: currentMode.modes === "Dark" ? "#292929" : "" }}
    >
      {!!!data && (
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
              Reset Password
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody placeholder={""} className="flex flex-col gap-4">
              <div className="hidden">
                <Input
                  {...register("email", {
                    required: true,
                  })}
                  value={searchParams.get("email")!}
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
                  {...register("token", {
                    required: true,
                  })}
                  value={searchParams.get("token")!}
                  crossOrigin={""}
                  label="Token"
                  size="lg"
                  color={currentMode.modes === "Dark" ? "white" : undefined}
                />
                {errors.token && (
                  <Typography placeholder={""} className="text-red-500 text-xs -mt-3 -mb-1">
                    {errors.token.message}
                  </Typography>
                )}
              </div>
              <Input
                {...register("password", {
                  required: true,
                })}
                type="password"
                crossOrigin={""}
                label="Password"
                size="lg"
                color={currentMode.modes === "Dark" ? "white" : undefined}
              />
              {errors.password && (
                <Typography placeholder={""} className="text-red-500 text-xs -mt-3 -mb-1">
                  {errors.password.message}
                </Typography>
              )}
              <Input
                {...register("confirmPassword", {
                  required: true,
                  minLength: 8,
                  validate: (data) => data.length < 8,
                })}
                crossOrigin={""}
                label="confirmPassword"
                size="lg"
                type="password"
                color={currentMode.modes === "Dark" ? "white" : undefined}
              />
              {errors.confirmPassword && (
                <Typography placeholder={""} className="text-red-500 text-xs -mt-3">
                  {errors.confirmPassword.message}
                </Typography>
              )}
              <ButtonCustom type="submit" variant="gradient" fullWidth color={currentColor}>
                {isLoading ? <Spinner color="blue" className="mx-auto" /> : "Submit"}
              </ButtonCustom>
              {error && <p className="text-red-500 text-center text-xs">{error.title}</p>}
            </CardBody>
          </form>
        </Card>
      )}
      {!!data && (
        <div>
          <Typography placeholder={""} as={"div"} className=" text-lg text-center  font-semibold">
            {data.message}
          </Typography>
        </div>
      )}
    </div>
  );
}
