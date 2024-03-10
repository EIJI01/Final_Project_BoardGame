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
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BranchAllIdResponse } from "../../../models/data/branch";
import { getAllBranchId } from "../../../data/services/branch-service/getAllIdbranch";
import { createQueue } from "../../../data/services/queue-service/create-queue";
import { getQueueInformation } from "../../../data/services/queue-service/get-queue.information";
import { QueueResponseLower } from "../../../models/data/queue";
import { Link, useNavigate } from "react-router-dom";
import { ForwardIcon } from "@heroicons/react/24/outline";

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
  const [allBranch, setAllBranch] = useState<BranchAllIdResponse[]>([]);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [isQueueExist, setIsQueueExist] = useState<QueueResponseLower>();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .default(() => currentUser?.name),
    email: yup
      .string()
      .required("Email is required")
      .default(() => currentUser?.email),
    phoneNumber: yup
      .string()
      .default(() => currentUser?.tel)
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
    const fetchBranch = async () => {
      var result = await getAllBranchId();
      setAllBranch(result);
    };
    const fetchQueue = async () => {
      var result = await getQueueInformation();
      setIsQueueExist(result);
    };
    fetchBranch();
    fetchQueue();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (isQueueExist?.status === 1) {
      navigate(`/member/booking-queue/${isQueueExist?.id}`);
    } else if (isQueueExist?.status === 2) {
      navigate(`/member/booking-queue/queue/table/${isQueueExist.tableId}`);
    }
  }, [isQueueExist]);

  const onSubmit: SubmitHandler<FormQueue> = async (data) => {
    setLoadingButton(true);
    try {
      var result = await createQueue({
        email: data.email,
        tableType: Number(data.tableType),
        numberOfPeople: Number(data.numberOfPeople),
        branchId: data.branchId,
      });
      console.log(result);
      if (result) {
        setTimeout(async () => {
          setLoadingButton(false);
          var result = await getQueueInformation();
          setIsQueueExist(result);
        }, 2000);
      }
    } catch (err: any) {
      setTimeout(() => {
        setLoadingButton(false);
      });
      console.log(err);
    }
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
                  className="py-7 m-0 flex items-center px-10 text-xl font-bold text-main-dark-text justify-between"
                  style={{ backgroundColor: currentColor }}
                >
                  <div>Queue</div>
                  {isQueueExist ? (
                    <div className="flex gap-2 items-center">
                      <ForwardIcon className="h-6 w-6" strokeWidth={2} />
                      <Link
                        to={`/member/booking-queue/${isQueueExist.id}`}
                        className="text-sm hover:underline"
                      >
                        check your queue
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
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
                            className="-mb-3 dark:text-main-dark-text text-start pl-1"
                          >
                            Email
                          </Typography>
                          <Input
                            crossOrigin={""}
                            {...register("email")}
                            size="lg"
                            defaultValue={currentUser?.email}
                            readOnly
                            className=" border-0 !border-blue-gray-50 focus:!border-0 cursor-default"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                          />
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text text-start pl-1"
                          >
                            Your name
                          </Typography>
                          <Input
                            crossOrigin={""}
                            {...register("name")}
                            size="lg"
                            readOnly
                            defaultValue={currentUser?.name!}
                            className=" border-0 !border-blue-gray-200 focus:!border-0 cursor-default"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                          />
                          <Typography
                            placeholder={""}
                            type="label"
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text text-start pl-1"
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
                              className=" border-0 !border-blue-gray-200 focus:!border-0 cursor-default"
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
                            className="-mb-3 dark:text-main-dark-text text-start pl-1"
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
                            className="-mb-3 dark:text-main-dark-text text-start pl-1"
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
                            className="-mb-3 dark:text-main-dark-text text-start pl-1"
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
                            {allBranch.map((data, i) => {
                              return (
                                <Option value={data.id} key={i}>
                                  {data.branchName}
                                </Option>
                              );
                            })}
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
                        {loadingButton ? <Spinner color="blue" className="mx-auto" /> : "Submit"}
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
}
