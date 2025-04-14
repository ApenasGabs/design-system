import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";

// Required default export defining component metadata
const meta: Meta<typeof Popover> = {
  title: "Atoms/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // Add any argTypes configuration if needed
};

export default meta;

// Define your stories
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    // Your default props here
  },
};

// Add more story variants as needed
