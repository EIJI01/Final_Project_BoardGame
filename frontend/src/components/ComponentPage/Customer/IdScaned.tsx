import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import GenerateQRCode from "../../GenQRCode/GenerateQRCode";
import { useEffect, useState } from "react";
import { getScanSystemByCardId } from "../../../data/services/scanSystem-service/getScanbyCardId";
import { CardResponseLower } from "../../../models/data/card";
import { ScanSystemResponseLower } from "../../../models/data/scanSystem";
import { getAllCards } from "../../../data/services/card-service/getAllCards";
import { getTableById } from "../../../data/services/table-service/getTableById";
import { TableResponse } from "../../../models/data/table";
import { getAllBranchId } from "../../../data/services/branch-service/getAllIdbranch";
import { BranchAllIdResponse } from "../../../models/data/branch";

export default function IdScaned() {
  const { id } = useParams();
  const { currentColor } = useStateDispatchContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scanSystem, setScanSystem] = useState<ScanSystemResponseLower | null>(null);
  const [cards, setCards] = useState<CardResponseLower | null>(null);
  const [table, setTable] = useState<TableResponse | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [branches, setBraches] = useState<BranchAllIdResponse[]>([]);

  useEffect(() => {
    const fetData = async () => {
      try {
        var result = await getScanSystemByCardId({ cardId: id! });
        var resultCards = await getAllCards();
        const cardList = resultCards.filter((data) => data.id === id);
        const card = cardList[0];
        var resultTable = await getTableById(result.tableId);
        var resultBranch = await getAllBranchId();
        if (result && resultCards && resultTable && resultBranch) {
          setScanSystem(result);
          setBraches(resultBranch);
          setCards(card);
          setTable(resultTable);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      } catch (err: any) {
        setIsLoading(false);
        console.log(err);
      }
    };
    fetData();
  }, []);

  const [timeDifference, setTimeDifference] = useState({ h: "", m: "", s: "" });

  useEffect(() => {
    if (scanSystem?.startTime && table?.branchId && branches) {
      const value = new Date(`${scanSystem?.startTime}`).getTime();
      const branchList = branches.filter((b) => b.id === table.branchId);
      const branch = branchList[0];

      console.log("value = ", value);
      console.log("new Date = ", new Date());
      setInterval(() => {
        var values = new Date().getTime() - value;
        console.log(values);
        const hours = Math.floor(values / (1000 * 60 * 60));
        const minutes = Math.floor((values % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((values % (1000 * 60)) / 1000);
        setTimeDifference({
          h: hours.toString(),
          m: minutes.toString(),
          s: seconds.toString(),
        });
        if (
          (hours < 1 && minutes >= 0 && seconds >= 0) ||
          (hours === 1 && minutes === 0 && seconds === 0)
        ) {
          setCurrentPrice(branch.playPricePerHour);
        } else if (hours === 1 && minutes >= 0 && minutes <= 30 && seconds >= 0) {
          setCurrentPrice(branch.playPricePerHour + 15);
        } else if (
          (hours < 2 && minutes >= 0 && seconds >= 0) ||
          (hours === 2 && minutes === 0 && seconds === 0)
        ) {
          setCurrentPrice(branch.playPricePerHour * 2);
        } else if (hours === 2 && minutes >= 0 && minutes <= 30 && seconds >= 0) {
          setCurrentPrice(branch.playPricePerHour * 2 + 15);
        } else if (
          (hours < 3 && minutes >= 0 && seconds >= 0) ||
          (hours === 3 && minutes === 0 && seconds === 0)
        ) {
          setCurrentPrice(branch.playPricePerHour * 3);
        } else {
          setCurrentPrice(branch.buffetPrice);
        }
      }, 1000);
    }
  }, [scanSystem, table, branches]);

  if (scanSystem === null || undefined)
    return isLoading ? (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner color="blue" className="mx-auto h-12 w-12" />
      </div>
    ) : (
      <div className="h-[80vh] ">
        <div className="flex justify-center items-center h-full font-bold text-xl text-center dark:text-main-dark-text text-main-bure-text">
          404 Invalid code Please check your code again.
        </div>
      </div>
    );

  return isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <Spinner color="blue" className="mx-auto h-12 w-12" />
    </div>
  ) : (
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
              Card No. {cards?.cardNumber}
            </CardHeader>
            <div className="h-full flex items-center">
              <CardBody placeholder={""} className="text-start p-0 w-full">
                <div className="w-full lg:px-32 px-4 ">
                  <form className="mt-8 mb-2  max-w-80 sm:w-full">
                    <div className="lg:grid grid-flow-col gap-6">
                      <div className="mb-5 lg:mb-1 lg:gap-6 gap-4 w-full">
                        <div className="mx-auto w-fit">
                          <GenerateQRCode value={id!} size={250} level="M" />
                        </div>
                        <Typography
                          placeholder={""}
                          variant="h6"
                          color="blue-gray"
                          className="dark:text-main-dark-text text-center mt-4 text-xl"
                        >
                          Card NO. <span style={{ color: currentColor }}>{cards?.cardNumber}</span>
                        </Typography>
                      </div>
                      <div className="lg:mb-1 flex flex-col lg:gap-6 gap-4 lg-max:text-center">
                        <Typography
                          placeholder={""}
                          variant="h6"
                          color="blue-gray"
                          className="-mb-3 dark:text-main-dark-text text-2xl"
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
                            {timeDifference.h} H
                          </span>{" "}
                          <span className="font-bold text-3xl" style={{ color: currentColor }}>
                            {timeDifference.m} M
                          </span>{" "}
                          <span className="font-bold text-xl">{timeDifference.s} S</span>
                        </Typography>

                        <div className="flex gap-1 lg-max:justify-center">
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text text-xl"
                          >
                            Table number:
                          </Typography>
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text text-xl"
                            style={{ color: currentColor }}
                          >
                            {table?.tableNumber}
                          </Typography>
                        </div>
                        <div className="flex gap-1 lg-max:justify-center lg:absolute bottom-10 right-10">
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text text-3xl"
                          >
                            Price:
                          </Typography>
                          <Typography
                            placeholder={""}
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 dark:text-main-dark-text text-3xl"
                            style={{ color: currentColor }}
                          >
                            {currentPrice.toString()} &#3647;
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
