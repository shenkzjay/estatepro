import type { Meta, StoryObj } from "@storybook/react";
import { Pills } from "./Pills";
import { StarsIcon } from "@/public/svgIcons/starsIcon";
import { LinkArrow } from "@/public/svgIcons/linkarrow";

const meta: Meta<typeof Pills> = {
  title: "Pills",
  component: Pills,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    iconbg: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PillWithoutIcon: Story = {
  args: {
    iconAlign: "noIcon",
    pillText: "Improve your estate experience",
  },
};

export const PillIconsBefore: Story = {
  args: {
    icon: StarsIcon,
    iconAlign: "before",
    iconbg: true,
    pillText: "Start your journey",
  },
};

export const PillIconsAfter: Story = {
  args: {
    icon: LinkArrow,
    iconAlign: "after",
    iconbg: false,
    pillText: "Request a demo",
    tooltip: "Request a demo",
  },
};
