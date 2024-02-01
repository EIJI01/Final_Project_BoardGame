import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";

type Props = {
  startDate: Date;
  onChangeStartDate: (date: Date | null) => void;
};

export default function DateDefault({ startDate, onChangeStartDate }: Props) {
  const { currentColor } = useStateDispatchContext();
  document.documentElement.style.setProperty("--hover-footer", currentColor);
  return (
    <div>
      <DatePicker
        showIcon
        selected={startDate}
        onChange={(date) => onChangeStartDate(date)}
        icon="fa fa-calendar"
        className=" border-2 border-gray-300 rounded-md h-10 datepicker lg:w-32 text-main-dark-text"
      />
    </div>
  );
}
