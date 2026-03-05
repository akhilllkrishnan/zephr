"use client";
import { CSSProperties, FormEvent, ReactNode, useState } from "react";

/* ─────────────────────────────────────────────
   SVG icon helpers
───────────────────────────────────────────── */

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21.5c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-2.12 4.53-3.74 4.25z" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const EyeIcon = ({ show }: { show: boolean }) => show ? (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
) : (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20C5 20 1 12 1 12a18.46 18.46 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CheckIcon = () => (
  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ─────────────────────────────────────────────
   Left panel — product preview mockup (SVG)
───────────────────────────────────────────── */

const ProductPreview = () => (
  <svg
    viewBox="0 0 380 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", maxWidth: "380px", filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.5))" }}
    aria-hidden
  >
    {/* Card container */}
    <rect width="380" height="260" rx="16" fill="#111827" />
    <rect width="380" height="260" rx="16" fill="url(#card-grad)" />
    <rect x="0.5" y="0.5" width="379" height="259" rx="15.5" stroke="rgba(255,255,255,0.08)" />

    {/* Header row */}
    <rect x="20" y="20" width="120" height="10" rx="5" fill="rgba(255,255,255,0.12)" />
    <rect x="316" y="16" width="44" height="18" rx="9" fill="rgba(51,92,255,0.3)" />
    <rect x="317" y="17" width="42" height="16" rx="8" stroke="rgba(51,92,255,0.5)" />
    <text x="338" y="28" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.7)" fontFamily="system-ui">Export</text>

    {/* Stat cards row */}
    <rect x="20" y="50" width="104" height="64" rx="10" fill="rgba(255,255,255,0.05)" />
    <rect x="20.5" y="50.5" width="103" height="63" rx="9.5" stroke="rgba(255,255,255,0.06)" />
    <rect x="32" y="62" width="36" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
    <text x="32" y="90" fontSize="18" fontWeight="700" fill="white" fontFamily="system-ui">$84k</text>
    <rect x="32" y="98" width="52" height="5" rx="2.5" fill="rgba(74,222,128,0.6)" />
    {/* Sparkline */}
    <polyline points="70,82 76,76 82,79 88,70 94,72 100,65 106,68 112,60" stroke="#4ade80" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    <rect x="138" y="50" width="104" height="64" rx="10" fill="rgba(255,255,255,0.05)" />
    <rect x="138.5" y="50.5" width="103" height="63" rx="9.5" stroke="rgba(255,255,255,0.06)" />
    <rect x="150" y="62" width="44" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
    <text x="150" y="90" fontSize="18" fontWeight="700" fill="white" fontFamily="system-ui">12.8k</text>
    <rect x="150" y="98" width="44" height="5" rx="2.5" fill="rgba(96,165,250,0.6)" />
    <polyline points="188,82 194,78 200,80 206,72 212,74 218,68 224,70 230,63" stroke="#60a5fa" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    <rect x="256" y="50" width="104" height="64" rx="10" fill="rgba(255,255,255,0.05)" />
    <rect x="256.5" y="50.5" width="103" height="63" rx="9.5" stroke="rgba(255,255,255,0.06)" />
    <rect x="268" y="62" width="32" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
    <text x="268" y="90" fontSize="18" fontWeight="700" fill="white" fontFamily="system-ui">98.2%</text>
    <rect x="268" y="98" width="36" height="5" rx="2.5" fill="rgba(167,139,250,0.6)" />
    <polyline points="306,82 312,80 318,77 324,75 330,72 336,69 342,71 348,64" stroke="#a78bfa" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    {/* Chart area */}
    <rect x="20" y="130" width="220" height="110" rx="10" fill="rgba(255,255,255,0.04)" />
    <rect x="20.5" y="130.5" width="219" height="109" rx="9.5" stroke="rgba(255,255,255,0.06)" />
    <rect x="32" y="142" width="60" height="7" rx="3.5" fill="rgba(255,255,255,0.2)" />
    {/* Area chart */}
    <defs>
      <linearGradient id="card-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.03)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
      </linearGradient>
      <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#335cff" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#335cff" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M32 220 L 55 198 L 80 205 L 105 185 L 130 190 L 155 170 L 180 175 L 205 158 L 228 162 L 228 228 L 32 228 Z"
      fill="url(#area-fill)"
    />
    <path
      d="M32 220 L 55 198 L 80 205 L 105 185 L 130 190 L 155 170 L 180 175 L 205 158 L 228 162"
      stroke="#335cff" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round"
    />
    {[32, 80, 130, 180, 228].map((x, i) => {
      const ys = [220, 205, 190, 175, 162];
      return <circle key={i} cx={x} cy={ys[i]} r="3" fill="#335cff" />;
    })}

    {/* Table section */}
    <rect x="256" y="130" width="104" height="110" rx="10" fill="rgba(255,255,255,0.04)" />
    <rect x="256.5" y="130.5" width="103" height="109" rx="9.5" stroke="rgba(255,255,255,0.06)" />
    <rect x="268" y="142" width="48" height="7" rx="3.5" fill="rgba(255,255,255,0.2)" />
    {[0, 1, 2, 3].map(i => (
      <g key={i}>
        <rect x="268" y={164 + i * 18} width="8" height="8" rx="4" fill={["#335cff", "#4ade80", "#f59e0b", "#a78bfa"][i]} />
        <rect x="282" y={165 + i * 18} width={[38, 30, 44, 26][i]} height="6" rx="3" fill="rgba(255,255,255,0.15)" />
        <rect x={316 + [6, 14, 2, 18][i]} y={165 + i * 18} width={[22, 14, 26, 10][i]} height="6" rx="3" fill="rgba(255,255,255,0.08)" />
      </g>
    ))}
  </svg>
);

/* ─────────────────────────────────────────────
   Testimonial avatar stack
───────────────────────────────────────────── */

function AvatarStack() {
  const initials = ["SC", "AK", "MR", "JL", "PW"];
  const colors = ["#335cff", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];
  return (
    <div style={{ display: "flex" }}>
      {initials.map((init, i) => (
        <div
          key={i}
          style={{
            width: "26px", height: "26px", borderRadius: "50%",
            background: colors[i],
            border: "2px solid #0a0d14",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "8px", fontWeight: 700, color: "white",
            marginLeft: i === 0 ? 0 : "-8px",
            zIndex: initials.length - i, position: "relative",
          }}
        >
          {init}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Custom checkbox
───────────────────────────────────────────── */

function Checkbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: "17px", height: "17px", minWidth: "17px",
        borderRadius: "5px",
        border: checked ? "none" : "1.5px solid #d1d5db",
        background: checked ? "#335cff" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        transition: "all 120ms ease",
        outline: "none", padding: 0,
        boxShadow: checked ? "0 0 0 3px rgba(51,92,255,0.12)" : "none",
      }}
    >
      {checked && <CheckIcon />}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Field wrapper
───────────────────────────────────────────── */

interface FieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  error?: string;
  action?: ReactNode;
}

function Field({ label, htmlFor, children, error, action }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label htmlFor={htmlFor} style={{ fontSize: "13.5px", fontWeight: 500, color: "#111827", letterSpacing: "-0.01em" }}>
          {label}
        </label>
        {action}
      </div>
      {children}
      {error && (
        <p style={{ margin: 0, fontSize: "12px", color: "#ef4444" }}>{error}</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Inline styles
───────────────────────────────────────────── */

const STYLES = `
@keyframes ap-fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ap-spin {
  to { transform: rotate(360deg); }
}

.ap-root * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; }

/* OAuth buttons */
.ap-oauth-btn {
  display: flex; align-items: center; justify-content: center;
  gap: 10px; width: 100%; height: 42px;
  border: 1px solid #e5e7eb; border-radius: 10px;
  background: #ffffff; cursor: pointer;
  font-size: 13.5px; font-weight: 500; color: #111827;
  letter-spacing: -0.01em;
  transition: background 100ms ease, border-color 100ms ease, box-shadow 100ms ease, transform 80ms ease;
  box-shadow: 0 1px 2px rgba(10,13,20,0.04);
  outline: none;
}
.ap-oauth-btn:hover {
  background: #f9fafb; border-color: #d1d5db;
  box-shadow: 0 2px 6px rgba(10,13,20,0.08);
  transform: translateY(-1px);
}
.ap-oauth-btn:active { transform: scale(0.98); }

/* Input */
.ap-input {
  width: 100%; height: 42px;
  padding: 0 38px 0 38px;
  border: 1px solid #e5e7eb; border-radius: 10px;
  background: #ffffff; font-size: 14px; color: #111827;
  outline: none;
  transition: border-color 140ms ease, box-shadow 140ms ease;
  box-shadow: 0 1px 2px rgba(10,13,20,0.03);
  letter-spacing: -0.005em;
}
.ap-input:focus {
  border-color: #111827;
  box-shadow: 0 0 0 3px rgba(51,92,255,0.12);
}
.ap-input.ap-error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239,68,68,0.10);
}
.ap-input::placeholder { color: #9ca3af; }

/* Submit button */
.ap-submit {
  width: 100%; height: 43px;
  border: none; border-radius: 10px;
  background: #111827; color: white;
  font-size: 14px; font-weight: 600;
  letter-spacing: -0.01em; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: background 120ms ease, box-shadow 120ms ease, transform 80ms ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08);
  outline: none;
}
.ap-submit:hover:not(:disabled) {
  background: #0f172a;
  box-shadow: 0 1px 3px rgba(0,0,0,0.16), 0 6px 16px rgba(0,0,0,0.12);
  transform: translateY(-1px);
}
.ap-submit:active:not(:disabled) { transform: scale(0.99); }
.ap-submit:disabled { opacity: 0.55; cursor: not-allowed; }

/* Text link */
.ap-link {
  background: none; border: none; padding: 0;
  color: #335cff; font-weight: 500; font-size: inherit;
  cursor: pointer; text-decoration: none;
  letter-spacing: -0.01em;
  transition: color 100ms ease;
}
.ap-link:hover { color: #1a42e0; text-decoration: underline; text-underline-offset: 2px; }

/* Left panel text */
.ap-left-heading {
  font-size: clamp(26px, 3.5vw, 36px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.15;
  color: #ffffff;
  margin: 0 0 14px;
}
.ap-left-sub {
  font-size: 15px;
  color: rgba(255,255,255,0.5);
  letter-spacing: -0.01em;
  line-height: 1.6;
  margin: 0 0 32px;
}

@media (max-width: 768px) {
  .ap-left { display: none !important; }
  .ap-right { min-height: 100vh; }
}
`;

/* ─────────────────────────────────────────────
   Public types
───────────────────────────────────────────── */

export interface AuthProvider {
  id: string;
  label: string;
  icon?: ReactNode;
  onSignIn: () => void;
}

export interface AuthPageProps {
  brand?: ReactNode;
  title?: string;
  subtitle?: string;
  providers?: AuthProvider[];
  onSubmit?: (email: string, password: string) => void | Promise<void>;
  mode?: "sign-in" | "sign-up";
  onModeSwitch?: () => void;
  onForgotPassword?: () => void;
  footerNote?: ReactNode;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  className?: string;
  style?: CSSProperties;
}

const defaultProviders: AuthProvider[] = [
  { id: "github", label: "Continue with GitHub", icon: <GitHubIcon />, onSignIn: () => {} },
  { id: "google", label: "Continue with Google", icon: <GoogleIcon />, onSignIn: () => {} },
  { id: "apple",  label: "Continue with Apple",  icon: <AppleIcon />,  onSignIn: () => {} },
];

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export function AuthPage({
  brand,
  title,
  subtitle,
  providers = defaultProviders,
  onSubmit,
  mode = "sign-in",
  onModeSwitch,
  onForgotPassword,
  footerNote,
  testimonialQuote = "Zephyr cut our UI build time by 80%. The component quality is unmatched — every detail is already done.",
  testimonialAuthor = "Sarah Chen",
  testimonialRole = "Staff Engineer, Vercel",
  className,
  style,
}: AuthPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState<{ email?: string; password?: string; global?: string }>({});

  const isSignIn = mode === "sign-in";
  const heading  = title    ?? (isSignIn ? "Welcome back" : "Create your account");
  const sub      = subtitle ?? (isSignIn ? "Sign in to continue to your workspace." : "Get started — it's free.");
  const switchLabel  = isSignIn ? "No account yet?" : "Already have an account?";
  const switchAction = isSignIn ? "Sign up free" : "Sign in";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFieldError({});
    const errs: typeof fieldError = {};
    if (!email)    errs.email    = "Email is required.";
    if (!password) errs.password = "Password is required.";
    if (Object.keys(errs).length) { setFieldError(errs); return; }
    setLoading(true);
    try { await onSubmit?.(email, password); }
    catch (err) { setFieldError({ global: err instanceof Error ? err.message : "Something went wrong." }); }
    finally { setLoading(false); }
  }

  return (
    <div
      className={`ap-root${className ? ` ${className}` : ""}`}
      style={{
        minHeight: "760px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "#ffffff",
        ...style,
      }}
    >
      <style>{STYLES}</style>

      {/* ═══════════ LEFT — dark brand panel ═══════════ */}
      <div
        className="ap-left"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#0a0d14",
          display: "flex",
          flexDirection: "column",
          padding: "clamp(2rem, 3.5vw, 3rem)",
        }}
      >
        {/* Ambient glow blobs */}
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "70%", height: "70%", borderRadius: "50%", background: "radial-gradient(circle, rgba(51,92,255,0.18) 0%, transparent 70%)", filter: "blur(48px)" }} />
          <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>

        {/* Top border accent */}
        <div aria-hidden style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(51,92,255,0.5) 40%, rgba(99,102,241,0.5) 60%, transparent)" }} />

        {/* Brand mark */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: "auto" }}>
          {brand ?? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "9px",
                background: "linear-gradient(135deg, #335cff 0%, #6366f1 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 4px 16px rgba(51,92,255,0.35)",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.03em" }}>Zephyr</span>
            </div>
          )}
        </div>

        {/* Headline + tagline */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: "28px" }}>
          <h2 className="ap-left-heading">
            Build beautiful UI,<br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>ship it faster.</span>
          </h2>
          <p className="ap-left-sub">
            200+ production-ready components. 6 design systems. Full TypeScript.
          </p>

          {/* Metric pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { v: "200+", l: "Components" },
              { v: "6",    l: "Style packs" },
              { v: "100%", l: "TypeScript" },
            ].map(({ v, l }) => (
              <div key={l} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "5px 12px", borderRadius: "100px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>{v}</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "-0.005em" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product preview mockup */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: "28px" }}>
          <ProductPreview />
        </div>

        {/* Testimonial */}
        <div style={{
          position: "relative", zIndex: 1,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "14px", padding: "20px",
        }}>
          {/* Stars */}
          <div style={{ display: "flex", gap: "3px", marginBottom: "10px" }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p style={{ margin: "0 0 14px", fontSize: "13.5px", lineHeight: 1.65, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.01em", fontStyle: "italic" }}>
            &ldquo;{testimonialQuote}&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <AvatarStack />
            <div style={{ marginLeft: "4px" }}>
              <div style={{ fontSize: "12.5px", fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.01em" }}>{testimonialAuthor}</div>
              <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.35)", marginTop: "1px" }}>{testimonialRole}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ RIGHT — form panel ═══════════ */}
      <div
        className="ap-right"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(1.5rem, 4vw, 3rem)",
          background: "#ffffff",
        }}
      >
        <div style={{ width: "100%", maxWidth: "380px", animation: "ap-fade-up 0.45s ease both" }}>

          {/* Heading */}
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{
              margin: "0 0 6px",
              fontSize: "26px", fontWeight: 700,
              letterSpacing: "-0.04em", color: "#0f172a", lineHeight: 1.2,
            }}>
              {heading}
            </h1>
            <p style={{ margin: 0, fontSize: "14.5px", color: "#6b7280", letterSpacing: "-0.01em", lineHeight: 1.5 }}>
              {sub}
            </p>
          </div>

          {/* OAuth providers — stacked, full width with text labels */}
          {providers.length > 0 && (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "20px" }}>
                {providers.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    className="ap-oauth-btn"
                    onClick={p.onSignIn}
                    style={{ animationDelay: `${i * 40}ms`, animation: "ap-fade-up 0.45s ease both" }}
                  >
                    <span style={{ display: "flex", flexShrink: 0 }}>{p.icon}</span>
                    <span style={{ fontSize: "13.5px" }}>{p.label}</span>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ flex: 1, height: "1px", background: "#f1f3f5" }} />
                <span style={{ fontSize: "11.5px", color: "#c1c7cd", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  or with email
                </span>
                <div style={{ flex: 1, height: "1px", background: "#f1f3f5" }} />
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Email */}
              <Field
                label="Email address"
                htmlFor="ap-email"
                error={fieldError.email}
              >
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", display: "flex", pointerEvents: "none" }}>
                    <MailIcon />
                  </span>
                  <input
                    id="ap-email"
                    type="email"
                    className={`ap-input${fieldError.email ? " ap-error" : ""}`}
                    placeholder="you@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </Field>

              {/* Password */}
              <Field
                label="Password"
                htmlFor="ap-password"
                error={fieldError.password}
                action={isSignIn && onForgotPassword ? (
                  <button type="button" className="ap-link" onClick={onForgotPassword} style={{ fontSize: "12.5px" }}>
                    Forgot password?
                  </button>
                ) : undefined}
              >
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", display: "flex", pointerEvents: "none" }}>
                    <LockIcon />
                  </span>
                  <input
                    id="ap-password"
                    type={showPw ? "text" : "password"}
                    className={`ap-input${fieldError.password ? " ap-error" : ""}`}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete={isSignIn ? "current-password" : "new-password"}
                    style={{ paddingRight: "40px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    style={{
                      position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer",
                      color: "#9ca3af", display: "flex", padding: "4px", borderRadius: "4px",
                    }}
                  >
                    <EyeIcon show={showPw} />
                  </button>
                </div>
              </Field>

              {/* Terms (sign-up) */}
              {!isSignIn && (
                <label style={{ display: "flex", alignItems: "flex-start", gap: "9px", cursor: "pointer", userSelect: "none" }}>
                  <Checkbox checked={agreed} onChange={setAgreed} />
                  <span style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.5, paddingTop: "1px" }}>
                    I agree to the{" "}
                    <button type="button" className="ap-link" style={{ fontSize: "13px" }}>Terms</button>
                    {" "}and{" "}
                    <button type="button" className="ap-link" style={{ fontSize: "13px" }}>Privacy Policy</button>
                  </span>
                </label>
              )}

              {/* Global error */}
              {fieldError.global && (
                <p style={{ margin: 0, fontSize: "13px", color: "#ef4444", textAlign: "center", padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px" }}>
                  {fieldError.global}
                </p>
              )}

              {/* Submit */}
              <button type="submit" className="ap-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span style={{
                      width: "13px", height: "13px", border: "2px solid rgba(255,255,255,0.25)", borderTopColor: "white",
                      borderRadius: "50%", animation: "ap-spin 0.7s linear infinite", display: "inline-block",
                    }} />
                    {isSignIn ? "Signing in…" : "Creating account…"}
                  </>
                ) : (
                  <>
                    {isSignIn ? "Sign in" : "Create account"}
                    <ArrowIcon />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Mode switch */}
          {onModeSwitch && (
            <p style={{ margin: "20px 0 0", textAlign: "center", fontSize: "13.5px", color: "#9ca3af", letterSpacing: "-0.005em" }}>
              {switchLabel}{" "}
              <button type="button" className="ap-link" onClick={onModeSwitch} style={{ fontSize: "13.5px" }}>
                {switchAction}
              </button>
            </p>
          )}
        </div>

        {/* Footer */}
        <p style={{ marginTop: "32px", textAlign: "center", fontSize: "12px", color: "#c4c9d4", lineHeight: 1.6, maxWidth: "320px", letterSpacing: "-0.005em" }}>
          {footerNote ?? (
            <>
              By continuing, you agree to our{" "}
              <button type="button" className="ap-link" style={{ fontSize: "12px", color: "#9ca3af" }}>Terms of Service</button>
              {" "}and{" "}
              <button type="button" className="ap-link" style={{ fontSize: "12px", color: "#9ca3af" }}>Privacy Policy</button>.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
