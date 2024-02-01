import { useParams } from "react-router-dom";
import { CARD_LIST_ROWS } from "../../../data/data";
import GenerateQRCode from "../../GenQRCode/GenerateQRCode";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useCallback, useState } from "react";
import { formatTime } from "../../../utils/format";

type Props = {};

interface FormData {
  id: number;
  time_in?: string;
  time_out?: string;
  price?: number;
  status: boolean;
  table_id: number;
}

export default function CardId({}: Props) {
  const { id } = useParams();
  const { currentColor, currentMode } = useStateDispatchContext();
  const card = CARD_LIST_ROWS.filter((item) => item.id.toString() === id);
  const [formData, setFormData] = useState<FormData>({
    id: card[0].id,
    time_in: formatTime(card[0].time_in),
    time_out: card[0].status === true ? "" : formatTime(card[0].time_out),
    price: card[0].price,
    status: card[0].status,
    table_id: card[0].table_id,
  });

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
  return (
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
                Card Number: {card[0].id}
              </Typography>
            </div>
            <div className="mx-auto w-fit">
              <GenerateQRCode value={card[0].id.toString()} size={250} level="M" />
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
                Table {card[0].table_id}
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
                      value={formData.status ? "online" : "offline"}
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
