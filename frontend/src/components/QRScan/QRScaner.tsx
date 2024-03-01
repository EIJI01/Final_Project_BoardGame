import QrScanner from "qr-scanner";
import { useEffect, useRef } from "react";
import { UseUserContext } from "../../contexts/ContextProvider";
import { checkTypeUser } from "../../utils/routing";
import { addScanSystem } from "../../data/services/scanSystem-service/addScanSystem";

interface Props {
  handleScanQrcode: (value: string | undefined) => void;
  idQrcode: string | undefined;
  tableId?: string;
}

export default function QRScaner({ handleScanQrcode, idQrcode, tableId }: Props) {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const { currentUser } = UseUserContext();
  useEffect(() => {
    if (checkTypeUser(currentUser?.role!) === true && idQrcode && tableId) {
      const addScan = async () => {
        try {
          var result = await addScanSystem({ cardId: idQrcode, tableId });
          console.log(result);
        } catch (err: any) {
          console.log(err);
        }
      };
      addScan();
    } else if (checkTypeUser(currentUser?.role!) === false && idQrcode) {
      window.location.href = `/member/scan-qr/${idQrcode}`;
    } else {
      return undefined;
    }
  }, [tableId, idQrcode]);

  useEffect(() => {
    const video = videoElementRef.current as HTMLVideoElement;
    const qrScanner = new QrScanner(
      video,
      (result: QrScanner.ScanResult) => {
        console.log("decoded qr code: ", result);
        handleScanQrcode(result.data);
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
  return (
    <div className="flex items-center justify-center h-full">
      <video ref={videoElementRef} className=" object-cover border-1 border-[#ddd] w-full h-full" />
    </div>
  );
}
