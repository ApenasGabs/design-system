import {
  Placement,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom";
import { FC, ReactNode, useState } from "react";

type PopoverProps = {
  children: ReactNode;
  popoverContent: ReactNode;
  placement?: Placement;  
};

export const Popover: FC<PopoverProps> = ({
  children,
  popoverContent,
  placement = "bottom",
}) => {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement,
    open,
    middleware: [offset(8), flip(), shift()],
  });

  return (
    <div
      ref={refs.setReference}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ display: "inline-block" }}
    >
      {children}

      {open && (
        <div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 999 }}>
          {popoverContent}
        </div>
      )}
    </div>
  );
};
