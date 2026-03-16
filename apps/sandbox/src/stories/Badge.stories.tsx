import type { Story, StoryDefault } from "@ladle/react";
import { Badge } from "@zephrui/ui-react";

export default { title: "Atoms / Badge" } satisfies StoryDefault;

export const AllTones: Story = () => (
  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
    <Badge tone="neutral">Neutral</Badge>
    <Badge tone="info">Info</Badge>
    <Badge tone="success">Success</Badge>
    <Badge tone="danger">Danger</Badge>
    <Badge tone="subtle">Subtle</Badge>
  </div>
);

export const AllColors: Story = () => (
  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
    {(["gray","blue","orange","red","green","yellow","purple","sky","pink","teal"] as const).map((c) => (
      <Badge key={c} color={c}>{c}</Badge>
    ))}
  </div>
);

export const Variants: Story = () => (
  <div style={{ display: "flex", gap: "0.5rem" }}>
    <Badge tone="info" variant="filled">Filled</Badge>
    <Badge tone="info" variant="lighter">Lighter</Badge>
    <Badge tone="info" variant="stroke">Stroke</Badge>
    <Badge tone="info" variant="white">White</Badge>
  </div>
);

export const WithDot: Story = () => (
  <div style={{ display: "flex", gap: "0.5rem" }}>
    <Badge tone="success" type="dot">Active</Badge>
    <Badge tone="danger" type="dot">Error</Badge>
    <Badge tone="neutral" type="dot">Pending</Badge>
  </div>
);

export const Sizes: Story = () => (
  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
    <Badge tone="info" size="sm">Small</Badge>
    <Badge tone="info" size="md">Medium</Badge>
  </div>
);

export const Numeric: Story = () => (
  <div style={{ display: "flex", gap: "0.5rem" }}>
    <Badge tone="danger" number={5}>Notifications</Badge>
    <Badge tone="info" number={99}>Messages</Badge>
  </div>
);

export const Disabled: Story = () => (
  <Badge tone="neutral" disabled>Disabled</Badge>
);
