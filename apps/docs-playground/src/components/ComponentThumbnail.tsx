import type { CSSProperties } from "react";

export function ComponentThumbnail({ name }: { name: string }) {
  const vb = "0 0 180 80";
  const acc = "var(--accent)";
  const ln = "var(--line)";
  const mu = "var(--muted)";
  const fg = "var(--fg)";
  const ff = "system-ui,-apple-system,sans-serif";
  const ss: CSSProperties = { width: "100%", height: "80px", display: "block" };

  switch (name) {
    /* ── Atoms ──────────────────────────────────────────────────────────── */
    case "Button":
      return (
        <svg style={ss} viewBox={vb}>
          {/* Primary */}
          <rect x="14" y="22" width="72" height="28" rx="7" fill={acc} />
          <text x="50" y="40" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily={ff}>Button</text>
          {/* Secondary */}
          <rect x="94" y="22" width="72" height="28" rx="7" fill="none" stroke={ln} strokeWidth="1.5" />
          <text x="130" y="40" textAnchor="middle" fill={fg} fontSize="11" fontWeight="500" fontFamily={ff} opacity="0.6">Cancel</text>
        </svg>
      );

    case "Input":
      return (
        <svg style={ss} viewBox={vb}>
          <text x="20" y="17" fill={fg} fontSize="9" fontWeight="600" fontFamily={ff} opacity="0.55">Email</text>
          <rect x="20" y="22" width="140" height="26" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="32" y="31" width="60" height="7" rx="3" fill={mu} opacity="0.3" />
          <rect x="96" y="30" width="1.5" height="9" rx="1" fill={acc} />
          <text x="20" y="61" fill={acc} fontSize="8.5" fontFamily={ff} opacity="0.7">✓ Looks good!</text>
        </svg>
      );

    case "IconButton":
      return (
        <svg style={ss} viewBox={vb}>
          {/* Filled */}
          <rect x="30" y="20" width="36" height="36" rx="9" fill={acc} />
          <line x1="48" y1="30" x2="48" y2="46" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="38" x2="56" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Outlined */}
          <rect x="74" y="20" width="36" height="36" rx="9" fill="none" stroke={ln} strokeWidth="1.5" />
          <line x1="92" y1="30" x2="86" y2="46" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="92" y1="30" x2="98" y2="46" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
          {/* Ghost small */}
          <rect x="118" y="24" width="28" height="28" rx="7" fill={acc} opacity="0.1" />
          <rect x="124" y="34" width="16" height="2" rx="1" fill={acc} />
          <rect x="124" y="39" width="10" height="2" rx="1" fill={acc} />
        </svg>
      );

    case "Textarea":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="10" width="144" height="56" rx="6" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="28" y="22" width="84" height="7" rx="3" fill={mu} opacity="0.25" />
          <rect x="28" y="34" width="108" height="7" rx="3" fill={mu} opacity="0.2" />
          <rect x="28" y="46" width="64" height="7" rx="3" fill={mu} opacity="0.18" />
          <line x1="150" y1="58" x2="160" y2="48" stroke={mu} strokeWidth="1" opacity="0.4" />
          <line x1="154" y1="62" x2="164" y2="52" stroke={mu} strokeWidth="1" opacity="0.25" />
        </svg>
      );

    case "Select":
      return (
        <svg style={ss} viewBox={vb}>
          <text x="20" y="17" fill={fg} fontSize="9" fontWeight="600" fontFamily={ff} opacity="0.55">Country</text>
          <rect x="20" y="22" width="140" height="26" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="32" y="31" width="52" height="7" rx="3" fill={fg} opacity="0.22" />
          <line x1="140" y1="22" x2="140" y2="48" stroke={ln} strokeWidth="1" />
          <polyline points="145,33 150,38 155,33" fill="none" stroke={mu} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "Checkbox":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="24" y="14" width="18" height="18" rx="4" fill={acc} />
          <polyline points="28,23 32,27 39,18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="52" y="17" width="66" height="7" rx="3" fill={fg} opacity="0.22" />
          <rect x="52" y="28" width="44" height="5" rx="2.5" fill={mu} opacity="0.15" />
          <rect x="24" y="42" width="18" height="18" rx="4" fill={acc} opacity="0.12" stroke={acc} strokeWidth="1.5" />
          <rect x="52" y="45" width="74" height="7" rx="3" fill={fg} opacity="0.18" />
          <rect x="52" y="56" width="50" height="5" rx="2.5" fill={mu} opacity="0.12" />
        </svg>
      );

    case "Radio":
      return (
        <svg style={ss} viewBox={vb}>
          <circle cx="35" cy="23" r="10" fill="none" stroke={acc} strokeWidth="2" />
          <circle cx="35" cy="23" r="5" fill={acc} />
          <rect x="54" y="17" width="66" height="7" rx="3" fill={fg} opacity="0.22" />
          <rect x="54" y="28" width="44" height="5" rx="2.5" fill={mu} opacity="0.15" />
          <circle cx="35" cy="53" r="10" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="54" y="47" width="74" height="7" rx="3" fill={fg} opacity="0.18" />
          <rect x="54" y="58" width="50" height="5" rx="2.5" fill={mu} opacity="0.12" />
        </svg>
      );

    case "Switch":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="20" y="18" width="46" height="24" rx="12" fill={acc} />
          <circle cx="54" cy="30" r="10" fill="white" />
          <rect x="78" y="22" width="76" height="7" rx="3" fill={fg} opacity="0.22" />
          <rect x="78" y="34" width="52" height="5" rx="2.5" fill={mu} opacity="0.15" />
          <rect x="20" y="50" width="46" height="24" rx="12" fill={ln} />
          <circle cx="32" cy="62" r="10" fill="white" />
          <rect x="78" y="54" width="76" height="7" rx="3" fill={fg} opacity="0.18" />
          <rect x="78" y="66" width="52" height="5" rx="2.5" fill={mu} opacity="0.12" />
        </svg>
      );

    case "Badge":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="16" width="46" height="20" rx="10" fill={acc} opacity="0.15" />
          <rect x="14" y="16" width="46" height="20" rx="10" fill="none" stroke={acc} strokeWidth="1" />
          <rect x="22" y="22" width="30" height="7" rx="3" fill={acc} opacity="0.65" />
          <rect x="68" y="16" width="46" height="20" rx="10" fill="#1fc16b22" />
          <rect x="68" y="16" width="46" height="20" rx="10" fill="none" stroke="#1fc16b" strokeWidth="1" />
          <rect x="76" y="22" width="30" height="7" rx="3" fill="#1fc16b" opacity="0.65" />
          <rect x="122" y="16" width="46" height="20" rx="10" fill="#fa731922" />
          <rect x="122" y="16" width="46" height="20" rx="10" fill="none" stroke="#fa7319" strokeWidth="1" />
          <rect x="130" y="22" width="30" height="7" rx="3" fill="#fa7319" opacity="0.65" />
          <rect x="14" y="44" width="38" height="16" rx="8" fill={acc} />
          <rect x="22" y="48" width="22" height="7" rx="3" fill="white" opacity="0.8" />
          <rect x="60" y="44" width="38" height="16" rx="8" fill="#7d52f4" />
          <rect x="68" y="48" width="22" height="7" rx="3" fill="white" opacity="0.8" />
          <rect x="106" y="44" width="38" height="16" rx="8" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="114" y="48" width="22" height="7" rx="3" fill={fg} opacity="0.2" />
        </svg>
      );

    case "Avatar":
      return (
        <svg style={ss} viewBox={vb}>
          <circle cx="42" cy="40" r="26" fill={acc} opacity="0.12" />
          <circle cx="42" cy="40" r="26" fill="none" stroke={acc} strokeWidth="1.5" />
          <text x="42" y="44" textAnchor="middle" fill={acc} fontSize="14" fontWeight="700" fontFamily={ff}>AK</text>
          <circle cx="98" cy="36" r="18" fill="#7d52f422" />
          <circle cx="98" cy="36" r="18" fill="none" stroke="#7d52f4" strokeWidth="1.5" />
          <text x="98" y="40" textAnchor="middle" fill="#7d52f4" fontSize="11" fontWeight="700" fontFamily={ff}>MJ</text>
          <circle cx="138" cy="42" r="12" fill="#1fc16b22" />
          <circle cx="138" cy="42" r="12" fill="none" stroke="#1fc16b" strokeWidth="1.5" />
          <text x="138" y="46" textAnchor="middle" fill="#1fc16b" fontSize="8" fontWeight="700" fontFamily={ff}>SA</text>
        </svg>
      );

    case "Logo":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="50" y="22" width="26" height="26" rx="7" fill={acc} />
          <text x="63" y="39" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily={ff}>Z</text>
          <text x="84" y="38" fill={fg} fontSize="16" fontWeight="700" fontFamily={ff} opacity="0.8">ephyr</text>
        </svg>
      );

    case "Card":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="8" width="152" height="64" rx="9" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="24" y="18" width="72" height="9" rx="4" fill={fg} opacity="0.28" />
          <rect x="24" y="31" width="128" height="6" rx="3" fill={mu} opacity="0.2" />
          <rect x="24" y="41" width="110" height="6" rx="3" fill={mu} opacity="0.17" />
          <rect x="24" y="55" width="56" height="6" rx="3" fill={acc} opacity="0.4" />
        </svg>
      );

    case "Divider":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="20" y="12" width="140" height="7" rx="3" fill={mu} opacity="0.2" />
          <line x1="20" y1="40" x2="70" y2="40" stroke={ln} strokeWidth="1.5" />
          <rect x="72" y="32" width="36" height="16" rx="4" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="77" y="36" width="26" height="7" rx="3" fill={mu} opacity="0.25" />
          <line x1="110" y1="40" x2="160" y2="40" stroke={ln} strokeWidth="1.5" />
          <rect x="20" y="58" width="140" height="7" rx="3" fill={mu} opacity="0.15" />
        </svg>
      );

    case "Progress":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="20" y="16" width="140" height="9" rx="4.5" fill={ln} />
          <rect x="20" y="16" width="95" height="9" rx="4.5" fill={acc} />
          <text x="161" y="24" textAnchor="end" fill={acc} fontSize="9" fontWeight="700" fontFamily={ff}>68%</text>
          <circle cx="90" cy="56" r="20" fill="none" stroke={ln} strokeWidth="5" />
          <circle cx="90" cy="56" r="20" fill="none" stroke={acc} strokeWidth="5"
            strokeDasharray="77 48" strokeLinecap="round" transform="rotate(-90 90 56)" />
          <text x="90" y="60" textAnchor="middle" fill={fg} fontSize="9" fontWeight="700" fontFamily={ff}>68%</text>
        </svg>
      );

    case "Skeleton":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="10" width="42" height="42" rx="7" fill={ln} opacity="0.55" />
          <rect x="70" y="12" width="80" height="10" rx="5" fill={ln} opacity="0.5" />
          <rect x="70" y="27" width="60" height="8" rx="4" fill={ln} opacity="0.38" />
          <rect x="18" y="58" width="144" height="9" rx="4" fill={ln} opacity="0.45" />
          <rect x="18" y="71" width="100" height="9" rx="4" fill={ln} opacity="0.3" />
        </svg>
      );

    case "Slider":
      return (
        <svg style={ss} viewBox={vb}>
          <text x="20" y="18" fill={mu} fontSize="9" fontFamily={ff}>0</text>
          <text x="160" y="18" textAnchor="end" fill={mu} fontSize="9" fontFamily={ff}>100</text>
          <text x="106" y="18" textAnchor="middle" fill={acc} fontSize="10" fontWeight="700" fontFamily={ff}>62</text>
          <rect x="20" y="36" width="140" height="6" rx="3" fill={ln} />
          <rect x="20" y="36" width="86" height="6" rx="3" fill={acc} />
          <circle cx="106" cy="39" r="11" fill="white" stroke={acc} strokeWidth="2.5" />
          <rect x="20" y="56" width="140" height="4" rx="2" fill={ln} />
          <rect x="20" y="56" width="52" height="4" rx="2" fill={acc} opacity="0.5" />
          <circle cx="72" cy="58" r="7" fill="white" stroke={acc} strokeWidth="2" opacity="0.7" />
        </svg>
      );

    case "Alert":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="10" width="152" height="24" rx="5" fill="#3b9eff" opacity="0.08" />
          <rect x="14" y="10" width="3" height="24" rx="1.5" fill="#3b9eff" />
          <circle cx="28" cy="22" r="5" fill="#3b9eff" opacity="0.35" />
          <text x="27" y="25" textAnchor="middle" fill="#3b9eff" fontSize="7" fontWeight="800" fontFamily={ff}>i</text>
          <rect x="38" y="17" width="54" height="6" rx="3" fill="#3b9eff" opacity="0.45" />
          <rect x="38" y="26" width="80" height="5" rx="2.5" fill="#3b9eff" opacity="0.28" />
          <rect x="14" y="42" width="152" height="24" rx="5" fill="#ff4d6a" opacity="0.08" />
          <rect x="14" y="42" width="3" height="24" rx="1.5" fill="#ff4d6a" />
          <circle cx="28" cy="54" r="5" fill="#ff4d6a" opacity="0.35" />
          <text x="27" y="57" textAnchor="middle" fill="#ff4d6a" fontSize="8" fontWeight="800" fontFamily={ff}>!</text>
          <rect x="38" y="49" width="48" height="6" rx="3" fill="#ff4d6a" opacity="0.45" />
          <rect x="38" y="58" width="70" height="5" rx="2.5" fill="#ff4d6a" opacity="0.28" />
        </svg>
      );

    case "Toast":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="14" width="152" height="48" rx="9" fill="none" stroke={ln} strokeWidth="1.5" />
          <circle cx="36" cy="34" r="9" fill="#1fc16b" opacity="0.18" />
          <circle cx="36" cy="34" r="9" fill="none" stroke="#1fc16b" strokeWidth="1.5" />
          <polyline points="31,34 35,38 42,28" fill="none" stroke="#1fc16b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="52" y="26" width="70" height="8" rx="4" fill={fg} opacity="0.25" />
          <rect x="52" y="39" width="92" height="6" rx="3" fill={mu} opacity="0.2" />
          <line x1="151" y1="22" x2="159" y2="30" stroke={mu} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="159" y1="22" x2="151" y2="30" stroke={mu} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "FormField":
      return (
        <svg style={ss} viewBox={vb}>
          <text x="20" y="16" fill={fg} fontSize="9.5" fontWeight="600" fontFamily={ff} opacity="0.6">Full name</text>
          <rect x="20" y="20" width="140" height="26" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="32" y="29" width="68" height="7" rx="3" fill={mu} opacity="0.22" />
          <text x="20" y="60" fill="#ff4d6a" fontSize="9" fontFamily={ff}>This field is required</text>
          <rect x="157" y="24" width="3" height="14" rx="1.5" fill={acc} opacity="0.4" />
        </svg>
      );

    case "Tabs":
      return (
        <svg style={ss} viewBox={vb}>
          <text x="20" y="27" fill={acc} fontSize="11" fontWeight="600" fontFamily={ff}>Overview</text>
          <rect x="20" y="32" width="50" height="2" rx="1" fill={acc} />
          <text x="82" y="27" fill={mu} fontSize="11" fontFamily={ff}>Analytics</text>
          <text x="140" y="27" fill={mu} fontSize="11" fontFamily={ff}>Settings</text>
          <line x1="14" y1="34" x2="166" y2="34" stroke={ln} strokeWidth="1" />
          <rect x="14" y="44" width="90" height="8" rx="4" fill={fg} opacity="0.18" />
          <rect x="14" y="57" width="140" height="6" rx="3" fill={mu} opacity="0.13" />
          <rect x="14" y="68" width="110" height="6" rx="3" fill={mu} opacity="0.1" />
        </svg>
      );

    case "Dropdown":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="52" y="6" width="76" height="22" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="62" y="12" width="44" height="7" rx="3" fill={fg} opacity="0.2" />
          <polyline points="112,11 117,16 122,11" fill="none" stroke={mu} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="52" y="32" width="76" height="44" rx="6" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="60" y="40" width="52" height="6" rx="3" fill={fg} opacity="0.22" />
          <rect x="60" y="51" width="52" height="6" rx="3" fill={acc} opacity="0.25" />
          <rect x="60" y="62" width="52" height="6" rx="3" fill={fg} opacity="0.18" />
          <rect x="60" y="69" width="52" height="1" rx="0.5" fill={ln} />
        </svg>
      );

    case "Tooltip":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="20" y="40" width="140" height="24" rx="6" fill={fg} opacity="0.85" />
          <rect x="30" y="47" width="70" height="6" rx="3" fill="white" opacity="0.6" />
          <rect x="30" y="57" width="50" height="5" rx="2.5" fill="white" opacity="0.35" />
          <polygon points="80,37 87,40 93,37" fill={fg} opacity="0.85" />
          <rect x="74" y="16" width="32" height="20" rx="5" fill={acc} opacity="0.15" />
          <rect x="74" y="16" width="32" height="20" rx="5" fill="none" stroke={acc} strokeWidth="1" />
          <rect x="80" y="22" width="20" height="7" rx="3" fill={acc} opacity="0.5" />
        </svg>
      );

    case "Popover":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="54" y="4" width="72" height="22" rx="5" fill={acc} opacity="0.12" />
          <rect x="54" y="4" width="72" height="22" rx="5" fill="none" stroke={acc} strokeWidth="1" />
          <rect x="64" y="10" width="52" height="7" rx="3" fill={acc} opacity="0.45" />
          <polygon points="82,26 90,30 98,26" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="30" y="30" width="120" height="44" rx="8" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="40" y="40" width="80" height="7" rx="3.5" fill={fg} opacity="0.22" />
          <rect x="40" y="52" width="100" height="6" rx="3" fill={mu} opacity="0.17" />
          <rect x="40" y="62" width="64" height="6" rx="3" fill={mu} opacity="0.13" />
        </svg>
      );

    case "ComboBox":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="22" width="144" height="26" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="30" y="30" width="52" height="8" rx="3" fill={fg} opacity="0.22" />
          <line x1="138" y1="22" x2="138" y2="48" stroke={ln} strokeWidth="1" />
          <polyline points="143,33 148,38 153,33" fill="none" stroke={mu} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="18" y="52" width="144" height="24" rx="5" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="26" y="58" width="55" height="6" rx="3" fill={acc} opacity="0.22" />
          <rect x="26" y="64" width="0" height="0" />
          <rect x="87" y="56" width="55" height="6" rx="3" fill={fg} opacity="0.15" />
          <rect x="87" y="65" width="55" height="5" rx="2.5" fill={mu} opacity="0.1" />
        </svg>
      );

    /* ── Molecules ───────────────────────────────────────────────────────── */
    case "SearchBox":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="22" width="144" height="30" rx="7" fill="none" stroke={ln} strokeWidth="1.5" />
          <circle cx="40" cy="37" r="8" fill="none" stroke={mu} strokeWidth="1.5" />
          <line x1="46" y1="43" x2="52" y2="49" stroke={mu} strokeWidth="1.5" strokeLinecap="round" />
          <rect x="58" y="33" width="72" height="7" rx="3" fill={mu} opacity="0.22" />
          <rect x="138" y="31" width="16" height="11" rx="3" fill={mu} opacity="0.12" />
          <text x="146" y="40" textAnchor="middle" fill={mu} fontSize="8" fontFamily={ff}>⌘K</text>
        </svg>
      );

    case "CommandBar":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="12" y="6" width="156" height="68" rx="10" fill={fg} opacity="0.06" />
          <rect x="12" y="6" width="156" height="68" rx="10" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="18" y="12" width="144" height="20" rx="5" fill={fg} opacity="0.04" />
          <circle cx="32" cy="22" r="5.5" fill="none" stroke={mu} strokeWidth="1.2" />
          <line x1="36" y1="26" x2="40" y2="30" stroke={mu} strokeWidth="1.2" strokeLinecap="round" />
          <rect x="46" y="18" width="80" height="7" rx="3" fill={mu} opacity="0.18" />
          <rect x="144" y="15" width="12" height="12" rx="3" fill={fg} opacity="0.08" />
          <text x="150" y="24" textAnchor="middle" fill={mu} fontSize="7" fontFamily={ff}>Esc</text>
          <rect x="18" y="37" width="52" height="6" rx="3" fill={acc} opacity="0.45" />
          <rect x="18" y="48" width="90" height="5" rx="2.5" fill={fg} opacity="0.14" />
          <rect x="18" y="58" width="72" height="5" rx="2.5" fill={fg} opacity="0.11" />
        </svg>
      );

    case "Pagination":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="8" y="26" width="24" height="24" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <polyline points="22,32 18,38 22,44" fill="none" stroke={mu} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="36" y="26" width="24" height="24" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <text x="48" y="42" textAnchor="middle" fill={mu} fontSize="11" fontFamily={ff}>1</text>
          <rect x="64" y="26" width="24" height="24" rx="5" fill={acc} />
          <text x="76" y="42" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily={ff}>2</text>
          <rect x="92" y="26" width="24" height="24" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <text x="104" y="42" textAnchor="middle" fill={mu} fontSize="11" fontFamily={ff}>3</text>
          <text x="128" y="42" textAnchor="middle" fill={mu} fontSize="14" fontFamily={ff}>…</text>
          <rect x="148" y="26" width="24" height="24" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <polyline points="154,32 158,38 154,44" fill="none" stroke={mu} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "Breadcrumbs":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="32" width="28" height="8" rx="4" fill={mu} opacity="0.3" />
          <text x="52" y="39" fill={mu} fontSize="13" fontFamily={ff}>/</text>
          <rect x="62" y="32" width="36" height="8" rx="4" fill={mu} opacity="0.25" />
          <text x="104" y="39" fill={mu} fontSize="13" fontFamily={ff}>/</text>
          <rect x="114" y="29" width="46" height="14" rx="5" fill={acc} opacity="0.12" />
          <rect x="116" y="32" width="42" height="8" rx="4" fill={acc} opacity="0.5" />
        </svg>
      );

    case "InputGroup":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="22" width="40" height="30" rx="5 0 0 5" fill={ln} opacity="0.4" />
          <text x="38" y="40" textAnchor="middle" fill={fg} fontSize="10" fontFamily={ff} opacity="0.55">$</text>
          <rect x="58" y="22" width="102" height="30" rx="0 5 5 0" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="66" y="32" width="60" height="8" rx="4" fill={mu} opacity="0.22" />
          <line x1="58" y1="22" x2="58" y2="52" stroke={ln} strokeWidth="1" />
        </svg>
      );

    case "Accordion":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="6" width="152" height="22" rx="5" fill={acc} opacity="0.08" />
          <rect x="14" y="6" width="152" height="22" rx="5" fill="none" stroke={acc} strokeWidth="1" opacity="0.5" />
          <rect x="22" y="14" width="76" height="7" rx="3" fill={fg} opacity="0.28" />
          <polyline points="152,12 157,17 162,12" fill="none" stroke={acc} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="30" width="152" height="18" rx="5" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="22" y="37" width="62" height="6" rx="3" fill={fg} opacity="0.2" />
          <polyline points="152,34 157,39 152,44" fill="none" stroke={mu} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="52" width="152" height="18" rx="5" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="22" y="59" width="72" height="6" rx="3" fill={fg} opacity="0.17" />
          <polyline points="152,56 157,61 152,66" fill="none" stroke={mu} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "ButtonGroup":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="22" width="48" height="30" rx="6 0 0 6" fill={acc} />
          <text x="38" y="41" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily={ff}>Edit</text>
          <rect x="62" y="22" width="48" height="30" rx="0" fill={acc} opacity="0.7" />
          <line x1="62" y1="22" x2="62" y2="52" stroke="white" strokeWidth="0.75" opacity="0.3" />
          <text x="86" y="41" textAnchor="middle" fill="white" fontSize="10" fontFamily={ff}>Copy</text>
          <rect x="110" y="22" width="48" height="30" rx="0 6 6 0" fill={acc} opacity="0.5" />
          <line x1="110" y1="22" x2="110" y2="52" stroke="white" strokeWidth="0.75" opacity="0.3" />
          <text x="134" y="41" textAnchor="middle" fill="white" fontSize="10" fontFamily={ff}>Share</text>
        </svg>
      );

    case "DatePicker":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="6" width="152" height="68" rx="7" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="14" y="6" width="152" height="18" rx="7 7 0 0" fill={acc} opacity="0.08" />
          <text x="90" y="19" textAnchor="middle" fill={fg} fontSize="9" fontWeight="600" fontFamily={ff}>March 2026</text>
          {["M","T","W","T","F","S","S"].map((d, i) => (
            <text key={`dh-${i}`} x={24+i*19} y="33" textAnchor="middle" fill={mu} fontSize="7.5" fontFamily={ff}>{d}</text>
          ))}
          {[1,2,3,4,5,6,7].map((d, i) => (
            <g key={`dr-${d}`}>
              {d === 5 && <circle cx={24+i*19} cy={47} r="8" fill={acc} />}
              <text x={24+i*19} y={50} textAnchor="middle"
                fill={d === 5 ? "white" : fg} fontSize="8" fontFamily={ff} opacity={d === 5 ? 1 : 0.6}>{d}</text>
            </g>
          ))}
          {[8,9,10,11,12,13,14].map((d, i) => (
            <text key={`dr2-${d}`} x={24+i*19} y={64} textAnchor="middle" fill={fg} fontSize="8" fontFamily={ff} opacity="0.45">{d}</text>
          ))}
        </svg>
      );

    case "ColorPicker":
      return (
        <svg style={ss} viewBox={vb}>
          {[["#ff4d6a",12],["#fa7319",36],["#f6b51e",60],["#1fc16b",84],["#3b9eff",108],["#7d52f4",132]].map(([c, x]) => (
            <circle key={c} cx={Number(x)} cy="28" r="12" fill={String(c)} />
          ))}
          <circle cx={108} cy={28} r={12} fill="none" stroke="white" strokeWidth="2.5" />
          <rect x="18" y="48" width="100" height="18" rx="4" fill="none" stroke={ln} strokeWidth="1.5" />
          <text x="28" y="61" fill={fg} fontSize="10" fontFamily={ff} opacity="0.6">#3b9eff</text>
          <rect x="126" y="48" width="36" height="18" rx="4" fill="#3b9eff" />
        </svg>
      );

    case "RichEditor":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="8" width="152" height="18" rx="5 5 0 0" fill={ln} opacity="0.35" />
          {["B","I","U","⁄","≡","≔"].map((t, i) => (
            <text key={t} x={24+i*22} y="21" fill={fg} fontSize="9.5" fontWeight={i===0?"800":i===1?"600":"400"} fontFamily={ff} fontStyle={i===1?"italic":"normal"} opacity="0.65">{t}</text>
          ))}
          <rect x="14" y="26" width="152" height="46" rx="0 0 5 5" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="22" y="34" width="88" height="8" rx="4" fill={fg} opacity="0.2" />
          <rect x="22" y="47" width="120" height="6" rx="3" fill={mu} opacity="0.15" />
          <rect x="22" y="57" width="96" height="6" rx="3" fill={mu} opacity="0.12" />
        </svg>
      );

    case "NumberInput":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="24" width="144" height="28" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="18" y="24" width="36" height="28" rx="5 0 0 5" fill={ln} opacity="0.35" />
          <text x="36" y="42" textAnchor="middle" fill={fg} fontSize="16" fontFamily={ff} opacity="0.6">−</text>
          <text x="90" y="42" textAnchor="middle" fill={fg} fontSize="13" fontWeight="600" fontFamily={ff} opacity="0.7">42</text>
          <rect x="126" y="24" width="36" height="28" rx="0 5 5 0" fill={ln} opacity="0.35" />
          <text x="144" y="41" textAnchor="middle" fill={fg} fontSize="16" fontFamily={ff} opacity="0.6">+</text>
          <line x1="54" y1="24" x2="54" y2="52" stroke={ln} strokeWidth="1" />
          <line x1="126" y1="24" x2="126" y2="52" stroke={ln} strokeWidth="1" />
        </svg>
      );

    case "TagInput":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="18" width="152" height="40" rx="6" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="22" y="26" width="36" height="16" rx="8" fill={acc} opacity="0.15" />
          <rect x="23" y="27" width="34" height="14" rx="7" fill="none" stroke={acc} strokeWidth="1" />
          <rect x="26" y="30" width="22" height="6" rx="3" fill={acc} opacity="0.55" />
          <rect x="66" y="26" width="42" height="16" rx="8" fill={acc} opacity="0.15" />
          <rect x="67" y="27" width="40" height="14" rx="7" fill="none" stroke={acc} strokeWidth="1" />
          <rect x="70" y="30" width="28" height="6" rx="3" fill={acc} opacity="0.55" />
          <rect x="116" y="30" width="32" height="6" rx="3" fill={mu} opacity="0.2" />
        </svg>
      );

    /* ── Organisms ──────────────────────────────────────────────────────── */
    case "Navbar":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="180" height="80" rx="0" fill={ln} opacity="0.25" />
          <rect x="14" y="28" width="18" height="18" rx="5" fill={acc} opacity="0.7" />
          <text x="18" y="40" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily={ff}>Z</text>
          <rect x="38" y="33" width="28" height="6" rx="3" fill={fg} opacity="0.2" />
          {[56, 90, 124].map(x => (
            <rect key={x} x={x} y="33" width="22" height="6" rx="3" fill={mu} opacity="0.2" />
          ))}
          <rect x="140" y="28" width="28" height="18" rx="5" fill={acc} />
          <rect x="144" y="32" width="20" height="6" rx="3" fill="white" opacity="0.75" />
        </svg>
      );

    case "Header":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="10" width="100" height="12" rx="6" fill={fg} opacity="0.28" />
          <rect x="14" y="27" width="140" height="7" rx="3" fill={mu} opacity="0.17" />
          <rect x="14" y="38" width="110" height="7" rx="3" fill={mu} opacity="0.13" />
          <rect x="14" y="54" width="70" height="22" rx="6" fill={acc} />
          <rect x="20" y="60" width="58" height="8" rx="4" fill="white" opacity="0.7" />
          <rect x="92" y="54" width="28" height="22" rx="6" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="100" y="60" width="12" height="8" rx="4" fill={mu} opacity="0.25" />
        </svg>
      );

    case "DataTable":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="8" y="8" width="164" height="12" rx="3" fill={ln} opacity="0.4" />
          {["Name","Role","Status"].map((_, i) => (
            <rect key={i} x={10+i*55} y="10" width={48} height="8" rx="3" fill={fg} opacity="0.25" />
          ))}
          {[0,1,2].map(row => (
            <g key={row}>
              <rect x="8" y={24+row*18} width="164" height="16" rx="2"
                fill={row === 1 ? acc : "transparent"} opacity={row === 1 ? 0.07 : 1} />
              {[0,1,2].map(col => (
                <rect key={col} x={10+col*55} y={28+row*18} width={40+col*2} height="6" rx="3"
                  fill={row === 1 ? acc : fg} opacity={row === 1 ? 0.35 : 0.18} />
              ))}
            </g>
          ))}
        </svg>
      );

    case "ModalDialog":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="180" height="80" fill={fg} opacity="0.08" />
          <rect x="22" y="8" width="136" height="64" rx="10" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="30" y="18" width="80" height="9" rx="4" fill={fg} opacity="0.28" />
          <rect x="30" y="32" width="120" height="6" rx="3" fill={mu} opacity="0.2" />
          <rect x="30" y="42" width="100" height="6" rx="3" fill={mu} opacity="0.15" />
          <rect x="70" y="56" width="36" height="13" rx="5" fill={acc} />
          <rect x="74" y="59" width="28" height="6" rx="3" fill="white" opacity="0.7" />
          <rect x="112" y="56" width="36" height="13" rx="5" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="116" y="59" width="28" height="6" rx="3" fill={fg} opacity="0.18" />
        </svg>
      );

    case "SidebarNav":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="52" height="80" fill={ln} opacity="0.2" />
          <rect x="6" y="8" width="40" height="10" rx="4" fill={fg} opacity="0.22" />
          {[0,1,2,3].map(i => (
            <rect key={i} x="6" y={26+i*14} width={i===1?44:36} height="9" rx="4"
              fill={i===1?acc:mu} opacity={i===1?0.2:0.15} />
          ))}
          <rect x="60" y="8" width="108" height="9" rx="4" fill={fg} opacity="0.22" />
          <rect x="60" y="22" width="108" height="6" rx="3" fill={mu} opacity="0.15" />
          <rect x="60" y="32" width="88" height="6" rx="3" fill={mu} opacity="0.12" />
          <rect x="60" y="48" width="60" height="16" rx="5" fill={acc} />
          <rect x="66" y="52" width="48" height="7" rx="3" fill="white" opacity="0.7" />
        </svg>
      );

    case "FiltersBar":
      return (
        <svg style={ss} viewBox={vb}>
          <text x="14" y="20" fill={mu} fontSize="9" fontWeight="500" fontFamily={ff}>Filter by:</text>
          {[["All",true,14],["Design",false,40],["React",false,76],["Pro",false,108]].map(([label, active, x]) => (
            <g key={String(label)}>
              <rect x={Number(x)} y="28" width={String(label).length*7+12} height="20" rx="10"
                fill={active ? acc : "none"} opacity={active ? 1 : 1}
                stroke={active ? acc : ln} strokeWidth="1" />
              <text x={Number(x)+String(label).length*3.5+6} y="42" textAnchor="middle"
                fill={active ? "white" : mu} fontSize="9.5" fontFamily={ff}>{String(label)}</text>
            </g>
          ))}
          <rect x="14" y="55" width="152" height="1" rx="0.5" fill={ln} opacity="0.5" />
        </svg>
      );

    case "SearchResultsPanel":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="8" width="152" height="16" rx="5" fill="none" stroke={ln} strokeWidth="1.2" />
          <circle cx="26" cy="16" r="4.5" fill="none" stroke={mu} strokeWidth="1.2" />
          <rect x="34" y="12" width="60" height="6" rx="3" fill={mu} opacity="0.2" />
          {[0,1,2].map(i => (
            <g key={i}>
              <rect x="14" y={30+i*16} width="152" height="14" rx="4"
                fill={i===0?acc:"transparent"} opacity={i===0?0.07:1} />
              <rect x="20" y={34+i*16} width={80-i*10} height="6" rx="3"
                fill={i===0?acc:fg} opacity={i===0?0.45:0.2} />
              <rect x={108-i*8} y={34+i*16} width={48+i*8} height="6" rx="3"
                fill={mu} opacity="0.15" />
            </g>
          ))}
        </svg>
      );

    case "LayoutShell":
      return (
        <svg style={ss} viewBox={vb}>
          {/* Top nav */}
          <rect x="0" y="0" width="180" height="16" fill={ln} opacity="0.3" />
          {/* Sidebar */}
          <rect x="0" y="16" width="36" height="64" fill={ln} opacity="0.18" />
          <rect x="6" y="22" width="24" height="6" rx="3" fill={fg} opacity="0.2" />
          <rect x="6" y="32" width="24" height="5" rx="2.5" fill={acc} opacity="0.3" />
          <rect x="6" y="41" width="22" height="5" rx="2.5" fill={mu} opacity="0.15" />
          <rect x="6" y="50" width="22" height="5" rx="2.5" fill={mu} opacity="0.12" />
          {/* Content area */}
          <rect x="42" y="22" width="130" height="10" rx="4" fill={fg} opacity="0.2" />
          <rect x="42" y="38" width="130" height="8" rx="3" fill={ln} opacity="0.4" />
          <rect x="42" y="50" width="60" height="20" rx="4" fill={acc} opacity="0.1" />
          <rect x="108" y="50" width="64" height="20" rx="4" fill={acc} opacity="0.08" />
        </svg>
      );

    case "Sheet":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="180" height="80" fill={fg} opacity="0.06" />
          <rect x="80" y="0" width="100" height="80" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="88" y="12" width="60" height="10" rx="4" fill={fg} opacity="0.28" />
          <rect x="88" y="28" width="84" height="6" rx="3" fill={mu} opacity="0.2" />
          <rect x="88" y="38" width="74" height="6" rx="3" fill={mu} opacity="0.16" />
          <rect x="88" y="56" width="52" height="18" rx="5" fill={acc} />
          <rect x="92" y="60" width="44" height="8" rx="4" fill="white" opacity="0.7" />
          <line x1="154" y1="14" x2="162" y2="22" stroke={mu} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="162" y1="14" x2="154" y2="22" stroke={mu} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "AlertDialog":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="180" height="80" fill={fg} opacity="0.06" />
          <rect x="20" y="8" width="140" height="64" rx="10" fill="none" stroke={ln} strokeWidth="1.5" />
          <circle cx="90" cy="24" r="10" fill="#ff4d6a" opacity="0.15" />
          <circle cx="90" cy="24" r="10" fill="none" stroke="#ff4d6a" strokeWidth="1.5" />
          <text x="89" y="28" textAnchor="middle" fill="#ff4d6a" fontSize="12" fontWeight="800" fontFamily={ff}>!</text>
          <rect x="30" y="40" width="70" height="8" rx="4" fill={fg} opacity="0.25" />
          <rect x="30" y="52" width="60" height="20" rx="5" fill="#ff4d6a" />
          <rect x="34" y="57" width="52" height="8" rx="4" fill="white" opacity="0.7" />
          <rect x="96" y="52" width="60" height="20" rx="5" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="100" y="57" width="52" height="8" rx="4" fill={fg} opacity="0.18" />
        </svg>
      );

    /* ── Layout primitives ──────────────────────────────────────────────── */
    case "Stack":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="20" y="8" width="140" height="16" rx="4" fill={acc} opacity="0.18" />
          <rect x="20" y="28" width="140" height="16" rx="4" fill={acc} opacity="0.28" />
          <rect x="20" y="48" width="140" height="16" rx="4" fill={acc} opacity="0.38" />
          <text x="90" y="19" textAnchor="middle" fill={acc} fontSize="8" fontWeight="600" fontFamily={ff}>Item 1</text>
          <text x="90" y="39" textAnchor="middle" fill={acc} fontSize="8" fontWeight="600" fontFamily={ff}>Item 2</text>
          <text x="90" y="59" textAnchor="middle" fill={acc} fontSize="8" fontWeight="600" fontFamily={ff}>Item 3</text>
        </svg>
      );

    case "Grid":
      return (
        <svg style={ss} viewBox={vb}>
          {[[10,8],[66,8],[122,8],[10,46],[66,46],[122,46]].map(([x,y],i) => (
            <rect key={i} x={x} y={y} width="48" height="26" rx="4"
              fill={acc} opacity={0.12+i*0.04} />
          ))}
        </svg>
      );

    case "Box":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="20" y="10" width="140" height="60" rx="8" fill={acc} opacity="0.08" />
          <rect x="20" y="10" width="140" height="60" rx="8" fill="none" stroke={acc} strokeWidth="1.5" strokeDasharray="5 3" />
          <rect x="36" y="26" width="70" height="9" rx="4" fill={acc} opacity="0.3" />
          <rect x="36" y="40" width="100" height="7" rx="3" fill={mu} opacity="0.2" />
        </svg>
      );

    case "Spacer":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="30" y="18" width="120" height="10" rx="4" fill={fg} opacity="0.18" />
          <line x1="30" y1="35" x2="150" y2="35" stroke={acc} strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="30" y1="32" x2="30" y2="38" stroke={acc} strokeWidth="1.5" />
          <line x1="150" y1="32" x2="150" y2="38" stroke={acc} strokeWidth="1.5" />
          <text x="90" y="30" textAnchor="middle" fill={acc} fontSize="9" fontFamily={ff}>16px</text>
          <rect x="30" y="46" width="120" height="10" rx="4" fill={fg} opacity="0.18" />
        </svg>
      );

    /* ── Libraries ──────────────────────────────────────────────────────── */
    case "IconLibrary":
      return (
        <svg style={ss} viewBox={vb}>
          {[[14,10],[44,10],[74,10],[104,10],[134,10],
            [14,42],[44,42],[74,42],[104,42],[134,42]].map(([x,y],i) => (
            <g key={i}>
              <rect x={x} y={y} width="26" height="26" rx="6" fill={acc} opacity={0.06+i*0.012} />
              <rect x={x+5} y={y+5} width="16" height="16" rx="3" fill={acc} opacity={0.2+i*0.03} />
            </g>
          ))}
        </svg>
      );

    case "AvatarLibrary":
      return (
        <svg style={ss} viewBox={vb}>
          {["#ff4d6a","#fa7319","#f6b51e","#1fc16b","#3b9eff","#7d52f4","#ff4d6a","#1fc16b","#3b9eff","#fa7319"].map((c,i) => {
            const row = Math.floor(i / 5);
            const col = i % 5;
            return (
              <g key={i}>
                <circle cx={26+col*32} cy={22+row*32} r="13" fill={c} opacity="0.15" />
                <circle cx={26+col*32} cy={22+row*32} r="13" fill="none" stroke={c} strokeWidth="1" />
                <text x={26+col*32} y={26+row*32} textAnchor="middle" fill={c} fontSize="8" fontWeight="700" fontFamily={ff}>
                  {["AK","MJ","SA","LT","IS","NK","EL","DR","PR","CW"][i]}
                </text>
              </g>
            );
          })}
        </svg>
      );

    case "LogoLibrary":
      return (
        <svg style={ss} viewBox={vb}>
          {[[14,10],[60,10],[106,10],[14,46],[60,46],[106,46]].map(([x,y],i) => (
            <g key={i}>
              <rect x={x} y={y} width="40" height="24" rx="5" fill={ln} opacity="0.35" />
              <rect x={x+5} y={y+7} width="30" height="9" rx="3" fill={mu} opacity="0.35" />
            </g>
          ))}
        </svg>
      );

    /* ── Page templates ─────────────────────────────────────────────────── */
    case "DashboardPage":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="180" height="14" fill={fg} opacity="0.1" />
          <rect x="0" y="14" width="38" height="66" fill={fg} opacity="0.06" />
          {[0,1,2,3].map(i => <rect key={i} x="6" y={20+i*12} width="26" height="7" rx="3" fill={mu} opacity="0.2" />)}
          {[0,1].map(col => [0,1].map(row => (
            <rect key={`${col}-${row}`} x={44+col*68} y={20+row*28} width="60" height="22" rx="5"
              fill={acc} opacity={0.06+col*0.04+row*0.04} />
          )))}
          <rect x="44" y="56" width="128" height="20" rx="5" fill={ln} opacity="0.35" />
          {[0,1,2,3].map(i => <rect key={i} x={50+i*30} y="60" width="24" height="10" rx="3" fill={fg} opacity="0.15" />)}
        </svg>
      );

    case "AuthPage":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="90" height="80" fill={acc} opacity="0.06" />
          <rect x="20" y="28" width="50" height="10" rx="4" fill={acc} opacity="0.35" />
          <rect x="20" y="44" width="42" height="7" rx="3" fill={mu} opacity="0.2" />
          <rect x="20" y="56" width="52" height="7" rx="3" fill={mu} opacity="0.15" />
          <rect x="96" y="14" width="74" height="52" rx="6" fill="none" stroke={ln} strokeWidth="1.2" />
          <rect x="104" y="22" width="58" height="8" rx="3" fill={fg} opacity="0.2" />
          <rect x="104" y="34" width="58" height="10" rx="4" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="104" y="48" width="58" height="10" rx="4" fill={acc} />
          <rect x="108" y="51" width="50" height="6" rx="3" fill="white" opacity="0.7" />
        </svg>
      );

    case "SettingsPage":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="8" y="8" width="164" height="10" rx="4" fill={fg} opacity="0.22" />
          <rect x="8" y="22" width="38" height="54" rx="5" fill={ln} opacity="0.25" />
          {[0,1,2,3].map(i => <rect key={i} x="14" y={28+i*12} width="26" height="6" rx="3" fill={mu} opacity={i===0?0.35:0.18} />)}
          <rect x="52" y="22" width="120" height="54" rx="5" fill="none" stroke={ln} strokeWidth="1.2" />
          <rect x="60" y="30" width="60" height="7" rx="3" fill={fg} opacity="0.22" />
          <rect x="60" y="42" width="104" height="10" rx="4" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="60" y="57" width="44" height="14" rx="5" fill={acc} />
          <rect x="64" y="61" width="36" height="6" rx="3" fill="white" opacity="0.7" />
        </svg>
      );

    case "OnboardingPage":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="70" height="80" fill={fg} opacity="0.08" />
          <rect x="8" y="12" width="16" height="16" rx="4" fill={acc} />
          <rect x="8" y="34" width="54" height="5" rx="2.5" fill={mu} opacity="0.2" />
          <rect x="8" y="43" width="54" height="5" rx="2.5" fill={mu} opacity="0.15" />
          <rect x="8" y="52" width="40" height="5" rx="2.5" fill={mu} opacity="0.12" />
          <rect x="76" y="12" width="96" height="10" rx="4" fill={fg} opacity="0.22" />
          <rect x="76" y="28" width="96" height="7" rx="3" fill={mu} opacity="0.18" />
          <rect x="76" y="40" width="80" height="7" rx="3" fill={mu} opacity="0.15" />
          <rect x="76" y="58" width="56" height="16" rx="5" fill={acc} />
          <rect x="80" y="62" width="48" height="7" rx="3" fill="white" opacity="0.7" />
        </svg>
      );

    case "MarketingPage":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="180" height="80" fill={fg} opacity="0.05" />
          <rect x="0" y="0" width="180" height="14" fill={fg} opacity="0.1" />
          <rect x="12" y="4" width="18" height="6" rx="3" fill={fg} opacity="0.3" />
          <rect x="140" y="3" width="32" height="8" rx="4" fill={acc} />
          <rect x="40" y="22" width="100" height="10" rx="4" fill={fg} opacity="0.25" />
          <rect x="52" y="36" width="76" height="7" rx="3" fill={mu} opacity="0.18" />
          <rect x="54" y="50" width="34" height="16" rx="5" fill={acc} />
          <rect x="94" y="50" width="34" height="16" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
        </svg>
      );

    /* ── Default fallback ────────────────────────────────────────────────── */
    default:
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="58" y="24" width="64" height="32" rx="8" fill={acc} opacity="0.12" />
          <rect x="58" y="24" width="64" height="32" rx="8" fill="none" stroke={acc} strokeWidth="1.5" />
          <rect x="70" y="34" width="40" height="6" rx="3" fill={acc} opacity="0.45" />
          <rect x="76" y="44" width="28" height="5" rx="2.5" fill={acc} opacity="0.3" />
        </svg>
      );
  }
}
