import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta = {
  title: "通用组件/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "primary",
    children: "primary button",
  },
};
