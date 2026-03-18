export type WorkspaceView =
  | "introduction"
  | "getting-started"
  | "slash-commands"
  | "foundations"
  | "icons"
  | "component-gallery"
  | "components"
  | "api-reference"
  | "widgets"
  | "templates";

export type TopTab = "setup" | "components" | "icons" | "logos" | "changelog";
export type ShowcaseVersion = "v1" | "v2";

export interface SearchResultItem {
  id: string;
  kind: "doc" | "component";
  label: string;
  detail: string;
  /** Extra terms Fuse indexes but never displays */
  keywords?: string;
  tab: TopTab;
  view: WorkspaceView;
  anchor?: string;
  componentId?: string;
}
