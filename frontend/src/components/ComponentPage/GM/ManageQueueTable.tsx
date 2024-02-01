import { PencilIcon, CheckIcon } from "@heroicons/react/20/solid";
import DataGrid from "../../DataGrid/DataGrid";
import DataGridFooter from "../../DataGrid/DataGridFooter";
import DataGridHeader from "../../DataGrid/DataGridHeader";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { CARD_LIST_HEADER, CARD_LIST_ROWS, TABLE_ROWS } from "../../../data/data";

import {
  Chip,
  IconButton,
  Select,
  Tooltip,
  Typography,
  Option,
  CardBody,
} from "@material-tailwind/react";
import { formatDate, formatTime } from "../../../utils/format";
import { useCallback, useState } from "react";
import DateDefault from "../../DatePickers/DateDefault";

export interface TitleTableProps {
  no: boolean;
  time_in: boolean;
  time_out: boolean;
  price: boolean;
  table: boolean;
  status: boolean;
  edit: boolean;
  [key: string]: boolean;
}
export default function ManageQueueTable() {
  const { currentColor } = useStateDispatchContext();
  const [titleTable, setTitleTable] = useState<TitleTableProps>({
    no: true,
    time_in: true,
    time_out: true,
    price: true,
    table: true,
    status: true,
    edit: true,
  });
  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleSetStartDate = useCallback(
    (value: Date | null) => {
      setStartDate(value!);
    },
    [startDate]
  );

  const handleShowTitleTable = useCallback(
    (value: string | undefined) => {
      console.log(value);
      const searchTitle = CARD_LIST_HEADER.filter((item) => item === value);
      const newTitle = searchTitle[0].toLowerCase().replace(/ /g, "_");
      setTitleTable((prev) => ({ ...prev, [newTitle]: !prev[newTitle] }));
      console.log(value);
    },
    [setTitleTable]
  );

  const buttonBody = (
    <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:p-1 justify-center">
      <div>
        <Select
          placeholder={""}
          size="md"
          label="Hide columns"
          name="typeTable"
          onChange={handleShowTitleTable}
          className="dark:text-main-dark-text"
          labelProps={{ className: "dark:text-main-dark-text" }}
          menuProps={{
            className: "dark:lg:bg-main-bure-text dark:bg-[#1d1d1d] dark:text-main-dark-text ",
          }}
        >
          {CARD_LIST_HEADER.map((item, i) => (
            <Option key={i} value={item}>
              <div className="grid grid-flow-col">
                <div className="mr-5">{item}</div>

                <div>
                  {!!!titleTable[item.toLowerCase().replace(/ /g, "_")] && (
                    <CheckIcon className="w-4 h-4" />
                  )}
                </div>
              </div>
            </Option>
          ))}
        </Select>
      </div>

      <DateDefault startDate={startDate} onChangeStartDate={handleSetStartDate} />
    </div>
  );
  const body = CARD_LIST_ROWS.map((items, index) => {
    const isLast = index === TABLE_ROWS.length - 1;
    const classes = isLast
      ? "p-4 border-b dark:border-gray-800"
      : "p-4 py-2 border-b border-blue-gray-50 dark:border-gray-800";

    return (
      <tr
        key={index}
        onClick={() => {
          window.location.href = `/gm/manage-cards/${items.id}`;
        }}
        className="hover:bg-blue-gray-50 cursor-pointer hover:dark:bg-main-dark-bg/90"
      >
        <td className={`${classes} ${titleTable.no ? "" : "hidden"}`}>
          <div className="flex items-center gap-3">
            {/* <Avatar placeholder="" src={img} alt={name} size="sm" /> */}
            <div className="flex flex-col">
              <Typography
                placeholder=""
                variant="small"
                color="blue-gray"
                className="font-normal dark:text-main-dark-text"
              >
                {items.id}
              </Typography>
            </div>
          </div>
        </td>
        <td className={`${classes} ${titleTable.time_in ? "" : "hidden"}`}>
          <Typography
            placeholder=""
            variant="small"
            color="blue-gray"
            className="font-normal dark:text-main-dark-text"
          >
            {formatTime(items.time_in)}
          </Typography>
        </td>
        <td className={`${classes} ${titleTable.time_out ? "" : "hidden"}`}>
          <Typography
            placeholder=""
            variant="small"
            color="blue-gray"
            className="font-normal opacity-70 dark:text-main-dark-text"
          >
            {items.status ? "---" : formatTime(items.time_out)}
          </Typography>
        </td>
        <td className={`${classes} ${titleTable.price ? "" : "hidden"}`}>
          <Typography
            placeholder=""
            variant="small"
            color="blue-gray"
            className="font-normal dark:text-main-dark-text"
          >
            {items.status ? "---" : `${items.price}$`}
          </Typography>
        </td>
        <td className={`${classes} ${titleTable.table ? "" : "hidden"}`}>
          <Typography
            placeholder=""
            variant="small"
            color="blue-gray"
            className="font-normal dark:text-main-dark-text"
          >
            {items.table_id}
          </Typography>
        </td>
        <td className={`${classes} ${titleTable.status ? "" : "hidden"}`}>
          <div className="w-max">
            <Chip
              variant="ghost"
              size="sm"
              value={items.status ? "online" : "offline"}
              style={{ backgroundColor: items.status ? "green" : "red", color: "white" }}
            />
          </div>
        </td>

        <td className={`${classes} ${titleTable.edit ? "" : "hidden"}`}>
          <Tooltip content="Edit Card">
            <IconButton
              placeholder=""
              variant="text"
              className="dark:text-white border-2 border-gray-300 dark:border-gray-800"
              id="my-element"
            >
              <PencilIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <DataGrid>
        <DataGridHeader
          title="Crad list"
          subTitle={`${formatDate(CARD_LIST_ROWS[0].time_in)}`}
          buttonBody={buttonBody}
        />
        <CardBody
          placeholder=""
          className={`lg:overflow-y-scroll lg:overflow-x-hidden p-0 ${"lg:max-h-96 max-h-[65vh]"} lg:h-auto overflow-x-auto`}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {CARD_LIST_HEADER.map(
                  (head) =>
                    titleTable[head.toLowerCase().replace(/ /g, "_")] && (
                      <th
                        key={head}
                        className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 dark:bg-gray-900 dark:border-blue-gray-900`}
                      >
                        <Typography
                          placeholder=""
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                          style={{ color: currentColor }}
                        >
                          {head}
                        </Typography>
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>{body}</tbody>
          </table>
        </CardBody>
        <DataGridFooter />
      </DataGrid>
    </div>
  );
}
