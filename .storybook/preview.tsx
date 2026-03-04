import { ReactNode, useEffect } from "react";
import type { Decorator, Preview } from "@storybook/react";
import {
  compileUtilities,
  resolveConfig,
  stylePackNames,
  type StylePackName
} from "@zephyr/core/browser";

const STORYBOOK_THEME_STYLE_ID = "zephyr-storybook-theme";

function ZephyrThemeProvider({
  stylePack,
  children
}: {
  stylePack: StylePackName;
  children: ReactNode;
}) {
  useEffect(() => {
    const resolved = resolveConfig({ stylePack, prefix: "z" });
    const css = compileUtilities(resolved.tokens, {
      prefix: resolved.prefix,
      includeResponsive: true
    });

    let styleTag = document.getElementById(STORYBOOK_THEME_STYLE_ID) as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = STORYBOOK_THEME_STYLE_ID;
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = css;
  }, [stylePack]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "1.25rem",
        background:
          "radial-gradient(850px circle at 5% 0%, rgba(59,130,246,0.12), transparent 40%), var(--z-color-background)",
        color: "var(--z-color-text)"
      }}
    >
      {children}
    </div>
  );
}

const withZephyrTheme: Decorator = (Story, context) => {
  const stylePack = (context.globals.stylePack as StylePackName) ?? "Studio";
  return (
    <ZephyrThemeProvider stylePack={stylePack}>
      <Story />
    </ZephyrThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withZephyrTheme],
  globalTypes: {
    stylePack: {
      description: "Zephyr visual style pack",
      toolbar: {
        title: "Style Pack",
        icon: "paintbrush",
        dynamicTitle: true,
        items: stylePackNames.map((pack) => ({ value: pack, title: pack }))
      }
    }
  },
  initialGlobals: {
    stylePack: "Studio"
  },
  parameters: {
    controls: { expanded: true },
    layout: "centered",
    options: {
      storySort: {
        order: ["Atoms", "Molecules", "Organisms"]
      }
    }
  }
};

export default preview;
