import { Cards } from "./cards";
import { fn } from "@storybook/test";
import { LinkArrow } from "@/public/svgIcons/linkarrow";
import Building from "../../public/img/09ad6699a5 1.png";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Cards> = {
  title: "Cards",
  component: Cards,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    image: { control: "checkbox" },
    title: { control: "text" },
    subtitle: { control: "text" },
    content: { control: "text" },
    icon: { control: null },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CardsWithImage: Story = {
  args: {
    image: Building,
    cardType: "justImage",
  },
};

export const CardsWithIcon: Story = {
  args: {
    cardType: "IconText",
    icon: LinkArrow,
    subtitle: "Support",
    content:
      "Our dedicated support team ensures a seamless experience with prompt assistance and personalized guidance.",
  },
};

export const CardsWithTitle: Story = {
  args: {
    cardType: "titleContent",
    title: "Standout",
    content:
      "Elevate your community's living standards with our comprehensive estate management solution, designed to streamline operations, enhance security, and cultivate a harmonious environment for residents and stakeholders alike.",
  },
};

export const CardsWithImageAndContent: Story = {
  args: {
    cardType: "imageText",
    image: Building,
    subtitle: "Security",
    content:
      "Robust security measures fortify your estate's operations, safeguarding data integrity and privacy.",
  },
};
