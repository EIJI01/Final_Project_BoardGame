import React, { CSSProperties } from "react";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";

type Props = {
  children: React.ReactNode | string;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "outlined" | "gradient";
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
};

const ButtonCustom = ({
  children,
  color,
  variant,
  fullWidth,
  className,
  size,
  onClick,
  style,
}: Props): JSX.Element => {
  const { currentMode } = useStateDispatchContext();
  const sizeSm = "h-9  px-4 rounded-lg text-xs font-semibold";
  const sizeMd = "h-10 px-8 rounded-lg text-xs font-semibold";
  const sizeLg = "h-12 px-9 rounded-lg text-sm font-semibold";
  const sizeXl = "h-14 px-12 rounded-lg text-md font-semibold";
  return (
    <button
      className={`${className && className} ${fullWidth && "w-full"}
      ${
        size === "sm"
          ? sizeSm
          : size === "md"
          ? sizeMd
          : size === "lg"
          ? sizeLg
          : size === "xl"
          ? sizeXl
          : sizeSm
      } transform hover:scale-105 transition-transform duration-300 ${
        color && variant === "gradient" ? "text-main-dark-text" : "text-main-bure-text"
      }`}
      onClick={onClick}
      style={{
        backgroundColor: variant === "outlined" ? "" : color ? color : "black",
        width: fullWidth ? "100%" : "auto",
        border:
          variant === "outlined"
            ? `1px solid ${color ? color : `${currentMode.modes === "Dark" ? "white" : "black"}`}`
            : "",
        ...style,
      }}
    >
      {typeof children === "string" ? children.toUpperCase() : children}
    </button>
  );
};
export default ButtonCustom;
