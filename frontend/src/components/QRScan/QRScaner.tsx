import QrScanner from "qr-scanner";
import { useEffect, useRef } from "react";

interface Props {
  handleScanQrcode: (value: string | undefined) => void;
  idQrcode: string | undefined;
}

export default function QRScaner({ handleScanQrcode, idQrcode }: Props) {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (!!!idQrcode) return undefined;
    window.location.href = `/member/scan-qr/${idQrcode}`;
  }, [idQrcode]);

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
