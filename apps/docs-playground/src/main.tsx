import { Component, ErrorInfo, ReactNode, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class AppErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: ""
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || "Unknown runtime error."
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[docs-playground] runtime error", error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="app-error-shell" role="alert" aria-live="assertive">
          <section className="app-error-card">
            <h1>Something went wrong</h1>
            <p>Zephyr docs hit a runtime error. Reload to recover.</p>
            <pre>{this.state.message}</pre>
            <button type="button" onClick={() => window.location.reload()}>
              Reload page
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find #root element");
}

createRoot(container).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>
);
