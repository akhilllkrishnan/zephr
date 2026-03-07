"use client";
import { CSSProperties, useState } from "react";
import { Avatar } from "../atoms/Avatar";
import { Badge } from "../atoms/Badge";

/* ─── Inline SVG icon primitive ─── */
const Icon = ({ d, size = 16, strokeWidth = 1.6 }: { d: string; size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const Icons = {
  plus:       "M12 5v14M5 12h14",
  filter:     "M4 6h16M7 12h10M10 18h4",
  download:   "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
  arrowUp:    "M18 15l-6-6-6 6",
  arrowDown:  "M6 9l6 6 6-6",
  home:       "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  grid:       "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  chart:      "M18 20V10M12 20V4M6 20v-6",
  settings:   "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  bell:       "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  search:     "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  bolt:       "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  users:      "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  trending:   "M22 7l-8.5 8.5-5-5L1 17",
  zap:        "M13 2L3 14h9l-1 8 10-12h-9",
  check:      "M20 6L9 17 4 12",
  inbox:      "M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
  code:       "M16 18l6-6-6-6M8 6l-6 6 6 6",
  layers:     "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  more:       "M12 5h.01M12 12h.01M12 19h.01",
  externalLink: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3",
  chevronRight: "M9 18l6-6-6-6",
};

/* ─── Sparkline ─── */
function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const w = 72, h = 28, pad = 2;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  }).join(" ");
  const color = positive ? "#10b981" : "#ef4444";
  const fillPts = `${pad},${h - pad} ${pts} ${w - pad},${h - pad}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polygon points={fillPts} fill={color} opacity="0.08" />
      <polyline points={pts} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Area chart (weekly revenue) ─── */
function AreaChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map(d => d.value));
  const w = 480, h = 120, padX = 8, padY = 12;
  const stepX = (w - padX * 2) / (data.length - 1);
  const pts = data.map((d, i) => {
    const x = padX + i * stepX;
    const y = padY + (1 - d.value / max) * (h - padY * 2);
    return { x, y };
  });
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${line} L${pts[pts.length - 1].x},${h - padY} L${pts[0].x},${h - padY} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#335cff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#335cff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1].map((pct) => (
        <line key={pct} x1={padX} y1={padY + (1 - pct) * (h - padY * 2)} x2={w - padX} y2={padY + (1 - pct) * (h - padY * 2)}
          stroke="#f1f3f5" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#areaGrad)" />
      <path d={line} stroke="#335cff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#335cff" />
      ))}
    </svg>
  );
}

/* ─── Donut chart (traffic sources) ─── */
function DonutChart({ segments }: { segments: { color: string; pct: number }[] }) {
  const r = 36, cx = 48, cy = 48, strokeWidth = 11;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f3f5" strokeWidth={strokeWidth} />
      {segments.map((seg, i) => {
        const dash = (seg.pct / 100) * circumference;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color} strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-(offset / 100) * circumference + circumference / 4}
            strokeLinecap="round"
          />
        );
        offset += seg.pct;
        return el;
      })}
    </svg>
  );
}

/* ─── Public types ─── */
export interface DashboardStat {
  id: string; label: string; value: string;
  delta?: string; deltaPositive?: boolean;
  sparkData?: number[];
}

export interface DashboardActivity {
  id: string; actor: string; action: string; timestamp: string;
  type?: "deploy" | "issue" | "merge" | "update" | "default";
  avatar?: string;
}

export interface DashboardRow {
  id: string; name: string; status: "active" | "inactive" | "pending";
  updated: string; avatar?: string; progress?: number; revenue?: string;
}

export interface DashboardPageProps {
  title?: string; subtitle?: string;
  stats?: DashboardStat[];
  tableData?: DashboardRow[];
  activity?: DashboardActivity[];
  loading?: boolean;
  onNewItem?: () => void;
  className?: string;
  style?: CSSProperties;
}

/* ─── Default data ─── */
const WEEKLY = [
  { label: "Mon", value: 42 }, { label: "Tue", value: 68 }, { label: "Wed", value: 55 },
  { label: "Thu", value: 78 }, { label: "Fri", value: 91 }, { label: "Sat", value: 64 },
  { label: "Sun", value: 84 },
];

const DEFAULT_STATS: DashboardStat[] = [
  { id: "1", label: "Total Revenue", value: "$84,210", delta: "+12.5%", deltaPositive: true,  sparkData: [40,45,38,55,52,60,58,70,68,80] },
  { id: "2", label: "Active Users",  value: "12,841",  delta: "+8.3%",  deltaPositive: true,  sparkData: [28,30,27,35,32,38,36,40,37,42] },
  { id: "3", label: "Open Issues",   value: "17",       delta: "-5",    deltaPositive: false, sparkData: [22,20,25,18,22,17,20,16,19,17] },
  { id: "4", label: "Deploy Rate",   value: "98.2%",   delta: "+0.4%", deltaPositive: true,  sparkData: [94,95,93,96,97,95,98,96,99,98] },
];

const DEFAULT_ROWS: DashboardRow[] = [
  { id: "1", name: "Atlas Platform",   status: "active",   updated: "2 min ago",  progress: 82, revenue: "$24,500" },
  { id: "2", name: "Nebula API",       status: "active",   updated: "18 min ago", progress: 67, revenue: "$18,200" },
  { id: "3", name: "Orbit Dashboard",  status: "pending",  updated: "Yesterday",  progress: 45, revenue: "$9,100"  },
  { id: "4", name: "Pulse Reporter",   status: "inactive", updated: "Mar 1",      progress: 20, revenue: "$3,400"  },
  { id: "5", name: "Quasar Sync",      status: "active",   updated: "Today",      progress: 91, revenue: "$31,800" },
];

const DEFAULT_ACTIVITY: DashboardActivity[] = [
  { id: "1", actor: "Akhil K.",  action: "deployed Atlas v2.4.1 to production", timestamp: "5m ago",  type: "deploy"  },
  { id: "2", actor: "Maya R.",   action: "opened issue #183 — Button hover",     timestamp: "22m ago", type: "issue"   },
  { id: "3", actor: "Noah T.",   action: "merged PR #91 into main",              timestamp: "1h ago",  type: "merge"   },
  { id: "4", actor: "Liam P.",   action: "updated product roadmap Q2",           timestamp: "3h ago",  type: "update"  },
  { id: "5", actor: "Priya S.",  action: "created Figma sync branch",            timestamp: "5h ago",  type: "default" },
];

const TRAFFIC = [
  { label: "Direct",   pct: 38, color: "#335cff" },
  { label: "Organic",  pct: 27, color: "#10b981" },
  { label: "Referral", pct: 21, color: "#f59e0b" },
  { label: "Social",   pct: 14, color: "#8b5cf6" },
];

const ACTIVITY_STYLE: Record<string, { bg: string; color: string }> = {
  deploy:  { bg: "#ecfdf5", color: "#059669" },
  issue:   { bg: "#fff7ed", color: "#d97706" },
  merge:   { bg: "#eff4ff", color: "#335cff" },
  update:  { bg: "#faf5ff", color: "#7c3aed" },
  default: { bg: "#f4f4f5", color: "#71717a" },
};

const ACTIVITY_ICON: Record<string, string> = {
  deploy: Icons.bolt, issue: Icons.bell, merge: Icons.code, update: Icons.layers, default: Icons.check,
};

const STATUS_COLOR: Record<string, string> = { active: "#10b981", inactive: "#d1d5db", pending: "#f59e0b" };

/* ─── CSS ─── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap');

.dp-root { box-sizing: border-box; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
.dp-root *, .dp-root *::before, .dp-root *::after { box-sizing: border-box; }

@keyframes dp-fade-up {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Sidebar ── */
.dp-sidebar {
  width: 224px; flex-shrink: 0;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  display: flex; flex-direction: column;
  padding: 0;
}
.dp-sidebar-brand {
  display: flex; align-items: center; gap: 10px;
  padding: 18px 16px 14px;
  border-bottom: 1px solid #f4f4f4;
}
.dp-sidebar-logo {
  width: 30px; height: 30px; border-radius: 8px;
  background: linear-gradient(145deg, #335cff 0%, #6366f1 100%);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 6px rgba(51,92,255,0.28), inset 0 1px 0 rgba(255,255,255,0.15);
}
.dp-sidebar-wordmark { font-size: 14px; font-weight: 700; color: #0f172a; letter-spacing: -0.025em; }
.dp-sidebar-plan {
  font-size: 10px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
  color: #fff; background: linear-gradient(90deg,#335cff,#6366f1);
  padding: 1px 6px; border-radius: 999px; margin-left: auto;
}

.dp-sidebar-nav { flex: 1; padding: 10px 10px; display: flex; flex-direction: column; gap: 1px; }
.dp-nav-label {
  font-size: 10.5px; font-weight: 600; color: #a1a1aa;
  letter-spacing: 0.06em; text-transform: uppercase;
  padding: 12px 10px 5px; display: block;
}
.dp-nav-item {
  display: flex; align-items: center; gap: 9px;
  padding: 7px 10px; border-radius: 7px;
  font-size: 13.5px; font-weight: 500; color: #52525b;
  cursor: pointer; border: none; background: none; text-align: left; width: 100%;
  transition: background 0.1s, color 0.1s;
  position: relative;
}
.dp-nav-item:hover { background: #f4f4f5; color: #18181b; }
.dp-nav-item.active { background: #eff4ff; color: #2563eb; font-weight: 600; }
.dp-nav-badge {
  margin-left: auto; background: #ef4444; color: #fff;
  font-size: 10px; font-weight: 700; padding: 1px 5px; border-radius: 999px;
}
.dp-sidebar-footer {
  padding: 12px 12px 16px;
  border-top: 1px solid #f4f4f4;
  display: flex; align-items: center; gap: 10px;
}
.dp-sidebar-footer-info { flex: 1; min-width: 0; }
.dp-sidebar-footer-name { font-size: 12.5px; font-weight: 600; color: #18181b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dp-sidebar-footer-role { font-size: 11px; color: #a1a1aa; }

/* ── Topbar ── */
.dp-topbar {
  height: 52px; background: #fff;
  border-bottom: 1px solid #f0f0f0;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; flex-shrink: 0; gap: 12px;
}
.dp-search {
  display: flex; align-items: center; gap: 8px;
  background: #fafafa; border: 1px solid #e4e4e7;
  border-radius: 8px; padding: 5px 12px;
  font-size: 13px; color: #a1a1aa;
  flex: 1; max-width: 300px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.dp-search:focus-within { border-color: #335cff; box-shadow: 0 0 0 3px rgba(51,92,255,0.1); }
.dp-topbar-actions { display: flex; align-items: center; gap: 8px; }
.dp-icon-btn {
  width: 32px; height: 32px; border-radius: 7px;
  border: 1px solid #e4e4e7; background: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #71717a;
  transition: background 0.1s, border-color 0.1s, box-shadow 0.1s;
  position: relative;
}
.dp-icon-btn:hover { background: #fafafa; border-color: #d4d4d8; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.dp-notif-dot {
  position: absolute; top: 4px; right: 4px; width: 6px; height: 6px;
  background: #ef4444; border-radius: 50%; border: 1.5px solid #fff;
}
.dp-primary-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 13px; border-radius: 7px; font-size: 13px; font-weight: 600;
  cursor: pointer; border: 1px solid rgba(255,255,255,0.12);
  background: #335cff; color: #fff;
  box-shadow: 0 1px 2px rgba(51,92,255,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
  transition: background 0.12s, box-shadow 0.12s, transform 0.1s;
}
.dp-primary-btn:hover { background: #2448e8; box-shadow: 0 4px 12px rgba(51,92,255,0.35); transform: translateY(-1px); }
.dp-primary-btn:active { transform: translateY(0); }

/* ── Page body ── */
.dp-body { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: auto; background: #fafafa; }
.dp-page { flex: 1; padding: 24px 24px 40px; }

/* ── Page header ── */
.dp-page-head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 22px; }
.dp-page-title { font-size: 18px; font-weight: 700; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 3px; }
.dp-page-sub { font-size: 13px; color: #71717a; margin: 0; }
.dp-head-actions { display: flex; gap: 8px; }

/* ── Secondary button ── */
.dp-sec-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 7px; font-size: 13px; font-weight: 500;
  cursor: pointer; border: 1px solid #e4e4e7; background: #fff; color: #3f3f46;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  transition: background 0.1s, box-shadow 0.1s;
}
.dp-sec-btn:hover { background: #fafafa; box-shadow: 0 2px 6px rgba(0,0,0,0.07); }

/* ── Tab bar ── */
.dp-tabs { display: flex; gap: 0; border-bottom: 1px solid #f0f0f0; margin-bottom: 20px; }
.dp-tab {
  font-size: 13.5px; font-weight: 500; color: #71717a;
  padding: 8px 14px; cursor: pointer; border: none; background: none;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
  transition: color 0.12s;
}
.dp-tab.active { color: #0f172a; font-weight: 600; border-bottom-color: #335cff; }
.dp-tab:hover:not(.active) { color: #3f3f46; }

/* ── Stat cards ── */
.dp-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; }
.dp-stat {
  background: #fff; border: 1px solid #f0f0f0; border-radius: 12px; padding: 18px 20px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  animation: dp-fade-up 0.4s ease both;
  display: flex; flex-direction: column; gap: 10px;
  transition: box-shadow 0.15s, transform 0.15s;
}
.dp-stat:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); transform: translateY(-1px); }
.dp-stat-label { font-size: 12.5px; font-weight: 500; color: #71717a; letter-spacing: -0.01em; }
.dp-stat-value { font-size: 24px; font-weight: 700; color: #0f172a; letter-spacing: -0.035em; line-height: 1; }
.dp-stat-delta { display: flex; align-items: center; gap: 3px; font-size: 12px; font-weight: 600; }
.dp-stat-meta { display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; }

/* ── Chart cards ── */
.dp-charts { display: grid; grid-template-columns: 1fr 320px; gap: 14px; margin-bottom: 14px; }
.dp-card {
  background: #fff; border: 1px solid #f0f0f0; border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03); overflow: hidden;
  animation: dp-fade-up 0.45s ease both;
}
.dp-card-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 18px 12px;
}
.dp-card-title { font-size: 14px; font-weight: 600; color: #0f172a; letter-spacing: -0.015em; }
.dp-card-sub { font-size: 12px; color: #a1a1aa; margin-top: 2px; }
.dp-card-body { padding: 0 18px 18px; }
.dp-chart-value { font-size: 26px; font-weight: 700; color: #0f172a; letter-spacing: -0.04em; }
.dp-chart-delta { font-size: 12px; font-weight: 600; color: #10b981; margin-top: 2px; }
.dp-chart-area { margin-top: 12px; border-radius: 6px; overflow: hidden; }

/* Traffic sources */
.dp-traffic { display: flex; gap: 20px; align-items: center; padding: 4px 0 4px; }
.dp-traffic-legend { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.dp-traffic-row { display: flex; flex-direction: column; gap: 4px; }
.dp-traffic-label { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; }
.dp-traffic-name { display: flex; align-items: center; gap: 7px; color: #3f3f46; font-weight: 500; }
.dp-traffic-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.dp-traffic-pct { color: #71717a; font-size: 12px; }
.dp-traffic-bar { height: 4px; background: #f4f4f5; border-radius: 999px; overflow: hidden; }
.dp-traffic-bar-fill { height: 100%; border-radius: 999px; transition: width 0.6s ease; }

/* ── Projects table ── */
.dp-table-wrap { background: #fff; border: 1px solid #f0f0f0; border-radius: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.03); overflow: hidden; animation: dp-fade-up 0.5s ease both; }
.dp-table-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid #f4f4f5; }
.dp-text-link { font-size: 12.5px; font-weight: 600; color: #335cff; cursor: pointer; border: none; background: none; padding: 0; display: flex; align-items: center; gap: 4px; }
.dp-table { width: 100%; border-collapse: collapse; }
.dp-table th { font-size: 11.5px; font-weight: 600; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.04em; padding: 8px 18px; text-align: left; background: #fafafa; border-bottom: 1px solid #f4f4f5; }
.dp-table td { font-size: 13.5px; color: #3f3f46; padding: 12px 18px; border-bottom: 1px solid #f9f9f9; vertical-align: middle; }
.dp-table tr:last-child td { border-bottom: none; }
.dp-table tr:hover td { background: #fafafa; }
.dp-project-name { font-weight: 600; color: #0f172a; font-size: 13.5px; }
.dp-project-id { font-size: 11.5px; color: #a1a1aa; margin-top: 1px; }
.dp-progress-wrap { display: flex; align-items: center; gap: 10px; }
.dp-progress-bar { flex: 1; height: 4px; background: #f4f4f5; border-radius: 999px; overflow: hidden; }
.dp-progress-fill { height: 100%; border-radius: 999px; }
.dp-progress-pct { font-size: 12px; color: #71717a; min-width: 28px; text-align: right; }
.dp-status { display: inline-flex; align-items: center; gap: 5px; font-size: 12.5px; font-weight: 500; }
.dp-status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

/* ── Activity ── */
.dp-activity { display: flex; flex-direction: column; }
.dp-activity-head { padding: 14px 18px; border-bottom: 1px solid #f4f4f5; }
.dp-activity-body { padding: 16px 18px; flex: 1; display: flex; flex-direction: column; gap: 0; }
.dp-activity-item { display: flex; gap: 12px; }
.dp-activity-line-wrap { display: flex; flex-direction: column; align-items: center; }
.dp-activity-icon { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.dp-activity-connector { width: 1px; flex: 1; background: #f4f4f5; margin: 5px 0; }
.dp-activity-content { flex: 1; padding: 3px 0 14px; }
.dp-activity-actor { font-size: 13px; color: #18181b; font-weight: 600; }
.dp-activity-action { font-size: 13px; color: #52525b; font-weight: 400; }
.dp-activity-time { font-size: 11.5px; color: #a1a1aa; margin-top: 2px; }

/* ── Bottom row ── */
.dp-bottom { display: grid; grid-template-columns: 1fr 280px; gap: 14px; }
`;

/* ─── Nav item ─── */
function NavItem({ icon, label, active, badge, onClick }: { icon: string; label: string; active?: boolean; badge?: string; onClick?: () => void }) {
  return (
    <button type="button" className={`dp-nav-item${active ? " active" : ""}`} onClick={onClick}>
      <Icon d={icon} size={15} />
      {label}
      {badge && <span className="dp-nav-badge">{badge}</span>}
    </button>
  );
}

/* ─── Stat card ─── */
function StatCard({ stat, delay }: { stat: DashboardStat; delay: string }) {
  const pos = stat.deltaPositive !== false;
  return (
    <div className="dp-stat" style={{ animationDelay: delay }}>
      <span className="dp-stat-label">{stat.label}</span>
      <div className="dp-stat-meta">
        <div>
          <div className="dp-stat-value">{stat.value}</div>
          {stat.delta && (
            <div className="dp-stat-delta" style={{ color: pos ? "#10b981" : "#ef4444", marginTop: "6px" }}>
              <Icon d={pos ? Icons.arrowUp : Icons.arrowDown} size={12} strokeWidth={2.5} />
              {stat.delta}
              <span style={{ fontWeight: 400, color: "#a1a1aa" }}>vs last mo</span>
            </div>
          )}
        </div>
        {stat.sparkData && <Sparkline data={stat.sparkData} positive={pos} />}
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export function DashboardPage({
  title = "Overview",
  subtitle = "Welcome back, Akhil. Here's what's happening today.",
  stats = DEFAULT_STATS,
  tableData = DEFAULT_ROWS,
  activity = DEFAULT_ACTIVITY,
  loading = false,
  onNewItem,
  className,
  style,
}: DashboardPageProps) {
  const [activeNav, setActiveNav] = useState("overview");
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "reports">("overview");

  return (
    <div
      className={`dp-root${className ? ` ${className}` : ""}`}
      style={{ minHeight: "960px", background: "#fafafa", display: "flex", ...style }}
    >
      <style>{STYLES}</style>

      {/* ── Sidebar ── */}
      <aside className="dp-sidebar">
        <div className="dp-sidebar-brand">
          <div className="dp-sidebar-logo">
            <Icon d={Icons.zap} size={14} strokeWidth={2.2} />
          </div>
          <span className="dp-sidebar-wordmark">Zephr</span>
          <span className="dp-sidebar-plan">Pro</span>
        </div>

        <nav className="dp-sidebar-nav">
          <span className="dp-nav-label">Workspace</span>
          <NavItem icon={Icons.home}     label="Overview"   active={activeNav === "overview"}   onClick={() => setActiveNav("overview")}   />
          <NavItem icon={Icons.grid}     label="Projects"   active={activeNav === "projects"}   onClick={() => setActiveNav("projects")}   badge="4" />
          <NavItem icon={Icons.chart}    label="Analytics"  active={activeNav === "analytics"}  onClick={() => setActiveNav("analytics")}  />
          <NavItem icon={Icons.inbox}    label="Inbox"      active={activeNav === "inbox"}      onClick={() => setActiveNav("inbox")}      badge="3" />
          <span className="dp-nav-label">Account</span>
          <NavItem icon={Icons.users}    label="Team"       active={activeNav === "team"}       onClick={() => setActiveNav("team")}       />
          <NavItem icon={Icons.settings} label="Settings"   active={activeNav === "settings"}   onClick={() => setActiveNav("settings")}   />
        </nav>

        <div className="dp-sidebar-footer">
          <Avatar name="Akhil Krishnan" size={28} />
          <div className="dp-sidebar-footer-info">
            <div className="dp-sidebar-footer-name">Akhil Krishnan</div>
            <div className="dp-sidebar-footer-role">Admin · Pro plan</div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="dp-body">

        {/* Top bar */}
        <header className="dp-topbar">
          <div className="dp-search">
            <Icon d={Icons.search} size={14} />
            <span>Search projects, docs…</span>
            <span style={{ marginLeft: "auto", fontSize: "11.5px", color: "#c4c4cc", border: "1px solid #e4e4e7", borderRadius: "5px", padding: "1px 6px", fontFamily: "monospace" }}>⌘K</span>
          </div>
          <div className="dp-topbar-actions">
            <button type="button" className="dp-icon-btn" aria-label="Notifications">
              <Icon d={Icons.bell} size={15} />
              <span className="dp-notif-dot" />
            </button>
            <Avatar name="Akhil Krishnan" size={28} />
            <button type="button" className="dp-primary-btn" onClick={onNewItem}>
              <Icon d={Icons.plus} size={14} strokeWidth={2.2} />
              New project
            </button>
          </div>
        </header>

        {/* Page body */}
        <div className="dp-page">

          {/* Page header */}
          <div className="dp-page-head">
            <div>
              <h1 className="dp-page-title">{title}</h1>
              <p className="dp-page-sub">{subtitle}</p>
            </div>
            <div className="dp-head-actions">
              <button type="button" className="dp-sec-btn">
                <Icon d={Icons.filter} size={13} />
                Filter
              </button>
              <button type="button" className="dp-sec-btn">
                <Icon d={Icons.download} size={13} />
                Export
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="dp-tabs">
            {(["overview","analytics","reports"] as const).map(tab => (
              <button key={tab} type="button" className={`dp-tab${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Stat cards */}
          <div className="dp-stats">
            {stats.map((s, i) => <StatCard key={s.id} stat={s} delay={`${i * 50}ms`} />)}
          </div>

          {/* Chart row */}
          <div className="dp-charts">

            {/* Revenue area chart */}
            <div className="dp-card" style={{ animationDelay: "220ms" }}>
              <div className="dp-card-head">
                <div>
                  <div className="dp-card-title">Revenue</div>
                  <div className="dp-card-sub">Weekly performance</div>
                </div>
                <button type="button" className="dp-sec-btn" style={{ fontSize: "12px", padding: "4px 10px" }}>
                  This week
                  <Icon d={Icons.chevronRight} size={12} />
                </button>
              </div>
              <div className="dp-card-body">
                <div className="dp-chart-value">$84,210</div>
                <div className="dp-chart-delta">↑ 12.5% vs last week</div>
                <div className="dp-chart-area">
                  <AreaChart data={WEEKLY} />
                </div>
                {/* X-axis labels */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                  {WEEKLY.map(d => (
                    <span key={d.label} style={{ fontSize: "10.5px", color: "#a1a1aa" }}>{d.label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Traffic sources donut */}
            <div className="dp-card" style={{ animationDelay: "270ms" }}>
              <div className="dp-card-head">
                <div>
                  <div className="dp-card-title">Traffic</div>
                  <div className="dp-card-sub">By source</div>
                </div>
              </div>
              <div className="dp-card-body">
                <div className="dp-traffic">
                  <DonutChart segments={TRAFFIC} />
                  <div className="dp-traffic-legend">
                    {TRAFFIC.map(t => (
                      <div key={t.label} className="dp-traffic-row">
                        <div className="dp-traffic-label">
                          <span className="dp-traffic-name">
                            <span className="dp-traffic-dot" style={{ background: t.color }} />
                            {t.label}
                          </span>
                          <span className="dp-traffic-pct">{t.pct}%</span>
                        </div>
                        <div className="dp-traffic-bar">
                          <div className="dp-traffic-bar-fill" style={{ width: `${t.pct}%`, background: t.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: table + activity */}
          <div className="dp-bottom">

            {/* Projects table */}
            <div className="dp-table-wrap" style={{ animationDelay: "320ms" }}>
              <div className="dp-table-head">
                <div>
                  <div className="dp-card-title">Projects</div>
                  <div className="dp-card-sub">{tableData.length} total</div>
                </div>
                <button type="button" className="dp-text-link">
                  View all <Icon d={Icons.externalLink} size={11} />
                </button>
              </div>
              <table className="dp-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>Revenue</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => {
                    const statusColor = STATUS_COLOR[row.status];
                    const progColor = row.status === "active" ? "#335cff" : row.status === "pending" ? "#f59e0b" : "#d1d5db";
                    return (
                      <tr key={row.id}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Avatar name={row.name} size={26} />
                            <div>
                              <div className="dp-project-name">{row.name}</div>
                              <div className="dp-project-id">#{row.id.padStart(4, "0")}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="dp-status">
                            <span className="dp-status-dot" style={{ background: statusColor }} />
                            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <div className="dp-progress-wrap">
                            <div className="dp-progress-bar">
                              <div className="dp-progress-fill" style={{ width: `${row.progress ?? 0}%`, background: progColor }} />
                            </div>
                            <span className="dp-progress-pct">{row.progress ?? 0}%</span>
                          </div>
                        </td>
                        <td style={{ fontWeight: 600, color: "#0f172a", fontVariantNumeric: "tabular-nums" }}>{row.revenue ?? "—"}</td>
                        <td style={{ color: "#71717a" }}>{row.updated}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Activity feed */}
            <div className="dp-card dp-activity" style={{ animationDelay: "360ms" }}>
              <div className="dp-activity-head">
                <div className="dp-card-title">Activity</div>
                <div className="dp-card-sub">Recent team events</div>
              </div>
              <div className="dp-activity-body">
                {activity.map((item, i) => {
                  const type = item.type ?? "default";
                  const s = ACTIVITY_STYLE[type] ?? ACTIVITY_STYLE.default;
                  const iconPath = ACTIVITY_ICON[type] ?? Icons.check;
                  const isLast = i === activity.length - 1;
                  return (
                    <div key={item.id} className="dp-activity-item">
                      <div className="dp-activity-line-wrap">
                        <div className="dp-activity-icon" style={{ background: s.bg }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d={iconPath} />
                          </svg>
                        </div>
                        {!isLast && <div className="dp-activity-connector" />}
                      </div>
                      <div className="dp-activity-content">
                        <span className="dp-activity-actor">{item.actor} </span>
                        <span className="dp-activity-action">{item.action}</span>
                        <div className="dp-activity-time">{item.timestamp}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
