import { useEffect, useRef, useState } from "react";

const ENDPOINT = import.meta.env.VITE_FEEDBACK_ENDPOINT as string | undefined;

type Status = "idle" | "sending" | "done" | "error";

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when panel opens
  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 60);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  async function submit() {
    const trimmed = text.trim();
    if (!trimmed || status === "sending") return;

    setStatus("sending");
    try {
      if (ENDPOINT) {
        await fetch(ENDPOINT, {
          method: "POST",
          mode: "no-cors", // Google Apps Script CORS workaround
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            feedback: trimmed,
            url: window.location.href,
            timestamp: new Date().toISOString(),
          }),
        });
      }
      setStatus("done");
      setTimeout(() => {
        setStatus("idle");
        setText("");
        setOpen(false);
      }, 2000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fbw-root">
      {open && (
        <div className="fbw-panel" role="dialog" aria-label="Send feedback">
          <div className="fbw-header">
            <span className="fbw-title">Send feedback</span>
            <button
              className="fbw-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <span className="ms">close</span>
            </button>
          </div>

          {status === "done" ? (
            <div className="fbw-success">
              <span className="ms fbw-success-icon">check_circle</span>
              <p>Thanks for the feedback!</p>
            </div>
          ) : (
            <>
              <textarea
                ref={textareaRef}
                className="fbw-textarea"
                placeholder="What's working? What's broken? What's missing?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
                }}
                rows={4}
                disabled={status === "sending"}
              />
              {status === "error" && (
                <p className="fbw-error">Submission failed — try again.</p>
              )}
              <div className="fbw-footer">
                <span className="fbw-hint">⌘↵ to send</span>
                <button
                  className="fbw-submit"
                  onClick={submit}
                  disabled={!text.trim() || status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send"}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <button
        className={`fbw-trigger${open ? " fbw-trigger--active" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Send feedback"
        aria-expanded={open}
      >
        <span className="ms fbw-trigger-icon">rate_review</span>
        <span className="fbw-trigger-label">Feedback</span>
      </button>
    </div>
  );
}
