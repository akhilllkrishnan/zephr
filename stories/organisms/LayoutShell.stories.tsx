import type { Meta, StoryObj } from "@storybook/react";
import { Badge, DataTable, Header, Navbar } from "@zephyr/ui-react";

const teamRows = [
  { id: "1", name: "Akhil", role: "Designer", squad: "Core" },
  { id: "2", name: "Maya", role: "Engineer", squad: "Platform" },
  { id: "3", name: "Noah", role: "Design Systems", squad: "Identity" }
];

function LayoutShell() {
  return (
    <div style={{ width: "min(1100px, 95vw)", display: "grid", gap: "0.8rem" }}>
      <Navbar
        brand={<strong>Zephyr</strong>}
        links={[
          { id: "home", label: "Home", href: "#" },
          { id: "docs", label: "Docs", href: "#" },
          { id: "components", label: "Components", href: "#" }
        ]}
        actions={<Badge tone="info">Live</Badge>}
      />

      <Header title="Team Directory" subtitle="Organism composition preview" />

      <DataTable
        data={teamRows}
        rowKey={(row) => row.id}
        columns={[
          { id: "name", header: "Name", accessor: "name" },
          { id: "role", header: "Role", accessor: "role" },
          { id: "squad", header: "Squad", accessor: "squad" }
        ]}
      />
    </div>
  );
}

const meta = {
  title: "Organisms/Layout Shell",
  component: LayoutShell,
  tags: ["autodocs"]
} satisfies Meta<typeof LayoutShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
