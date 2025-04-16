// Cursor.tsx
import { forwardRef, useState } from "react";
import useEventListener from "./useEventListener";

interface CursorPosition {
  clientX: number;
  clientY: number;
}

export const Cursor = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function Cursor(props, ref) {
  const [{ clientX, clientY }, setPosition] = useState<CursorPosition>({
    clientX: 0,
    clientY: 0,
  });

  useEventListener("mousemove", (event: MouseEvent) => {
    setPosition({
      clientX: event.clientX,
      clientY: event.clientY,
    });
  });

  return (
    <div
      ref={ref}
      {...props}
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: `${clientY}px`,
        left: `${clientX}px`,
      }}
    />
  );
});
