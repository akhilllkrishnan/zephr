import type { Story, StoryDefault } from "@ladle/react";
import { Tabs } from "@zephrui/ui-react";

export default { title: "Molecules / Tabs" } satisfies StoryDefault;

const basicItems = [
  { id: "overview", label: "Overview", content: <p style={{ padding: "1rem 0", margin: 0 }}>Overview content</p> },
  { id: "activity", label: "Activity", content: <p style={{ padding: "1rem 0", margin: 0 }}>Activity log</p> },
  { id: "settings", label: "Settings", content: <p style={{ padding: "1rem 0", margin: 0 }}>Settings panel</p> },
];

export const ThreeTabs: Story = () => <Tabs items={basicItems} />;

export const WithDisabledTab: Story = () => (
  <Tabs items={[
    { id: "active", label: "Active", content: <p style={{ padding: "1rem 0", margin: 0 }}>Active content</p> },
    { id: "archived", label: "Archived", content: <p style={{ padding: "1rem 0", margin: 0 }}>Archived</p>, disabled: true },
    { id: "deleted", label: "Deleted", content: <p style={{ padding: "1rem 0", margin: 0 }}>Deleted items</p> },
  ]} />
);

export const ManyTabs: Story = () => (
  <Tabs items={[
    "Dashboard", "Analytics", "Reports", "Members", "Billing", "Integrations", "API"
  ].map((label) => ({
    id: label.toLowerCase(),
    label,
    content: <p style={{ padding: "1rem 0", margin: 0 }}>{label} content</p>,
  }))} />
);
