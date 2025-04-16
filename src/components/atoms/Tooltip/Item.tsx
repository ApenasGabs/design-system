import React from "react";
import { ColorType } from "./App";

interface ItemProps {
  color?: ColorType;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Item: React.FC<ItemProps> = ({ color, ...props }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      backgroundColor: color,
      color: "white",
      padding: "80px",
      aspectRatio: "1/1",
    }}
    {...props}
  >
    Hover
  </div>
);
