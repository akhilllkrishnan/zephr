import type { Story, StoryDefault } from "@ladle/react";
import { Button } from "@zephrui/ui-react";

export default { title: "Atoms / Button" } satisfies StoryDefault;

export const Primary: Story = () => <Button variant="primary">Save changes</Button>;
export const Secondary: Story = () => <Button variant="secondary">Cancel</Button>;
export const Ghost: Story = () => <Button variant="ghost">Learn more</Button>;
export const Danger: Story = () => <Button variant="danger">Delete account</Button>;

export const Small: Story = () => <Button size="sm">Small button</Button>;
export const Medium: Story = () => <Button size="md">Medium button</Button>;
export const Large: Story = () => <Button size="lg">Large button</Button>;

export const Loading: Story = () => <Button variant="primary" loading>Saving…</Button>;
export const Disabled: Story = () => <Button variant="primary" disabled>Disabled</Button>;
export const FullWidth: Story = () => <Button variant="primary" fullWidth>Full width</Button>;

export const WithStartIcon: Story = () => (
  <Button variant="secondary" startIcon={<span className="ms" style={{ fontSize: "1rem" }}>add</span>}>
    Add item
  </Button>
);

export const WithEndIcon: Story = () => (
  <Button variant="ghost" endIcon={<span className="ms" style={{ fontSize: "1rem" }}>arrow_forward</span>}>
    Continue
  </Button>
);

export const AllVariants: Story = () => (
  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Danger</Button>
  </div>
);

export const Configurable: Story<{
  variant: "primary" | "secondary" | "ghost" | "danger";
  size: "sm" | "md" | "lg";
  label: string;
  loading: boolean;
  disabled: boolean;
  fullWidth: boolean;
}> = ({ variant, size, label, loading, disabled, fullWidth }) => (
  <Button variant={variant} size={size} loading={loading} disabled={disabled} fullWidth={fullWidth}>
    {label}
  </Button>
);
Configurable.args = { variant: "primary", size: "md", label: "Click me", loading: false, disabled: false, fullWidth: false };
Configurable.argTypes = {
  variant: { options: ["primary", "secondary", "ghost", "danger"], control: { type: "radio" } },
  size: { options: ["sm", "md", "lg"], control: { type: "radio" } },
};
