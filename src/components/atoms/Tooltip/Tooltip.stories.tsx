import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

// Required default export defining component metadata
const meta = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // Add any argTypes configuration if needed
} satisfies Meta<typeof Tooltip>;

export default meta;

// Define your stories
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    // Your default props here
  },
};

// Add more story variants as needed
