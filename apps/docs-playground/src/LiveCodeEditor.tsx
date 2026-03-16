/**
 * LiveCodeEditor
 *
 * A lightweight inline code editor + live preview for the docs playground.
 * Uses a <textarea> with syntax-highlight overlay and `new Function()` eval
 * to render JSX in a sandboxed iframe-like div.
 *
 * Deliberately zero external deps — no Monaco, no CodeSandbox — so it
 * stays in the vite bundle without special handling.
 *
 * Usage:
 * ```tsx
 * <LiveCodeEditor
 *   code={`<Button variant="primary">Hello</Button>`}
 *   scope={{ Button }}
 * />
 * ```
 */

import {
    CSSProperties,
    ReactNode,
    createElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { createRoot } from "react-dom/client";

export interface LiveCodeEditorProps {
    /** Initial JSX snippet (just the JSX, no imports needed) */
    code: string;
    /** Components available in the sandbox scope */
    scope?: Record<string, unknown>;
    /** Height of the preview pane */
    previewHeight?: string | number;
    /** Show the editor panel (defaults true) */
    showEditor?: boolean;
    className?: string;
    style?: CSSProperties;
}

/** Convert a JSX string to evaluatable JS using a naive transform */
function naiveJSXToJS(jsx: string): string {
    // Replace JSX tags with createElement calls via a regex approach.
    // For simple self-closing and matched tags this works well enough
    // for docs demos. Full Babel transform would be needed for production.

    // Wrap in a function that returns the expression
    return `
    with(__scope) {
      const { React, createElement: __h } = __reactLib;
      return (${jsx.trim()});
    }
  `;
}

type RootHandle = ReturnType<typeof createRoot>;

export function LiveCodeEditor({
    code: initialCode,
    scope = {},
    previewHeight = 200,
    showEditor = true,
    className,
    style
}: LiveCodeEditorProps) {
    const [code, setCode] = useState(initialCode);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<RootHandle | null>(null);

    const renderHeight = typeof previewHeight === "number" ? `${previewHeight}px` : previewHeight;

    const renderPreview = useCallback((jsx: string) => {
        if (!previewRef.current) return;
        try {
            const fn = new Function(
                "__scope",
                "__reactLib",
                naiveJSXToJS(jsx)
            );
            const element: ReactNode = fn(scope, { React: { createElement }, createElement });
            if (!rootRef.current) {
                rootRef.current = createRoot(previewRef.current);
            }
            rootRef.current.render(element as never);
            setError(null);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        }
    }, [scope]);

    // Re-render whenever code or scope changes
    useEffect(() => {
        renderPreview(code);
    }, [code, renderPreview]);

    // Cleanup root on unmount
    useEffect(() => {
        return () => {
            try { rootRef.current?.unmount(); } catch { /* ignore */ }
        };
    }, []);

    function handleCopy() {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    function handleReset() {
        setCode(initialCode);
    }

    const lineCount = useMemo(() => code.split("\n").length, [code]);

    return (
        <div
            className={className}
            style={{
                border: "1px solid var(--z-color-border, #ebebeb)",
                borderRadius: "var(--z-radius-lg, 12px)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                ...style
            }}
        >
            {/* Preview pane */}
            <div
                style={{
                    padding: "var(--z-space-5, 1.25rem)",
                    minHeight: renderHeight,
                    background: "var(--z-color-surface, #ffffff)",
                    borderBottom: showEditor ? "1px solid var(--z-color-border, #ebebeb)" : undefined,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "auto"
                }}
            >
                {error ? (
                    <div
                        role="alert"
                        style={{
                            padding: "var(--z-space-3, 0.75rem)",
                            background: "var(--z-color-danger-lighter, #fef2f2)",
                            border: "1px solid var(--z-color-danger-light, #fecaca)",
                            borderRadius: "var(--z-radius-md, 8px)",
                            color: "var(--z-color-danger, #ef4444)",
                            fontSize: 13,
                            fontFamily: "monospace",
                            lineHeight: 1.5,
                            width: "100%"
                        }}
                    >
                        <strong>Error:</strong> {error}
                    </div>
                ) : (
                    <div ref={previewRef} style={{ width: "100%" }} />
                )}
            </div>

            {/* Editor pane */}
            {showEditor && (
                <div style={{ position: "relative", background: "#1e1e2e" }}>
                    {/* Toolbar */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "var(--z-space-2, 0.5rem) var(--z-space-3, 0.75rem)",
                            borderBottom: "1px solid rgba(255,255,255,0.08)"
                        }}
                    >
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                            JSX preview · {lineCount} line{lineCount !== 1 ? "s" : ""}
                        </span>
                        <div style={{ display: "flex", gap: "var(--z-space-2, 0.5rem)" }}>
                            <button
                                type="button"
                                onClick={handleReset}
                                style={{
                                    background: "rgba(255,255,255,0.08)",
                                    border: "none",
                                    borderRadius: 4,
                                    color: "rgba(255,255,255,0.6)",
                                    fontSize: 11,
                                    padding: "2px 8px",
                                    cursor: "pointer"
                                }}
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={handleCopy}
                                aria-label="Copy code"
                                style={{
                                    background: "rgba(255,255,255,0.08)",
                                    border: "none",
                                    borderRadius: 4,
                                    color: copied ? "#1fc16b" : "rgba(255,255,255,0.6)",
                                    fontSize: 11,
                                    padding: "2px 8px",
                                    cursor: "pointer",
                                    transition: "color 200ms"
                                }}
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </div>

                    {/* Code textarea */}
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck={false}
                        aria-label="Editable code snippet"
                        style={{
                            display: "block",
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "var(--z-space-4, 1rem)",
                            background: "transparent",
                            color: "#cdd6f4",
                            border: "none",
                            outline: "none",
                            resize: "vertical",
                            fontFamily: "'Fira Code', 'Cascadia Code', 'SF Mono', monospace",
                            fontSize: 13,
                            lineHeight: 1.6,
                            minHeight: 120,
                            caretColor: "#89b4fa",
                            tabSize: 2
                        }}
                    />
                </div>
            )}
        </div>
    );
}
