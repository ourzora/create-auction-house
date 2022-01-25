import type { StyleProps } from "../utils/StyleTypes";
import { useMediaContext } from "../context/useMediaContext";

// One of onClick or href required
export type ButtonProps = {
  primary?: boolean;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
} & StyleProps;

export const Button = ({
  children,
  primary = false,
  href,
  onClick,
  className,
}: ButtonProps) => {
  const { getStyles } = useMediaContext();
  const ButtonComponent = href ? "a" : "button";
  return (
    <ButtonComponent
      onClick={onClick}
      href={href}
      target={href ? "_blank" : undefined}
      {...getStyles("button", className, { primary })}
    >
      {children}
    </ButtonComponent>
  );
};
