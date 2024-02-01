import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { ArchiveBoxIcon, ArrowPathIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

interface Props {
  id: number;
  name: string;
  startTime: string;
  clickCheckout: () => void;
  clickChangeTable: () => void;
  clickDeleteCard: () => void;
  setId: (value: number) => void;
}

export default function Card({
  id,
  name,
  startTime,
  clickCheckout,
  setId,
  clickChangeTable,
  clickDeleteCard,
}: Props) {
  const { currentColor } = useStateDispatchContext();
  return (
    <div className="p-5 border-2 lg:hidden m-2 rounded-lg" style={{ borderColor: currentColor }}>
      <div className="flex justify-between items-center">
        <div className="grid grid-rows-2 w-full">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Typography placeholder={""} className="dark:text-main-dark-text text-xl font-bold">
                Card {id}
              </Typography>
              <Typography
                placeholder={""}
                className="font-semibold text-xl text-main-bure-text dark:text-main-dark-text"
                style={{ color: currentColor }}
              >
                {name}$
              </Typography>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <Typography placeholder={""} className="dark:text-main-dark-text">
              Start time {startTime}
            </Typography>
            <div className="text-end flex items-end justify-end gap-2">
              <Tooltip content="Check out">
                <IconButton
                  placeholder=""
                  variant="text"
                  className=" border-2 border-gray-300 dark:border-gray-800"
                  id="my-element"
                  color="green"
                  onClick={() => {
                    clickCheckout();
                    setId(id);
                  }}
                >
                  <CurrencyDollarIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
              <Tooltip content="Change Table">
                <IconButton
                  placeholder=""
                  variant="text"
                  className=" border-2 border-gray-300 dark:border-gray-800"
                  id="my-element"
                  color="orange"
                  onClick={() => {
                    clickChangeTable();
                    setId(id);
                  }}
                >
                  <ArrowPathIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
              <Tooltip content="Delete Card">
                <IconButton
                  placeholder=""
                  variant="text"
                  color="red"
                  className=" border-2 border-gray-300 dark:border-gray-800"
                  id="my-element"
                  onClick={() => {
                    clickDeleteCard();
                    setId(id);
                  }}
                >
                  <ArchiveBoxIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
