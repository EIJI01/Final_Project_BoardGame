import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { ButtonCustom } from "..";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";

interface Props {
  open: boolean;
  handleOpen: () => void;
  body?: JSX.Element;
  header?: JSX.Element;
}

export default function DialogDefault({ open, handleOpen, body, header }: Props) {
  const { currentColor, currentMode } = useStateDispatchContext();
  return (
    <Dialog
      placeholder={""}
      open={open}
      handler={handleOpen}
      className="lg:p-10"
      style={{ backgroundColor: currentMode.modes === "Dark" ? "#263238" : "white" }}
    >
      <DialogHeader placeholder={""}>{header}</DialogHeader>
      <DialogBody placeholder={""}>{body}</DialogBody>
      <DialogFooter placeholder={""}>
        <ButtonCustom variant="outlined" onClick={handleOpen} className="mr-1">
          <span style={{ color: currentMode.modes === "Dark" ? "white" : "" }}>Cancel</span>
        </ButtonCustom>
        <ButtonCustom variant="gradient" color={currentColor} onClick={handleOpen}>
          <span>Confirm</span>
        </ButtonCustom>
      </DialogFooter>
    </Dialog>
  );
}
