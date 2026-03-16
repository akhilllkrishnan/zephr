import type { Story, StoryDefault } from "@ladle/react";
import { Input } from "@zephrui/ui-react";

export default { title: "Atoms / Input" } satisfies StoryDefault;

export const Default: Story = () => <Input placeholder="Enter text…" />;
export const ExtraSmall: Story = () => <Input controlSize="xs" placeholder="Extra small" />;
export const Small: Story = () => <Input controlSize="sm" placeholder="Small" />;
export const Medium: Story = () => <Input controlSize="md" placeholder="Medium" />;
export const Disabled: Story = () => <Input disabled placeholder="Disabled" />;
export const ReadOnly: Story = () => <Input readOnly defaultValue="Read-only value" />;
export const Invalid: Story = () => <Input aria-invalid="true" defaultValue="bad@email" />;
export const WithType: Story = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 320 }}>
    <Input type="email" placeholder="Email address" />
    <Input type="password" placeholder="Password" />
    <Input type="number" placeholder="0" />
  </div>
);
