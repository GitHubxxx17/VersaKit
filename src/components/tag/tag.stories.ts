import type { Meta, StoryObj } from "@storybook/react";

import Tag from ".";

const meta = {
  title: "数据展示/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {
  args: {
    children: "Common Tag",
  },
};
