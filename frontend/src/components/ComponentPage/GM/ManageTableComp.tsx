import { useCallback, useEffect, useState } from "react";
import Table from "../../Table/Table";
import { useNavigate } from "react-router-dom";
import { getAllTable } from "../../../data/services/table-service/getAllTable";
import { TableResponse, TableType } from "../../../models/data/table";
import { ScanSystemResponse } from "../../../models/data/scanSystem";
import { Spinner } from "@material-tailwind/react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { sortTable } from "../../../utils/sort";

type Props = {};

export default function ManageTableComp({}: Props): JSX.Element {
  const navigate = useNavigate();
  const [data, setData] = useState<TableResponse[] | null>(null);
  const [scanSystemData, setScanSystemData] = useState<ScanSystemResponse[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const branchId = localStorage.getItem("branchId");
    const taleRequest = async () => {
      try {
        var result = await getAllTable(branchId!);
        setData(result);
      } catch (err: any) {
        console.log(err);
      }
    };
    const connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7124/database-tracking`)
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("ReceivedScanSystems", (scanSystem) => {
      const jsonParse = JSON.parse(scanSystem);
      setScanSystemData(jsonParse);
    });

    const InvokeScanSystems = () => {
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
    taleRequest();
    setInterval(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleClick = useCallback(
    (number: string) => {
      navigate(number);
    },
    [navigate]
  );
  return isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <Spinner color="blue" className="mx-auto h-12 w-12" />
    </div>
  ) : (
    <div className=" mt-2 lg:mt-8 lg:pb-8">
      <div className=" grid grid-cols-3 lg:gap-5">
        {sortTable(data!).map((item, i) => {
          return (
            item.type === TableType.TABLE && (
              <Table
                key={i}
                numberOfTable={item.tableNumber}
                tableId={item.id}
                onClick={() => handleClick(item.id.toString())}
                scanSystemData={scanSystemData!}
              />
            )
          );
        })}
        <div>
          {data?.map((item) => {
            return (
              item.type === TableType.NINTENDO && (
                <Table
                  key={item.id}
                  numberOfTable={item.tableNumber}
                  tableId={item.id}
                  onClick={() => handleClick(item.id.toString())}
                  scanSystemData={scanSystemData!}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}
