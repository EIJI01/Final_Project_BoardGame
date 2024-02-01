import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Checkbox,
  Input,
  Select,
  Option,
  CardFooter,
} from "@material-tailwind/react";
import { UseUserContext } from "../../../contexts/ContextProvider";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { ButtonCustom } from "../..";
import { useCallback, useState } from "react";
import { QUEUE_NINTENDO_ROWS, QUEUE_TABLE_ROWS } from "../../../data/data";

type Props = {};

export default function ReservationQueue({}: Props) {
  const { currentUser } = UseUserContext();
  const [formDataName, setFormDataName] = useState<string | undefined>(currentUser?.name);
  const [formDataTel, setFormDataTel] = useState<string | undefined>(currentUser?.tel);
  const [formDataNumberPeople, setFormDataNumberPeople] = useState<string | undefined>("1");
  const [formDataTable, setFormDataTable] = useState<string | undefined>("table");
  const { currentColor } = useStateDispatchContext();
  const [openReservated, setOpenReservated] = useState<boolean>(false);
  const [isExpected, setIsExpected] = useState<boolean>(false);
  const setOpenReservation = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isExpected) {
        setOpenReservated(true);
      }
    },
    [formDataName, formDataTel, formDataNumberPeople, formDataTable, isExpected]
  );
  const setOpenReservationCancel = useCallback(() => {
    setOpenReservated(false);
  }, [openReservated]);

  return (
    <>
      {!openReservated && (
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
                  Reservation Queue
                </CardHeader>
                <CardBody placeholder={""} className="text-center p-0">
                  <div className="w-full lg:px-32 px-4 ">
                    <form className="mt-8 mb-2  max-w-80 sm:w-full" onSubmit={setOpenReservation}>
                      <div className="lg:grid grid-flow-col gap-6">
                        <div className="mb-4 lg:mb-1 flex flex-col lg:gap-6 gap-4">
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
                            disabled
                            name="nameUser"
                            size="lg"
                            value={currentUser?.name!}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 cursor-not-allowed"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => setFormDataName(e.target.value)}
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
                          <Input
                            crossOrigin={""}
                            disabled
                            size="lg"
                            name="telephone"
                            value={currentUser?.tel}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 cursor-not-allowed"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => setFormDataTel(e.target.value)}
                          />
                        </div>
                        <div className="lg:mb-1 flex flex-col lg:gap-6 gap-4">
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
                            size="lg"
                            label="Select number"
                            name="numberOfPeople"
                            value={formDataNumberPeople}
                            onChange={setFormDataNumberPeople}
                            className="dark:text-main-dark-text"
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
                            size="lg"
                            label="Select table"
                            name="typeTable"
                            value={formDataTable}
                            onChange={setFormDataTable}
                            className="dark:text-main-dark-text"
                            labelProps={{ className: "dark:text-main-dark-text" }}
                            menuProps={{
                              className:
                                "dark:lg:bg-main-bure-text dark:bg-[#1d1d1d] dark:text-main-dark-text ",
                            }}
                          >
                            <Option value="table">Table</Option>
                            <Option value="nintendo">Nintendo</Option>
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
                          checked={isExpected}
                          onChange={() => setIsExpected(!isExpected)}
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
                    </form>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      )}
      {openReservated && (
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
      )}
    </>
  );
}
