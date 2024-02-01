import QRCode from "qrcode.react";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";

type Props = {
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  value: string;
};

export default function GenerateQRCode({ value, size, level }: Props) {
  const { currentMode } = useStateDispatchContext();
  return (
    <div>
      <QRCode
        value={value}
        level={level}
        size={size}
        renderAs="svg"
        bgColor={currentMode.modes === "Dark" ? "#000000" : "#FFFFFF"}
        fgColor={currentMode.modes === "Dark" ? "#FFFFFF" : "#000000"}
      />
    </div>
  );
}
