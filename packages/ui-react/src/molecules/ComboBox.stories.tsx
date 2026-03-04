import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect, waitFor } from "@storybook/test";
import { ComboBox } from "./ComboBox";

const FRAMEWORKS = [
    { value: "react", label: "React", description: "Meta's UI library" },
    { value: "vue", label: "Vue", description: "Evan You's progressive framework" },
    { value: "svelte", label: "Svelte", description: "Compiler-first approach" },
    { value: "angular", label: "Angular", description: "Google's full platform" }
];

const meta: Meta<typeof ComboBox> = {
    title: "Molecules/ComboBox",
    component: ComboBox,
    tags: ["autodocs"],
    argTypes: {
        loading: { control: "boolean" },
        allowCustomValue: { control: "boolean" }
    }
};

export default meta;
type Story = StoryObj<typeof ComboBox>;

export const Default: Story = {
    args: { options: FRAMEWORKS, placeholder: "Select framework" }
};

export const Loading: Story = {
    args: { options: [], loading: true, placeholder: "Searching…" }
};

export const CustomValue: Story = {
    args: { options: FRAMEWORKS, allowCustomValue: true, placeholder: "Type or select" }
};

export const TypeToFilter: Story = {
    args: { options: FRAMEWORKS, placeholder: "Search frameworks" },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("combobox");
        await userEvent.click(input);
        await userEvent.type(input, "vue");
        await waitFor(() => {
            const list = canvas.getByRole("listbox");
            expect(within(list).getAllByRole("option")).toHaveLength(1);
        });
    }
};

export const SelectWithKeyboard: Story = {
    args: { options: FRAMEWORKS, placeholder: "Keyboard select" },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("combobox");
        input.focus();
        await userEvent.keyboard("{ArrowDown}");
        await userEvent.keyboard("{ArrowDown}");
        await userEvent.keyboard("{Enter}");
        // Second option (Vue) should now be the displayed value
        await waitFor(() => {
            expect((input as HTMLInputElement).value).toBe("Vue");
        });
    }
};
