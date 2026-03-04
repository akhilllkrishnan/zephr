import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchBox } from "@zephyr/ui-react";

const meta = {
  title: "Molecules/SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
  args: {
    placeholder: "Search users, docs, or commands"
  }
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div style={{ width: "min(640px, 90vw)" }}>
        <SearchBox
          {...args}
          value={value}
          onValueChange={setValue}
          onSearch={(query) => setValue(query)}
        />
      </div>
    );
  }
};
