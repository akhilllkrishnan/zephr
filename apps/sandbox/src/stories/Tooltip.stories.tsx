import type { Story, StoryDefault } from "@ladle/react";
import { Tooltip, Button } from "@zephrui/ui-react";

export default { title: "Molecules / Tooltip" } satisfies StoryDefault;

export const Top: Story = () => (
  <div style={{ padding: "4rem 2rem" }}>
    <Tooltip content="Tooltip content" side="top" open>
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  </div>
);

export const AllSides: Story = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", padding: "3rem" }}>
    {(["top", "bottom", "left", "right"] as const).map((side) => (
      <Tooltip key={side} content={`Side: ${side}`} side={side} open>
        <Button variant="secondary" size="sm">{side}</Button>
      </Tooltip>
    ))}
  </div>
);

export const DarkVariant: Story = () => (
  <div style={{ padding: "4rem 2rem" }}>
    <Tooltip content="Dark tooltip" variant="dark" side="top" open>
      <Button variant="secondary">Dark variant</Button>
    </Tooltip>
  </div>
);

export const WithDescription: Story = () => (
  <div style={{ padding: "5rem 2rem" }}>
    <Tooltip
      content="Keyboard shortcut"
      description="Cmd+Shift+P opens the command palette"
      size="lg"
      side="top"
      open
    >
      <Button variant="ghost" size="sm">Shortcut info</Button>
    </Tooltip>
  </div>
);

export const WithTail: Story = () => (
  <div style={{ padding: "4rem 2rem" }}>
    <Tooltip content="With caret" showTail side="top" open>
      <Button variant="secondary" size="sm">Has caret</Button>
    </Tooltip>
  </div>
);
