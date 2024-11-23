import { Accordian } from "./accordian";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Accordian> = {
  title: "Accordian",
  component: Accordian,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AccordianPill: Story = {
  args: {
    title: "what is smart premises",
    content:
      "this is a very notable premises to nuture your young ones and make sure they grow with the best things possible",
  },
};
