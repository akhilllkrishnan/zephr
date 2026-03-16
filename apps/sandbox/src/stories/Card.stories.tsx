import type { Story, StoryDefault } from "@ladle/react";
import { Card, CardHeader, CardFooter, Button, Badge } from "@zephrui/ui-react";

export default { title: "Atoms / Card" } satisfies StoryDefault;

export const Outlined: Story = () => (
  <Card variant="outlined" padding="md" style={{ maxWidth: 360 }}>
    <p style={{ margin: 0 }}>Outlined card with medium padding.</p>
  </Card>
);

export const Filled: Story = () => (
  <Card variant="filled" padding="md" style={{ maxWidth: 360 }}>
    <p style={{ margin: 0 }}>Filled surface card.</p>
  </Card>
);

export const Elevated: Story = () => (
  <Card variant="elevated" shadow="md" padding="md" style={{ maxWidth: 360 }}>
    <p style={{ margin: 0 }}>Elevated card with medium shadow.</p>
  </Card>
);

export const WithHeaderFooter: Story = () => (
  <Card variant="outlined" padding="none" style={{ maxWidth: 360 }}>
    <CardHeader>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <strong>Invoice #1042</strong>
        <Badge tone="success">Paid</Badge>
      </div>
    </CardHeader>
    <div style={{ padding: "1rem 1.25rem" }}>
      <p style={{ margin: 0, fontSize: "0.875rem" }}>Total due: $240.00</p>
    </div>
    <CardFooter>
      <Button variant="ghost" size="sm">Download PDF</Button>
    </CardFooter>
  </Card>
);

export const Clickable: Story = () => (
  <Card variant="outlined" padding="md" onClick={() => alert("Card clicked")} style={{ maxWidth: 360, cursor: "pointer" }}>
    <p style={{ margin: 0 }}>Click this card — it renders as a focusable button.</p>
  </Card>
);

export const ShadowScale: Story = () => (
  <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
    {(["none", "sm", "md", "lg"] as const).map((s) => (
      <Card key={s} shadow={s} padding="md" variant="elevated" style={{ width: 160 }}>
        <p style={{ margin: 0, fontSize: "0.8rem" }}>shadow="{s}"</p>
      </Card>
    ))}
  </div>
);
