import type { Story, StoryDefault } from "@ladle/react";
import { Alert } from "@zephrui/ui-react";

export default { title: "Molecules / Alert" } satisfies StoryDefault;

export const AllStatuses: Story = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 480 }}>
    <Alert status="info" title="Your plan renews in 3 days." />
    <Alert status="success" title="Payment received successfully." />
    <Alert status="warning" title="Storage is 90% full." />
    <Alert status="error" title="Failed to save changes." />
    <Alert status="feature" title="AI suggestions are now available." />
    <Alert status="neutral" title="Maintenance scheduled for Sunday." />
  </div>
);

export const WithDescription: Story = () => (
  <Alert
    status="warning"
    title="API rate limit approaching."
    description="You've used 4,800 of 5,000 requests this month. Upgrade your plan to avoid disruptions."
  />
);

export const FilledVariant: Story = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 480 }}>
    <Alert status="success" variant="filled" title="All systems operational." />
    <Alert status="error" variant="filled" title="Build failed on push." />
  </div>
);

export const WithAction: Story = () => (
  <Alert
    status="info"
    title="New version available."
    description="Zephr 1.2.0 is ready to install."
    actionLabel="Update now"
    onAction={() => alert("Updating…")}
  />
);

export const Dismissible: Story = () => (
  <Alert
    status="neutral"
    title="Tip: Use Cmd+K to open the command bar."
    dismissible
    onDismiss={() => alert("Dismissed")}
  />
);
