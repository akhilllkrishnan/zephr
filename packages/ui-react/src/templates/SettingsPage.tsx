"use client";
import { CSSProperties, FormEvent, ReactNode, useState } from "react";

/* ─────────────────────────────────────────────
   Tiny SVG icon helper
───────────────────────────────────────────── */

const Ico = ({ d, size = 15, stroke = "currentColor" }: { d: string; size?: number; stroke?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const IC = {
  user:    "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z",
  bell:    "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  users:   "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  shield:  "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  camera:  "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z",
  check:   "M20 6L9 17 4 12",
  send:    "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  bolt:    "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  billing: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  chevron: "M9 18l6-6-6-6",
};

/* ─────────────────────────────────────────────
   Inline styles
───────────────────────────────────────────── */

const STYLES = `
@keyframes sp-fade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
@keyframes sp-spin { to{transform:rotate(360deg)} }

.sp-root * { box-sizing:border-box; font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif; }

/* ── Sidebar nav buttons ── */
.sp-nav-item {
  display:flex; align-items:center; gap:9px;
  padding:7px 10px 7px 12px; border-radius:8px;
  font-size:13.5px; font-weight:500; color:#6b7280;
  cursor:pointer; border:none; background:none; text-align:left; width:100%;
  transition:background 100ms ease,color 100ms ease; position:relative;
  letter-spacing:-0.01em;
}
.sp-nav-item:hover { background:#f5f5f7; color:#111827; }
.sp-nav-item.is-active {
  background:#f5f5f7; color:#111827; font-weight:600;
}
.sp-nav-item.is-active::before {
  content:''; position:absolute; left:0; top:4px; bottom:4px;
  width:3px; border-radius:0 2px 2px 0;
  background:#335cff;
}
.sp-nav-item.is-danger { color:#dc2626; }
.sp-nav-item.is-danger:hover { background:#fef2f2; color:#dc2626; }
.sp-nav-item.is-danger.is-active { background:#fef2f2; color:#dc2626; }
.sp-nav-item.is-danger.is-active::before { background:#dc2626; }

/* ── Save button ── */
.sp-btn-primary {
  display:inline-flex; align-items:center; gap:6px;
  padding:8px 16px; border-radius:9px; font-size:13.5px; font-weight:600;
  cursor:pointer; border:none;
  background:#111827; color:white;
  box-shadow:0 1px 2px rgba(0,0,0,0.12);
  transition:background 100ms,box-shadow 100ms,transform 80ms;
  letter-spacing:-0.01em;
}
.sp-btn-primary:hover:not(:disabled) { background:#0f172a; box-shadow:0 4px 12px rgba(0,0,0,0.16); transform:translateY(-1px); }
.sp-btn-primary:active:not(:disabled) { transform:scale(0.99); }
.sp-btn-primary:disabled { opacity:0.55; cursor:not-allowed; }

/* ── Secondary button ── */
.sp-btn-secondary {
  display:inline-flex; align-items:center; gap:5px;
  padding:7px 13px; border-radius:8px; font-size:13px; font-weight:500;
  cursor:pointer; border:1px solid #e5e7eb;
  background:#fff; color:#374151;
  box-shadow:0 1px 2px rgba(0,0,0,0.04);
  transition:background 100ms,border-color 100ms,box-shadow 100ms;
  letter-spacing:-0.01em;
}
.sp-btn-secondary:hover { background:#f9fafb; border-color:#d1d5db; box-shadow:0 2px 6px rgba(0,0,0,0.08); }

/* ── Danger button ── */
.sp-btn-danger {
  display:inline-flex; align-items:center; gap:5px;
  padding:7px 13px; border-radius:8px; font-size:13px; font-weight:500;
  cursor:pointer; border:1px solid #fecaca;
  background:#fff; color:#dc2626;
  transition:background 100ms,box-shadow 100ms;
  letter-spacing:-0.01em;
}
.sp-btn-danger:hover { background:#fef2f2; box-shadow:0 0 0 3px rgba(220,38,38,0.08); }

/* ── Input field ── */
.sp-input {
  width:100%; height:40px; padding:0 12px;
  border:1px solid #e5e7eb; border-radius:9px;
  background:#fff; font-size:13.5px; color:#111827;
  outline:none; letter-spacing:-0.005em;
  box-shadow:0 1px 2px rgba(0,0,0,0.03);
  transition:border-color 140ms,box-shadow 140ms;
  font-family:inherit;
}
.sp-input:focus { border-color:#111827; box-shadow:0 0 0 3px rgba(51,92,255,0.1); }

.sp-textarea {
  width:100%; padding:10px 12px;
  border:1px solid #e5e7eb; border-radius:9px;
  background:#fff; font-size:13.5px; color:#111827;
  outline:none; resize:vertical; min-height:80px;
  box-shadow:0 1px 2px rgba(0,0,0,0.03);
  transition:border-color 140ms,box-shadow 140ms;
  font-family:inherit; letter-spacing:-0.005em; line-height:1.6;
}
.sp-textarea:focus { border-color:#111827; box-shadow:0 0 0 3px rgba(51,92,255,0.1); }

/* ── Settings card ── */
.sp-card {
  background:#fff; border:1px solid #eaecf0;
  border-radius:14px; overflow:hidden;
  box-shadow:0 1px 3px rgba(0,0,0,0.04),0 1px 2px rgba(0,0,0,0.02);
}
.sp-card-header {
  padding:16px 20px; border-bottom:1px solid #f3f4f6;
  display:flex; align-items:center; justify-content:space-between;
}
.sp-card-body { padding:20px; }
.sp-card-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:14px 0; border-bottom:1px solid #f9fafb;
}
.sp-card-row:last-child { border-bottom:none; }

/* ── Toggle switch ── */
.sp-toggle {
  width:36px; height:20px; border-radius:10px; border:none; cursor:pointer;
  position:relative; transition:background 150ms;
  flex-shrink:0; padding:0;
}
.sp-toggle::after {
  content:''; position:absolute; top:2px; left:2px;
  width:16px; height:16px; border-radius:50%;
  background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.2);
  transition:transform 150ms;
}
.sp-toggle.on { background:#335cff; }
.sp-toggle.off { background:#d1d5db; }
.sp-toggle.on::after { transform:translateX(16px); }

/* ── Avatar ── */
.sp-avatar {
  border-radius:50%; display:flex; align-items:center; justify-content:center;
  font-weight:700; color:#fff; flex-shrink:0; font-size:13px;
  background:linear-gradient(135deg,#335cff,#6366f1);
}

/* ── Section animation ── */
.sp-section { animation:sp-fade 0.25s ease both; }

/* ── Invite input combo ── */
.sp-invite-row { display:flex; border-radius:9px; overflow:hidden; border:1px solid #e5e7eb; box-shadow:0 1px 2px rgba(0,0,0,0.04); }
.sp-invite-input {
  flex:1; height:40px; padding:0 12px;
  border:none; outline:none; font-size:13.5px; color:#111827;
  background:#fff; font-family:inherit;
}
.sp-invite-btn {
  padding:0 16px; border:none; border-left:1px solid #e5e7eb;
  background:#f9fafb; color:#374151; font-size:13px; font-weight:600;
  cursor:pointer; font-family:inherit;
  transition:background 100ms;
}
.sp-invite-btn:hover { background:#f3f4f6; }
`;

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="sp-avatar" style={{ width: size, height: size, fontSize: size * 0.36 }}>
      {initials}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={`sp-toggle ${on ? "on" : "off"}`}
      onClick={() => onChange(!on)}
    />
  );
}

function Field({ label, htmlFor, hint, children }: { label: string; htmlFor: string; hint?: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label htmlFor={htmlFor} style={{ fontSize: "13px", fontWeight: 500, color: "#374151", letterSpacing: "-0.01em" }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>{hint}</p>}
    </div>
  );
}

function ToggleRow({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="sp-card-row">
      <div style={{ flex: 1, paddingRight: "20px", minWidth: 0 }}>
        <div style={{ fontSize: "13.5px", fontWeight: 500, color: "#111827" }}>{label}</div>
        <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px", lineHeight: 1.5 }}>{desc}</div>
      </div>
      <Toggle on={value} onChange={onChange} />
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#b0b7c3", padding: "16px 12px 6px" }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Profile section
───────────────────────────────────────────── */

function ProfileSection() {
  const [name, setName] = useState("Akhil Krishnan");
  const [email, setEmail] = useState("akhil@zephyr.ai");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("Full-stack engineer");
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save(e: FormEvent) {
    e.preventDefault();
    setPending(true); setSaved(false);
    await new Promise(r => setTimeout(r, 900));
    setPending(false); setSaved(true);
    setTimeout(() => setSaved(false), 2800);
  }

  return (
    <form onSubmit={save} className="sp-section" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Avatar card */}
      <div className="sp-card">
        <div className="sp-card-body" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <Avatar name={name} size={56} />
            <button
              type="button"
              style={{
                position: "absolute", bottom: "-2px", right: "-2px",
                width: "20px", height: "20px", borderRadius: "50%",
                background: "#1f2937", color: "white", border: "2px solid white",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", padding: 0,
              }}
            >
              <Ico d={IC.camera} size={10} />
            </button>
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>{name}</div>
            <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "2px" }}>{email}</div>
            <button type="button" className="sp-btn-secondary" style={{ marginTop: "8px", fontSize: "12px", padding: "4px 10px" }}>
              Change photo
            </button>
          </div>
        </div>
      </div>

      {/* Fields card */}
      <div className="sp-card">
        <div className="sp-card-header">
          <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }}>Personal information</span>
        </div>
        <div className="sp-card-body" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <Field label="Display name" htmlFor="sp-name">
              <input id="sp-name" className="sp-input" value={name} onChange={e => setName(e.target.value)} />
            </Field>
            <Field label="Email address" htmlFor="sp-email">
              <input id="sp-email" type="email" className="sp-input" value={email} onChange={e => setEmail(e.target.value)} />
            </Field>
          </div>
          <Field label="Role / title" htmlFor="sp-role" hint="Shown on your team profile">
            <input id="sp-role" className="sp-input" value={role} onChange={e => setRole(e.target.value)} />
          </Field>
          <Field label="Bio" htmlFor="sp-bio">
            <textarea id="sp-bio" className="sp-textarea" value={bio} onChange={e => setBio(e.target.value)} placeholder="A short bio about yourself…" rows={3} />
          </Field>
        </div>
      </div>

      {/* Actions row */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button type="submit" className="sp-btn-primary" disabled={pending}>
          {pending ? (
            <>
              <span style={{ width: "13px", height: "13px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "sp-spin 0.7s linear infinite", display: "inline-block" }} />
              Saving…
            </>
          ) : (
            <>
              <Ico d={IC.check} size={13} />
              Save changes
            </>
          )}
        </button>
        {saved && (
          <span style={{ fontSize: "13px", color: "#10b981", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>
            <Ico d={IC.check} size={12} stroke="#10b981" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}

/* ─────────────────────────────────────────────
   Notifications section
───────────────────────────────────────────── */

function NotificationsSection() {
  const [st, setSt] = useState({ email: true, slack: false, weekly: true, marketing: false, security: true });
  const toggle = (k: keyof typeof st) => setSt(s => ({ ...s, [k]: !s[k] }));

  const groups: { title: string; icon: string; items: { key: keyof typeof st; label: string; desc: string }[] }[] = [
    {
      title: "Activity", icon: IC.bolt,
      items: [
        { key: "email", label: "Email notifications", desc: "Get notified when someone mentions you or assigns a task." },
        { key: "slack", label: "Slack notifications", desc: "Real-time alerts in your connected Slack workspace." },
      ],
    },
    {
      title: "Marketing", icon: IC.send,
      items: [
        { key: "weekly", label: "Weekly digest", desc: "A summary of workspace activity every Monday morning." },
        { key: "marketing", label: "Product updates", desc: "New features, changelogs, and tips from the Zephyr team." },
      ],
    },
    {
      title: "Security", icon: IC.shield,
      items: [
        { key: "security", label: "Security alerts", desc: "Immediate alerts for suspicious logins or changes." },
      ],
    },
  ];

  return (
    <div className="sp-section" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {groups.map(g => (
        <div className="sp-card" key={g.title}>
          <div className="sp-card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <Ico d={g.icon} size={14} />
              <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }}>{g.title}</span>
            </div>
          </div>
          <div className="sp-card-body" style={{ padding: "0 20px" }}>
            {g.items.map(row => (
              <ToggleRow key={row.key} label={row.label} desc={row.desc} value={st[row.key]} onChange={() => toggle(row.key)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Team section
───────────────────────────────────────────── */

function TeamSection() {
  const members = [
    { name: "Akhil Krishnan", email: "akhil@zephyr.ai", role: "Owner",  color: "#335cff" },
    { name: "Maya Carter",    email: "maya@zephyr.ai",  role: "Admin",   color: "#8b5cf6" },
    { name: "Noah Kim",       email: "noah@zephyr.ai",  role: "Member",  color: "#06b6d4" },
    { name: "Liam Torres",    email: "liam@zephyr.ai",  role: "Member",  color: "#10b981" },
  ];
  const rolePill: Record<string, { bg: string; color: string }> = {
    Owner:  { bg: "#eff6ff", color: "#1d4ed8" },
    Admin:  { bg: "#f5f3ff", color: "#6d28d9" },
    Member: { bg: "#f3f4f6", color: "#374151" },
  };
  const [invite, setInvite] = useState("");

  return (
    <div className="sp-section" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Invite */}
      <div className="sp-card">
        <div className="sp-card-header">
          <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }}>Invite a teammate</span>
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>4 / 10 seats used</span>
        </div>
        <div className="sp-card-body">
          <div className="sp-invite-row">
            <input
              type="email"
              className="sp-invite-input"
              placeholder="colleague@company.com"
              value={invite}
              onChange={e => setInvite(e.target.value)}
            />
            <button type="button" className="sp-invite-btn">
              <Ico d={IC.send} size={12} /> Send invite
            </button>
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="sp-card">
        <div className="sp-card-header">
          <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }}>Team members</span>
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>{members.length} members</span>
        </div>
        <div style={{ padding: "0 20px" }}>
          {members.map((m, i) => {
            const pill = rolePill[m.role] ?? rolePill.Member;
            return (
              <div key={m.email} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 0",
                borderBottom: i < members.length - 1 ? "1px solid #f9fafb" : "none",
              }}>
                <div className="sp-avatar" style={{ width: 34, height: 34, fontSize: 12, background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)` }}>
                  {m.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }}>{m.name}</div>
                  <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "1px" }}>{m.email}</div>
                </div>
                <span style={{
                  fontSize: "11.5px", fontWeight: 600, padding: "2px 9px", borderRadius: "100px",
                  background: pill.bg, color: pill.color, letterSpacing: "0.01em",
                }}>{m.role}</span>
                {m.role !== "Owner" && (
                  <button type="button" className="sp-btn-secondary" style={{ fontSize: "11.5px", padding: "3px 9px" }}>
                    Remove
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Danger zone section
───────────────────────────────────────────── */

function DangerSection() {
  return (
    <div className="sp-section" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {[
        {
          title: "Deactivate account",
          desc: "Temporarily disable your account. You can reactivate it at any time by signing back in.",
          btn: "Deactivate",
          isDanger: false,
        },
        {
          title: "Delete account",
          desc: "Permanently delete your account and all data associated with it. This action cannot be undone.",
          btn: "Delete account",
          isDanger: true,
        },
      ].map(item => (
        <div key={item.title} style={{
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px",
          padding: "18px 20px",
          background: "#fff",
          border: `1px solid ${item.isDanger ? "#fecaca" : "#eaecf0"}`,
          borderRadius: "12px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: item.isDanger ? "#dc2626" : "#0f172a", marginBottom: "4px", letterSpacing: "-0.01em" }}>
              {item.title}
            </div>
            <p style={{ margin: 0, fontSize: "13px", color: "#6b7280", lineHeight: 1.6 }}>{item.desc}</p>
          </div>
          <button type="button" className={item.isDanger ? "sp-btn-danger" : "sp-btn-secondary"}>
            {item.btn}
          </button>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Public types
───────────────────────────────────────────── */

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
  useDefaultSections?: boolean;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_SECTIONS: SettingsSection[] = [
  { id: "profile",       label: "Profile",       icon: <Ico d={IC.user}    />, content: <ProfileSection />       },
  { id: "notifications", label: "Notifications", icon: <Ico d={IC.bell}    />, content: <NotificationsSection /> },
  { id: "team",          label: "Team",           icon: <Ico d={IC.users}   />, content: <TeamSection />          },
  { id: "billing",       label: "Billing",        icon: <Ico d={IC.billing} />, content: null                     },
  { id: "danger",        label: "Danger Zone",    icon: <Ico d={IC.shield}  />, content: <DangerSection />        },
];

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */

export function SettingsPage({
  sections,
  useDefaultSections = true,
  className,
  style,
}: SettingsPageProps) {
  const resolved = sections ?? (useDefaultSections ? DEFAULT_SECTIONS : []);
  const [active, setActive] = useState(resolved[0]?.id ?? "");
  const activeSection = resolved.find(s => s.id === active);
  const isDanger = (id: string) => id === "danger";

  const sectionDesc: Record<string, string> = {
    profile:       "Manage your personal information and profile photo.",
    notifications: "Control how and when you receive alerts.",
    team:          "Invite teammates and manage access levels.",
    billing:       "Manage your plan, invoices and payment method.",
    danger:        "Irreversible actions — proceed with extreme caution.",
  };

  return (
    <div
      className={`sp-root${className ? ` ${className}` : ""}`}
      style={{ background: "#f7f8fa", minHeight: "900px", display: "flex", flexDirection: "column", ...style }}
    >
      <style>{STYLES}</style>

      {/* ═══ Header ═══ */}
      <header style={{
        background: "#ffffff",
        borderBottom: "1px solid #eaecf0",
        height: "56px",
        display: "flex", alignItems: "center",
        padding: "0 24px",
        gap: "12px",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "28px", height: "28px", borderRadius: "7px",
            background: "linear-gradient(135deg, #335cff 0%, #6366f1 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 1px 4px rgba(51,92,255,0.3)",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontSize: "14.5px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em" }}>Zephyr</span>
        </div>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#9ca3af" }}>
          <Ico d={IC.chevron} size={14} />
        </div>
        <span style={{ fontSize: "13.5px", color: "#6b7280", letterSpacing: "-0.01em" }}>Settings</span>

        {/* Spacer + user */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#374151", letterSpacing: "-0.01em" }}>Akhil Krishnan</span>
          <Avatar name="Akhil Krishnan" size={28} />
        </div>
      </header>

      {/* ═══ Body ═══ */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

        {/* ── Sidebar ── */}
        <aside style={{
          width: "224px",
          background: "#ffffff",
          borderRight: "1px solid #eaecf0",
          padding: "16px 10px",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}>
          <SectionLabel>Account</SectionLabel>
          {resolved.filter(s => !isDanger(s.id) && s.id !== "billing").map(s => (
            <button
              key={s.id}
              type="button"
              className={`sp-nav-item${active === s.id ? " is-active" : ""}`}
              onClick={() => setActive(s.id)}
            >
              {s.icon && <span style={{ display: "flex", opacity: active === s.id ? 1 : 0.6 }}>{s.icon}</span>}
              {s.label}
            </button>
          ))}

          <SectionLabel>Workspace</SectionLabel>
          {resolved.filter(s => s.id === "team" || s.id === "billing").map(s => (
            <button
              key={s.id}
              type="button"
              className={`sp-nav-item${active === s.id ? " is-active" : ""}`}
              onClick={() => setActive(s.id)}
            >
              {s.icon && <span style={{ display: "flex", opacity: active === s.id ? 1 : 0.6 }}>{s.icon}</span>}
              {s.label}
            </button>
          ))}

          <div style={{ flex: 1 }} />

          {/* Danger at bottom */}
          {resolved.filter(s => isDanger(s.id)).map(s => (
            <button
              key={s.id}
              type="button"
              className={`sp-nav-item is-danger${active === s.id ? " is-active" : ""}`}
              onClick={() => setActive(s.id)}
            >
              {s.icon && <span style={{ display: "flex" }}>{s.icon}</span>}
              {s.label}
              {active !== s.id && (
                <span style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "#dc2626", flexShrink: 0 }} />
              )}
            </button>
          ))}
        </aside>

        {/* ── Main content ── */}
        <main style={{ flex: 1, padding: "28px 32px 48px", overflowY: "auto" }}>
          <div style={{ maxWidth: "640px" }}>
            {/* Section heading */}
            <div style={{ marginBottom: "22px" }}>
              <h1 style={{ margin: "0 0 4px", fontSize: "17px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em" }}>
                {activeSection?.label}
              </h1>
              <p style={{ margin: 0, fontSize: "13px", color: "#9ca3af", letterSpacing: "-0.005em" }}>
                {sectionDesc[active] ?? ""}
              </p>
            </div>

            {/* Section content — or empty state for billing */}
            {activeSection?.content ?? (
              <div className="sp-card">
                <div className="sp-card-body" style={{ textAlign: "center", padding: "48px 32px" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 14px",
                  }}>
                    <Ico d={IC.billing} size={20} stroke="#9ca3af" />
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "6px" }}>Billing</div>
                  <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#9ca3af", lineHeight: 1.6 }}>
                    Your plan details, invoices, and payment method will appear here.
                  </p>
                  <button type="button" className="sp-btn-primary">Manage billing</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
