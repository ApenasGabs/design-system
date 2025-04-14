import { FC, HtmlHTMLAttributes } from "react";
import "./tooltip.css";
export interface TooltipPops extends HtmlHTMLAttributes<HTMLDivElement> {
  color?: string /** Tooltip color */;
}
export const Tooltip: FC<TooltipPops> = ({ ...props }) => {
  return (
    <div className="tooltip" {...props}>
      <div className="Tooltip__content">{props.children}</div>
    </div>
  );
};
