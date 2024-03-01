import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { ScanSystemResponse } from "../../models/data/scanSystem";

interface Props {
  numberOfTable: string;
  onClick: () => void;
  tableId: string;
  scanSystemData: ScanSystemResponse[];
}

const Table = ({ numberOfTable, onClick, tableId, scanSystemData }: Props) => {
  const { currentColor } = useStateDispatchContext();
  const cardInTable =
    scanSystemData.filter((item) => item.TableId === tableId && item.Status === true) || [];

  return (
    <div className=" w-full md:w-60 lg:w-72 h-auto mx-auto">
      <div className="tables">
        <div className=" flex flex-col justify-around items-center h-full">
          <div className="table-item hidden lg:block" />
          <div className="table-item hidden lg:block" />
          <div className="table-item hidden lg:block" />
        </div>
        <div className="w-full h-full flex flex-col justify-between mx-1 lg:mx-2 gap-1 lg:gap-2">
          <div className="flex justify-around items-center">
            <div className="table-item hidden lg:block" />
            <div className="table-item hidden lg:block" />
            <div className="table-item hidden lg:block" />
            <div className="table-item hidden lg:block" />
          </div>
          <div
            className="w-full h-full rounded-lg font-semibold text-white text-2xl hover:scale-95 transition-all duration-200 cursor-pointer"
            style={{ backgroundColor: currentColor }}
            onClick={onClick}
          >
            <div className="w-full h-full flex flex-col items-center justify-center lg:block">
              <div className="w-full flex justify-between px-2 py-1">
                <div className=" font-semibold text-sm hidden lg:block">
                  <span style={{ color: cardInTable.length > 0 ? "red" : "green" }}>
                    {cardInTable.length}
                  </span>
                  {/* /10 */} people
                </div>
                <div
                  className="font-semibold text-sm lg-max:mx-auto"
                  style={{ color: cardInTable.length > 0 ? "red" : "green" }}
                >
                  {cardInTable.length > 0 ? "unavailable" : "available"}
                </div>
              </div>
              <div className=" dark:text-main-bure-text text-center">{numberOfTable}</div>
              <div className=" font-semobold text-lg  lg:hidden">
                <span style={{ color: cardInTable.length > 0 ? "red" : "green" }}>
                  {cardInTable.length}
                </span>
                {/* /10 */} people
              </div>
            </div>
          </div>
          <div className="flex justify-around items-center">
            <div className="table-item hidden lg:block" />
            <div className="table-item hidden lg:block" />
            <div className="table-item hidden lg:block" />
            <div className="table-item hidden lg:block" />
          </div>
        </div>
        <div className="flex flex-col justify-around items-center h-full">
          <div className="table-item hidden lg:block" />
          <div className="table-item hidden lg:block" />
          <div className="table-item hidden lg:block" />
        </div>
      </div>
    </div>
  );
};

export default Table;
