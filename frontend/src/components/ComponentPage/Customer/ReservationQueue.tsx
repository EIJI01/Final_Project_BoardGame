import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Checkbox,
  Input,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
import { UseUserContext } from "../../../contexts/ContextProvider";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { ButtonCustom } from "../..";
import { useEffect, useState } from "react";
// import { QUEUE_NINTENDO_ROWS, QUEUE_TABLE_ROWS } from "../../../data/data";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type FormQueue = {
  name: string;
  email: string;
  phoneNumber: string;
  numberOfPeople: string;
  tableType: string;
  branchId: string;
  isExpected: boolean;
};

export default function ReservationQueue() {
  const { currentUser } = UseUserContext();
  const { currentColor } = useStateDispatchContext();
  const [openReservated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .default(() => currentUser!.name),
    email: yup
      .string()
      .required("Email is required")
      .default(() => currentUser!.email),
    phoneNumber: yup
      .string()
      .default(() => currentUser!.tel)
      .required("Phone is a required field")
      .matches(
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Invalid phone number format"
      ),
    numberOfPeople: yup.string().required("Number of people is required"),
    tableType: yup.string().required("Table type is required"),
    branchId: yup.string().required("Branch is required"),
    isExpected: yup
      .boolean()
      .required("Expected is required")
      .oneOf([true], "The terms and conditions must be accepted."),
  });

  // const setOpenReservation = (event: React.FormEvent<HTMLFormElement>) => {
  //   setOpenReservated(true);
  // };

  // const setOpenReservationCancel = useCallback(() => {
  //   setOpenReservated(false);
  // }, [openReservated]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormQueue>({ resolver: yupResolver(schema) });

  useEffect(() => {
    setValue("email", currentUser?.email ?? "", { shouldValidate: true });
    setValue("name", currentUser?.name ?? "", { shouldValidate: true });
    setValue("phoneNumber", currentUser?.tel ?? "", { shouldValidate: true });
  }, [setValue, currentUser?.email, currentUser?.name, currentUser?.tel]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const onSubmit: SubmitHandler<FormQueue> = async (data) => {
    console.log(data);
  };

  return isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <Spinner color="blue" className="mx-auto h-12 w-12" />
    </div>
  ) : (
    <>
      {!openReservated && (
        <div className="pt-4 lg:px-52">
          <div className="flex justify-center items-center">
            <div className="w-full">
              <Card
                placeholder={""}
                className="w-full lg:h-[600px] shadow-none lg:shadow-md dark:lg:bg-[#1d1d1d] bg-inherit"
              >
                <CardHeader
                  placeholder={""}
                  floated={false}
                  className="py-7 m-0 flex items-center pl-10 text-xl font-bold text-main-dark-text"
                  style={{ backgroundColor: currentColor }}
                >
                  Queue
                </CardHeader>
                <CardBody placeholder={""} className="text-center p-0">
                  <div className="w-full lg:px-32 px-4 ">
                    <form
                      className="mt-8 mb-2  max-w-80 sm:w-full"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="lg:grid grid-flow-col gap-6">
                        <div className="lg:mb-1 flex flex-col lg:gap-3 gap-4">
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text"
                          >
                            Email
                          </Typography>
                          <Input
                            crossOrigin={""}
                            {...register("email")}
                            size="lg"
                            defaultValue={currentUser?.email}
                            readOnly
                            className=" border-1 !border-blue-gray-200 focus:!border-1 cursor-default"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                          />
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text"
                          >
                            Your name
                          </Typography>
                          <Input
                            crossOrigin={""}
                            {...register("name")}
                            size="lg"
                            readOnly
                            defaultValue={currentUser?.name!}
                            className=" border-1 !border-blue-gray-200 focus:!border-1 cursor-default"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                          />
                          <Typography
                            placeholder={""}
                            type="label"
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text"
                          >
                            Your telephone
                          </Typography>
                          {currentUser?.tel ? (
                            <Input
                              crossOrigin={""}
                              {...register("phoneNumber")}
                              size="lg"
                              readOnly
                              defaultValue={currentUser?.tel}
                              className=" border-1 !border-blue-gray-200 focus:!border-1 cursor-default"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                            />
                          ) : (
                            <Input
                              crossOrigin={""}
                              {...register("phoneNumber")}
                              size="lg"
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                            />
                          )}
                        </div>
                        <div className="lg:mb-1 flex flex-col lg:gap-3 gap-4">
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text"
                          >
                            Number of people
                          </Typography>
                          <Select
                            placeholder={""}
                            {...register("numberOfPeople")}
                            size="lg"
                            label="Select number"
                            className="dark:text-main-dark-text"
                            onChange={(e) =>
                              setValue("numberOfPeople", e as string, { shouldValidate: true })
                            }
                            labelProps={{
                              className: "dark:text-main-dark-text",
                            }}
                            menuProps={{
                              className:
                                "dark:lg:bg-main-bure-text dark:bg-[#1d1d1d] dark:text-main-dark-text h-232 overflow-y-scroll",
                            }}
                          >
                            <Option value="1">1 people</Option>
                            <Option value="2">2 people</Option>
                            <Option value="3">3 people</Option>
                            <Option value="4">4 people</Option>
                            <Option value="5">5 people</Option>
                            <Option value="6">6 people</Option>
                            <Option value="7">7 people</Option>
                            <Option value="8">8 people</Option>
                            <Option value="9">9 people</Option>
                            <Option value="10">10 people</Option>
                            <Option value="11">11 people</Option>
                            <Option value="12">12 people</Option>
                          </Select>
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text"
                          >
                            Select type of table
                          </Typography>
                          <Select
                            placeholder={""}
                            {...register("tableType")}
                            size="lg"
                            label="Select table"
                            className="dark:text-main-dark-text"
                            labelProps={{ className: "dark:text-main-dark-text" }}
                            onChange={(e) =>
                              setValue("tableType", e as string, { shouldValidate: true })
                            }
                            menuProps={{
                              className:
                                "dark:lg:bg-main-bure-text dark:bg-[#1d1d1d] dark:text-main-dark-text ",
                            }}
                          >
                            <Option value="0">Table</Option>
                            <Option value="1">Nintendo</Option>
                          </Select>
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text"
                          >
                            Select Branch
                          </Typography>
                          <Select
                            placeholder={""}
                            {...register("branchId")}
                            size="lg"
                            label="Select Branch"
                            className="dark:text-main-dark-text"
                            labelProps={{ className: "dark:text-main-dark-text" }}
                            onChange={(e) =>
                              setValue("branchId", e as string, { shouldValidate: true })
                            }
                            menuProps={{
                              className:
                                "dark:lg:bg-main-bure-text dark:bg-[#1d1d1d] dark:text-main-dark-text ",
                            }}
                          >
                            <Option value="0">Lungmor</Option>
                            <Option value="1">Central</Option>
                          </Select>
                        </div>
                      </div>
                      <Typography
                        placeholder={""}
                        className="mt-5 text-xs bg-gray-200 w-fit mx-auto p-2 px-4 rounded-lg"
                      >
                        <span className="font-semibold text-sm">Note: </span>
                        If you receive a queue. You must respond within 3 minutes or you will lose
                        your rights.
                      </Typography>
                      <div className="mt-3">
                        <Checkbox
                          {...register("isExpected")}
                          crossOrigin={""}
                          label={
                            <Typography
                              placeholder={""}
                              variant="small"
                              color="gray"
                              className="flex items-center font-normal dark:text-main-dark-text"
                            >
                              I agree the
                              <a href="#" className="font-medium transition-colors">
                                &nbsp;Terms and Conditions
                              </a>
                            </Typography>
                          }
                          containerProps={{ className: "-ml-2.5" }}
                        />
                      </div>
                      <ButtonCustom
                        className="mt-6 text-main-dark-text"
                        size="md"
                        fullWidth
                        color={currentColor}
                      >
                        next
                      </ButtonCustom>
                      <p className=" text-red-500 text-xs mt-3">
                        {errors.branchId
                          ? errors.branchId.message
                          : errors.isExpected
                          ? errors.isExpected.message
                          : errors.name
                          ? errors.name.message
                          : errors.numberOfPeople
                          ? errors.numberOfPeople.message
                          : errors.phoneNumber
                          ? errors.phoneNumber.message
                          : errors.tableType
                          ? errors.tableType.message
                          : ""}
                      </p>
                    </form>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );

  /* {openReservated && (
        <div className="pt-4 lg:px-52">
          <div className="flex justify-center items-center">
            <div className="w-full">
              <Card
                placeholder={""}
                className="w-full lg:h-[500px] shadow-none lg:shadow-md dark:lg:bg-[#1d1d1d] bg-inherit"
              >
                <CardHeader
                  placeholder={""}
                  floated={false}
                  className="h-16 m-0 flex items-center pl-10 text-xl font-bold text-main-dark-text"
                  style={{ backgroundColor: currentColor }}
                >
                  Queue
                </CardHeader>
                <CardBody placeholder={""} className="text-center p-0">
                  <div className="w-full lg:px-32 px-4">
                    <form className="mt-8 mb-2  max-w-80 sm:w-full">
                      <div className="lg:grid grid-flow-col gap-6">
                        <div className="mb-4 lg:mb-1 flex flex-col lg:gap-6 gap-4 justify-between items-center">
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className=" dark:text-main-dark-text lg:text-center text-start"
                          >
                            Your queue is
                          </Typography>
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="text-[10rem] leading-none"
                            style={{ color: currentColor }}
                          >
                            {formDataTable === "table"
                              ? (QUEUE_TABLE_ROWS.length + 1).toString()
                              : (QUEUE_NINTENDO_ROWS.length + 1).toString()}
                          </Typography>

                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className=" dark:text-main-dark-text lg:text-center text-end"
                          >
                            ... Plese waiting for your queue
                          </Typography>
                        </div>
                        <div className="lg:mb-1 flex flex-col lg:gap-6 gap-4">
                          <div>
                            <Typography
                              placeholder={""}
                              variant="h6"
                              color="blue-gray"
                              className=" dark:text-main-dark-text text-left"
                            >
                              Number of people
                            </Typography>
                            <Select
                              placeholder={""}
                              size="lg"
                              label={`${formDataNumberPeople} people`}
                              disabled
                              className=" cursor-not-allowed"
                            >
                              <Option>1 people</Option>
                              <Option>2 people</Option>
                              <Option>3 people</Option>
                              <Option>4 people</Option>
                              <Option>5 people</Option>
                              <Option>6 people</Option>
                            </Select>
                          </div>
                          <div>
                            <Typography
                              placeholder={""}
                              variant="h6"
                              color="blue-gray"
                              className=" dark:text-main-dark-text text-left"
                            >
                              type of table
                            </Typography>
                            <Select
                              placeholder={""}
                              size="lg"
                              label={formDataTable}
                              disabled
                              className=" cursor-not-allowed"
                            >
                              <Option>Table</Option>
                              <Option>Nintendo</Option>
                            </Select>
                          </div>
                          <div>
                            <Typography
                              placeholder={""}
                              variant="h6"
                              color="blue-gray"
                              className=" dark:text-main-dark-text text-left"
                            >
                              Telephone
                            </Typography>
                            <Input
                              crossOrigin={""}
                              disabled
                              size="lg"
                              name="telephone"
                              label={formDataTel}
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 cursor-not-allowed"
                              labelProps={{
                                className: "before:content-none after:content-none pl-3",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </CardBody>
                <CardFooter
                  placeholder={""}
                  className="flex items-center lg:justify-end justify-center gap-2"
                >
                  <ButtonCustom
                    className=" dark:text-main-dark-text mt-5"
                    variant="gradient"
                    size="md"
                    color={currentColor}
                    onClick={setOpenReservationCancel}
                  >
                    Cancel
                  </ButtonCustom>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )} */
}
