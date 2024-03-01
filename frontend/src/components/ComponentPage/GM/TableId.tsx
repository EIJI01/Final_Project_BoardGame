import { useParams } from "react-router-dom";
import DataGrid from "../../DataGrid/DataGrid";
import DataGridHeader from "../../DataGrid/DataGridHeader";
import DataGridBody from "../../DataGrid/DataGridBody";
import { CARD_TABLE_HEAD } from "../../../data/data";
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
  Spinner,
} from "@material-tailwind/react";
import Card from "../../CardMobile/Card";
import { formatTime } from "../../../utils/format";
import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";
import DialogDefault from "../../Dialogs/DialogDefault";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { ButtonCustom } from "../..";
import QRScanerGm from "../../QRScan/QRScanerGm";
import { addScanSystemByNumber } from "../../../data/services/scanSystem-service/addScanSystem";
import { getTableById } from "../../../data/services/table-service/getTableById";
import { TableResponse } from "../../../models/data/table";
// import { getAllScanSystemByTableId } from "../../../data/services/scanSystem-service/getAllScanSystemByTableId";
import { ScanSystemResponse } from "../../../models/data/scanSystem";
import { getAllTable } from "../../../data/services/table-service/getAllTable";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { CardResponse } from "../../../models/data/card";
import { sortTable } from "../../../utils/sort";
import AlertSuccess from "../../Alert/AlertSuccess";
import { checkout } from "../../../data/services/scanSystem-service/checkout";
import { changeTable } from "../../../data/services/scanSystem-service/change-table";
import { deleteScanSystem } from "../../../data/services/scanSystem-service/deleteScanSystem";

type Props = {};

export default function TableId({}: Props) {
  const [openScan, setOpenScan] = useState<boolean>(false);
  const [openCheckout, setOpenCheckout] = useState<boolean>(false);
  const [openChangeTable, setOpenChangeTable] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [stateId, seStatetId] = useState<string>("");
  const [openId, setOpenId] = useState<boolean>(false);
  const [valueId, setValueId] = useState<string>("");
  const { currentColor, currentMode } = useStateDispatchContext();
  const { id } = useParams();
  const [tableData, setTableData] = useState<TableResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allCards, setAllCards] = useState<CardResponse[]>([]);
  const [cardListRows, setCardListRows] = useState<ScanSystemResponse[]>([]);
  const [allTable, setAllTable] = useState<TableResponse[]>([]);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [openSuccessCheckout, setOpenSuccessCheckout] = useState<boolean>(false);
  const [openErrorCheckout, setOpenErrorCheckout] = useState<boolean>(false);
  const [openSuccessChangeTable, setOpenSuccessChangeTable] = useState<boolean>(false);
  const [openErrorChangeTable, setOpenErrorChangeTable] = useState<boolean>(false);
  const [openSuccessDelete, setOpenSuccessDelete] = useState<boolean>(false);
  const [openErrorDelete, setOpenErrorDelete] = useState<boolean>(false);
  const [tableId, setTableId] = useState<string>("");

  useEffect(() => {
    if (id) {
      const branchId = localStorage.getItem("branchId");
      const getTableId = async () => {
        try {
          var result = await getTableById(id!);
          setTableData(result);
          var resultAllTable = await getAllTable(branchId!);
          setAllTable(resultAllTable);
        } catch (err: any) {
          console.error(err);
        }
      };
      getTableId();
    }
    setInterval(() => {
      setIsLoading(false);
    }, 1500);
  }, [id]);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7124/database-tracking`)
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("ReceivedScanSystems", (scanSystem) => {
      const jsonParse = JSON.parse(scanSystem);
      const cardLstRowFilter = jsonParse.filter(
        (item: any) => item.TableId === id && item.Status === true
      );
      setCardListRows(cardLstRowFilter);
    });

    connection.on("ReceivedCards", (cards) => {
      const jsonParse = JSON.parse(cards);
      setAllCards(jsonParse);
    });

    const InvokeScanSystems = () => {
      connection.invoke("SendCards").catch((err) => console.log(err));
      connection.invoke("SendScanSystems").catch((err) => console.log(err));
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
  }, []);

  const handleChangValueId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValueId(value.toUpperCase());
  };

  const handleOpenAlertSuccess = () => setOpenSuccess(!openSuccess);
  const handleOpenAlertError = () => setOpenError(!openError);
  const handleOpenAlertSuccessCheckout = () => setOpenSuccessCheckout(!openSuccessCheckout);
  const handleOpenAlertErrorCheckout = () => setOpenErrorCheckout(!openErrorCheckout);
  const handleOpenAlertSuccessChangeTable = () =>
    setOpenSuccessChangeTable(!openSuccessChangeTable);
  const handleOpenAlertErrorChangeTable = () => setOpenErrorChangeTable(!openErrorChangeTable);
  const handleOpenAlertSuccessDelete = () => setOpenSuccessDelete(!openSuccessDelete);
  const handleOpenAlertErrorDelete = () => setOpenErrorDelete(!openErrorDelete);

  const handleScanQrcode = () => {
    setOpenScan(false);
  };

  const handleClickFetch = async () => {
    if (valueId) {
      try {
        var result = await addScanSystemByNumber({ cardNumber: valueId, tableId: id! });
        console.log(result);
        setOpenSuccess(true);
        setInterval(() => {
          setOpenSuccess(false);
        }, 2000);
      } catch (err: any) {
        setOpenError(true);
        setInterval(() => {
          setOpenError(false);
        }, 2000);
        console.error(err);
      }
      handleOpenId();
    }
  };

  const handleOpen = () => setOpenScan(!openScan);
  const handleOpenId = () => setOpenId(!openId);

  const handleClickCheckout = useCallback(() => {
    setOpenCheckout(!openCheckout);
  }, [openCheckout]);

  const handleClickDelete = useCallback(() => {
    setOpenDelete(!openDelete);
  }, [openDelete]);
  const handleClickChangeTable = useCallback(() => {
    setOpenChangeTable(!openChangeTable);
  }, [openChangeTable]);

  const setId = (id: string) => {
    seStatetId(id);
  };

  const handleFetchCheckout = async () => {
    try {
      const result = await checkout({ scanSystemId: stateId });
      console.log(result.message);
      handleClickCheckout();
      setOpenSuccessCheckout(true);
      setInterval(() => {
        setOpenSuccessCheckout(false);
      }, 2000);
    } catch (err: any) {
      handleClickCheckout();
      setOpenErrorCheckout(true);
      setInterval(() => {
        setOpenErrorCheckout(false);
      }, 2000);
      console.log(err);
    }
  };

  const handleFetchChangeTable = async () => {
    try {
      const result = await changeTable({ scanSystemId: stateId, tableId: tableId });
      console.log(result.message);
      handleClickChangeTable();
      setOpenSuccessChangeTable(true);
      setInterval(() => {
        setOpenSuccessChangeTable(false);
      }, 2000);
    } catch (err: any) {
      handleClickChangeTable();
      setOpenErrorChangeTable(true);
      setInterval(() => {
        setOpenErrorChangeTable(false);
      }, 2000);
      console.log(err);
    }
  };
  const handleFetchDelete = async () => {
    try {
      const result = await deleteScanSystem({ scanSystemId: stateId });
      console.log(result.message);
      handleClickDelete();
      setOpenSuccessDelete(true);
      setInterval(() => {
        setOpenSuccessDelete(false);
      }, 2000);
    } catch (err: any) {
      handleClickDelete();
      setOpenErrorDelete(true);
      setInterval(() => {
        setOpenErrorDelete(false);
      }, 2000);
      console.log(err);
    }
  };
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
  const body =
    cardListRows &&
    cardListRows?.map((items, index) => {
      var card = allCards.filter((data) => data.Id === items.CardId);
      const isLast = index === cardListRows.length - 1;
      const classes = isLast
        ? "p-4 border-b dark:border-gray-800"
        : "p-4 py-2 border-b border-blue-gray-50 dark:border-gray-800";

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
                  {card[0]?.CardNumber}
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
              {formatTime(items.StartTime)}
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
                  {items.TotalPrice}
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
                    setId(items.Id.toString());
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
                    setId(items.Id.toString());
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
                    setId(items.Id.toString());
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
      {cardListRows?.map((item, i) => {
        var card = allCards && allCards?.filter((data) => data.Id === item.CardId);
        if (item.Id !== stateId) return null;
        return (
          <div key={i}>
            <div className="flex justify-between items-center">
              <div
                className="font-semibold text-base text-gray-600"
                style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
              >
                Card: {card![0].CardNumber}
              </div>
              <div
                className="font-semibold text-base text-gray-600"
                style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
              >
                Price: {item.TotalPrice}$
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  const dialogShowBody = (
    <div className="lg:px-10 mb-20">
      {cardListRows &&
        cardListRows.map((item, i) => {
          //
          if (item.Id !== stateId) return undefined;
          return (
            <div key={i}>
              <div className="flex justify-between items-center">
                <div
                  className="font-semibold text-base text-gray-600"
                  style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
                >
                  Table: {tableData?.tableNumber}
                </div>
                <div
                  className="font-semibold text-base text-gray-600"
                  style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
                >
                  Start Time: {formatTime(item.StartTime)}
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
      {cardListRows &&
        cardListRows.map((item, i) => {
          //
          if (item.Id !== stateId) return undefined;
          return (
            <div key={i}>
              <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-2 lg:gap-0">
                <div
                  className="font-semibold text-base text-gray-600"
                  style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
                >
                  Table: {tableData?.tableNumber}
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
                    value={tableId}
                    onChange={(value) => setTableId(value || "")}
                    menuProps={{
                      className:
                        "dark:lg:bg-main-bure-text dark:bg-[#1d1d1d] dark:text-main-dark-text h-232 overflow-y-scroll",
                    }}
                  >
                    {sortTable(allTable).map((items: TableResponse, i) => {
                      return (
                        <Option key={i} value={items.id}>
                          table: {items.tableNumber}
                        </Option>
                      );
                    })}
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
      {cardListRows &&
        cardListRows.map((item, i) => {
          var card = allCards?.filter((data) => data.Id === item.CardId);
          if (item.Id !== stateId) return undefined;
          return (
            <div key={i}>
              <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-0">
                <Typography
                  placeholder={""}
                  as="div"
                  className="text-center"
                  style={{ color: currentMode.modes === "Dark" ? "white" : "" }}
                >
                  Do you want to delete{" "}
                  <span className="font-semibold">ID: {card[0]?.CardNumber}</span>?
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

  return isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <Spinner color="blue" className="mx-auto h-12 w-12" />
    </div>
  ) : (
    <>
      <div className="hidden lg:block">
        <DataGrid>
          <DataGridHeader
            title={`${tableData?.tableNumber}`}
            subTitle={`${cardListRows?.length} cards.`}
            buttonBody={buttonBody}
          />
          <DataGridBody tableHead={CARD_TABLE_HEAD} body={body as JSX.Element[]} isLarge />
        </DataGrid>
      </div>
      <div className="lg:hidden">
        <DataGridHeader
          title={`Table ${tableData?.tableNumber}`}
          subTitle={`${cardListRows?.length} cards`}
          buttonBody={buttonBody}
        />
      </div>
      {cardListRows && cardListRows.length > 0 ? (
        cardListRows.map((items) => {
          var card = allCards?.filter((data) => data.Id === items.CardId);
          return (
            <Card
              name={items.TotalPrice}
              cardNumber={card[0].CardNumber}
              startTime={formatTime(items.StartTime)}
              id={items.Id}
              key={items.Id}
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
        handleClose={handleFetchCheckout}
      />
      <DialogDefault
        open={openChangeTable}
        handleOpen={handleClickChangeTable}
        body={dialogShowBodyChangeTable}
        header={dialogShowHeaderChangeTable}
        handleClose={handleFetchChangeTable}
      />
      <DialogDefault
        open={openDelete}
        handleOpen={handleClickDelete}
        body={dialogDeleteCardBody}
        header={dialogShowDeleteCard}
        handleClose={handleFetchDelete}
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
          <QRScanerGm
            handleScanQrcode={handleScanQrcode}
            tableId={id!}
            setOpenSuccess={setOpenSuccess}
            setOpenError={setOpenError}
          />
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
          <Button placeholder={""} variant="gradient" color="green" onClick={handleClickFetch}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {openSuccess ||
      openError ||
      openSuccessCheckout ||
      openErrorCheckout ||
      openSuccessChangeTable ||
      openErrorChangeTable ||
      openSuccessDelete ||
      openErrorDelete ? (
        <div className=" fixed top-0 inset-0 z-50 mx-auto h-24 flex items-center justify-center">
          <div>
            <AlertSuccess
              open={openSuccess}
              data="Add Card success."
              onClose={handleOpenAlertSuccess}
              type="success"
            />
            <AlertSuccess
              open={openError}
              data="Failed to add card."
              onClose={handleOpenAlertError}
              type="error"
            />
            <AlertSuccess
              open={openSuccessCheckout}
              data="Checkout success."
              onClose={handleOpenAlertSuccessCheckout}
              type="success"
            />
            <AlertSuccess
              open={openErrorCheckout}
              data="Failed to checkout."
              onClose={handleOpenAlertErrorCheckout}
              type="error"
            />
            <AlertSuccess
              open={openSuccessChangeTable}
              data="Change table success."
              onClose={handleOpenAlertSuccessChangeTable}
              type="success"
            />
            <AlertSuccess
              open={openErrorChangeTable}
              data="Failed to change table."
              onClose={handleOpenAlertErrorChangeTable}
              type="error"
            />
            <AlertSuccess
              open={openSuccessDelete}
              data="Delete card success."
              onClose={handleOpenAlertSuccessDelete}
              type="success"
            />
            <AlertSuccess
              open={openErrorDelete}
              data="Failed to delete card."
              onClose={handleOpenAlertErrorDelete}
              type="error"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
