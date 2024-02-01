import { Card } from "@material-tailwind/react";

interface Props {
  children: React.ReactNode;
}

const DataGrid = ({ children }: Props) => {
  return (
    <div className="lg:px-20 py-4">
      <Card placeholder="" className="h-full w-full dark:bg-black lg-max:rounded-none">
        {children}
      </Card>
    </div>
  );
};

export default DataGrid;
