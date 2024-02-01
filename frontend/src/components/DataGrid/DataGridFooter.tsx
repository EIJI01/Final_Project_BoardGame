import { CardFooter, Typography } from "@material-tailwind/react";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { ButtonCustom } from "..";

type Props = {};

const DataGridFooter = ({}: Props) => {
  const { currentColor } = useStateDispatchContext();
  return (
    <CardFooter
      placeholder=""
      className="flex items-center justify-between  border-blue-gray-50 p-4"
    >
      <Typography
        placeholder=""
        variant="small"
        color="blue-gray"
        className="font-normal"
        style={{ color: currentColor }}
      >
        Page 1 of 10
      </Typography>
      <div className="flex gap-2">
        <ButtonCustom
          variant="outlined"
          size="sm"
          color={currentColor}
          // className={` dark:text-main-dark-text`}
          style={{ color: currentColor }}
        >
          Previous
        </ButtonCustom>
        <ButtonCustom variant="outlined" size="sm" className="dark:text-main-dark-text">
          Next
        </ButtonCustom>
      </div>
    </CardFooter>
  );
};

export default DataGridFooter;
