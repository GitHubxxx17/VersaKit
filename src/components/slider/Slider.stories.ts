import type { Meta, StoryObj } from "@storybook/react";

import Slider from ".";

const meta = {
  title: "Example/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {
  args: {
    defaultValue: [10, 100],
    disabled: false,
    range: true,
    min: -100,
    max: 100,
    step: 5,
  },
};
