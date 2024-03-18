import type { Meta, StoryObj } from "@storybook/react";

import Radio from ".";

const meta = {
  title: "数据录入/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {
  args: {
    children: "radio",
  },
};
