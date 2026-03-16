import React from "react";
import type { Story, StoryDefault } from "@ladle/react";
import { Switch } from "@zephrui/ui-react";

export default { title: "Atoms / Switch" } satisfies StoryDefault;

export const Off: Story = () => <Switch checked={false} onChange={() => {}} label="Notifications" />;
export const On: Story = () => <Switch checked={true} onChange={() => {}} label="Notifications" />;
export const Small: Story = () => <Switch checked={true} onChange={() => {}} size="sm" label="Compact" />;
export const Disabled: Story = () => <Switch checked={false} onChange={() => {}} disabled label="Unavailable" />;
export const DisabledOn: Story = () => <Switch checked={true} onChange={() => {}} disabled label="Locked on" />;

export const Controlled: Story = () => {
  const [on, setOn] = React.useState(false);
  return <Switch checked={on} onChange={setOn} label={on ? "Enabled" : "Disabled"} />;
};

export const SettingsGroup: Story = () => {
  const [vals, setVals] = React.useState({ email: true, push: false, sms: false });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 280 }}>
      {(Object.keys(vals) as Array<keyof typeof vals>).map((key) => (
        <Switch
          key={key}
          label={key.charAt(0).toUpperCase() + key.slice(1) + " notifications"}
          checked={vals[key]}
          onChange={(v) => setVals((prev) => ({ ...prev, [key]: v }))}
        />
      ))}
    </div>
  );
};
