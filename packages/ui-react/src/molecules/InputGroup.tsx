import { CSSProperties, ReactNode } from "react";
import { Input, InputProps } from "../atoms/Input";

export interface InputGroupProps extends Omit<InputProps, "prefix"> {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  style?: CSSProperties;
}

export function InputGroup({
  startAdornment,
  endAdornment,
  prefix,
  suffix,
  className,
  style,
  ...props
}: InputGroupProps) {
  const leading = startAdornment ?? prefix;
  const trailing = endAdornment ?? suffix;

  const adornmentStyle: CSSProperties = {
    paddingLeft: "var(--z-space-3, 0.75rem)",
    paddingRight: "var(--z-space-3, 0.75rem)",
    color: "var(--z-color-muted, #5c5c5c)",
    display: "flex",
    alignItems: "center",
    flexShrink: 0
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid var(--z-color-border, #ebebeb)",
        borderRadius: "var(--z-radius-md, 0.5rem)",
        background: "var(--z-color-surface, #ffffff)",
        overflow: "hidden",
        ...style
      }}
    >
      {leading ? <span style={adornmentStyle}>{leading}</span> : null}
      <Input
        style={{ border: 0, borderRadius: 0, boxShadow: "none", flex: 1 }}
        {...props}
      />
      {trailing ? <span style={adornmentStyle}>{trailing}</span> : null}
    </div>
  );
}
