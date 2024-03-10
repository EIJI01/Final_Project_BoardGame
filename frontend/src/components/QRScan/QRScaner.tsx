import QrScanner from "qr-scanner";
import { useEffect, useRef } from "react";

interface Props {
  handleScanQRcode: (value: string) => void;
  idQRcode: string | undefined;
}

export default function QRScaner({ handleScanQRcode, idQRcode }: Props) {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (idQRcode) {
      window.location.href = `/member/scan-qr/${idQRcode}`;
    }
  }, [idQRcode]);

  useEffect(() => {
    const video = videoElementRef.current as HTMLVideoElement;
    const qrScanner = new QrScanner(
      video,
      (result: QrScanner.ScanResult) => {
        console.log("decoded qr code: ", result);
        handleScanQRcode(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScanner.start();
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
