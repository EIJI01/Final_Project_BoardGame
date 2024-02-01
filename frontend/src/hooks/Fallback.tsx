import { Spinner } from "@material-tailwind/react";
import { useStateDispatchContext } from "./useStateDispatchHook";

type Props = {};

const Fallback = ({}: Props) => {
  const { currentColor } = useStateDispatchContext();
  document.documentElement.style.setProperty("--spinner-color", currentColor);
  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: 9999 }}
    >
      <Spinner id="spinner" className="h-16 w-16" />
    </div>
  );
};

export default Fallback;
