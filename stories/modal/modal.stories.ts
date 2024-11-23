import { StoryObj, Meta } from "@storybook/react";
import { Modal } from "./modal";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const MainModal: Story = {
  args: {
    title: "Modal",
  },
};
