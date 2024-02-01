import { Card, Typography } from "@material-tailwind/react";
import DataGridHeader from "../../DataGrid/DataGridHeader";
import DataGridBody from "../../DataGrid/DataGridBody";
import { QUEUE_NINTENDO_ROWS, QUEUE_TABLE_ROWS, TABLE_HEAD_QUEUE } from "../../../data/data";
import IconTable from "../../../assets/table-nintendo/table.png";
import IconNintendo from "../../../assets/table-nintendo/nintendo-switch.png";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";

const iconTable = (
  <div>
    <img src={IconTable} alt="table" className="w-12 h-12" />
  </div>
);
const iconNintendo = (
  <div>
    <img src={IconNintendo} alt="nintendo" className="w-12 h-12" />
  </div>
);
const bodyTable = QUEUE_TABLE_ROWS.map((items, index) => {
  const isLast = index === QUEUE_TABLE_ROWS.length - 1;
  const classes = isLast
    ? "p-4 border-b dark:border-gray-800"
    : "p-4 border-b border-blue-gray-50 dark:border-gray-800";
  return (
    <tr key={index} className="hover:bg-blue-gray-50 cursor-pointer hover:dark:bg-main-dark-bg/90">
      <td className={`${classes}`}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Typography
              placeholder=""
              variant="small"
              color="blue-gray"
              className="font-normal dark:text-main-dark-text"
            >
              {items.queue}
            </Typography>
          </div>
        </div>
      </td>
      <td className={`${classes}`}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Typography
              placeholder=""
              variant="small"
              color="blue-gray"
              className="font-normal dark:text-main-dark-text"
            >
              {items.name}
            </Typography>
          </div>
        </div>
      </td>
      <td className={classes}>
        <Typography
          placeholder=""
          variant="small"
          color="blue-gray"
          className="font-normal dark:text-main-dark-text"
        >
          {items.people}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          placeholder=""
          variant="small"
          color="blue-gray"
          className="font-normal dark:text-main-dark-text "
        >
          <span className={`${"bg-green-500"} p-2 rounded-lg font-semibold text-main-dark-text`}>
            {"in queue"}
          </span>
        </Typography>
      </td>
    </tr>
  );
});
const bodyNintendo = QUEUE_NINTENDO_ROWS.map((items, index) => {
  const isLast = index === QUEUE_NINTENDO_ROWS.length - 1;
  const classes = isLast
    ? "p-4 border-b dark:border-gray-800"
    : "p-4 border-b border-blue-gray-50 dark:border-gray-800";
  return (
    <tr key={index} className="hover:bg-blue-gray-50 cursor-pointer hover:dark:bg-main-dark-bg/90">
      <td className={`${classes}`}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Typography
              placeholder=""
              variant="small"
              color="blue-gray"
              className="font-normal dark:text-main-dark-text"
            >
              {items.queue}
            </Typography>
          </div>
        </div>
      </td>
      <td className={`${classes}`}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Typography
              placeholder=""
              variant="small"
              color="blue-gray"
              className="font-normal dark:text-main-dark-text"
            >
              {items.name}
            </Typography>
          </div>
        </div>
      </td>
      <td className={classes}>
        <Typography
          placeholder=""
          variant="small"
          color="blue-gray"
          className="font-normal dark:text-main-dark-text"
        >
          {items.people}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          placeholder=""
          variant="small"
          color="blue-gray"
          className="font-normal dark:text-main-dark-text "
        >
          <span className={`${"bg-green-500"} p-2 rounded-lg font-semibold text-main-dark-text`}>
            {"in queue"}
          </span>
        </Typography>
      </td>
    </tr>
  );
});

export default function ManageQrScanComp() {
  const { currentColor } = useStateDispatchContext();
  const lenghtTable = QUEUE_TABLE_ROWS.length;
  const lengthNintendo = QUEUE_NINTENDO_ROWS.length;
  return (
    <div className="lg:grid grid-cols-2 gap-8 lg:px-20 lg:pt-4">
      <div className="hidden lg:block">
        <Card placeholder="" className="h-auto w-full dark:bg-black lg-max:rounded-none">
          <DataGridHeader
            title={`Table Queue`}
            subTitle={`${lenghtTable} queue.`}
            buttonBody={iconTable}
          />

          <DataGridBody tableHead={TABLE_HEAD_QUEUE} body={bodyTable as JSX.Element[]} />
        </Card>
      </div>
      <div className="hidden lg:block">
        <Card placeholder="" className="h-auto w-full dark:bg-black lg-max:rounded-none">
          <DataGridHeader
            title={`Nintendo Queue`}
            subTitle={`${lengthNintendo} queue.`}
            buttonBody={iconNintendo}
          />

          <DataGridBody tableHead={TABLE_HEAD_QUEUE} body={bodyNintendo as JSX.Element[]} />
        </Card>
      </div>
      <div className="lg:hidden mb-10">
        <DataGridHeader
          title={`Table Queue`}
          buttonBody={iconTable}
          subTitle={`${lenghtTable.toString()} queue.`}
        />
        <div className="max-h-300 h-auto overflow-y-scroll">
          {QUEUE_TABLE_ROWS.map((item, i) => {
            return (
              <div
                className="px-2 py-4 border-2 lg:hidden m-2 rounded-lg"
                style={{ borderColor: currentColor }}
                key={i}
              >
                <div className="flex justify-between items-center">
                  <div className="grid grid-rows-2 w-full">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <Typography
                          placeholder={""}
                          className="dark:text-main-dark-text text-xl font-bold"
                        >
                          Queue {item.queue}
                        </Typography>
                        <Typography
                          placeholder={""}
                          className="font-semibold text-main-bure-text dark:text-main-dark-text"
                          style={{ color: currentColor }}
                        >
                          {item.name}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <Typography placeholder={""} className="dark:text-main-dark-text">
                        {item.people} people
                      </Typography>
                      <div className="text-end flex items-end justify-end gap-2">
                        <Typography
                          placeholder=""
                          variant="small"
                          color="blue-gray"
                          className="font-normal dark:text-main-dark-text "
                        >
                          <span
                            className={`${"bg-green-500"} p-2 rounded-lg font-semibold text-main-dark-text`}
                          >
                            {"in queue"}
                          </span>
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lg:hidden">
        <DataGridHeader
          title={`Nintendo Queue`}
          buttonBody={iconNintendo}
          subTitle={`${lengthNintendo.toString()} queue.`}
        />
        <div className="max-h-52 h-auto overflow-y-scroll">
          {QUEUE_NINTENDO_ROWS.map((item, i) => {
            return (
              <div
                className="px-2 py-4 border-2 lg:hidden m-2 rounded-lg"
                style={{ borderColor: currentColor }}
                key={i}
              >
                <div className="flex justify-between items-center">
                  <div className="grid grid-rows-2 w-full">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <Typography
                          placeholder={""}
                          className="dark:text-main-dark-text text-xl font-bold"
                        >
                          Queue {item.queue}
                        </Typography>
                        <Typography
                          placeholder={""}
                          className="font-semibold text-main-bure-text dark:text-main-dark-text"
                          style={{ color: currentColor }}
                        >
                          {item.name}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <Typography placeholder={""} className="dark:text-main-dark-text">
                        {item.people} people
                      </Typography>
                      <div className="text-end flex items-end justify-end gap-2">
                        <Typography
                          placeholder=""
                          variant="small"
                          color="blue-gray"
                          className="font-normal dark:text-main-dark-text "
                        >
                          <span
                            className={`${"bg-green-500"} p-2 rounded-lg font-semibold text-main-dark-text`}
                          >
                            {"in queue"}
                          </span>
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
