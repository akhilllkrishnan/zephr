"use client";
import { CSSProperties, FormEvent, ReactNode, useState } from "react";
import { Avatar } from "../atoms/Avatar";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { Switch } from "../atoms/Switch";
import { Input } from "../atoms/Input";
import { Textarea } from "../atoms/Textarea";
import { FormField } from "../molecules/FormField";
import { Stack } from "../layout/Stack";
import { Box } from "../layout/Box";

/* ---------- Inline SVG icons ---------- */

const CameraIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export interface SettingsSection {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

export interface SettingsPageProps {
  title?: string;
  subtitle?: string;
  sections?: SettingsSection[];
  /** Show built-in example sections if sections not provided */
  useDefaultSections?: boolean;
  className?: string;
  style?: CSSProperties;
}

function ProfileSection() {
  const [name, setName] = useState("Akhil Krishnan");
  const [email, setEmail] = useState("akhil@zephyr.design");
  const [bio, setBio] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setSuccess("");
    await new Promise((r) => setTimeout(r, 1000));
    setPending(false);
    setSuccess("Profile saved.");
  }

  return (
    <form onSubmit={handleSave}>
      <Stack direction="vertical" gap={6}>
        {/* Avatar upload placeholder */}
        <Stack direction="horizontal" gap={4} align="center">
          <div style={{ position: "relative" }}>
            <Avatar name={name} size={64} />
            <div
              style={{
                position: "absolute",
                bottom: "-2px",
                right: "-2px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "var(--z-color-primary, #121212)",
                color: "var(--z-color-primaryContrast, #fff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "2px solid var(--z-color-surface, #fff)"
              }}
            >
              <CameraIcon />
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "1rem", color: "var(--z-color-text, #171717)" }}>{name}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--z-color-muted, #5c5c5c)" }}>{email}</div>
          </div>
        </Stack>

        {/* Name + Email side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--z-space-4, 1rem)" }}>
          <FormField label="Display Name" htmlFor="s-name" pending={pending} success={success}>
            <Input id="s-name" value={name} onChange={(e) => setName(e.target.value)} />
          </FormField>
          <FormField label="Email" htmlFor="s-email">
            <Input id="s-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormField>
        </div>

        {/* Bio textarea */}
        <FormField label="Bio" htmlFor="s-bio">
          <Textarea
            id="s-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A short bio about yourself..."
            rows={3}
          />
        </FormField>

        <div>
          <Button type="submit" loading={pending}>Save changes</Button>
        </div>
      </Stack>
    </form>
  );
}

function NotificationsSection() {
  const [email, setEmail] = useState(true);
  const [slack, setSlack] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [security, setSecurity] = useState(true);

  const groups = [
    {
      title: "Activity",
      items: [
        { id: "email", label: "Email notifications", desc: "Get notified when someone mentions you or assigns a task.", value: email, onChange: setEmail },
        { id: "slack", label: "Slack notifications", desc: "Receive real-time alerts in your Slack workspace.", value: slack, onChange: setSlack }
      ]
    },
    {
      title: "Marketing",
      items: [
        { id: "weekly", label: "Weekly digest", desc: "A summary of your activity sent every Monday.", value: weekly, onChange: setWeekly },
        { id: "marketing", label: "Product updates", desc: "New features, changelogs, and tips.", value: marketing, onChange: setMarketing }
      ]
    },
    {
      title: "Security",
      items: [
        { id: "security", label: "Security alerts", desc: "Alerts for suspicious logins and password changes.", value: security, onChange: setSecurity }
      ]
    }
  ];

  return (
    <Stack direction="vertical" gap={6}>
      {groups.map((group) => (
        <div key={group.title}>
          <div style={{ fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--z-color-muted, #5c5c5c)", marginBottom: "var(--z-space-3, 0.75rem)" }}>
            {group.title}
          </div>
          <Stack direction="vertical" gap={0}>
            {group.items.map((row, i) => (
              <div
                key={row.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--z-space-3, 0.75rem) 0",
                  borderBottom: i < group.items.length - 1 ? "1px solid var(--z-color-border, #e5e5e5)" : "none"
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--z-color-text, #171717)" }}>{row.label}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--z-color-muted, #5c5c5c)", marginTop: "2px" }}>{row.desc}</div>
                </div>
                <Switch checked={row.value} onChange={row.onChange} label={row.label} />
              </div>
            ))}
          </Stack>
        </div>
      ))}
    </Stack>
  );
}

function TeamSection() {
  const members = [
    { name: "Akhil Krishnan", email: "akhil@zephyr.design", role: "Owner" },
    { name: "Maya Carter", email: "maya@zephyr.design", role: "Admin" },
    { name: "Noah Kim", email: "noah@zephyr.design", role: "Member" },
    { name: "Liam Torres", email: "liam@zephyr.design", role: "Member" }
  ];

  const roleTone: Record<string, "success" | "info" | "neutral"> = {
    Owner: "success",
    Admin: "info",
    Member: "neutral"
  };

  return (
    <Stack direction="vertical" gap={4}>
      <Stack direction="horizontal" gap={0} align="center" style={{ justifyContent: "space-between" } as CSSProperties}>
        <div>
          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--z-color-text, #171717)" }}>Team members</div>
          <div style={{ fontSize: "0.75rem", color: "var(--z-color-muted, #5c5c5c)" }}>{members.length} members</div>
        </div>
        <Button size="sm">Invite member</Button>
      </Stack>

      <Box padding={0} radius="lg" border style={{ overflow: "hidden", background: "var(--z-color-surface, #fff)" } as CSSProperties}>
        {members.map((m, i) => (
          <div
            key={m.email}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--z-space-3, 0.75rem)",
              padding: "var(--z-space-3, 0.75rem) var(--z-space-4, 1rem)",
              borderBottom: i < members.length - 1 ? "1px solid var(--z-color-border, #e5e5e5)" : "none"
            }}
          >
            <Avatar name={m.name} size={32} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--z-color-text, #171717)" }}>{m.name}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--z-color-muted, #5c5c5c)" }}>{m.email}</div>
            </div>
            <Badge tone={roleTone[m.role] ?? "neutral"}>{m.role}</Badge>
          </div>
        ))}
      </Box>
    </Stack>
  );
}

function DangerSection() {
  return (
    <Stack direction="vertical" gap={5}>
      <Box
        padding={5}
        radius="lg"
        border
        style={{
          background: "var(--z-color-surface, #ffffff)",
          borderLeft: "3px solid var(--z-color-danger, #fb3748)"
        } as CSSProperties}
      >
        <Stack direction="vertical" gap={3}>
          <div>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--z-color-text, #171717)" }}>Deactivate account</div>
            <p style={{ margin: "var(--z-space-1, 0.25rem) 0 0", fontSize: "0.78rem", color: "var(--z-color-muted, #5c5c5c)", lineHeight: 1.5 }}>
              Temporarily disable your account. You can reactivate it anytime by signing back in.
            </p>
          </div>
          <div>
            <Button variant="secondary" size="sm">Deactivate</Button>
          </div>
        </Stack>
      </Box>

      <Box
        padding={5}
        radius="lg"
        border
        style={{
          background: "var(--z-color-surface, #ffffff)",
          borderLeft: "3px solid var(--z-color-danger, #fb3748)"
        } as CSSProperties}
      >
        <Stack direction="vertical" gap={3}>
          <div>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--z-color-danger, #fb3748)" }}>Delete account</div>
            <p style={{ margin: "var(--z-space-1, 0.25rem) 0 0", fontSize: "0.78rem", color: "var(--z-color-muted, #5c5c5c)", lineHeight: 1.5 }}>
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <div>
            <Button variant="danger" size="sm">Delete Account</Button>
          </div>
        </Stack>
      </Box>
    </Stack>
  );
}

const DEFAULT_SECTIONS: SettingsSection[] = [
  { id: "profile", label: "Profile", icon: <UserIcon />, content: <ProfileSection /> },
  { id: "notifications", label: "Notifications", icon: <BellIcon />, content: <NotificationsSection /> },
  { id: "team", label: "Team", icon: <UsersIcon />, content: <TeamSection /> },
  { id: "danger", label: "Danger Zone", icon: <ShieldIcon />, content: <DangerSection /> }
];

export function SettingsPage({
  title = "Settings",
  subtitle = "Manage your account preferences",
  sections,
  useDefaultSections = true,
  className,
  style
}: SettingsPageProps) {
  const resolvedSections = sections ?? (useDefaultSections ? DEFAULT_SECTIONS : []);
  const [activeSection, setActiveSection] = useState(resolvedSections[0]?.id ?? "");

  const activeContent = resolvedSections.find((s) => s.id === activeSection)?.content ?? null;

  return (
    <div
      className={className}
      style={{
        padding: "var(--z-space-6, 1.5rem)",
        display: "grid",
        gap: "var(--z-space-5, 1.25rem)",
        ...style
      }}
    >
      {/* Page header */}
      <Stack direction="vertical" gap={1}>
        <h1
          style={{
            margin: 0,
            fontSize: "1.25rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--z-color-text, #171717)"
          }}
        >
          {title}
        </h1>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--z-color-muted, #5c5c5c)" }}>{subtitle}</p>
      </Stack>

      {/* Sidebar nav + content */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "var(--z-space-6, 1.5rem)" } as CSSProperties}>
        {/* Sidebar */}
        <nav>
          <Stack direction="vertical" gap={1}>
            {resolvedSections.map((s) => {
              const isActive = s.id === activeSection;
              const isDanger = s.id === "danger";
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSection(s.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--z-space-2, 0.5rem)",
                    padding: "var(--z-space-2, 0.5rem) var(--z-space-3, 0.75rem)",
                    fontSize: "0.84rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isDanger
                      ? "var(--z-color-danger, #fb3748)"
                      : isActive
                        ? "var(--z-color-text, #171717)"
                        : "var(--z-color-muted, #5c5c5c)",
                    background: isActive
                      ? "color-mix(in srgb, var(--z-color-primary, #121212) 6%, transparent)"
                      : "transparent",
                    border: "none",
                    borderRadius: "var(--z-radius-md, 0.5rem)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s, color 0.15s"
                  }}
                >
                  {s.icon ?? null}
                  {s.label}
                </button>
              );
            })}
          </Stack>
        </nav>

        {/* Content area */}
        <div style={{ minWidth: 0 }}>
          <Box padding={6} radius="lg" border style={{ background: "var(--z-color-surface, #ffffff)" } as CSSProperties}>
            {activeContent}
          </Box>
        </div>
      </div>
    </div>
  );
}
