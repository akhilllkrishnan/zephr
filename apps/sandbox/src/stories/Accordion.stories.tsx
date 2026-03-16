import type { Story, StoryDefault } from "@ladle/react";
import { Accordion } from "@zephrui/ui-react";

export default { title: "Molecules / Accordion" } satisfies StoryDefault;

const items = [
  { id: "a", title: "What is Zephr?", content: <p style={{ margin: 0 }}>Zephr is an AI-native design system for building production UI faster.</p> },
  { id: "b", title: "How does dark mode work?", content: <p style={{ margin: 0 }}>Set <code>data-theme="dark"</code> on a container to activate dark tokens.</p> },
  { id: "c", title: "Can I use it with Next.js?", content: <p style={{ margin: 0 }}>Yes. Install <code>@zephrui/ui-react</code> and import the CSS in your root layout.</p> },
];

export const Default: Story = () => <Accordion items={items} style={{ maxWidth: 560 }} />;

export const DefaultOpen: Story = () => (
  <Accordion items={items} defaultOpenIds={["a"]} style={{ maxWidth: 560 }} />
);

export const AllowMultiple: Story = () => (
  <Accordion items={items} allowMultiple defaultOpenIds={["a", "b"]} style={{ maxWidth: 560 }} />
);

export const IconLeft: Story = () => (
  <Accordion items={items} iconPosition="left" style={{ maxWidth: 560 }} />
);

export const WithDescriptions: Story = () => (
  <Accordion
    items={[
      { id: "x", title: "Tokens", description: "Design tokens reference", content: <p style={{ margin: 0 }}>Token documentation…</p> },
      { id: "y", title: "Components", description: "Component API reference", content: <p style={{ margin: 0 }}>Component docs…</p> },
      { id: "z", title: "Templates", description: "Full page templates", content: <p style={{ margin: 0 }}>Template gallery…</p> },
    ]}
    style={{ maxWidth: 560 }}
  />
);
