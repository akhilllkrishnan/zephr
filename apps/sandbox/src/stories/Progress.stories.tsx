import type { Story, StoryDefault } from "@ladle/react";
import { Progress } from "@zephrui/ui-react";

export default { title: "Atoms / Progress" } satisfies StoryDefault;

export const LineDeterminate: Story = () => (
  <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: "1rem" }}>
    <Progress value={25} label="25%" />
    <Progress value={50} label="50%" />
    <Progress value={75} label="75%" />
    <Progress value={100} label="100%" />
  </div>
);

export const LineIndeterminate: Story = () => (
  <div style={{ maxWidth: 400 }}>
    <Progress label="Loading…" />
  </div>
);

export const AllTones: Story = () => (
  <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
    {(["primary","success","danger","warning","neutral"] as const).map((tone) => (
      <Progress key={tone} value={60} tone={tone} label={tone} />
    ))}
  </div>
);

export const ShowValue: Story = () => (
  <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
    <Progress value={68} showValue label="Upload" />
  </div>
);

export const CircleVariant: Story = () => (
  <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
    {([48, 64, 80] as const).map((size) => (
      <Progress key={size} variant="circle" value={72} circleSize={size} label={`${size}px`} showValue />
    ))}
  </div>
);

export const LineLabelVariant: Story = () => (
  <div style={{ maxWidth: 400 }}>
    <Progress
      variant="line-label"
      value={42}
      title="Storage used"
      description="4.2 GB of 10 GB"
      actionLabel="Upgrade"
      onAction={() => alert("Upgrade")}
    />
  </div>
);
