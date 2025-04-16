// FollowTooltip.tsx
import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";
import { Cursor } from "./Cursor";

interface FollowTooltipProps {
  tooltip: string;
}

export const FollowTooltip: React.FC<FollowTooltipProps> = ({ tooltip }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root open={Boolean(tooltip)}>
        <Tooltip.Trigger asChild={true}>
          <Cursor />
        </Tooltip.Trigger>
        <Tooltip.Content sideOffset={20} side="top">
          <span style={{ backgroundColor: "white", fontSize: "30px" }}>
            {tooltip}
          </span>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
