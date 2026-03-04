import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@zephyr/ui-react";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Launch Campaign",
    variant: "primary",
    size: "md",
    disabled: false
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"]
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"]
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Destructive: Story = {
  args: {
    variant: "danger",
    children: "Delete Project"
  }
};
