import {
  Button,
  Header,
  Navbar,
  SearchBox,
  DataTable
} from "@zephrui/ui-react";
import { useMemo, useState } from "react";

interface Row {
  id: string;
  name: string;
  role: string;
}

const rows: Row[] = [
  { id: "1", name: "Akhil", role: "Designer" },
  { id: "2", name: "Sam", role: "Engineer" },
  { id: "3", name: "Ivy", role: "PM" }
];

export default function App() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => rows.filter((row) => row.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <main className="z-bg-background z-text-text z-p-4 z-flex z-gap-4" style={{ flexDirection: "column" }}>
      <Navbar
        brand={<strong>Zephr</strong>}
        links={[{ id: "docs", label: "Docs", href: "#" }]}
        actions={<Button>New</Button>}
      />

      <Header title="Team" subtitle="Consistency-first UI for vibe coding" />

      <SearchBox value={query} onValueChange={setQuery} onSearch={setQuery} />

      <DataTable
        data={filtered}
        columns={[
          { id: "name", header: "Name", accessor: "name" },
          { id: "role", header: "Role", accessor: "role" }
        ]}
        rowKey={(row) => row.id}
      />
    </main>
  );
}
