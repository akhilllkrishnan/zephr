export interface TemplateNavEntry {
  id: string;
  label: string;
  category: "template" | "example";
}

export const templateCatalogMeta: TemplateNavEntry[] = [
  { id: "template-dashboard", label: "Dashboard", category: "template" },
  { id: "template-auth", label: "Auth", category: "template" },
  { id: "template-settings", label: "Settings", category: "template" },
  { id: "template-onboarding", label: "Onboarding", category: "template" },
  { id: "template-marketing", label: "Marketing", category: "template" },
  { id: "template-ops-center", label: "Ops Center", category: "example" },
  { id: "template-team-workspace", label: "Team Workspace", category: "example" },
  { id: "template-admin-hub", label: "Admin Hub", category: "example" },
  { id: "template-growth-workspace", label: "Growth Workspace", category: "example" },
  { id: "template-support-desk", label: "Support Desk", category: "example" },
  { id: "template-developer-console", label: "Developer Console", category: "example" },
  { id: "template-release-center", label: "Release Center", category: "example" },
  { id: "template-analytics-workspace", label: "Analytics Workspace", category: "example" },
  { id: "template-billing-console", label: "Billing Console", category: "example" },
  { id: "template-crm-workspace", label: "CRM Workspace", category: "example" },
  { id: "template-audit-center", label: "Audit Center", category: "example" },
  { id: "template-content-studio", label: "Content Studio", category: "example" },
  { id: "template-support-portal", label: "Support Portal", category: "example" },
  { id: "template-finance-workspace", label: "Finance Workspace", category: "example" },
  { id: "template-product-review-board", label: "Product Review Board", category: "example" },
];
