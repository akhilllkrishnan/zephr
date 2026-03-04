import { CSSProperties, FormEvent } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

export interface SearchBoxProps {
  value: string;
  onValueChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}

export function SearchBox({
  value,
  onValueChange,
  onSearch,
  placeholder = "Search...",
  className,
  style
}: SearchBoxProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(value);
  }

  return (
    <form
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--z-space-2, 0.5rem)",
        ...style
      }}
      onSubmit={handleSubmit}
    >
      <Input
        aria-label="Search input"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
