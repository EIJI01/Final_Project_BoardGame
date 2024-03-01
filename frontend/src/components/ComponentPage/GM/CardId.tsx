import { useParams } from "react-router-dom";
import GenerateQRCode from "../../GenQRCode/GenerateQRCode";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { Card, Input, Button, Typography, Spinner } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import { formatTime } from "../../../utils/format";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ScanSystemResponse } from "../../../models/data/scanSystem";
import { CardResponse } from "../../../models/data/card";
import { TableResponseHub } from "../../../models/data/table";

interface FormData {
  id: string;
  time_in?: string;
  time_out?: string;
  price?: number;
  status: boolean;
  table_id: string;
}

export default function CardId() {
  const { id } = useParams();
  const { currentColor, currentMode } = useStateDispatchContext();
  const [cardListRows, setCardListRows] = useState<ScanSystemResponse[]>([]);
  const [allCards, setAllCards] = useState<CardResponse[]>([]);
  const [allTable, setAllTable] = useState<TableResponseHub[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    time_in: "",
    time_out: "",
    price: 0,
    status: false,
    table_id: "",
  });

  const cards = cardListRows.filter((item) => item.Id === id);
  const card = cards[0];
  const qrs = allCards.filter((data) => data.Id === card.CardId);
  const qr = qrs[0];
  const tables = allTable.filter((data) => data.Id === card.TableId);
  const table = tables[0];
  console.log("card", card);

  console.log("cardListRows = ", cardListRows);
  console.log("id = ", id);
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7124/database-tracking`)
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
      setFormData({
        id: card.CardId,
        time_in: formatTime(card.StartTime),
        time_out: card.Status === true ? "" : formatTime(card.StopTime),
        price: card.TotalPrice,
        status: card.Status,
        table_id: card.TableId,
      });
    }
  }, [cards]);

  const handleClickFormData = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(formData);
    },
    [formData]
  );
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
                Edit card information
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
            <form className="mt-8 mb-2 w-full max-w-full-lg sm:w-full" onSubmit={handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <div className="lg:grid grid-cols-2 lg:gap-5 mb-1 flex flex-col gap-6">
                  <div className="mb-1 flex flex-col gap-6">
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
                      type="time"
                      name="time_in"
                      size="lg"
                      step="3600"
                      value={formData.time_in}
                      placeholder="12:00:00"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-white dark:text-main-dark-text"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={handleClickFormData}
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
                    <Input
                      crossOrigin={""}
                      type="time"
                      name="time_out"
                      step="3600"
                      size="lg"
                      value={formData.time_out}
                      placeholder="12:00:00"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-white dark:text-main-dark-text"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={handleClickFormData}
                    />
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
                    <Input
                      crossOrigin={""}
                      name="price"
                      size="lg"
                      value={formData.price}
                      placeholder="50 &#3647;"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-white dark:text-main-dark-text"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={handleClickFormData}
                    />
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
                      disabled
                      name="status"
                      value={formData.status === true ? "online" : "offline"}
                      size="lg"
                      placeholder="online / offline"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 cursor-not-allowed"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
              </div>

              <Button placeholder={""} className="mt-6" fullWidth type="submit">
                Save
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
