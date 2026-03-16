import type { Story, StoryDefault } from "@ladle/react";
import { Select } from "@zephrui/ui-react";

export default { title: "Atoms / Select" } satisfies StoryDefault;

const options = (
  <>
    <option value="">Choose a role…</option>
    <option value="admin">Admin</option>
    <option value="editor">Editor</option>
    <option value="viewer">Viewer</option>
  </>
);

export const Default: Story = () => <Select>{options}</Select>;
export const ExtraSmall: Story = () => <Select controlSize="xs">{options}</Select>;
export const Small: Story = () => <Select controlSize="sm">{options}</Select>;
export const Medium: Story = () => <Select controlSize="md">{options}</Select>;
export const Disabled: Story = () => <Select disabled defaultValue="viewer">{options}</Select>;
