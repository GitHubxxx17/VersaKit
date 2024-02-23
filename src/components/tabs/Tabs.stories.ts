import type { Meta, StoryObj } from "@storybook/react";

import Tabs from ".";

const meta = {
  title: "数据展示/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {
  args: {
    items: [
      {
        key: "1",
        label: "Tab 1",
        children: "Content of Tab Pane 1",
      },
      {
        key: "2",
        label: "Tab 2",
        children: "Content of Tab Pane 2",
      },
      {
        key: "3",
        label: "Tab 3",
        children: "Content of Tab Pane 3",
      },
    ],
  },
};
