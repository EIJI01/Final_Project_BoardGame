import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { UseUserContext } from "../../contexts/ContextProvider";
import { Role } from "../../models/value-type/enum-type";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { NotificationResponseHub } from "../../models/data/notification";
import Logo from "../../assets/logo.jpg";
import { formatDateTimes } from "../../utils/format";
import { TableResponseHub } from "../../models/data/table";
import { urlSignalR } from "../../utils/Url";

type NotificationProps = {
  handlerIsSuccess: () => void;
  handlerIsNotSuccess: () => void;
  AddTableId: (value: string) => void;
  AddNotificationId: (value: string) => void;
};

const Notifications = ({
  handlerIsSuccess,
  handlerIsNotSuccess,
  AddTableId,
  AddNotificationId,
}: NotificationProps) => {
  const [notifications, setNotifications] = useState<NotificationResponseHub[]>([]);
  const { setOpenNotification } = useStateDispatchContext();
  const { currentUser } = UseUserContext();
  const [allTable, setAllTable] = useState<TableResponseHub[]>([]);

  useEffect(() => {
    if (currentUser && currentUser?.role === Role.MEMBER) {
      const connection = new HubConnectionBuilder()
        .withUrl(`${urlSignalR}/notifications`)
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceivedNotifications", (notification) => {
        const jsonParse = JSON.parse(notification);
        const queueLstRowFilter = jsonParse.filter(
          (item: NotificationResponseHub) => item.UserId === currentUser.id
        );
        console.log(queueLstRowFilter);
        setNotifications(queueLstRowFilter);
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

  useEffect(() => {
    if (notifications) {
      const connection = new HubConnectionBuilder()
        .withUrl(`${urlSignalR}/database-tracking`)
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceivedTables", (tables) => {
        const jsonParse = JSON.parse(tables);
        setAllTable(jsonParse);
      });

      const invokeTables = () => {
        connection.invoke("SendTables").catch((err) => console.log(err));
      };
      const startConnection = async () => {
        try {
          await connection.start();
          console.log("Connection started Member Notification successfully!");
          invokeTables();
        } catch (error) {
          console.error("Error starting connection:", error);
          startConnection();
        }
      };
      startConnection();
    }
  }, [notifications]);

  useEffect(() => {
    const handleScroll = () => {
      setOpenNotification(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="nav-item fixed right-5 md:right-52 top-20 z-50 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 border-2 border-gray-400">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Notifications</p>
        </div>
        <Button
          placeholder={""}
          size="lg"
          className="rounded-full"
          style={{ backgroundColor: "lightgray" }}
          onClick={() => setOpenNotification(false)}
        >
          <MdOutlineCancel />
        </Button>
      </div>
      <div className="mt-5 max-h-[530px] h-[400px] overflow-y-scroll">
        {notifications
          .sort((a, b) => {
            const dateA = new Date(a.CreateAt) as any;
            const dateB = new Date(b.CreateAt) as any;
            return dateB - dateA;
          })
          .map((item, index) => {
            const data = allTable.filter((t) => t.Id === item.TableId)[0];
            return (
              <div
                key={index}
                onClick={() => {
                  if (item.Type === 1) {
                    if (item.NotificationStatus === 1) {
                      if (item.Id && item.TableId) {
                        AddNotificationId(item.Id);
                        AddTableId(item.TableId);
                      }
                      setOpenNotification(false);
                      handlerIsSuccess();
                    }
                  } else {
                    if (item.NotificationStatus === 1) {
                      setOpenNotification(false);
                      handlerIsNotSuccess();
                    }
                  }
                }}
                className={`flex items-center leading-8 gap-5 px-3 py-1 rounded-lg cursor-pointer transform mb-1 ${
                  item.NotificationStatus === 0 ? "" : "hover:!border-black"
                } border-2 transition duration-300`}
                style={{
                  backgroundColor:
                    item.Type === 0
                      ? item.NotificationStatus === 0
                        ? "#FFD6D7"
                        : "#FF7074"
                      : item.NotificationStatus === 0
                      ? "#cefad0"
                      : "#8bc34a",
                }}
              >
                <img src={Logo} alt="" className="rounded-full h-10 w-10" />
                <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                  <p className="font-semibold dark:text-gray-200 text-white text-ellipsis">
                    {data?.TableNumber ? (
                      `Success. You have received your queue. your table is ${data?.TableNumber}`
                    ) : (
                      <div>
                        Apologies. there are currently a lot of queues and customers playing may
                        take a longtime.
                      </div>
                    )}
                  </p>
                  <p
                    className="text-main-bure-text text-sm dark:text-gray-400"
                    style={{ textOverflow: "ellipsis" }}
                  >
                    <span className="text-black font-bold text-lg">Send: </span>
                    {formatDateTimes(item.CreateAt)}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notifications;
