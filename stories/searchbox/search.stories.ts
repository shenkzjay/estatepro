import { StoryObj, Meta } from "@storybook/react";
import { SearchBox } from "./search";

const meta: Meta<typeof SearchBox> = {
  title: "SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PriSearchBox: Story = {
  args: {
    name: "searchbox",
    placeholder: "Search",
    value: "",
    color: "#6D7175",
    bgColor: "#EFF0F1",
  },
};
