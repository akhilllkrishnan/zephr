import { CSSProperties, FormEvent, ReactNode } from "react";
import { Input } from "../atoms/Input";

export interface CommandAction {
  id: string;
  label: string;
  icon?: ReactNode;
  onRun: (query: string) => void;
}

export interface CommandBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  actions: CommandAction[];
  /** Show a spinner in the trailing action slot while a command is running */
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
}

const spinnerStyle: CSSProperties = {
  display: "inline-block",
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  border: "2px solid var(--z-color-muted, #5c5c5c)",
  borderTopColor: "transparent",
  animation: "z-spin 0.7s linear infinite",
  flexShrink: 0
};

export function CommandBar({ query, onQueryChange, actions, loading = false, className, style }: CommandBarProps) {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (actions[0] && !loading) {
      actions[0].onRun(query);
    }
  }

  return (
    <>
      <style>{`@keyframes z-spin { to { transform: rotate(360deg); } }`}</style>
      <form
        onSubmit={onSubmit}
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--z-space-2, 0.5rem)",
          ...style
        }}
        aria-busy={loading || undefined}
      >
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          disabled={loading}
        />
        {loading ? (
          <span aria-label="Running…" style={{ display: "flex", alignItems: "center", padding: "0 0.5rem" }}>
            <span aria-hidden style={spinnerStyle} />
          </span>
        ) : (
          actions.map((action) => (
            <button
              key={action.id}
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--z-space-2, 0.5rem)",
                paddingLeft: "var(--z-space-3, 0.75rem)",
                paddingRight: "var(--z-space-3, 0.75rem)",
                paddingTop: "var(--z-space-2, 0.5rem)",
                paddingBottom: "var(--z-space-2, 0.5rem)",
                borderRadius: "var(--z-radius-md, 0.5rem)",
                border: "1px solid var(--z-color-border, #ebebeb)",
                background: "var(--z-color-surface, #ffffff)",
                color: "var(--z-color-text, #171717)",
                fontSize: "14px",
                cursor: "pointer"
              }}
              onClick={() => action.onRun(query)}
            >
              {action.icon}
              {action.label}
            </button>
          ))
        )}
      </form>
    </>
  );
}
