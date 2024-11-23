import { StoryObj, Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectDropDown: Story = {
  args: {
    title: "Services",
    selectData: [],
  },
};
