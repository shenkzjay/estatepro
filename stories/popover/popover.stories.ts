import { StoryObj, Meta } from "@storybook/react";
import { Popover } from "./popover";

const meta: Meta<typeof Popover> = {
  title: "Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PopoverMain: Story = {
  args: {},
};
