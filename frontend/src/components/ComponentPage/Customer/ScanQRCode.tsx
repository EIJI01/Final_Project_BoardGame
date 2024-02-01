import React, { useCallback, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  CardHeader,
} from "@material-tailwind/react";
import QRScaner from "../../QRScan/QRScaner";
import ScanImage from "../../../assets/scan/scan-qrcode.png";
import { ButtonCustom } from "../..";
import { useStateDispatchContext } from "../../../hooks/useStateDispatchHook";

type Props = {};

export default function ScanQRCode({}: Props) {
  const [open, setOpen] = React.useState(false);
  const [idQrcode, setIdQrcode] = useState<string | undefined>(undefined);
  const { currentColor, currentMode } = useStateDispatchContext();

  const handleOpen = () => setOpen(!open);
  const handleChangeIdQrcode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setIdQrcode(value);
    },
    [idQrcode]
  );

  const handleClickSubmit = useCallback(() => {
    window.location.href = `/member/scan-qr/${idQrcode}`;
  }, [idQrcode]);

  const handleScanQrcode = useCallback(
    (value: string | undefined) => {
      setIdQrcode(value);
    },
    [idQrcode]
  );

  return (
    <>
      <CardHeader
        placeholder={""}
        floated={false}
        className="h-14 m-0 mt-4 lg:mx-32 flex items-center pl-10 text-xl font-bold text-main-dark-text lg:mb-8 mb-2 rounded-none lg:rounded-xl"
        style={{ backgroundColor: currentColor }}
      >
        Check your card information
      </CardHeader>
      <div className="h-[40vh]  flex items-start px-2 lg:px-0">
        <div className="flex relative  h-[80%] lg:w-[80%] w-full mx-auto dark:bg-[#292929] lg:p-8 rounded-lg">
          <div className="lg:grid grid-cols-2 w-full">
            <img src={ScanImage} alt="scan" className="mb-4 lg:mb-0" />
            <div className=" w-full lg:px-16">
              <div>
                <div>
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="dark:text-main-dark-text"
                  >
                    Your ID qr code
                  </Typography>
                  <Input
                    crossOrigin={""}
                    size="lg"
                    placeholder="your id qr code"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-main-dark-text dark:focus:!border-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={handleChangeIdQrcode}
                  />
                </div>
                <ButtonCustom
                  variant="gradient"
                  className="mt-4 text-main-dark-text"
                  size="md"
                  color={currentMode.modes === "Dark" ? currentColor : undefined}
                  onClick={handleClickSubmit}
                >
                  Submit
                </ButtonCustom>
              </div>
              <div className=" mt-10">
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="dark:text-main-dark-text mb-1"
                >
                  You can scan
                </Typography>
                <ButtonCustom
                  fullWidth
                  size="md"
                  onClick={handleOpen}
                  variant="gradient"
                  className=" text-main-dark-text"
                  color={currentMode.modes === "Dark" ? currentColor : undefined}
                >
                  Scan
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        placeholder={""}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="lg"
      >
        <DialogHeader placeholder={""}>Scan QR Code</DialogHeader>
        <DialogBody placeholder={""} className="h-[500px] lg:p-4 p-0">
          <QRScaner handleScanQrcode={handleScanQrcode} idQrcode={idQrcode} />
        </DialogBody>
        <DialogFooter placeholder={""}>
          <Button placeholder={""} variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button placeholder={""} variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
