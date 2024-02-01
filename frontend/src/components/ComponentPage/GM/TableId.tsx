import { useParams } from "react-router-dom";
import DataGrid from "../../DataGrid/DataGrid";
import DataGridHeader from "../../DataGrid/DataGridHeader";
import DataGridBody from "../../DataGrid/DataGridBody";
import { CARD_LIST_ROWS, CARD_TABLE_HEAD } from "../../../data/data";
import {
  IconButton,
  Select,
  Tooltip,
  Typography,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
} from "@material-tailwind/react";
import Card from "../../CardMobile/Card";
import { formatTime } from "../../../utils/format";
import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import DialogDefault from "../../Dialogs/DialogDefault";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { TABLE } from "../../../data/table";
import { ButtonCustom } from "../..";
import QRScaner from "../../QRScan/QRScaner";

type Props = {};

export default function TableId({}: Props) {
  const [openScan, setOpenScan] = useState<boolean>(false);
  const [openCheckout, setOpenCheckout] = useState<boolean>(false);
  const [openChangeTable, setOpenChangeTable] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [idQrcode, setIdQrcode] = useState<string | undefined>(undefined);
  const [stateId, seStatetId] = useState<number | undefined>(undefined);
  const [openId, setOpenId] = useState<boolean>(false);
  const [valueId, setValueId] = useState<string | undefined>(undefined);
  const { currentColor, currentMode } = useStateDispatchContext();
  const { id } = useParams();

  const handleChangValueId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValueId(value);
    },
    [valueId]
  );

  const handleScanQrcode = useCallback(
    (value: string | undefined) => {
      setIdQrcode(value);
    },
    [idQrcode]
  );
  const handleOpen = () => setOpenScan(!openScan);
  const handleOpenId = () => setOpenId(!openId);
  const handleClickCheckout = useCallback(() => {
    setOpenCheckout(!openCheckout);
  }, [openCheckout]);
  const handleClickDelete = useCallback(() => {
    setOpenDelete(!openDelete);
  }, [openDelete]);
  const handleClickChangeTable = useCallback(
    () => setOpenChangeTable(!openChangeTable),
    [openChangeTable]
  );
  const setId = (id: number) => {
    seStatetId(id);
  };
  const cards = CARD_LIST_ROWS.filter(
    (item) => item.table_id === Number(id) && item.status === true
  );
  const buttonBody = (
    <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:p-1">
      <Menu>
        <MenuHandler>
          <div>
            <ButtonCustom
              className="flex items-center gap-3 text-main-dark-text"
              size="sm"
              color={currentColor}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Card
            </ButtonCustom>
          </div>
        </MenuHandler>
        <MenuList placeholder={""}>
          <MenuItem placeholder={""} className="font-semibold border-b-1" onClick={handleOpenId}>
            Add ID Card
          </MenuItem>
          <MenuItem placeholder={""} className="font-semibold" onClick={handleOpen}>
            Scan QR COde
          </MenuItem>
        </MenuList>
      </Menu>
      <div className="lg:hidden text-white dark:text-main-bure-text">.</div>
    </div>
  );
  const body = CARD_LIST_ROWS.map((items, index) => {
    //
    const isLast = index === CARD_LIST_ROWS.length - 1;
    const classes = isLast
      ? "p-4 border-b dark:border-gray-800"
      : "p-4 py-2 border-b border-blue-gray-50 dark:border-gray-800";
    if (items.table_id !== Number(id) || items.status === false) return undefined;

    return (
      <tr
        key={index}
        className="hover:bg-blue-gray-50 cursor-pointer hover:dark:bg-main-dark-bg/90"
      >
        <td className={`${classes} lg:w-96`}>
          <div className="flex items-center gap-3">
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
        <td className={classes}>
          <Typography
            placeholder=""
            variant="small"
            color="blue-gray"
            className="font-normal dark:text-main-dark-text"
          >
            {formatTime(items.time_in)}
          </Typography>
        </td>
        <td className={classes}>
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <Typography
                placeholder=""
                variant="small"
                color="blue-gray"
                className="font-normal dark:text-main-dark-text"
              >
                {items.price}
              </Typography>
            </div>
          </div>
        </td>
        <td className={`${classes} w-52`}>
          <div className="flex items-center justify-center gap-2">
            <Tooltip content="Check out">
              <IconButton
                placeholder=""
                variant="text"
                className=" border-2 border-gray-300 dark:border-gray-800"
                id="my-element"
                color="green"
                onClick={() => {
                  handleClickCheckout();
                  setId(items.id);
                }}
              >
                <CurrencyDollarIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
            <Tooltip content="Change">
              <IconButton
                placeholder=""
                variant="text"
                className=" border-2 border-gray-300 dark:border-gray-800"
                id="my-element"
                color="orange"
                onClick={() => {
                  handleClickChangeTable();
                  setId(items.id);
                }}
              >
                <ArrowPathIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
            <Tooltip content="Delete">
              <IconButton
                placeholder=""
                variant="text"
                color="red"
                className=" border-2 border-gray-300 dark:border-gray-800"
                id="my-element"
                onClick={() => {
                  handleClickDelete();
                  setId(items.id);
                }}
              >
                <ArchiveBoxIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </div>
        </td>
      </tr>
    );
  });
  const dialogShowHeader = (
    <div className="w-full lg:px-10">
      <div className="text-center font-bold text-3xl mb-10" style={{ color: currentColor }}>
        Checkout
      </div>
      {CARD_LIST_ROWS.map((item, i) => {
        //
        if (item.id !== stateId) return undefined;
        return (
          <div key={i}>
            <div className="flex justify-between items-center">
              <div
                className="font-semibold text-base text-gray-600"
                style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
              >
                ID: {item.id}
              </div>
              <div
                className="font-semibold text-base text-gray-600"
                style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
              >
                Price: {item.price}$
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  const dialogShowBody = (
    <div className="lg:px-10 mb-20">
      {CARD_LIST_ROWS.map((item, i) => {
        //
        if (item.id !== stateId) return undefined;
        return (
          <div key={i}>
            <div className="flex justify-between items-center">
              <div
                className="font-semibold text-base text-gray-600"
                style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
              >
                Table Id: {item.table_id}
              </div>
              <div
                className="font-semibold text-base text-gray-600"
                style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
              >
                Start Time: {formatTime(item.time_in)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  const dialogShowHeaderChangeTable = (
    <div className="w-full lg:px-10">
      <div className="text-center font-bold text-3xl lg:mb-10" style={{ color: currentColor }}>
        Change Table
      </div>
    </div>
  );
  const dialogShowBodyChangeTable = (
    <div className="lg:px-10 mb-20">
      {CARD_LIST_ROWS.map((item, i) => {
        //
        if (item.id !== stateId) return undefined;
        return (
          <div key={i}>
            <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-2 lg:gap-0">
              <div
                className="font-semibold text-base text-gray-600"
                style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
              >
                Table Id: {item.table_id}
              </div>
              <Typography placeholder={""} as={"p"} className=" text-xs">
                Change to
              </Typography>
              <div className="">
                <Select
                  placeholder={""}
                  label="Select table"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  {TABLE.map((items, i) => (
                    <Option key={i} value={items.toString()}>
                      table: {items}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const dialogDeleteCardBody = (
    <div>
      {CARD_LIST_ROWS.map((item, i) => {
        //
        if (item.id !== stateId) return undefined;
        return (
          <div key={i}>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-0">
              <Typography
                placeholder={""}
                as="div"
                className="text-center"
                style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
              >
                Do you want to delete <span className="font-semibold">ID: {item.id}</span>?
              </Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
  const dialogShowDeleteCard = (
    <div className="w-full lg:px-10">
      <div className="text-center font-bold text-3xl" style={{ color: currentColor }}>
        Delete Card
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block">
        <DataGrid>
          <DataGridHeader
            title={`Table ${id}`}
            subTitle={`${cards.length} cards.`}
            buttonBody={buttonBody}
          />
          <DataGridBody tableHead={CARD_TABLE_HEAD} body={body as JSX.Element[]} isLarge />
        </DataGrid>
      </div>
      <div className="lg:hidden">
        <DataGridHeader
          title={`Table ${id}`}
          subTitle={`${cards.length} cards`}
          buttonBody={buttonBody}
        />
      </div>
      {cards.length > 0 ? (
        CARD_LIST_ROWS.map((items) => {
          //
          if (items.table_id !== Number(id) || items.status === false) {
            return undefined;
          }
          return (
            <Card
              name={items.price.toString()}
              id={items.id}
              startTime={formatTime(items.time_in)}
              key={items.id}
              clickCheckout={handleClickCheckout}
              clickChangeTable={handleClickChangeTable}
              setId={setId}
              clickDeleteCard={handleClickDelete}
            />
          );
        })
      ) : (
        <div className="font-bold text-sm lg:text-xl text-center dark:text-main-dark-text text-main-bure-text">
          No card
        </div>
      )}
      <div className="py-1 lg:hidden"></div>
      <DialogDefault
        open={openCheckout}
        handleOpen={handleClickCheckout}
        body={dialogShowBody}
        header={dialogShowHeader}
      />
      <DialogDefault
        open={openChangeTable}
        handleOpen={handleClickChangeTable}
        body={dialogShowBodyChangeTable}
        header={dialogShowHeaderChangeTable}
      />
      <DialogDefault
        open={openDelete}
        handleOpen={handleClickDelete}
        body={dialogDeleteCardBody}
        header={dialogShowDeleteCard}
      />
      <Dialog
        placeholder={""}
        open={openScan}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="lg"
      >
        <DialogHeader placeholder={""}>Scan QR Code</DialogHeader>
        <DialogBody placeholder={""} className="h-[500px] lg:p-4 p-0">
          <QRScaner handleScanQrcode={handleScanQrcode} idQrcode={idQrcode} />
        </DialogBody>
        <DialogFooter placeholder={""}>
          <Button placeholder={""} variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog
        placeholder={""}
        open={openId}
        handler={handleOpenId}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="sm"
      >
        <DialogHeader placeholder={""}>Please input ID card</DialogHeader>
        <DialogBody placeholder={""} className="lg:p-4 p-2">
          <Input
            crossOrigin={""}
            size="lg"
            value={valueId}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleChangValueId}
          />
        </DialogBody>
        <DialogFooter placeholder={""}>
          <Button
            placeholder={""}
            variant="text"
            color="red"
            onClick={handleOpenId}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button placeholder={""} variant="gradient" color="green" onClick={handleOpenId}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
