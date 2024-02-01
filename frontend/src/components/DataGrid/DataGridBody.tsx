import { CardBody, Typography } from "@material-tailwind/react";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";

interface Props {
  tableHead: string[];
  body: JSX.Element[];
  isLarge?: boolean;
}

const DataGridBody = ({ tableHead, body, isLarge }: Props) => {
  const { currentColor } = useStateDispatchContext();
  return (
    <CardBody
      placeholder=""
      className={`lg:overflow-y-scroll lg:overflow-x-hidden p-0 ${
        isLarge ? " lg:max-h-460" : "lg:max-h-96 max-h-[65vh]"
      } lg:h-auto overflow-x-auto`}
    >
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {tableHead.map((head) => (
              <th
                key={head}
                className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 dark:bg-gray-900 dark:border-blue-gray-900`}
              >
                <Typography
                  placeholder=""
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                  style={{ color: currentColor }}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </CardBody>
  );
};

export default DataGridBody;
