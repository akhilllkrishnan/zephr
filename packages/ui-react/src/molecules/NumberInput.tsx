"use client";
import { CSSProperties, KeyboardEvent, useRef, useState } from "react";

export interface NumberInputProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    /** Show formatted value with locale string */
    formatValue?: boolean;
    onChange?: (value: number) => void;
    className?: string;
    style?: CSSProperties;
}

export function NumberInput({
    value: controlledValue,
    defaultValue = 0,
    min,
    max,
    step = 1,
    disabled = false,
    placeholder = "0",
    label,
    formatValue = false,
    onChange,
    className,
    style
}: NumberInputProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    function clamp(v: number) {
        let n = v;
        if (min !== undefined) n = Math.max(min, n);
        if (max !== undefined) n = Math.min(max, n);
        return n;
    }

    function commit(next: number) {
        const clamped = clamp(next);
        if (!isControlled) setInternalValue(clamped);
        onChange?.(clamped);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const parsed = parseFloat(e.target.value);
        if (!Number.isNaN(parsed)) commit(parsed);
        else if (e.target.value === "" || e.target.value === "-") {
            if (!isControlled) setInternalValue(0);
        }
    }

    function handleKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "ArrowUp") { e.preventDefault(); commit(value + step); }
        if (e.key === "ArrowDown") { e.preventDefault(); commit(value - step); }
    }

    const displayValue = focused
        ? String(value)
        : formatValue
            ? value.toLocaleString()
            : String(value);

    const borderColor = focused
        ? "var(--z-color-primary, #335cff)"
        : "var(--z-color-border, #ebebeb)";

    const btnStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        flexShrink: 0,
        background: "var(--z-color-weak, #f7f7f7)",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        color: "var(--z-color-text, #171717)",
        fontSize: 16,
        lineHeight: 1
    };

    return (
        <div
            className={className}
            style={{
                display: "flex",
                alignItems: "stretch",
                border: `1px solid ${borderColor}`,
                borderRadius: "var(--z-radius-md, 8px)",
                overflow: "hidden",
                opacity: disabled ? 0.5 : 1,
                transition: "border-color 120ms ease",
                ...style
            }}
        >
            <button
                type="button"
                aria-label="Decrease"
                disabled={disabled || (min !== undefined && value <= min)}
                onClick={() => commit(value - step)}
                style={{ ...btnStyle, borderRight: "1px solid var(--z-color-border, #ebebeb)" }}
            >
                −
            </button>
            <input
                ref={inputRef}
                type="number"
                aria-label={label ?? "Number input"}
                value={displayValue}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                placeholder={placeholder}
                onFocus={(event) => setFocused(event.currentTarget.matches(":focus-visible"))}
                onBlur={() => setFocused(false)}
                onChange={handleChange}
                onKeyDown={handleKey}
                style={{
                    flex: 1,
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "var(--z-type-size-sm, 0.875rem)",
                    color: "var(--z-color-text, #171717)",
                    fontVariantNumeric: "tabular-nums",
                    minWidth: 0,
                    padding: "0 var(--z-space-2, 0.5rem)"
                }}
            />
            <button
                type="button"
                aria-label="Increase"
                disabled={disabled || (max !== undefined && value >= max)}
                onClick={() => commit(value + step)}
                style={{ ...btnStyle, borderLeft: "1px solid var(--z-color-border, #ebebeb)" }}
            >
                +
            </button>
        </div>
    );
}
