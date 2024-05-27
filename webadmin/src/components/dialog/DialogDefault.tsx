import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

type DialogProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
};
export default function DialogDefault({ children, open, setOpen }: DialogProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
