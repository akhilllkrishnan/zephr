import React from "react";
import type { Story, StoryDefault } from "@ladle/react";
import { ModalDialog, Button } from "@zephrui/ui-react";

export default { title: "Organisms / ModalDialog" } satisfies StoryDefault;

export const AlwaysOpen: Story = () => (
  <ModalDialog
    open
    title="Confirm action"
    description="Are you sure you want to proceed? This cannot be undone."
    confirmLabel="Confirm"
    cancelLabel="Cancel"
    onConfirm={() => {}}
    onCancel={() => {}}
  />
);

export const Interactive: Story = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open modal</Button>
      <ModalDialog
        open={open}
        title="Delete project"
        description="This will permanently delete the project and all associated data."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export const WithLoading: Story = () => (
  <ModalDialog
    open
    title="Saving changes…"
    loading
    onCancel={() => {}}
    confirmLabel="Save"
    cancelLabel="Cancel"
  />
);

export const WithError: Story = () => (
  <ModalDialog
    open
    title="Submit form"
    error="Server returned 500. Please try again."
    onCancel={() => {}}
    onConfirm={() => {}}
    confirmLabel="Retry"
    cancelLabel="Cancel"
  />
);

export const WithChildren: Story = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open with content</Button>
      <ModalDialog
        open={open}
        title="Invite team member"
        confirmLabel="Send invite"
        cancelLabel="Cancel"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input placeholder="Name" style={{ padding: "0.5rem 0.75rem", borderRadius: 6, border: "1px solid var(--z-color-stroke200)", width: "100%", boxSizing: "border-box" }} />
          <input placeholder="Email address" style={{ padding: "0.5rem 0.75rem", borderRadius: 6, border: "1px solid var(--z-color-stroke200)", width: "100%", boxSizing: "border-box" }} />
        </div>
      </ModalDialog>
    </>
  );
};
