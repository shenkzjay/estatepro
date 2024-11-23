import { StoryObj, Meta } from "@storybook/react";
import { StatusPill } from "./statuspill";

const meta: Meta<typeof StatusPill> = {
  title: "StatusPill",
  component: StatusPill,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const statusPill: Story = {
  args: {
    title: "Active",
    status: "success",
  },
};
