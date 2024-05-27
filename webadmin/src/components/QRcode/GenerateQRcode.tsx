import QRCode from "qrcode.react";
type Props = {
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  value: string;
};

export default function GenerateQRcode({ value, size, level }: Props) {
  return (
    <div>
      <QRCode value={value} level={level} size={size} renderAs="svg" />
    </div>
  );
}
