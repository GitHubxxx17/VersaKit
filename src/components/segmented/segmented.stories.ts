import type { Meta, StoryObj } from "@storybook/react";

import Segmented from "./index";

const meta = {
  title: "数据展示/Segmented",
  component: Segmented,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Segmented>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {
  args: {
    options: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
  },
};
