import { StoryObj, Meta } from "@storybook/react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckboxInput: Story = {
  args: {
    title: "fullname",
    label: "Fullname",
    color: "red",
    labelbg: "white",
    checked: false,
  },
};
