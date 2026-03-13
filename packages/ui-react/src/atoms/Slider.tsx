"use client";
import { CSSProperties, useCallback, useRef, useState } from "react";

export interface SliderProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    /** Accessible label */
    label?: string;
    /** Show min/max labels below the track */
    showRange?: boolean;
    /** Show current value bubble above thumb */
    showValue?: boolean;
    tone?: "primary" | "success" | "danger";
    size?: "sm" | "md" | "lg";
    onChange?: (value: number) => void;
    className?: string;
    style?: CSSProperties;
}

const sizeMap = {
    sm: { track: 4, thumb: 14 },
    md: { track: 6, thumb: 18 },
    lg: { track: 8, thumb: 22 }
};

const toneColorMap: Record<NonNullable<SliderProps["tone"]>, string> = {
    primary: "var(--z-color-primary, #335cff)",
    success: "var(--z-color-success, #1fc16b)",
    danger: "var(--z-color-danger, #ef4444)"
};

export function Slider({
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    label,
    showRange = false,
    showValue = false,
    tone = "primary",
    size = "md",
    onChange,
    className,
    style
}: SliderProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const trackRef = useRef<HTMLDivElement>(null);
    const { track, thumb } = sizeMap[size];
    const color = toneColorMap[tone];

    const percent = ((value - min) / (max - min)) * 100;

    const commit = useCallback(
        (next: number) => {
            const snapped = Math.round((next - min) / step) * step + min;
            const clamped = Math.min(max, Math.max(min, snapped));
            if (!isControlled) setInternalValue(clamped);
            onChange?.(clamped);
        },
        [min, max, step, isControlled, onChange]
    );

    function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        commit(min + ratio * (max - min));
    }

    function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
        if (disabled) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        handlePointerMove(e);
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (disabled) return;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") commit(value + step);
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") commit(value - step);
        if (e.key === "Home") commit(min);
        if (e.key === "End") commit(max);
    }

    return (
        <div
            className={className}
            style={{ display: "flex", flexDirection: "column", gap: "var(--z-space-1, 0.25rem)", ...style }}
        >
            <div
                ref={trackRef}
                role="slider"
                tabIndex={disabled ? -1 : 0}
                aria-label={label ?? "Slider"}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-disabled={disabled}
                onPointerDown={handlePointerDown}
                onPointerMove={(e) => { if (e.buttons === 1) handlePointerMove(e); }}
                onKeyDown={handleKeyDown}
                style={{
                    position: "relative",
                    height: thumb + 16,
                    display: "flex",
                    alignItems: "center",
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.5 : 1,
                    outline: "none"
                }}
            >
                {/* Track background */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        height: track,
                        borderRadius: 9999,
                        background: "var(--z-color-weak, #e8e8e8)"
                    }}
                />
                {/* Filled portion */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        left: 0,
                        width: `${percent}%`,
                        height: track,
                        borderRadius: 9999,
                        background: color,
                        transition: "width 60ms linear"
                    }}
                />
                {/* Thumb */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        left: `${percent}%`,
                        transform: "translateX(-50%)",
                        width: thumb,
                        height: thumb,
                        borderRadius: "50%",
                        background: "var(--z-color-surface, #ffffff)",
                        border: `2px solid ${color}`,
                        boxShadow: "0 1px 4px rgba(14,18,27,0.18)",
                        transition: "border-color 120ms ease",
                        zIndex: 1
                    }}
                />
                {/* Value bubble */}
                {showValue && (
                    <div
                        aria-hidden
                        style={{
                            position: "absolute",
                            left: `${percent}%`,
                            transform: "translateX(-50%) translateY(-100%)",
                            top: 0,
                            marginTop: -4,
                            background: "var(--z-color-text, #171717)",
                            color: "var(--z-color-primaryContrast, #ffffff)",
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "2px 6px",
                            borderRadius: 4,
                            whiteSpace: "nowrap",
                            pointerEvents: "none"
                        }}
                    >
                        {value}
                    </div>
                )}
            </div>
            {showRange && (
                <div
                    aria-hidden
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "var(--z-type-size-xs, 0.75rem)",
                        color: "var(--z-color-muted, #737373)"
                    }}
                >
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            )}
        </div>
    );
}
