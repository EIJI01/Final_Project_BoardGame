import { useCallback } from "react";
import Table from "../../Table/Table";
import { useNavigate } from "react-router-dom";
import { TABLE } from "../../../data/table";

type Props = {};

export default function ManageTableComp({}: Props): JSX.Element {
  const navigate = useNavigate();
  const handleClick = useCallback(
    (number: string) => {
      navigate(number);
    },
    [navigate]
  );
  return (
    <div className=" mt-2 lg:mt-8 lg:pb-8">
      <div className=" grid grid-cols-3 lg:gap-5">
        {TABLE.map((item, i) => {
          return (
            <Table key={i} numberOfTable={item} onClick={() => handleClick(item.toString())} />
          );
        })}
      </div>
    </div>
  );
}
