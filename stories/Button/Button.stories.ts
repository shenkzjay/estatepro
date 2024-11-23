import { Button } from "./Button";
import { fn } from "@storybook/test";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "Primary",
    label: "Login",
    bgColor: "#c3f8f2",
    color: "#c3f8f2",
    size: "Large",
  },
};

export const Secondary: Story = {
  args: {
    variant: "Secondary",
    label: "Sign up now",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "Tertiary",
    label: "Filter",
    bgColor: "#c3f8f2",
  },
};

export const Medium: Story = {};
