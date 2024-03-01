import { Input, Spinner, Typography } from "@material-tailwind/react";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { ButtonCustom } from "../../components";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../models/data/user";
import { getUserByEmail, sendEmail } from "../../data/services/user-service/user";
import { ErrorResponseData } from "../../models/errors/error";

export interface FromEmail {
  email: string;
}

export default function ForgetPassword() {
  const { currentMode, currentColor } = useStateDispatchContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<User | undefined>(undefined);
  const [error, setError] = useState<ErrorResponseData | undefined>(undefined);
  const [dataSendEmail, setDataSendEmail] = useState<any | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FromEmail>();

  const onSubmit: SubmitHandler<FromEmail> = async (data) => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      const result = await getUserByEmail(data);
      setTimeout(() => {
        setData(result);
      }, 2000);
    } catch (err: any) {
      setTimeout(() => {
        setError(err);
      }, 2000);
    }
  };
  const onSubmitSendEmail: SubmitHandler<FromEmail> = async (data) => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      const result = await sendEmail(data);
      setTimeout(() => {
        setDataSendEmail(result);
      }, 2000);
    } catch (err: any) {
      setTimeout(() => {
        setError(err);
      }, 2000);
    }
  };
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundColor: currentMode.modes === "Dark" ? "#292929" : "" }}
    >
      {!!!data && (
        <div className="flex flex-col justify-center gap-5">
          <div className="flex flex-col justify-center gap-3 px-20">
            <Typography
              placeholder={""}
              className="font-bold text-3xl text-main-bure-text text-center"
            >
              BoardGame
            </Typography>
            <Typography placeholder={""} className="text-sm text-main-bure-text text-center">
              Enter your email to reset password.
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography placeholder={""} className="font-bold text-lg mb-1">
              Email
            </Typography>
            <Input
              crossOrigin={""}
              size="lg"
              label="email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
              })}
            />
            {errors.email && (
              <Typography placeholder={""} className="text-red-500 text-xs mt-1">
                Invalid email format
              </Typography>
            )}
            <ButtonCustom
              size="lg"
              className="mt-5 text-main-dark-text"
              fullWidth
              color={currentColor}
            >
              {isLoading ? <Spinner color="blue" className="mx-auto" /> : "Submit"}
            </ButtonCustom>
            {error && (
              <Typography placeholder={""} className="text-red-500 mt-3 text-center text-xs">
                {error.title}
              </Typography>
            )}
          </form>
          <Typography
            placeholder={""}
            as={"div"}
            className=" text-xs text-center mt-4 hover:underline cursor-pointer font-semibold"
            onClick={() => (window.location.href = "/")}
          >
            Back to home page.
          </Typography>
        </div>
      )}
      {!!data && (
        <div className="flex flex-col justify-center gap-5">
          <div className="flex flex-col justify-center gap-3 px-20">
            <Typography
              placeholder={""}
              className="font-bold text-3xl text-main-bure-text text-center"
            >
              BoardGame
            </Typography>
            <Typography placeholder={""} className="text-sm text-main-bure-text text-center">
              Send email to
              {data && (
                <Typography placeholder={""} className="font-bold mt-3">
                  {data.email}
                </Typography>
              )}
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmitSendEmail)}>
            <div className="hidden">
              <Typography placeholder={""} className="font-bold text-lg mb-1">
                Email
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                label="email"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                })}
              />
              {errors.email && (
                <Typography placeholder={""} className="text-red-500 text-xs mt-1">
                  Invalid email format
                </Typography>
              )}
            </div>
            <ButtonCustom
              size="lg"
              className="mt-5 text-main-dark-text"
              fullWidth
              color={currentColor}
            >
              {isLoading ? <Spinner color="blue" className="mx-auto" /> : "Send"}
            </ButtonCustom>

            {error && (
              <Typography placeholder={""} className="text-red-500 mt-3 text-center text-xs ">
                {error.title}
              </Typography>
            )}

            {dataSendEmail && (
              <Typography placeholder={""} className="text-center mt-3 text-sm font-semibold">
                {dataSendEmail.message}
              </Typography>
            )}
          </form>
          <Typography
            placeholder={""}
            as={"div"}
            className=" text-xs text-center mt-4 hover:underline cursor-pointer font-semibold"
            onClick={() => (window.location.href = "/")}
          >
            Back to home page.
          </Typography>
        </div>
      )}
    </div>
  );
}
