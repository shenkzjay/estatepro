import { StoryObj, Meta } from "@storybook/react";
import { Inputs } from "./input";

const meta: Meta<typeof Inputs> = {
  title: "Inputs",
  component: Inputs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  args: {
    title: "fullname",
    label: "Fullname",
    color: "red",
    placeholder: "",
    value: "hello",
    inputtype: "text",
    labelbg: "white",
    required: true,
  },
};
