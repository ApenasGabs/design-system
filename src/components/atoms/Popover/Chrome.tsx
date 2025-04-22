import React, { ReactNode, createContext, useEffect, useRef } from "react";

type ScrollableType = "none" | "x" | "y" | "both";

interface ChromeProps {
  children: ReactNode;
  center?: boolean;
  scrollable?: ScrollableType;
  className?: string;
  scrollHeight?: number;
  scrollWidth?: number;
  relative?: boolean;
}

const ChromeContext = createContext<HTMLDivElement | null>(null);

// export const useChromeContext = () => {
//   return useContext(ChromeContext);
// };

export const Chrome: React.FC<ChromeProps> = ({
  children,
  center = false,
  scrollable = "none",
  className = "",
  scrollHeight = 150,
  scrollWidth = 1000,
  relative = true,
}) => {
  const scrollableRef = useRef<HTMLDivElement>(null);

  const scrollableX = scrollable === "both" || scrollable === "x";
  const scrollableY = scrollable === "both" || scrollable === "y";

  useEffect(() => {
    if (!scrollableRef.current) return;

    if (center) {
      if (scrollableY) {
        scrollableRef.current.scrollTop =
          (scrollableRef.current.scrollHeight -
            scrollableRef.current.clientHeight) /
          2;
      }

      if (scrollableX) {
        scrollableRef.current.scrollLeft =
          (scrollableRef.current.scrollWidth -
            scrollableRef.current.clientWidth) /
          2;
      }
    }
  }, [scrollableY, scrollableX, center]);

  return (
    <div className="overflow-hidden rounded-lg text-gray-900 border border-black/10 dark:border-gray-700">
      {/* Content area */}
      <div
        ref={scrollableRef}
        className={`bg-gray-50 p-1 ${className} ${
          scrollableY ? "overflow-y-auto" : "overflow-y-hidden"
        } ${scrollableX ? "overflow-x-auto" : "overflow-x-hidden"} ${
          relative ? "relative" : ""
        }`}
        style={{
          height: scrollHeight ? `${scrollHeight}px` : "auto",
          width: scrollWidth ? `${scrollWidth}px` : "auto",
          position: "relative",
        }}
      >
        <ChromeContext.Provider value={scrollableRef.current}>
          {center ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {children}
            </div>
          ) : (
            children
          )}
        </ChromeContext.Provider>
      </div>
    </div>
  );
};
