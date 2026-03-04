"use client";
import { CSSProperties, KeyboardEvent, useId, useRef, useState } from "react";

export interface TagInputProps {
    /** Controlled tags array */
    value?: string[];
    /** Initial tags (uncontrolled) */
    defaultValue?: string[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    /** Maximum number of tags allowed */
    maxTags?: number;
    /** Validate a tag before adding; return false to reject */
    validate?: (tag: string) => boolean;
    onChange?: (tags: string[]) => void;
    className?: string;
    style?: CSSProperties;
}

export function TagInput({
    value: controlledTags,
    defaultValue = [],
    placeholder = "Add tag…",
    label,
    disabled = false,
    maxTags,
    validate,
    onChange,
    className,
    style
}: TagInputProps) {
    const [internalTags, setInternalTags] = useState<string[]>(defaultValue);
    const isControlled = controlledTags !== undefined;
    const tags = isControlled ? controlledTags : internalTags;

    const [inputValue, setInputValue] = useState("");
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();

    function addTag(raw: string) {
        const tag = raw.trim();
        if (!tag) return;
        if (tags.includes(tag)) { setInputValue(""); return; }
        if (maxTags !== undefined && tags.length >= maxTags) return;
        if (validate && !validate(tag)) return;

        const next = [...tags, tag];
        if (!isControlled) setInternalTags(next);
        onChange?.(next);
        setInputValue("");
    }

    function removeTag(index: number) {
        const next = tags.filter((_, i) => i !== index);
        if (!isControlled) setInternalTags(next);
        onChange?.(next);
    }

    function handleKey(e: KeyboardEvent<HTMLInputElement>) {
        if ((e.key === "Enter" || e.key === ",") && inputValue) {
            e.preventDefault();
            addTag(inputValue);
        } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    }

    const borderColor = focused
        ? "var(--z-color-primary, #335cff)"
        : "var(--z-color-border, #ebebeb)";

    return (
        <div
            id={id}
            className={className}
            onClick={() => inputRef.current?.focus()}
            style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "var(--z-space-1, 0.25rem)",
                minHeight: 40,
                padding: "var(--z-space-1, 0.25rem) var(--z-space-2, 0.5rem)",
                border: `1px solid ${borderColor}`,
                borderRadius: "var(--z-radius-md, 8px)",
                background: "var(--z-color-surface, #ffffff)",
                cursor: disabled ? "not-allowed" : "text",
                opacity: disabled ? 0.5 : 1,
                transition: "border-color 120ms ease",
                ...style
            }}
        >
            {tags.map((tag, i) => (
                <span
                    key={`${tag}-${i}`}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "2px var(--z-space-2, 0.5rem)",
                        borderRadius: "var(--z-radius-pill, 9999px)",
                        background: "var(--z-color-primary, #335cff)18",
                        color: "var(--z-color-primary, #335cff)",
                        fontSize: "var(--z-type-size-xs, 0.75rem)",
                        fontWeight: "var(--z-type-weight-medium, 500)" as CSSProperties["fontWeight"],
                        lineHeight: "20px"
                    }}
                >
                    {tag}
                    {!disabled && (
                        <button
                            type="button"
                            aria-label={`Remove ${tag}`}
                            onClick={(e) => { e.stopPropagation(); removeTag(i); }}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                                color: "inherit",
                                fontSize: 14,
                                lineHeight: 1,
                                display: "inline-flex",
                                alignItems: "center"
                            }}
                        >
                            ×
                        </button>
                    )}
                </span>
            ))}
            <input
                ref={inputRef}
                aria-label={label ?? "Tag input"}
                disabled={disabled}
                value={inputValue}
                placeholder={tags.length === 0 ? placeholder : ""}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKey}
                onBlur={(e) => { setFocused(false); addTag(e.target.value); }}
                onFocus={() => setFocused(true)}
                style={{
                    flex: "1 1 80px",
                    minWidth: 80,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "var(--z-type-size-sm, 0.875rem)",
                    color: "var(--z-color-text, #171717)",
                    padding: "0 var(--z-space-1, 0.25rem)"
                }}
            />
        </div>
    );
}
