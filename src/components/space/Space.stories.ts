import type { Meta, StoryObj } from "@storybook/react";

import Space from "./index";

const meta = {
  title: "Example/Space",
  component: Space,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Space>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {
  args: {},
};
