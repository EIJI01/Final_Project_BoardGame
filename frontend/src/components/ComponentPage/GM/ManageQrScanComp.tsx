import { Button, Card, Spinner, Typography } from "@material-tailwind/react";
import DataGridHeader from "../../DataGrid/DataGridHeader";
import DataGridBody from "../../DataGrid/DataGridBody";
import { TABLE_HEAD_QUEUE } from "../../../data/data";
import IconTable from "../../../assets/table-nintendo/table.png";
import IconNintendo from "../../../assets/table-nintendo/nintendo-switch.png";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { useCallback, useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { QueueResponse } from "../../../models/data/queue";
import { getAllMember } from "../../../data/services/user-service/getAllUser";
import { User } from "../../../models/data/user";
import RedBell from "../../../assets/alarm.png";
import GreenBell from "../../../assets/bell.png";
import Cancel from "../../../assets/cross.png";
import DialogDefault from "../../Dialogs/DialogDefault";
import { TableResponseHub } from "../../../models/data/table";
import { sortQueue, sortTableHub } from "../../../utils/sort";
import { sendSuccess } from "../../../data/services/notification-service/send-success";
import { sendNotSuccess } from "../../../data/services/notification-service/send-notSuccess";
import AlertSuccess from "../../Alert/AlertSuccess";
import { updateQueueStatusCancel } from "../../../data/services/queue-service/update-queue";
import { UseUserContext } from "../../../contexts/ContextProvider";
import { Role } from "../../../models/value-type/enum-type";
import { NotificationResponseHub } from "../../../models/data/notification";
import { updateQueueSuccessComing } from "../../../data/services/queue-service/update-queueSuccess";
import { urlSignalR } from "../../../utils/Url";

export default function ManageQrScanComp() {
  const { currentColor } = useStateDispatchContext();
  const { currentUser } = UseUserContext();
  const [queues, setQueues] = useState<QueueResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allMember, setAllMember] = useState<User[]>([]);
  const [tables, setTable] = useState<TableResponseHub[]>([]);
  const [openGreenBell, setOpenGreenBell] = useState<boolean>(false);
  const [openRedBell, setOpenRedBell] = useState<boolean>(false);
  const [openCancel, setOpenCancel] = useState<boolean>(false);
  const [openGreenBellNintendo, setOpenGreenBellNintendo] = useState<boolean>(false);
  const [tableId, setTableId] = useState<string>("");
  const [value, setValue] = useState<QueueResponse>();
  const [openAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [openAlertNotSuccess, setOpenAlertNotSuccess] = useState<boolean>(false);
  const [openAlertDeleteSuccess, setOpenAlertDeleteSuccess] = useState<boolean>(false);
  const [openAlertDeleteNotSuccess, setOpenAlertDeleteNotSuccess] = useState<boolean>(false);
  const [notificationCheck, setNotificationCheck] = useState<NotificationResponseHub[]>([]);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const handlerAlertSuccess = () => setOpenAlertSuccess(!openAlertSuccess);
  const handlerAlertNotSuccess = () => setOpenAlertNotSuccess(!openAlertNotSuccess);
  const handlerAlertDeleteSuccess = () => setOpenAlertDeleteSuccess(!openAlertDeleteSuccess);
  const handlerAlertDeleteNotSuccess = () =>
    setOpenAlertDeleteNotSuccess(!openAlertDeleteNotSuccess);

  const handlerOpenGreenBell = () => setOpenGreenBell(!openGreenBell);
  const handlerOpenGreenBellNintendo = () => setOpenGreenBellNintendo(!openGreenBellNintendo);
  const handlerOpenRedBell = () => setOpenRedBell(!openRedBell);
  const handlerOpenCancel = () => setOpenCancel(!openCancel);

  useEffect(() => {
    if (currentUser && currentUser?.role === Role.GM) {
      const connection = new HubConnectionBuilder()
        .withUrl(`${urlSignalR}/notifications`)
        .configureLogging(LogLevel.Information)
        .build();
      connection.on("ReceivedNotifications", (notification) => {
        const jsonParse = JSON.parse(notification);
        setNotificationCheck(jsonParse);
      });

      const invokeNotifications = () => {
        connection.invoke("SendNotifications").catch((err) => console.log(err));
      };
      const startConnection = async () => {
        try {
          await connection.start();
          console.log("Connection started Member Notification successfully!");
          invokeNotifications();
        } catch (error) {
          console.error("Error starting connection:", error);
          startConnection();
        }
      };
      startConnection();
    }
  }, [currentUser]);

  const handlerClickGreenBell = useCallback(async () => {
    try {
      setIsLoadingButton(true);
      var result = await sendSuccess({ userId: value?.UserId as string, tableId: tableId });
      setOpenGreenBell(false);
      if (result) {
        setIsLoadingButton(false);
        setOpenAlertSuccess(true);
        setTimeout(() => {
          setOpenAlertSuccess(false);
        }, 2000);
      }
    } catch (err: any) {
      setOpenGreenBell(false);
      setIsLoadingButton(false);
      setOpenAlertNotSuccess(true);
      setTimeout(() => {
        setOpenAlertNotSuccess(false);
      }, 2000);
      console.log(err);
    }
  }, [value, tableId]);
  const handlerClickGreenBellNintendo = useCallback(async () => {
    try {
      setIsLoadingButton(true);
      var result = await sendSuccess({ userId: value?.UserId as string, tableId: tableId });
      setOpenGreenBellNintendo(false);
      if (result) {
        setOpenAlertSuccess(true);
        setIsLoadingButton(false);
        setTimeout(() => {
          setOpenAlertSuccess(false);
        }, 2000);
      }
    } catch (err: any) {
      setIsLoadingButton(false);
      setOpenGreenBellNintendo(false);
      setOpenAlertNotSuccess(true);
      setTimeout(() => {
        setOpenAlertNotSuccess(false);
      }, 2000);
      console.log(err);
    }
  }, [value, tableId]);
  const handlerClickRedBell = useCallback(async () => {
    try {
      setIsLoadingButton(true);
      var result = await sendNotSuccess({ userId: value?.UserId as string });
      setOpenRedBell(false);
      if (result) {
        setIsLoadingButton(false);
        setOpenAlertSuccess(true);
        setTimeout(() => {
          setOpenAlertSuccess(false);
        }, 2000);
      }
    } catch (err: any) {
      setIsLoadingButton(false);
      setOpenRedBell(false);
      setOpenAlertNotSuccess(true);
      setTimeout(() => {
        setOpenAlertNotSuccess(false);
      }, 2000);
      console.log(err);
    }
  }, [value]);
  const handlerClickCancel = useCallback(async () => {
    try {
      setIsLoadingButton(true);
      var result = await updateQueueStatusCancel({ queueId: value?.Id as string });
      setOpenCancel(false);
      console.log(result.message);
      if (result) {
        setIsLoadingButton(false);
        setOpenAlertDeleteSuccess(true);
        setTimeout(() => {
          setOpenAlertDeleteSuccess(false);
        }, 2000);
      }
    } catch (err: any) {
      setIsLoadingButton(false);
      setOpenCancel(false);
      setOpenAlertDeleteNotSuccess(true);
      setTimeout(() => {
        setOpenAlertDeleteNotSuccess(false);
      }, 2000);
    }
  }, [value]);

  const handlerClickSuccess = async (value: string) => {
    try {
      var result = await updateQueueSuccessComing({ queueId: value });
      if (result) {
        console.log(result.message);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const QUEUE_TABLE_ROWS = queues.filter((q) => q.TableType === 0);
  const QUEUE_NINTENDO_ROWS = queues.filter((q) => q.TableType === 1);

  const lenghtTable = QUEUE_TABLE_ROWS.length;
  const lengthNintendo = QUEUE_NINTENDO_ROWS.length;

  useEffect(() => {
    const branch = localStorage.getItem("branchId");
    const connection = new HubConnectionBuilder()
      .withUrl(`${urlSignalR}/database-tracking`)
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("ReceivedQueues", (queues) => {
      const jsonParse = JSON.parse(queues);
      const queueLstRowFilter = jsonParse.filter(
        (item: any) => item.BranchId === branch && item.Status !== 0
      );
      setQueues(queueLstRowFilter);
    });

    connection.on("ReceivedTables", (tableList) => {
      const jsonParse = JSON.parse(tableList);
      const tables = jsonParse.filter((item: TableResponseHub) => item.BranchId === branch);
      console.log("tables = ", tables);
      setTable(tables);
    });

    const InvokeScanSystems = () => {
      connection.invoke("SendQueues").catch((err) => console.log(err));
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
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const fetAllMember = async () => {
      try {
        var result = await getAllMember();
        setAllMember(result);
      } catch (err: any) {
        console.log(err);
      }
    };
    fetAllMember();
  }, [queues]);

  const headerGreenBell = <h6 className="font-extrabold">Select Table</h6>;
  const bodyGreenBell = (
    <div>
      <div className="grid grid-cols-4 gap-3">
        {sortTableHub(tables).map((data) => {
          return data.TableNumber === "Nintendo" ? (
            ""
          ) : data.Status === 0 ? (
            <Button
              placeholder={""}
              variant="outlined"
              color="purple"
              key={data.Id}
              onClick={() => setTableId(data.Id)}
            >
              {data.TableNumber}
            </Button>
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
  const bodyGreenBellNintendo = (
    <div>
      <div className="flex justify-center items-center">
        {sortTableHub(tables).map((data) => {
          return data.TableNumber !== "Nintendo" ? (
            ""
          ) : data.Status === 0 ? (
            <Button
              placeholder={""}
              variant="outlined"
              color="purple"
              key={data.Id}
              onClick={() => setTableId(data.Id)}
            >
              {data.TableNumber}
            </Button>
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
  const bodyRedBell = (
    <div>
      <div className="text-3xl font-extrabold text-center">
        Do you want to send notification failed?
      </div>
      <img src={RedBell} alt="redBell" className="w-20 h-20 mx-auto" />
    </div>
  );
  const bodyCancel = (
    <div>
      <div className="text-3xl font-extrabold text-center">Do you want to delete this?</div>
      <img src={Cancel} alt="redBell" className="w-20 h-20 mx-auto" />
    </div>
  );

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
  const bodyTable = sortQueue(QUEUE_TABLE_ROWS).map((items: QueueResponse, index) => {
    const members = allMember.filter((m) => m.id === items.UserId);
    const checkSend = notificationCheck.filter(
      (n) => n.UserId === items.UserId && n.NotificationStatus === 1 && n.Type === 1
    )[0];
    const checkSendApologies = notificationCheck.filter(
      (n) => n.UserId === items.UserId && n.NotificationStatus === 1 && n.Type === 0
    )[0];
    console.log("checkSend = ", checkSend);
    const table = tables.filter((t) => t.Id === items.TableId)[0];
    const member = members[0];
    const isLast = index === QUEUE_TABLE_ROWS.length - 1;
    const classes = isLast
      ? "p-4 border-b dark:border-gray-800"
      : "p-4 border-b border-blue-gray-50 dark:border-gray-800";
    return (
      <tr
        key={index}
        className="hover:bg-blue-gray-50 cursor-pointer hover:dark:bg-main-dark-bg/90"
      >
        <td className={`${classes}`}>
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <Typography
                placeholder=""
                variant="small"
                color="blue-gray"
                className="font-normal dark:text-main-dark-text"
              >
                {items.QueueNumber}
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
                {member?.name}
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
            {items.NumberOfPeople}
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            placeholder=""
            variant="small"
            color="blue-gray"
            className="font-normal dark:text-main-dark-text"
          >
            {table ? table?.TableNumber : "---"}
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            placeholder=""
            variant="small"
            color="blue-gray"
            className={`dark:text-main-dark-text text-lg font-semibold ${
              items.Status === 1 ? "text-green-600" : "text-orange-400"
            }`}
          >
            {items.Status === 1 ? "Queue" : "Coming"}
          </Typography>
        </td>
        <td className={`${classes} flex items-center gap-1`}>
          {items.Status === 2 ? (
            <Button
              size="sm"
              placeholder=""
              variant="gradient"
              color="green"
              className="font-normal dark:text-main-dark-text transform hover:scale-90 duration-200"
              onClick={() => {
                handlerClickSuccess(items.Id);
              }}
            >
              success
            </Button>
          ) : (
            <>
              <Button
                disabled={(items.Status === 2 ? true : false) || checkSend ? true : false}
                size="sm"
                placeholder=""
                variant="outlined"
                color="green"
                className="font-normal dark:text-main-dark-text transform hover:scale-90 duration-200"
                onClick={() => {
                  handlerOpenGreenBell();
                  setValue(items);
                }}
              >
                <img src={GreenBell} alt="greenBell" className="w-5 h-5" />
              </Button>
              <Button
                disabled={
                  (items.Status === 2 ? true : false) || checkSend
                    ? true
                    : false || checkSendApologies
                    ? true
                    : false
                }
                size="sm"
                placeholder=""
                variant="outlined"
                color="red"
                className="font-normal dark:text-main-dark-text transform hover:scale-90 duration-200"
                onClick={() => {
                  handlerOpenRedBell();
                  setValue(items);
                }}
              >
                <img src={RedBell} alt="redBell" className="w-5 h-5" />
              </Button>
            </>
          )}
          <Button
            size="sm"
            placeholder=""
            variant="outlined"
            color="blue-gray"
            className="font-normal dark:text-main-dark-text transform hover:scale-90 duration-200"
            onClick={() => {
              handlerOpenCancel();
              setValue(items);
            }}
          >
            <img src={Cancel} alt="cancel" className="w-5 h-5" />
          </Button>
        </td>
      </tr>
    );
  });

  const bodyNintendo = sortQueue(QUEUE_NINTENDO_ROWS).map((items: QueueResponse, index) => {
    const members = allMember.filter((m) => m.id === items.UserId);
    const checkSend = notificationCheck.filter(
      (n) => n.UserId === items.UserId && n.NotificationStatus === 1 && n.Type === 1
    )[0];
    const checkSendApologies = notificationCheck.filter(
      (n) => n.UserId === items.UserId && n.NotificationStatus === 1 && n.Type === 0
    )[0];
    const table = tables.filter((t) => t.Id === items.TableId)[0];
    const member = members[0];
    const isLast = index === QUEUE_NINTENDO_ROWS.length - 1;
    const classes = isLast
      ? "p-4 border-b dark:border-gray-800"
      : "p-4 border-b border-blue-gray-50 dark:border-gray-800";
    return (
      <tr
        key={index}
        className="hover:bg-blue-gray-50 cursor-pointer hover:dark:bg-main-dark-bg/90"
      >
        <td className={`${classes}`}>
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <Typography
                placeholder=""
                variant="small"
                color="blue-gray"
                className="font-normal dark:text-main-dark-text"
              >
                {items.QueueNumber}
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
                {member?.name}
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
            {items.NumberOfPeople}
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            placeholder=""
            variant="small"
            color="blue-gray"
            className="font-normal dark:text-main-dark-text"
          >
            {table ? table?.TableNumber : "---"}
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            placeholder=""
            variant="small"
            color="blue-gray"
            className={`dark:text-main-dark-text text-lg font-semibold ${
              items.Status === 1 ? "text-green-600" : "text-orange-400"
            }`}
          >
            {items.Status === 1 ? "Queue" : "Coming"}
          </Typography>
        </td>
        <td className={`${classes} flex items-center gap-1`}>
          {items.Status === 2 ? (
            <Button
              size="sm"
              placeholder=""
              variant="gradient"
              color="green"
              onClick={() => {
                handlerClickSuccess(items.Id);
              }}
              className="font-normal dark:text-main-dark-text transform hover:scale-90 duration-200"
            >
              success
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                disabled={(items.Status === 2 ? true : false) || checkSend ? true : false}
                placeholder=""
                variant="outlined"
                color="green"
                onClick={() => {
                  handlerOpenGreenBellNintendo();
                  setValue(items);
                }}
                className="font-normal dark:text-main-dark-text transform hover:scale-90 duration-200"
              >
                <img src={GreenBell} alt="greenBell" className="w-5 h-5" />
              </Button>
              <Button
                size="sm"
                placeholder=""
                disabled={
                  (items.Status === 2 ? true : false) || checkSend
                    ? true
                    : false || checkSendApologies
                    ? true
                    : false
                }
                variant="outlined"
                color="red"
                onClick={() => {
                  handlerOpenRedBell();
                  setValue(items);
                }}
                className="font-normal dark:text-main-dark-text transform hover:scale-90 duration-200"
              >
                <img src={RedBell} alt="redBell" className="w-5 h-5" />
              </Button>
            </>
          )}
          <Button
            size="sm"
            placeholder=""
            variant="outlined"
            color="blue-gray"
            onClick={() => {
              handlerOpenCancel();
              setValue(items);
            }}
            className="font-normal dark:text-main-dark-text transform hover:scale-90 duration-200"
          >
            <img src={Cancel} alt="cancel" className="w-5 h-5" />
          </Button>
        </td>
      </tr>
    );
  });

  return isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <Spinner color="blue" className="mx-auto h-12 w-12" />
    </div>
  ) : (
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
          {sortQueue(QUEUE_TABLE_ROWS).map((item: QueueResponse, i) => {
            const members = allMember.filter((m) => m.id === item.UserId);
            const checkSend = notificationCheck.filter(
              (n) => n.UserId === item.UserId && n.NotificationStatus === 1 && n.Type === 1
            )[0];
            const checkSendApologies = notificationCheck.filter(
              (n) => n.UserId === item.UserId && n.NotificationStatus === 1 && n.Type === 0
            )[0];
            const table = tables.filter((t) => t.Id === item.TableId)[0];
            const member = members[0];
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
                        <div className="flex items-center gap-4">
                          <Typography
                            placeholder={""}
                            className="dark:text-main-dark-text text-xl font-bold"
                          >
                            {item.QueueNumber}
                          </Typography>
                          <Typography
                            placeholder={""}
                            className="dark:text-main-dark-text text-xl font-bold"
                          >
                            {table ? table.TableNumber : "---"}
                          </Typography>
                          <Typography
                            placeholder=""
                            variant="small"
                            color="blue-gray"
                            className={`dark:text-main-dark-text text-lg font-semibold ${
                              item.Status === 1 ? "text-green-600" : "text-orange-400"
                            }`}
                          >
                            {item.Status === 1 ? "Queue" : "Coming"}
                          </Typography>
                        </div>
                        <Typography
                          placeholder={""}
                          className="font-semibold text-main-bure-text dark:text-main-dark-text"
                          style={{ color: currentColor }}
                        >
                          {member?.name}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex items-end gap-2">
                        <Typography placeholder={""} className="dark:text-main-dark-text">
                          {item.NumberOfPeople} people
                        </Typography>
                      </div>
                      <div className="flex items-end justify-end gap-1">
                        {item.Status === 2 ? (
                          <Button
                            size="sm"
                            placeholder=""
                            variant="gradient"
                            color="green"
                            onClick={() => {
                              handlerClickSuccess(item.Id);
                            }}
                            className="font-normal dark:text-main-dark-text "
                          >
                            success
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              placeholder=""
                              disabled={
                                (item.Status === 2 ? true : false) || checkSend ? true : false
                              }
                              variant="outlined"
                              color="green"
                              onClick={() => {
                                handlerOpenGreenBell();
                                setValue(item);
                              }}
                              className="font-normal dark:text-main-dark-text "
                            >
                              <img src={GreenBell} alt="greenBell" className="w-5 h-5" />
                            </Button>
                            <Button
                              size="sm"
                              placeholder=""
                              variant="outlined"
                              disabled={
                                (item.Status === 2 ? true : false) || checkSend
                                  ? true
                                  : false || checkSendApologies
                                  ? true
                                  : false
                              }
                              color="red"
                              onClick={() => {
                                handlerOpenRedBell();
                                setValue(item);
                              }}
                              className="font-normal dark:text-main-dark-text "
                            >
                              <img src={RedBell} alt="redBell" className="w-5 h-5" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          placeholder=""
                          variant="outlined"
                          color="blue-gray"
                          onClick={() => {
                            handlerOpenCancel();
                            setValue(item);
                          }}
                          className="font-normal dark:text-main-dark-text "
                        >
                          <img src={Cancel} alt="cancel" className="w-5 h-5" />
                        </Button>
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
          {sortQueue(QUEUE_NINTENDO_ROWS).map((item: QueueResponse, i) => {
            const members = allMember.filter((m) => m.id === item.UserId);
            const member = members[0];
            const checkSend = notificationCheck.filter(
              (n) => n.UserId === item.UserId && n.NotificationStatus === 1 && n.Type === 1
            )[0];
            const checkSendApologies = notificationCheck.filter(
              (n) => n.UserId === item.UserId && n.NotificationStatus === 1 && n.Type === 0
            )[0];
            const table = tables.filter((t) => t.Id === item.TableId)[0];
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
                        <div className="flex items-center gap-4">
                          <Typography
                            placeholder={""}
                            className="dark:text-main-dark-text text-xl font-bold"
                          >
                            {item.QueueNumber}
                          </Typography>
                          <Typography
                            placeholder={""}
                            className="dark:text-main-dark-text text-xl font-bold"
                          >
                            {table ? table.TableNumber : "---"}
                          </Typography>
                          <Typography
                            placeholder=""
                            variant="small"
                            color="blue-gray"
                            className={`dark:text-main-dark-text text-lg font-semibold ${
                              item.Status === 1 ? "text-green-600" : "text-orange-400"
                            }`}
                          >
                            {item.Status === 1 ? "Queue" : "Coming"}
                          </Typography>
                        </div>
                        <Typography
                          placeholder={""}
                          className="font-semibold text-main-bure-text dark:text-main-dark-text"
                          style={{ color: currentColor }}
                        >
                          {member?.name}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="flex items-end gap-2">
                        <Typography placeholder={""} className="dark:text-main-dark-text">
                          {item.NumberOfPeople} people
                        </Typography>
                      </div>
                      <div className="flex items-end justify-end gap-1">
                        {item.Status === 2 ? (
                          <Button
                            size="sm"
                            placeholder=""
                            variant="gradient"
                            color="green"
                            onClick={() => {
                              handlerClickSuccess(item.Id);
                            }}
                            className="font-normal dark:text-main-dark-text "
                          >
                            success
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              placeholder=""
                              disabled={
                                (item.Status === 2 ? true : false) || checkSend ? true : false
                              }
                              variant="outlined"
                              color="green"
                              onClick={() => {
                                handlerOpenGreenBellNintendo();
                                setValue(item);
                              }}
                              className="font-normal dark:text-main-dark-text "
                            >
                              <img src={GreenBell} alt="greenBell" className="w-5 h-5" />
                            </Button>
                            <Button
                              size="sm"
                              placeholder=""
                              disabled={
                                (item.Status === 2 ? true : false) || checkSend
                                  ? true
                                  : false || checkSendApologies
                                  ? true
                                  : false
                              }
                              variant="outlined"
                              color="red"
                              onClick={() => {
                                handlerOpenRedBell();
                                setValue(item);
                              }}
                              className="font-normal dark:text-main-dark-text "
                            >
                              <img src={RedBell} alt="redBell" className="w-5 h-5" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          placeholder=""
                          variant="outlined"
                          color="blue-gray"
                          onClick={() => {
                            handlerOpenCancel();
                            setValue(item);
                          }}
                          className="font-normal dark:text-main-dark-text "
                        >
                          <img src={Cancel} alt="cancel" className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <DialogDefault
        isLoadingButton={isLoadingButton}
        open={openGreenBell}
        handleOpen={handlerOpenGreenBell}
        handleClose={handlerClickGreenBell}
        body={bodyGreenBell}
        header={headerGreenBell}
      />
      <DialogDefault
        isLoadingButton={isLoadingButton}
        open={openGreenBellNintendo}
        handleOpen={handlerOpenGreenBellNintendo}
        handleClose={handlerClickGreenBellNintendo}
        body={bodyGreenBellNintendo}
        header={headerGreenBell}
      />
      <DialogDefault
        isLoadingButton={isLoadingButton}
        open={openRedBell}
        handleOpen={handlerOpenRedBell}
        handleClose={handlerClickRedBell}
        body={bodyRedBell}
      />
      <DialogDefault
        isLoadingButton={isLoadingButton}
        open={openCancel}
        handleOpen={handlerOpenCancel}
        handleClose={handlerClickCancel}
        body={bodyCancel}
      />
      {openAlertSuccess ||
      openAlertNotSuccess ||
      openAlertDeleteSuccess ||
      openAlertDeleteNotSuccess ? (
        <div className=" fixed top-0 inset-0 z-50 mx-auto h-24 flex items-center justify-center">
          <div>
            <AlertSuccess
              open={openAlertSuccess}
              data="Send notification success."
              onClose={handlerAlertSuccess}
              type="success"
            />
            <AlertSuccess
              open={openAlertNotSuccess}
              data="Failed to send notification."
              onClose={handlerAlertNotSuccess}
              type="error"
            />
            <AlertSuccess
              open={openAlertDeleteSuccess}
              data="Delete queue success."
              onClose={handlerAlertDeleteSuccess}
              type="success"
            />
            <AlertSuccess
              open={openAlertDeleteNotSuccess}
              data="Failed to delete queue."
              onClose={handlerAlertDeleteNotSuccess}
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
