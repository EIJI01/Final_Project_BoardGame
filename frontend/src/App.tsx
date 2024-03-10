import { Outlet, useNavigate } from "react-router-dom";
import LayoutPage from "./components/Layouts/LayoutPage";
import { useStateDispatchContext } from "./hooks/useStateDispatchHook";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { UseUserContext } from "./contexts/ContextProvider";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Role } from "./models/value-type/enum-type";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import IMGSUCCESS from "../src/assets/product/product-lauch.png";
import IMGNOTSUCESS from "../src/assets/product/sorry.png";
import { getTableById } from "./data/services/table-service/getTableById";
import { TableResponse } from "./models/data/table";
import Notifications from "./components/Notification/Notification";
import { updateQueueOkSuccessStatusComing } from "./data/services/queue-service/update-queueOkSuccess";
import {
  updateQueueCancel,
  updateQueueNotSuccessOk,
} from "./data/services/queue-service/update-queueCancel";
import { NotificationResponseHub } from "./models/data/notification";
import { urlSignalR } from "./utils/Url";

export default function App() {
  const { currentMode, currentColor, openNotification } = useStateDispatchContext();
  const { currentUser } = UseUserContext();
  const [isDialogSuccess, setIsDialogSuccess] = useState<boolean>(false);
  const [isDialogNptSuccess, setIsDialogNotSuccess] = useState<boolean>(false);
  const [tableId, setTableId] = useState<string>("");
  const [table, setTable] = useState<TableResponse>();
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const [isLoadingButtonCancel, setIsLoadingButtonCancel] = useState<boolean>(false);
  const [notificationId, setNotificationId] = useState<string>("");
  const navigate = useNavigate();

  const handlerIsSuccess = () => setIsDialogSuccess(!isDialogSuccess);
  const handlerIsNotSuccess = () => setIsDialogNotSuccess(!isDialogNptSuccess);

  const AddTableId = useCallback(
    (value: string) => {
      setTableId(value);
    },
    [tableId]
  );

  const AddNotificationId = useCallback(
    (value: string) => {
      setNotificationId(value);
    },
    [tableId]
  );

  const handlerClickSuccessOk = async () => {
    if (notificationId) {
      try {
        setIsLoadingButton(true);
        var result = await updateQueueOkSuccessStatusComing({
          tableId: tableId,
          notificationId: notificationId,
        });
        if (result) {
          setTimeout(() => {
            setIsLoadingButton(false);
            setIsDialogSuccess(false);
            navigate(`/member/booking-queue/queue/table/${tableId}`);
          }, 2000);
        }
      } catch (err: any) {
        setIsLoadingButton(false);
        setIsDialogSuccess(false);
        console.log(err);
      }
    }
  };

  const handlerClickSuccessNotOk = async () => {
    try {
      setIsLoadingButtonCancel(true);
      var result = await updateQueueCancel();
      if (result) {
        setTimeout(() => {
          setIsLoadingButtonCancel(false);
          setIsDialogSuccess(false);
          window.location.reload();
        }, 1000);
      }
    } catch (err: any) {
      setIsLoadingButtonCancel(false);
      setIsDialogSuccess(false);
      console.log(err);
    }
  };

  const handlerClickNotSuccessNotOk = async () => {
    try {
      setIsLoadingButtonCancel(true);
      var result = await updateQueueCancel();
      if (result) {
        setTimeout(() => {
          setIsLoadingButtonCancel(false);
          setIsDialogNotSuccess(false);
          window.location.reload();
        }, 1000);
      }
    } catch (err: any) {
      setIsLoadingButtonCancel(false);
      setIsDialogNotSuccess(false);
      console.log(err);
    }
  };

  const handlerClickNotSuccessOk = async () => {
    try {
      setIsLoadingButton(true);
      var result = await updateQueueNotSuccessOk();
      if (result) {
        setTimeout(() => {
          setIsLoadingButton(false);
          setIsDialogNotSuccess(false);
        }, 1000);
      }
    } catch (err: any) {
      setIsLoadingButton(false);
      setIsDialogNotSuccess(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentMode.modes === "Dark") {
      document.documentElement.style.setProperty("--body-color", "#263238");
    } else {
      document.documentElement.style.setProperty("--body-color", "#ffff");
    }
  }, [currentMode]);

  useEffect(() => {
    if (currentUser && currentUser?.role === Role.MEMBER) {
      const connection = new HubConnectionBuilder()
        .withUrl(`${urlSignalR}/notifications`)
        .configureLogging(LogLevel.Information)
        .build();

      const OnConnected = () => {
        connection.invoke("SaveUserConnection", currentUser.id);
      };
      connection.on("OnConnected", () => {
        OnConnected();
      });

      connection.on("ReceivedPersonalNotification", (notification) => {
        const jsonParse: NotificationResponseHub = JSON.parse(notification);
        console.log("notification.Id = ", notification.Id);
        console.log("jsonParse.Id = ", jsonParse.Id);
        setNotificationId(jsonParse.Id);
        if (jsonParse.Type === 1 && jsonParse.TableId !== null) {
          setIsDialogSuccess(true);
          setTableId(jsonParse.TableId);
        } else {
          setIsDialogNotSuccess(true);
        }
      });

      const startConnection = async () => {
        try {
          await connection.start();
          console.log("Connection started Member Notification successfully!");
        } catch (error) {
          console.error("Error starting connection:", error);
          startConnection();
        }
      };
      startConnection();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchTable = async () => {
      var result = await getTableById(tableId);
      setTable(result);
    };
    fetchTable();
  }, [tableId]);

  return (
    <div className={`${currentMode.modes === "Dark" && "dark"} scroll`}>
      {openNotification && (
        <Notifications
          handlerIsSuccess={handlerIsSuccess}
          handlerIsNotSuccess={handlerIsNotSuccess}
          AddTableId={AddTableId}
          AddNotificationId={AddNotificationId}
        />
      )}
      <LayoutPage>
        <Outlet />
      </LayoutPage>
      <Dialog
        placeholder={""}
        open={isDialogSuccess}
        handler={handlerIsSuccess}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="sm"
      >
        <DialogHeader placeholder={""} style={{ color: currentColor }}>
          Success
        </DialogHeader>
        <DialogBody
          placeholder={""}
          className="p-2 py-16"
          style={{ backgroundColor: currentColor }}
        >
          <div className=" h-[100%] w-full grid grid-cols-2 text-main-bure-text">
            <img src={IMGSUCCESS} alt="success" className=" mx-auto w-40 h-40 animate-bounce" />
            <div className="flex flex-col justify-start items-start">
              <div className="font-semibold text-xl text-center">You have received your queue.</div>
              <div className="font-semibold text-xl text-center w-full">Your Table Is</div>
              <div className="font-extrabold text-2xl text-center w-full mt-5 text-main-dark-text">
                {table?.tableNumber}
              </div>
            </div>
          </div>
          <div className="text-center text-black px-5 py-2 mx-4 bg-gray-300 rounded-lg mt-6">
            If you want to play, please confirm within 5 minutes and arrive at the store within 20
            minutes after confirmation.
          </div>
        </DialogBody>
        <DialogFooter placeholder={""}>
          <Button
            placeholder={""}
            variant="text"
            color="red"
            onClick={handlerClickSuccessNotOk}
            className="mr-1"
          >
            <span>
              {isLoadingButtonCancel ? <Spinner color="blue" className="mx-auto" /> : "Cancel"}
            </span>
          </Button>
          <Button placeholder={""} variant="gradient" color="green" onClick={handlerClickSuccessOk}>
            <span>
              {isLoadingButton ? <Spinner color="blue" className="mx-auto" /> : "Confirm"}
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog
        placeholder={""}
        open={isDialogNptSuccess}
        handler={handlerIsNotSuccess}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="sm"
      >
        <DialogHeader placeholder={""} className="text-red-400">
          Apologies
        </DialogHeader>
        <DialogBody placeholder={""} className="p-2 py-16 h-full bg-red-300">
          <div className=" h-[100%] w-full grid grid-cols-2">
            <div className="h-full mx-auto">
              <img src={IMGNOTSUCESS} alt="success" className=" w-40 h-40 animate-bounce" />
            </div>
            <div className="flex flex-col justify-start items-start text-main-dark-text">
              <div className="font-semibold text-xl text-center">
                Because there are currently a lot of queues and customers playing may take a long
                time.{" "}
              </div>
            </div>
          </div>
          <div className="font-semibold text-2xl text-center w-full text-black">
            Do you want to keep waiting?
          </div>
        </DialogBody>
        <DialogFooter placeholder={""}>
          <Button
            placeholder={""}
            variant="text"
            color="red"
            onClick={handlerClickNotSuccessNotOk}
            className="mr-1"
          >
            <span>
              {isLoadingButtonCancel ? <Spinner color="blue" className="mx-auto" /> : "Cancel"}
            </span>
          </Button>
          <Button
            placeholder={""}
            variant="gradient"
            color="green"
            onClick={handlerClickNotSuccessOk}
          >
            <span>
              {isLoadingButton ? <Spinner color="blue" className="mx-auto" /> : "Confirm"}
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
