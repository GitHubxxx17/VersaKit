import type { Meta, StoryObj } from "@storybook/react";

import Tabs from ".";

const meta = {
  title: "Example/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {
  args: {},
};
