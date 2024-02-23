import type { Meta, StoryObj } from "@storybook/react";

import Tooltip from ".";

const meta = {
  title: "数据展示/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {
  args: {
    title: "Common Tag",
    children: "tooltip",
  },
};
