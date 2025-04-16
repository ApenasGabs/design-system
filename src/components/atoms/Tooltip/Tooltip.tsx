import React, { useEffect, useRef, useState } from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  defaultPosition?: "top" | "bottom" | "left" | "right";
  gap?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  defaultPosition = "bottom",
  gap = 8,
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  console.log("position: ", position);
  useEffect(() => {
    const updatePosition = () => {
      if (triggerRef.current && tooltipRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        // Get window dimensions
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        // Calculate available space in each direction
        const spaceTop = triggerRect.top;
        const spaceBottom = windowHeight - triggerRect.bottom;
        const spaceLeft = triggerRect.left;
        const spaceRight = windowWidth - triggerRect.right;

        // Determine best position based on available space
        let bestPosition = defaultPosition;

        // If default position is bottom but not enough space, find alternative
        if (
          defaultPosition === "bottom" &&
          spaceBottom < tooltipRect.height + gap
        ) {
          // Try top if there's more space
          if (spaceTop > tooltipRect.height + gap) {
            bestPosition = "top";
          } else if (
            spaceRight > tooltipRect.width + gap &&
            spaceRight > spaceLeft
          ) {
            bestPosition = "right";
          } else if (spaceLeft > tooltipRect.width + gap) {
            bestPosition = "left";
          }
        }
        // Similar logic for other default positions
        else if (
          defaultPosition === "top" &&
          spaceTop < tooltipRect.height + gap
        ) {
          if (spaceBottom > tooltipRect.height + gap) {
            bestPosition = "bottom";
          } else if (
            spaceRight > tooltipRect.width + gap &&
            spaceRight > spaceLeft
          ) {
            bestPosition = "right";
          } else if (spaceLeft > tooltipRect.width + gap) {
            bestPosition = "left";
          }
        }
        // Add similar checks for left/right default positions if needed

        setPosition(bestPosition);

        // Calculate position based on best direction
        let newStyle: React.CSSProperties = {
          position: "absolute",
          zIndex: 1000,
        };

        switch (bestPosition) {
          case "bottom":
            newStyle = {
              ...newStyle,
              top: triggerRect.height + gap,
              left: "50%",
              transform: "translateX(-50%)",
            };
            break;
          case "top":
            newStyle = {
              ...newStyle,
              bottom: triggerRect.height + gap,
              left: "50%",
              transform: "translateX(-50%)",
            };
            break;
          case "left":
            newStyle = {
              ...newStyle,
              right: triggerRect.width + gap,
              top: "50%",
              transform: "translateY(-50%)",
            };
            break;
          case "right":
            newStyle = {
              ...newStyle,
              left: triggerRect.width + gap,
              top: "50%",
              transform: "translateY(-50%)",
            };
            break;
        }

        setStyle(newStyle);
      }
    };

    if (visible) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [visible, defaultPosition, gap]);

  return (
    <div
      ref={triggerRef}
      style={{ display: "inline-block", position: "relative" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div ref={tooltipRef} style={style}>
          {content}
        </div>
      )}
    </div>
  );
};
