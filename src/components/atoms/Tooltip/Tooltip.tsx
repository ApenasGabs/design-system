import React, { useEffect, useRef, useState } from "react";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const updatePosition = () => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;

    if (trigger && tooltip) {
      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      const space = {
        top: triggerRect.top,
        bottom: window.innerHeight - triggerRect.bottom,
        left: triggerRect.left,
        right: window.innerWidth - triggerRect.right,
      };

      const fits = {
        top: space.top >= tooltipRect.height + 8,
        bottom: space.bottom >= tooltipRect.height + 8,
        left: space.left >= tooltipRect.width + 8,
        right: space.right >= tooltipRect.width + 8,
      };

      let top = 0;
      let left = 0;

      if (fits.bottom || (!fits.top && space.bottom > space.top)) {
        // Prefer bottom
        top = triggerRect.bottom + 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      } else if (fits.top) {
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      } else if (fits.right || space.right > space.left) {
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + 8;
      } else {
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - 8;
      }

      left = Math.max(
        8,
        Math.min(left, window.innerWidth - tooltipRect.width - 8)
      );
      top = Math.max(
        8,
        Math.min(top, window.innerHeight - tooltipRect.height - 8)
      );

      setStyle({
        position: "fixed",
        top,
        left,
        backgroundColor: "#333",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "4px",
        fontSize: "14px",
        zIndex: 1000,
        maxWidth: "220px",
        pointerEvents: "none",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
        whiteSpace: "pre-wrap",
      });
    }
  };

  useEffect(() => {
    if (visible) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [visible]);

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
