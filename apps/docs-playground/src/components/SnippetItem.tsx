import { Badge } from "@zephrui/ui-react";

interface SnippetItemProps {
  label: string;
  code: string;
  onCopy: () => void;
  beta?: boolean;
}

export function SnippetItem({ label, code, onCopy, beta }: SnippetItemProps) {
  return (
    <div className="snippet-item">
      <div className="snippet-item-head">
        <span className="snippet-item-label">{label}</span>
        <div className="snippet-item-actions">
          {beta ? (
            <Badge size="md" variant="stroke" color="yellow">
              Private Beta
            </Badge>
          ) : null}
          <button type="button" className="snippet-item-copy" onClick={onCopy}>Copy</button>
        </div>
      </div>
      <pre>{code}</pre>
    </div>
  );
}
