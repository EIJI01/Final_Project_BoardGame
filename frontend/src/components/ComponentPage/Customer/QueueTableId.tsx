import { useNavigate, useParams } from "react-router-dom";
import SuccessImage from "../../../assets/product/product-lauch.png";
import { useEffect, useState } from "react";
import { TableResponse } from "../../../models/data/table";
import { getTableById } from "../../../data/services/table-service/getTableById";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";
import { Spinner } from "@material-tailwind/react";
import { getQueueInformation } from "../../../data/services/queue-service/get-queue.information";
import { QueueResponseLower } from "../../../models/data/queue";

export default function QueueTableId() {
  const { id } = useParams();
  const [table, setTable] = useState<TableResponse>();
  const { currentColor } = useStateDispatchContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isQueueExist, setIsQueueExist] = useState<QueueResponseLower>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTable = async () => {
        try {
          var result = await getTableById(id);
          if (result) {
            setTable(result);
          }
        } catch (err: any) {
          console.log(err);
        }
      };
      fetchTable();
    }
  }, [id]);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        var result = await getQueueInformation();
        setIsQueueExist(result);
      } catch (err: any) {
        navigate(-1);
        console.log(err);
      }
    };
    fetchQueue();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <Spinner color="blue" className="mx-auto h-12 w-12" />
    </div>
  ) : (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <div>
        <div className="mx-auto text-center mt-10 text-xl lg:text-3xl font-extrabold mb-5">
          {isQueueExist?.queueNumber}
        </div>
        <img src={SuccessImage} alt="product-logo" className="w-60 h-60 mx-auto" />
        <div
          className="mx-auto text-center mt-10 text-xl lg:text-5xl font-extrabold"
          style={{ color: currentColor }}
        >
          Table: {table?.tableNumber}
        </div>
      </div>
    </div>
  );
}
