import { StoryObj, Meta } from "@storybook/react";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TextArea: Story = {
  args: {
    placeholder: "Write your message here",
    value: "",
    title: "Message",
    name: "textarea",
  },
};
