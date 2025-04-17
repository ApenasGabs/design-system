import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Popover } from "./Popover";

// Required default export defining component metadata
const meta: Meta<typeof Popover> = {
  title: "Atoms/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: <button>Hover ou toque aqui</button>,
  },
  // Add any argTypes configuration if needed
} satisfies Meta<typeof Popover>;

export default meta;

// Define your stories
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover
      popoverContent={<div>Este é um popover que se adapta à tela!</div>}
    >
      <Button label={"Popover"} />
    </Popover>
  ),
};

// NOTE - apenas para guardar essas infos
const popoverPropNames = [
  "Down - Align Center",
  "Down - Align Leading",
  "Down - Align Leading Edge",
  "Down - Align Trailing",
  "Down - Align Trailing Edge",
  "Leading - Align Bottom",
  "Leading - Align Middle",
  "Leading - Align Top",
  "Trailing - Align Bottom",
  "Trailing - Align Middle",
  "Trailing - Align Top",
  "Up - Align Center",
  "Up - Align Leading",
  "Up - Align Leading Edge",
  "Up - Align Trailing",
  "Up - Align Trailing Edge",
];

const popoverProps = [
  "Down-Align-Center",
  "Down-Align-Leading",
  "Down-Align-Leading-Edge",
  "Down-Align-Trailing",
  "Down-Align-Trailing-Edge",
  "Leading-Align-Bottom",
  "Leading-Align-Middle",
  "Leading-Align-Top",
  "Trailing-Align-Bottom",
  "Trailing-Align-Middle",
  "Trailing-Align-Top",
  "Up-Align-Center",
  "Up-Align-Leading",
  "Up-Align-Leading-Edge",
  "Up-Align-Trailing",
  "Up-Align-Trailing-Edge",
];

console.log("popoverProps: ", popoverProps);
console.log("popoverPropNames: ", popoverPropNames);
