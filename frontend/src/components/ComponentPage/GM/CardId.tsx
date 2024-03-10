import { useParams } from "react-router-dom";
import GenerateQRCode from "../../GenQRCode/GenerateQRCode";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { Card, Input, Button, Typography, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { formatDateTime } from "../../../utils/format";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ScanSystemResponse } from "../../../models/data/scanSystem";
import { CardResponse } from "../../../models/data/card";
import { TableResponseHub } from "../../../models/data/table";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateScanSystem } from "../../../data/services/scanSystem-service/updateScanSystem";
import AlertSuccess from "../../Alert/AlertSuccess";
import { urlSignalR } from "../../../utils/Url";

interface FormData {
  id: string;
  time_in?: string;
  time_out?: string;
  price?: number;
  status: boolean;
  table_id: string;
  card_id: string;
}

export default function CardId() {
  const { id } = useParams();
  const { currentColor, currentMode } = useStateDispatchContext();
  const [cardListRows, setCardListRows] = useState<ScanSystemResponse[]>([]);
  const [allCards, setAllCards] = useState<CardResponse[]>([]);
  const [allTable, setAllTable] = useState<TableResponseHub[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [openAlertNotSuccess, setOpenAlertNotSuccess] = useState<boolean>(false);

  const handlerOpenAlertSuccess = () => setOpenAlertSuccess(!openAlertSuccess);
  const handlerOpenAlertNotSuccess = () => setOpenAlertNotSuccess(!openAlertNotSuccess);

  const schema = yup.object().shape({
    id: yup.string().required("Id is required"),
    time_in: yup.string(),
    time_out: yup.string(),
    price: yup.number(),
    status: yup.boolean().required("Status is required"),
    table_id: yup.string().required("Table Id is required."),
    card_id: yup.string().required("Card Id is required."),
  });

  const { register, handleSubmit, setValue } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoadingButton(true);
      var result = await updateScanSystem({
        scanSystemId: data.id,
        startTime: data.time_in,
        stopTime: data.time_out,
        totalPrice: data.price,
      });

      if (result) {
        setTimeout(() => {
          setIsLoadingButton(false);
          setOpenAlertSuccess(true);
        }, 2000);
        setTimeout(() => {
          setOpenAlertSuccess(false);
        }, 4000);
      }
    } catch (err: any) {
      setOpenAlertNotSuccess(true);
      setIsLoadingButton(false);
      setTimeout(() => {
        setOpenAlertNotSuccess(false);
      }, 2000);
      console.log(err);
    }
  };

  const cards = cardListRows.filter((item) => item.Id === id);
  const card = cards[0];
  const qrs = allCards.filter((data) => data.Id === card.CardId);
  const qr = qrs[0];
  const tables = allTable.filter((data) => data.Id === card.TableId);
  const table = tables[0];

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${urlSignalR}/database-tracking`)
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("ReceivedScanSystems", (scanSystem) => {
      const jsonParse = JSON.parse(scanSystem);
      setCardListRows(jsonParse);
    });

    connection.on("ReceivedCards", (cards) => {
      const jsonParse = JSON.parse(cards);
      setAllCards(jsonParse);
    });

    connection.on("ReceivedTables", (tables) => {
      const jsonParse = JSON.parse(tables);
      setAllTable(jsonParse);
    });

    const InvokeScanSystems = () => {
      connection.invoke("SendScanSystems").catch((err) => console.log(err));
      connection.invoke("SendCards").catch((err) => console.log(err));
      connection.invoke("SendTables").catch((err) => console.log(err));
    };

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("Connection started successfully!");
        InvokeScanSystems();
      } catch (error) {
        console.error("Error starting connection:", error);
        startConnection();
      }
    };
    startConnection();
    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (card) {
      setValue("id", card.Id);
      setValue("price", card.TotalPrice);
      setValue("status", card.Status);
      setValue("table_id", card.TableId);
      setValue("card_id", card.CardId);
      setValue("time_in", formatDateTime(card.StartTime));
      setValue("time_out", card.StopTime ? formatDateTime(card.StopTime) : "");
    }
  }, [cards]);

  console.log(card?.StartTime);

  return isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <Spinner color="blue" className="mx-auto h-12 w-12" />
    </div>
  ) : (
    <div className="mt-8  lg:mx-32">
      <div className="lg:grid grid-flow-col gap-5">
        <div className="w-full  lg:flex justify-center items-start lg-max:mb-5">
          <div className="w-full">
            <div
              className="p-3 lg:rounded-lg mb-5 w-full"
              style={{ backgroundColor: currentColor }}
            >
              <Typography
                placeholder={""}
                className="font-bold text-xl text-center text-main-dark-text"
              >
                Card Number: {qr?.CardNumber}
              </Typography>
            </div>
            <div className="mx-auto w-fit">
              <GenerateQRCode value={card?.CardId} size={250} level="M" />
            </div>
          </div>
        </div>
        <div
          className="flex flex-col items-center rounded-lg"
          style={{ backgroundColor: currentMode.modes === "Dark" ? "#292929" : "" }}
        >
          <Card placeholder={""} color="transparent" shadow className=" p-5 w-full ">
            <div className="flex justify-between items-end">
              <Typography
                placeholder={""}
                variant="h4"
                color="blue-gray"
                style={{ color: currentColor }}
              >
                Edit Scan information
              </Typography>
              <Typography
                placeholder={""}
                variant="h5"
                color="blue-gray"
                style={{ color: currentColor }}
              >
                Table {table?.TableNumber}
              </Typography>
            </div>
            <form
              className="mt-8 mb-2 w-full max-w-full-lg sm:w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1 flex flex-col gap-6">
                <div className="lg:grid grid-cols-2 lg:gap-5 mb-1 flex flex-col gap-6">
                  <div className="mb-1 flex flex-col gap-6">
                    {false && (
                      <>
                        <Input
                          crossOrigin={""}
                          size="lg"
                          {...register("id")}
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-white dark:text-main-dark-text"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                        <Input
                          crossOrigin={""}
                          size="lg"
                          {...register("table_id")}
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-white dark:text-main-dark-text"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                        <Input
                          crossOrigin={""}
                          size="lg"
                          {...register("card_id")}
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-white dark:text-main-dark-text"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </>
                    )}
                    <Typography
                      placeholder={""}
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3 dark:text-main-dark-text"
                    >
                      Time in
                    </Typography>
                    <Input
                      crossOrigin={""}
                      type="datetime-local"
                      size="lg"
                      {...register("time_in")}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-white dark:text-main-dark-text"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      placeholder={""}
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3 dark:text-main-dark-text"
                    >
                      Time out
                    </Typography>
                    {card.Status === true ? (
                      <Input
                        crossOrigin={""}
                        readOnly
                        type="datetime-local"
                        {...register("time_out")}
                        size="lg"
                        className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 focus:border-1  border-1 cursor-default dark:text-main-dark-text !bg-gray-400"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    ) : (
                      <Input
                        crossOrigin={""}
                        type="datetime-local"
                        {...register("time_out")}
                        size="lg"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-white dark:text-main-dark-text"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      placeholder={""}
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3 dark:text-main-dark-text"
                    >
                      price
                    </Typography>
                    {card.Status === true ? (
                      <Input
                        crossOrigin={""}
                        size="lg"
                        readOnly
                        {...register("price")}
                        placeholder="50 &#3647;"
                        className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 focus:border-1  border-1 cursor-default dark:text-main-dark-text !bg-gray-400"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    ) : (
                      <Input
                        crossOrigin={""}
                        size="lg"
                        {...register("price")}
                        placeholder="50 &#3647;"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-white dark:text-main-dark-text"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      placeholder={""}
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3 dark:text-main-dark-text"
                    >
                      status
                    </Typography>
                    <Input
                      crossOrigin={""}
                      readOnly
                      size="lg"
                      {...register("status")}
                      placeholder="online / offline"
                      className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 focus:border-1  border-1 cursor-default !bg-gray-400"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
              </div>

              <Button placeholder={""} className="mt-6" fullWidth type="submit">
                {isLoadingButton ? <Spinner color="blue" className="mx-auto" /> : "Save"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
      {openAlertSuccess || openAlertNotSuccess ? (
        <div className=" fixed top-0 inset-0 z-50 mx-auto h-24 flex items-center justify-center">
          <div>
            <AlertSuccess
              open={openAlertSuccess}
              data="Update scan success."
              onClose={handlerOpenAlertSuccess}
              type="success"
            />
            <AlertSuccess
              open={openAlertNotSuccess}
              data="Update scan failed."
              onClose={handlerOpenAlertNotSuccess}
              type="error"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
