import { ComponentProps, FC, ReactNode, useState } from "react";
import "./popover.css";

type PopoverProps = ComponentProps<"div"> & {
  children: ReactNode;
  popoverContent: ReactNode;
};

export const Popover: FC<PopoverProps> = ({ children, popoverContent }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="popover"
      style={{ display: "inline-block", position: "relative" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <div className="popover-content">{popoverContent}</div>}
    </div>
  );
};
