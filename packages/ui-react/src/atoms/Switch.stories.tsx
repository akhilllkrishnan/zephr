import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
    title: "Atoms/Switch",
    component: Switch,
    tags: ["autodocs"],
    argTypes: {
        checked: { control: "boolean" },
        disabled: { control: "boolean" }
    }
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Off: Story = {
    args: { checked: false, label: "Enable notifications" }
};

export const On: Story = {
    args: { checked: true, label: "Enable notifications" }
};

export const Disabled: Story = {
    args: { checked: false, disabled: true, label: "Feature unavailable" }
};

export const TogglesOnClick: Story = {
    render: () => {
        // Uncontrolled demo
        const { useState } = require("react");
        function Demo() {
            const [on, setOn] = useState(false);
            return <Switch checked={on} onChange={setOn} label={on ? "On" : "Off"} />;
        }
        return <Demo />;
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const sw = canvas.getByRole("switch");
        expect(sw).toHaveAttribute("aria-checked", "false");
        await userEvent.click(sw);
        expect(sw).toHaveAttribute("aria-checked", "true");
    }
};

export const SpaceKeyToggles: Story = {
    render: () => {
        const { useState } = require("react");
        function Demo() {
            const [on, setOn] = useState(false);
            return <Switch checked={on} onChange={setOn} label="Space to toggle" />;
        }
        return <Demo />;
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const sw = canvas.getByRole("switch");
        sw.focus();
        await userEvent.keyboard(" ");
        expect(sw).toHaveAttribute("aria-checked", "true");
    }
};
