import type { GlobalProvider } from "@ladle/react";
import { ThemeState } from "@ladle/react";
import "@zephrui/ui-react/themes/default.css";

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const isDark = globalState.theme === ThemeState.Dark;
  return (
    <div
      data-theme={isDark ? "dark" : "light"}
      style={{
        padding: "2rem",
        minHeight: "100vh",
        background: isDark ? "var(--z-color-background0)" : "var(--z-color-background0)",
        transition: "background 200ms ease",
      }}
    >
      {children}
    </div>
  );
};
