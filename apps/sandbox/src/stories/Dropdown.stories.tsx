import type { Story, StoryDefault } from "@ladle/react";
import { Dropdown, Button } from "@zephrui/ui-react";

export default { title: "Molecules / Dropdown" } satisfies StoryDefault;

const basicItems = [
  { id: "edit", label: "Edit", onSelect: () => alert("Edit") },
  { id: "duplicate", label: "Duplicate", onSelect: () => alert("Duplicate") },
  { id: "archive", label: "Archive", onSelect: () => alert("Archive") },
];

export const Basic: Story = () => <Dropdown label="Options" items={basicItems} />;

export const WithDangerItem: Story = () => (
  <Dropdown
    label="Actions"
    items={[
      ...basicItems,
      { id: "delete", label: "Delete", danger: true, onSelect: () => alert("Delete") },
    ]}
  />
);

export const AlignEnd: Story = () => (
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <Dropdown label="Actions" items={basicItems} align="end" />
  </div>
);

export const CustomTrigger: Story = () => (
  <Dropdown
    label="More options"
    items={basicItems}
    trigger={
      <Button variant="ghost" size="sm">
        <span className="ms">more_horiz</span>
      </Button>
    }
  />
);
