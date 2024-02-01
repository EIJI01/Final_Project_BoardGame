import { CardHeader, Typography } from "@material-tailwind/react";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";

interface Props {
  title: string;
  subTitle?: string;
  buttonBody?: JSX.Element;
}

const DataGridHeader = ({ title, subTitle, buttonBody }: Props) => {
  const { currentColor } = useStateDispatchContext();
  return (
    <CardHeader
      placeholder=""
      floated={false}
      shadow={false}
      className="rounded-none mb-4 bg-inherit lg:mx-4 mx-2 overflow-visible"
    >
      <div className="flex items-center justify-between gap-8 relative">
        <div>
          <Typography placeholder="" variant="h5" color="blue-gray" style={{ color: currentColor }}>
            {title}
          </Typography>
          {subTitle && (
            <Typography
              placeholder=""
              color="gray"
              className="mt-1 font-normal dark:text-main-dark-text"
            >
              {subTitle}
            </Typography>
          )}
        </div>
        <div>{buttonBody}</div>
      </div>
    </CardHeader>
  );
};

export default DataGridHeader;
