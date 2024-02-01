import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { ButtonCustom } from "../../components";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { Link } from "react-router-dom";
type Props = {};

export default function RegisterPage({}: Props) {
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
          className="mb-4 grid h-28 place-items-center mt-6 lg:-mt-6"
          style={{ backgroundColor: currentColor }}
        >
          <Typography placeholder={""} variant="h3" color="white">
            Register
          </Typography>
        </CardHeader>
        <CardBody placeholder={""} className="flex flex-col gap-4">
          <Input
            crossOrigin={""}
            label="Username"
            size="lg"
            color={currentMode.modes === "Dark" ? "white" : undefined}
          />
          <Input
            crossOrigin={""}
            label="Email"
            size="lg"
            color={currentMode.modes === "Dark" ? "white" : undefined}
          />
          <Input
            crossOrigin={""}
            label="Password"
            size="lg"
            color={currentMode.modes === "Dark" ? "white" : undefined}
          />
          <Input
            crossOrigin={""}
            label="Confirm Password"
            size="lg"
            color={currentMode.modes === "Dark" ? "white" : undefined}
          />
        </CardBody>
        <CardFooter placeholder={""} className="pt-0">
          <ButtonCustom variant="gradient" fullWidth color={currentColor}>
            Sign up
          </ButtonCustom>
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
