import { useParams } from "react-router-dom";
import { CARD_LIST_ROWS } from "../../../data/data";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import GenerateQRCode from "../../GenQRCode/GenerateQRCode";
import { formatTime } from "../../../utils/format";

type Props = {};

export default function IdScaned({}: Props) {
  const { id } = useParams();
  const { currentColor } = useStateDispatchContext();
  const idValid = CARD_LIST_ROWS.filter((item) => item.id.toString() === id);
  if (idValid.length <= 0 || idValid[0].status === false)
    return (
      <div className="h-[80vh] ">
        <div className="flex justify-center items-center h-full font-bold text-xl text-center dark:text-main-dark-text text-main-bure-text">
          404 Invalid code Please check your code again.
        </div>
      </div>
    );
  const splitTime = formatTime(idValid[0].time_out).split(":");
  return (
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
              className="h-16 m-0 flex items-center pl-10 text-xl font-bold text-main-dark-text lg-max:rounded-none"
              style={{ backgroundColor: currentColor }}
            >
              Card No. {id}
            </CardHeader>
            <div className="h-full flex items-center">
              <CardBody placeholder={""} className="text-start p-0 w-full">
                <div className="w-full lg:px-32 px-4 ">
                  <form className="mt-8 mb-2  max-w-80 sm:w-full">
                    <div className="lg:grid grid-flow-col gap-6">
                      <div className="mb-5 lg:mb-1 lg:gap-6 gap-4 w-full">
                        <div className="mx-auto w-fit">
                          <GenerateQRCode value={id!} size={200} level="M" />
                        </div>
                        <Typography
                          placeholder={""}
                          variant="h6"
                          color="blue-gray"
                          className="dark:text-main-dark-text text-center mt-4"
                        >
                          Card NO. <span style={{ color: currentColor }}>{id}</span>
                        </Typography>
                      </div>
                      <div className="lg:mb-1 flex flex-col lg:gap-6 gap-4 lg-max:text-center">
                        <Typography
                          placeholder={""}
                          variant="h6"
                          color="blue-gray"
                          className="-mb-3 dark:text-main-dark-text"
                        >
                          Time currently playing
                        </Typography>
                        <Typography
                          placeholder={""}
                          variant="h6"
                          color="blue-gray"
                          className="-mb-3 dark:text-main-dark-text"
                        >
                          <span className="font-bold text-3xl" style={{ color: currentColor }}>
                            {splitTime[0]} H
                          </span>{" "}
                          <span className="font-bold text-3xl" style={{ color: currentColor }}>
                            {splitTime[1]} M
                          </span>{" "}
                          <span className="font-bold text-xl">{splitTime[2]} S</span>
                        </Typography>

                        <div className="flex gap-1 lg-max:justify-center">
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text"
                          >
                            Table number:
                          </Typography>
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text"
                            style={{ color: currentColor }}
                          >
                            {idValid[0].table_id}
                          </Typography>
                        </div>
                        <div className="flex gap-1 lg-max:justify-center">
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text"
                          >
                            Price:
                          </Typography>
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text"
                            style={{ color: currentColor }}
                          >
                            {idValid[0].price} &#3647;
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </CardBody>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
