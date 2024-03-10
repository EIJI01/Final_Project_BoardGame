import { Card, CardBody, Typography, Input, CardFooter, Spinner } from "@material-tailwind/react";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { ButtonCustom } from "../..";
import { useEffect, useState } from "react";
import { getQueueInformation } from "../../../data/services/queue-service/get-queue.information";
import { QueueResponse, QueueResponseLower } from "../../../models/data/queue";
import { getAllBranchId } from "../../../data/services/branch-service/getAllIdbranch";
import { BranchAllIdResponse } from "../../../models/data/branch";
import { useNavigate } from "react-router-dom";
import { updateQueueUserStatusCancel } from "../../../data/services/queue-service/update-queue";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { sortQueue } from "../../../utils/sort";
import { TableType } from "../../../models/data/table";
import { urlSignalR } from "../../../utils/Url";

export default function QueueId() {
  const { currentColor } = useStateDispatchContext();
  const [isQueueExist, setIsQueueExist] = useState<QueueResponseLower>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allBranch, setAllBranch] = useState<BranchAllIdResponse[]>([]);
  const [branch, setBranch] = useState<any>({});
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const [queues, setQueues] = useState<QueueResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isQueueExist && isQueueExist.status === 2) {
      navigate(`/member/booking-queue/queue/table/${isQueueExist.tableId}`);
    }
  }, [isQueueExist]);

  useEffect(() => {
    const branches = allBranch?.filter((data) => data.id === isQueueExist?.branchId);
    const branch = branches[0];
    setBranch(branch);
  }, [isQueueExist]);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${urlSignalR}/database-tracking`)
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("ReceivedQueues", (queues) => {
      const jsonParse = JSON.parse(queues);

      setQueues(jsonParse);
    });

    const InvokeScanSystems = () => {
      connection.invoke("SendQueues").catch((err) => console.log(err));
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
    const fetchQueue = async () => {
      try {
        var result = await getQueueInformation();
        setIsQueueExist(result);
      } catch (err: any) {
        navigate(-1);
        console.log(err);
      }
    };
    const fetchBranch = async () => {
      var result = await getAllBranchId();
      setAllBranch(result);
    };
    fetchBranch();
    startConnection();
    fetchQueue();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handlerClickCancel = async () => {
    try {
      if (isQueueExist) {
        setIsLoadingButton(true);
        var result = await updateQueueUserStatusCancel({ queueId: isQueueExist?.id });
        if (result) {
          setTimeout(() => {
            setIsLoadingButton(false);
            navigate(-1);
          }, 2000);
        }
      }
    } catch (err: any) {
      setIsLoadingButton(false);
      console.log(err);
    }
  };

  const sortTable = () => {
    const tableQueue = queues.filter(
      (q) => q.TableType === TableType.TABLE && q.BranchId === branch.id && q.Status === 1
    );
    const nintendoQueue = queues.filter(
      (q) => q.TableType === TableType.NINTENDO && q.BranchId === branch.id && q.Status === 1
    );
    if (isQueueExist?.tableType === TableType.TABLE) {
      return sortQueue(tableQueue);
    } else {
      return sortQueue(nintendoQueue);
    }
  };

  return isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <Spinner color="blue" className="mx-auto h-12 w-12" />
    </div>
  ) : (
    <div className="pt-4 lg:px-52">
      <div className="absolute flex">
        <div
          className=" py-3 rounded-lg px-5 flex items-center"
          style={{ backgroundColor: currentColor }}
        >
          <span className="lg:text-xl font-extrabold text-white">Latest Queue</span>
        </div>
        <span className="flex items-center text-3xl font-extrabold mx-2">{"=>"}</span>
        <div className=" py-3 rounded-lg flex items-center">
          <span className="lg:text-3xl font-extrabold">{sortTable()[0]?.QueueNumber}</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-full">
          <Card
            placeholder={""}
            className="w-full lg:h-[500px] shadow-none dark:lg:bg-[#1d1d1d] bg-inherit mt-16"
          >
            <CardBody placeholder={""} className="text-center p-0 mt-10">
              <div className="w-full lg:px-32 px-4">
                <form className="mt-8 mb-2  max-w-80 sm:w-full">
                  <div className="lg:grid grid-flow-col gap-6">
                    <div className="mb-4 lg:mb-1 flex flex-col lg:gap-6 gap-4 justify-between items-center">
                      <Typography
                        placeholder={""}
                        variant="h6"
                        color="blue-gray"
                        className=" dark:text-main-dark-text lg:text-center text-start"
                      >
                        Your queue is
                      </Typography>
                      <Typography
                        placeholder={""}
                        variant="h6"
                        color="blue-gray"
                        className="text-[10rem] leading-none"
                        style={{ color: currentColor }}
                      >
                        {isQueueExist?.queueNumber}
                      </Typography>

                      <Typography
                        placeholder={""}
                        variant="h6"
                        color="blue-gray"
                        className=" dark:text-main-dark-text lg:text-center text-end"
                      >
                        ... Plese waiting for your queue
                      </Typography>
                    </div>
                    <div className="lg:mb-1 flex flex-col lg:gap-6 gap-4">
                      <div>
                        <Typography
                          placeholder={""}
                          variant="h6"
                          color="blue-gray"
                          className=" dark:text-main-dark-text text-left"
                        >
                          Number of people
                        </Typography>
                        <Input
                          crossOrigin={""}
                          size="lg"
                          disabled
                          className=" cursor-not-allowed"
                          defaultValue={isQueueExist?.numberOfPeople}
                        />
                      </div>
                      <div>
                        <Typography
                          placeholder={""}
                          variant="h6"
                          color="blue-gray"
                          className=" dark:text-main-dark-text text-left"
                        >
                          Table type
                        </Typography>
                        <Input
                          crossOrigin={""}
                          size="lg"
                          disabled
                          className=" cursor-not-allowed"
                          defaultValue={isQueueExist?.tableType === 0 ? "Table" : "Nintendo"}
                        />
                      </div>
                      <div>
                        <Typography
                          placeholder={""}
                          variant="h6"
                          color="blue-gray"
                          className=" dark:text-main-dark-text text-left"
                        >
                          Branch
                        </Typography>
                        <Input
                          crossOrigin={""}
                          disabled
                          size="lg"
                          name="telephone"
                          defaultValue={branch?.branchName}
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 cursor-not-allowed"
                          labelProps={{
                            className: "before:content-none after:content-none pl-3",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </CardBody>
            <CardFooter
              placeholder={""}
              className="flex items-center lg:justify-end justify-center gap-2"
            >
              <ButtonCustom
                className=" dark:text-main-dark-text mt-5"
                variant="gradient"
                size="md"
                color="red"
                onClick={handlerClickCancel}
              >
                {isLoadingButton ? <Spinner color="blue" className="mx-auto" /> : "Cancel"}
              </ButtonCustom>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
