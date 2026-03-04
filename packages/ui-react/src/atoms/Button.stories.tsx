import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "@storybook/test";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
    title: "Atoms/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary", "ghost", "danger"]
        },
        size: { control: "select", options: ["sm", "md", "lg"] },
        disabled: { control: "boolean" }
    }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: { children: "Save changes", variant: "primary" }
};

export const Secondary: Story = {
    args: { children: "Cancel", variant: "secondary" }
};

export const Ghost: Story = {
    args: { children: "Learn more", variant: "ghost" }
};

export const Danger: Story = {
    args: { children: "Delete account", variant: "danger" }
};

export const Small: Story = {
    args: { children: "Compact", size: "sm" }
};

export const Large: Story = {
    args: { children: "Large CTA", size: "lg" }
};

export const Disabled: Story = {
    args: { children: "Not available", disabled: true }
};

// ---- Interaction tests ----

export const ClickCallsOnClick: Story = {
    args: { children: "Click me", onClick: fn() },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: /click me/i });
        await userEvent.click(button);
        expect(args.onClick).toHaveBeenCalledTimes(1);
    }
};

export const DisabledDoesNotFire: Story = {
    args: { children: "No fire", disabled: true, onClick: fn() },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: /no fire/i });
        await userEvent.click(button);
        expect(args.onClick).not.toHaveBeenCalled();
    }
};

export const KeyboardActivation: Story = {
    args: { children: "Press Enter", onClick: fn() },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: /press enter/i });
        button.focus();
        await userEvent.keyboard("{Enter}");
        expect(args.onClick).toHaveBeenCalledTimes(1);
    }
};
