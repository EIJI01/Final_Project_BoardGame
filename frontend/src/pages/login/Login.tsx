import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { ButtonCustom } from "../../components";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { Link } from "react-router-dom";

type Props = {};

export default function LoginPage({}: Props) {
  const { currentColor, currentMode } = useStateDispatchContext();
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
          // color="gray"
          className="mb-4 grid h-28 place-items-center mt-6 lg:-mt-6"
          style={{ backgroundColor: currentColor }}
        >
          <Typography placeholder={""} variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody placeholder={""} className="flex flex-col gap-4">
          <Input
            crossOrigin={""}
            label="Email / Username"
            size="lg"
            color={currentMode.modes === "Dark" ? "white" : undefined}
          />
          <Input
            crossOrigin={""}
            label="Password"
            size="lg"
            type="password"
            color={currentMode.modes === "Dark" ? "white" : undefined}
          />
          <div className="-ml-2.5">
            <Checkbox crossOrigin={""} label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter placeholder={""} className="pt-0">
          <ButtonCustom
            variant="gradient"
            fullWidth
            color={currentColor}
            onClick={() => (window.location.href = "/")}
          >
            Sign In
          </ButtonCustom>
          <Typography placeholder={""} variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link to={"/register"}>
              <Typography
                placeholder={""}
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold hover:underline"
                style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
              >
                Sign up
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
