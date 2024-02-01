import { Card, CardHeader, CardBody, Typography, Input } from "@material-tailwind/react";
import { UseUserContext } from "../../../contexts/ContextProvider";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { ButtonCustom } from "../..";
type Props = {};

export default function ProfileUser({}: Props) {
  const { currentUser } = UseUserContext();
  const { currentColor } = useStateDispatchContext();
  return (
    <div className="lg:pt-4 pt-4 lg:px-20">
      <CardHeader
        placeholder={""}
        floated={false}
        className="h-14 m-0 flex items-center pl-10 text-xl font-bold text-main-dark-text lg:mb-8 mb-2 rounded-none lg:rounded-xl"
        style={{ backgroundColor: currentColor }}
      >
        Profile
      </CardHeader>
      <div className="lg:grid grid-flow-col gap-20 border-x-1 border-gray-400">
        <div className="w-full flex lg:justify-end justify-center">
          <Card
            placeholder={""}
            className="lg:w-96 rounded-none lg:rounded-xl shadow-none lg:shadow-md w-full dark:lg:bg-[#292929] dark:bg-inherit"
          >
            <CardHeader
              placeholder={""}
              floated={false}
              className="h-320 lg-max:w-96 lg-max:mx-auto border-4 border-white lg:border-none"
            >
              <img src={currentUser?.image} alt="profile-picture" />
            </CardHeader>
            <CardBody placeholder={""} className="text-center">
              <Typography
                placeholder={""}
                variant="h4"
                color="blue-gray"
                className="mb-2 text-main-dark-text"
                style={{ color: currentColor }}
              >
                {currentUser?.name}
              </Typography>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="font-medium text-main-bure-text dark:text-main-dark-text"
                textGradient
              >
                <span className="font-semibold ">username:</span> {currentUser?.username}
              </Typography>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="font-medium text-main-bure-text dark:text-main-dark-text"
                textGradient
              >
                <span className="font-semibold ">tel: </span>
                {currentUser?.tel}
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="flex lg:justify-start justify-center mt-8 lg:mt-0 items-center w-full">
          <Card
            placeholder={""}
            color="transparent"
            shadow={false}
            className="h-full lg-max:w-full px-3 lg:px-0"
          >
            <Typography
              placeholder={""}
              variant="h4"
              color="blue-gray"
              style={{ color: currentColor }}
            >
              Edit information
            </Typography>
            <Typography
              placeholder={""}
              color="gray"
              className="mt-1 font-normal dark:text-main-dark-text"
            >
              Nice to meet you! {currentUser?.name}
            </Typography>
            <form className="mt-8 mb-2 w-full lg:w-96 lg:max-w-96 h-full lg:relative">
              <div className="mb-1 flex flex-col gap-8 ">
                <div>
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="dark:text-main-dark-text"
                  >
                    Your Name
                  </Typography>
                  <Input
                    crossOrigin={""}
                    size="lg"
                    placeholder="saksit"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-main-dark-text dark:focus:!border-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div>
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="dark:text-main-dark-text"
                  >
                    Your Email / Username
                  </Typography>
                  <Input
                    crossOrigin={""}
                    size="lg"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-white dark:text-main-dark-text"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div>
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="dark:text-main-dark-text"
                  >
                    Telephone
                  </Typography>
                  <Input
                    crossOrigin={""}
                    size="lg"
                    placeholder="098xxxxxxx"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-main-dark-text dark:focus:!border-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
              </div>

              <ButtonCustom
                size="md"
                fullWidth
                color={currentColor}
                className=" lg:absolute bottom-0 mt-8 text-main-dark-text"
                onClick={() => {}}
              >
                Save
              </ButtonCustom>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
