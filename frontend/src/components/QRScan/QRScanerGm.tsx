import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import { addScanSystem } from "../../data/services/scanSystem-service/addScanSystem";

interface Props {
  handleScanQrcode: () => void;
  tableId: string | null;
  setOpenSuccess: (value: boolean) => void;
  setOpenError: (value: boolean) => void;
}

export default function QRScanerGm({
  handleScanQrcode,
  tableId,
  setOpenSuccess,
  setOpenError,
}: Props) {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const [data, setData] = useState<string | null>(null);
  console.warn(tableId);
  useEffect(() => {
    const video = videoElementRef.current as HTMLVideoElement;
    const qrScanner = new QrScanner(
      video,
      (result: QrScanner.ScanResult) => {
        setData(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScanner.start();
    console.log("start");
    qrScanner.turnFlashOff();

    return () => {
      console.log(qrScanner);
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  useEffect(() => {
    const addScan = async () => {
      try {
        console.log("decoded qr code: ", data);
        var result = await addScanSystem({ cardId: data!, tableId: tableId! });
        console.log(result.message);
        setOpenSuccess(true);
        setTimeout(() => {
          setOpenSuccess(false);
        }, 2000);
      } catch (err: any) {
        setOpenError(true);
        setTimeout(() => {
          setOpenError(false);
        }, 2000);
        console.error(err);
      }
    };
    if (data) {
      addScan();
      handleScanQrcode();
    }
  }, [data]);

  return (
    <div className="flex items-center justify-center h-full">
      <video ref={videoElementRef} className=" object-cover border-1 border-[#ddd] w-full h-full" />
    </div>
  );
}
