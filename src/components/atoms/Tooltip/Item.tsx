import React from "react";

interface ItemProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Item: React.FC<ItemProps> = ({ ...props }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      color: "white",
      padding: "80px",
      aspectRatio: "1/1",
    }}
    {...props}
  >
    Hover
  </div>
);
