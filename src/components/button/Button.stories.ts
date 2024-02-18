import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta = {
  title: "Example/Button",
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

export const Default: Story = {
  args: {
    type: "default",
  },
};

export const Dashed: Story = {
  args: {
    type: "dashed",
  },
};

export const Link: Story = {
  args: {
    type: "link",
  },
};

export const Text: Story = {
  args: {
    type: "text",
  },
};
