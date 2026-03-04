"use client";
import {
    CSSProperties,
    KeyboardEvent,
    useEffect,
    useId,
    useRef,
    useState
} from "react";

export interface ComboBoxOption {
    value: string;
    label: string;
    disabled?: boolean;
    /** Optional secondary text */
    description?: string;
}

export interface ComboBoxProps {
    options: ComboBoxOption[];
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    /** Accessible label */
    label?: string;
    disabled?: boolean;
    /** Allow entering values not in the options list */
    allowCustomValue?: boolean;
    /** Called when selection changes */
    onChange?: (value: string) => void;
    /** Called while the user types */
    onInputChange?: (query: string) => void;
    /** When true, show a loading spinner (for async options) */
    loading?: boolean;
    /** Message when no options match */
    emptyMessage?: string;
    className?: string;
    style?: CSSProperties;
}

export function ComboBox({
    options,
    value: controlledValue,
    defaultValue = "",
    placeholder = "Search…",
    label,
    disabled = false,
    allowCustomValue = false,
    onChange,
    onInputChange,
    loading = false,
    emptyMessage = "No results found",
    className,
    style
}: ComboBoxProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const selectedValue = isControlled ? controlledValue : internalValue;

    const [query, setQuery] = useState(
        () => options.find((o) => o.value === selectedValue)?.label ?? selectedValue
    );
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    const listId = useId();
    const optionIdPrefix = useId();

    const filtered = options.filter((o) =>
        !query || o.label.toLowerCase().includes(query.toLowerCase())
    );

    function selectOption(opt: ComboBoxOption) {
        if (opt.disabled) return;
        setQuery(opt.label);
        setOpen(false);
        setActiveIndex(-1);
        if (!isControlled) setInternalValue(opt.value);
        onChange?.(opt.value);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const v = e.target.value;
        setQuery(v);
        setOpen(true);
        setActiveIndex(-1);
        onInputChange?.(v);
        if (allowCustomValue) {
            if (!isControlled) setInternalValue(v);
            onChange?.(v);
        }
    }

    function handleKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, -1));
        } else if (e.key === "Enter") {
            if (activeIndex >= 0 && filtered[activeIndex]) {
                e.preventDefault();
                selectOption(filtered[activeIndex]);
            }
        } else if (e.key === "Escape") {
            setOpen(false);
            setActiveIndex(-1);
        }
    }

    // Scroll active item into view
    useEffect(() => {
        if (!listRef.current || activeIndex < 0) return;
        const item = listRef.current.children[activeIndex] as HTMLElement | null;
        item?.scrollIntoView?.({ block: "nearest" });
    }, [activeIndex]);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        function onPD(e: PointerEvent) {
            if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("pointerdown", onPD);
        return () => document.removeEventListener("pointerdown", onPD);
    }, [open]);

    const inputStyle: CSSProperties = {
        width: "100%",
        height: 38,
        padding: "0 var(--z-space-3, 0.75rem)",
        fontSize: "var(--z-type-size-sm, 0.875rem)",
        color: "var(--z-color-text, #171717)",
        background: "var(--z-color-surface, #ffffff)",
        border: "1px solid var(--z-color-border, #ebebeb)",
        borderRadius: "var(--z-radius-md, 8px)",
        outline: "none",
        boxSizing: "border-box" as const,
        cursor: disabled ? "not-allowed" : "text",
        opacity: disabled ? 0.5 : 1
    };

    return (
        <div
            ref={wrapRef}
            className={className}
            style={{ position: "relative", display: "flex", flexDirection: "column", ...style }}
        >
            <input
                ref={inputRef}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls={open ? listId : undefined}
                aria-activedescendant={
                    activeIndex >= 0 ? `${optionIdPrefix}-${activeIndex}` : undefined
                }
                aria-label={label ?? placeholder}
                disabled={disabled}
                value={query}
                placeholder={placeholder}
                onChange={handleInputChange}
                onFocus={() => setOpen(true)}
                onKeyDown={handleKey}
                autoComplete="off"
                style={inputStyle}
            />
            {/* Caret icon */}
            <span
                aria-hidden
                style={{
                    position: "absolute",
                    right: "var(--z-space-3, 0.75rem)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "var(--z-color-muted, #737373)",
                    fontSize: 12,
                    lineHeight: 1
                }}
            >
                {open ? "▲" : "▼"}
            </span>

            {open && (
                <ul
                    ref={listRef}
                    id={listId}
                    role="listbox"
                    aria-label={label ?? "Options"}
                    style={{
                        position: "absolute",
                        top: "calc(100% + 4px)",
                        left: 0,
                        right: 0,
                        zIndex: 300,
                        background: "var(--z-color-surface, #ffffff)",
                        border: "1px solid var(--z-color-border, #ebebeb)",
                        borderRadius: "var(--z-radius-md, 10px)",
                        boxShadow: "0 8px 24px rgba(14,18,27,0.12)",
                        padding: "var(--z-space-1, 0.25rem)",
                        maxHeight: "240px",
                        overflowY: "auto",
                        listStyle: "none",
                        margin: 0
                    }}
                >
                    {loading && (
                        <li aria-live="polite" style={{ padding: "var(--z-space-2, 0.5rem) var(--z-space-3, 0.75rem)", color: "var(--z-color-muted, #737373)", fontSize: 14 }}>
                            Loading…
                        </li>
                    )}
                    {!loading && filtered.length === 0 && (
                        <li style={{ padding: "var(--z-space-2, 0.5rem) var(--z-space-3, 0.75rem)", color: "var(--z-color-muted, #737373)", fontSize: 14 }}>
                            {emptyMessage}
                        </li>
                    )}
                    {!loading && filtered.map((opt, i) => {
                        const isActive = i === activeIndex;
                        const isSelected = opt.value === selectedValue;
                        return (
                            <li
                                key={opt.value}
                                id={`${optionIdPrefix}-${i}`}
                                role="option"
                                aria-selected={isSelected}
                                aria-disabled={opt.disabled}
                                onClick={() => selectOption(opt)}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "var(--z-space-2, 0.5rem) var(--z-space-3, 0.75rem)",
                                    borderRadius: "var(--z-radius-sm, 6px)",
                                    cursor: opt.disabled ? "not-allowed" : "pointer",
                                    background: isActive
                                        ? "var(--z-color-weak, #f5f5f5)"
                                        : isSelected
                                            ? "var(--z-color-primary, #335cff)14"
                                            : "transparent",
                                    color: opt.disabled ? "var(--z-color-muted, #737373)" : "var(--z-color-text, #171717)",
                                    fontSize: 14,
                                    lineHeight: "20px",
                                    outline: "none"
                                }}
                            >
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span>{opt.label}</span>
                                    {isSelected && <span aria-hidden style={{ fontSize: 12 }}>✓</span>}
                                </span>
                                {opt.description && (
                                    <span style={{ fontSize: 12, color: "var(--z-color-muted, #737373)" }}>
                                        {opt.description}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
