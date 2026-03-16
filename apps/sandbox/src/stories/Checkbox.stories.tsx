import React from "react";
import type { Story, StoryDefault } from "@ladle/react";
import { Checkbox } from "@zephrui/ui-react";

export default { title: "Atoms / Checkbox" } satisfies StoryDefault;

export const Unchecked: Story = () => <Checkbox label="Subscribe to updates" />;
export const Checked: Story = () => <Checkbox label="Agreed to terms" defaultChecked />;
export const Indeterminate: Story = () => <Checkbox label="Select all" indeterminate />;
export const Disabled: Story = () => <Checkbox label="Disabled option" disabled />;
export const DisabledChecked: Story = () => <Checkbox label="Disabled checked" disabled defaultChecked />;

export const Controlled: Story = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox
      label={checked ? "Enabled" : "Disabled"}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Group: Story = () => {
  const [vals, setVals] = React.useState<string[]>([]);
  const toggle = (v: string) =>
    setVals((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {["Design", "Engineering", "Product", "Marketing"].map((label) => (
        <Checkbox
          key={label}
          label={label}
          checked={vals.includes(label)}
          onChange={() => toggle(label)}
        />
      ))}
      <p style={{ margin: "0.5rem 0 0", fontSize: "0.8rem", color: "var(--z-color-text400)" }}>
        Selected: {vals.join(", ") || "none"}
      </p>
    </div>
  );
};
