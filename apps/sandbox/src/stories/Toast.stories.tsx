import React from "react";
import type { Story, StoryDefault } from "@ladle/react";
import { Toast, Button } from "@zephrui/ui-react";

export default { title: "Molecules / Toast" } satisfies StoryDefault;

export const InfoToast: Story = () => <Toast open title="Syncing your workspace…" status="info" />;
export const SuccessToast: Story = () => <Toast open title="Changes saved successfully." status="success" />;
export const WarningToast: Story = () => <Toast open title="Connection unstable." status="warning" />;
export const ErrorToast: Story = () => <Toast open title="Failed to upload file." status="error" />;

export const WithDescription: Story = () => (
  <Toast
    open
    status="success"
    title="Invite sent."
    description="alex@company.com will receive an email shortly."
  />
);

export const Interactive: Story = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
      <Button variant="primary" onClick={() => setOpen(true)}>Show toast</Button>
      <Toast
        open={open}
        status="success"
        title="Action completed."
        onClose={() => setOpen(false)}
      />
    </div>
  );
};
