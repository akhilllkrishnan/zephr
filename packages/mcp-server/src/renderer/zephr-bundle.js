"use strict";
var Zephr = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../icons-material/dist/index.js
  var require_dist = __commonJS({
    "../icons-material/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MATERIAL_ICON_STYLES = void 0;
      exports.normalizeMaterialIconName = normalizeMaterialIconName;
      exports.listMaterialIcons = listMaterialIcons;
      exports.searchMaterialIcons = searchMaterialIcons2;
      exports.getMaterialIcon = getMaterialIcon;
      exports.MaterialIcon = MaterialIcon2;
      var jsx_runtime_1 = __require("react/jsx-runtime");
      var aliasKeywords = {
        gear: ["settings", "manage", "preferences"],
        cog: ["settings", "configuration"],
        profile: ["person", "account", "user"],
        avatar: ["person", "account", "face"],
        alert: ["warning", "error", "notification"],
        warn: ["warning", "error"],
        bell: ["notifications", "alert"],
        message: ["chat", "forum", "comment"],
        mail: ["email", "inbox", "send"],
        photo: ["image", "camera", "gallery"],
        doc: ["description", "article", "note"],
        file: ["description", "folder", "attachment"],
        security: ["shield", "lock", "privacy"],
        payment: ["credit_card", "wallet", "payments"],
        analytics: ["insights", "query_stats", "monitoring"],
        ai: ["smart_toy", "auto_awesome", "psychology_alt"],
        support: ["help", "contact_support", "live_help"]
      };
      function toTitle(name) {
        return name.split("_").map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join(" ");
      }
      function defineIcons(names, category, keywords) {
        return names.map((name) => {
          const parts = name.split("_").filter(Boolean);
          return {
            name,
            title: toTitle(name),
            category,
            keywords: Array.from(/* @__PURE__ */ new Set([...keywords, ...parts]))
          };
        });
      }
      var iconCatalog = [
        ...defineIcons([
          "home",
          "menu",
          "search",
          "settings",
          "dashboard",
          "apps",
          "widgets",
          "grid_view",
          "view_comfy",
          "view_quilt",
          "view_list",
          "view_sidebar",
          "space_dashboard",
          "splitscreen",
          "tune",
          "filter_list",
          "sort",
          "more_horiz",
          "more_vert",
          "chevron_left",
          "chevron_right",
          "expand_more",
          "expand_less",
          "arrow_back",
          "arrow_forward",
          "open_in_new",
          "first_page",
          "last_page",
          "refresh",
          "sync",
          "cached",
          "swap_horiz",
          "swap_vert",
          "fullscreen",
          "fullscreen_exit"
        ], "navigation", ["navigation", "layout", "ui", "menu", "panel"]),
        ...defineIcons([
          "person",
          "person_outline",
          "person_add",
          "group",
          "groups",
          "badge",
          "face",
          "account_circle",
          "supervised_user_circle",
          "manage_accounts",
          "admin_panel_settings",
          "contact_page",
          "contact_mail",
          "contact_phone",
          "support_agent",
          "emoji_people",
          "diversity_1",
          "diversity_3"
        ], "identity", ["identity", "user", "people", "profile", "account"]),
        ...defineIcons([
          "notifications",
          "notifications_active",
          "notifications_none",
          "notifications_off",
          "campaign",
          "announcement",
          "priority_high",
          "warning",
          "error",
          "error_outline",
          "info",
          "task_alt",
          "verified",
          "new_releases",
          "report",
          "report_problem",
          "flag",
          "flag_circle"
        ], "status", ["status", "alert", "notification", "feedback"]),
        ...defineIcons([
          "mail",
          "email",
          "alternate_email",
          "send",
          "forward_to_inbox",
          "inbox",
          "drafts",
          "mark_email_read",
          "mark_email_unread",
          "forum",
          "chat",
          "chat_bubble",
          "comment",
          "question_answer",
          "sms",
          "call",
          "phone",
          "phone_in_talk",
          "voicemail"
        ], "communication", ["communication", "message", "chat", "email", "support"]),
        ...defineIcons([
          "description",
          "article",
          "receipt_long",
          "text_snippet",
          "subject",
          "format_list_bulleted",
          "table_chart",
          "folder",
          "folder_open",
          "folder_shared",
          "create_new_folder",
          "attach_file",
          "file_copy",
          "download",
          "download_for_offline",
          "upload",
          "save",
          "history",
          "content_copy",
          "content_cut",
          "content_paste",
          "edit",
          "edit_note",
          "delete",
          "archive",
          "unarchive",
          "restore",
          "print",
          "auto_stories",
          "bookmarks"
        ], "files", ["files", "documents", "editor", "storage", "content"]),
        ...defineIcons([
          "lock",
          "lock_open",
          "vpn_key",
          "key",
          "password",
          "shield",
          "security",
          "gpp_good",
          "gpp_maybe",
          "gpp_bad",
          "verified_user",
          "policy",
          "fingerprint",
          "visibility",
          "visibility_off",
          "privacy_tip",
          "no_encryption",
          "health_and_safety"
        ], "security", ["security", "privacy", "protection", "auth", "access"]),
        ...defineIcons([
          "shopping_cart",
          "shopping_bag",
          "store",
          "storefront",
          "sell",
          "inventory_2",
          "inventory",
          "payments",
          "credit_card",
          "account_balance_wallet",
          "savings",
          "price_check",
          "paid",
          "currency_exchange",
          "receipt",
          "loyalty",
          "redeem",
          "local_offer"
        ], "commerce", ["commerce", "payment", "checkout", "billing", "finance"]),
        ...defineIcons([
          "bar_chart",
          "stacked_bar_chart",
          "show_chart",
          "pie_chart",
          "donut_large",
          "insights",
          "analytics",
          "query_stats",
          "timeline",
          "trending_up",
          "trending_down",
          "monitoring",
          "equalizer",
          "leaderboard"
        ], "analytics", ["analytics", "metrics", "charts", "dashboard", "data"]),
        ...defineIcons([
          "smart_toy",
          "auto_awesome",
          "auto_fix_high",
          "psychology",
          "psychology_alt",
          "bolt",
          "rocket_launch",
          "code",
          "terminal",
          "integration_instructions",
          "memory",
          "api",
          "dataset",
          "model_training",
          "schema",
          "cloud",
          "cloud_done",
          "cloud_upload",
          "cloud_download",
          "deployed_code",
          "deployed_code_account"
        ], "developer", ["developer", "ai", "automation", "cloud", "platform"]),
        ...defineIcons([
          "image",
          "imagesmode",
          "photo",
          "photo_library",
          "add_a_photo",
          "camera_alt",
          "videocam",
          "slideshow",
          "movie",
          "music_note",
          "mic",
          "brush",
          "palette",
          "color_lens",
          "format_paint",
          "draw",
          "gesture",
          "style"
        ], "media", ["media", "creative", "design", "content", "visual"]),
        ...defineIcons([
          "calendar_today",
          "calendar_month",
          "event",
          "event_available",
          "schedule",
          "alarm",
          "today",
          "pending_actions",
          "check_circle",
          "cancel",
          "hourglass_bottom",
          "hourglass_top",
          "play_arrow",
          "pause",
          "stop",
          "skip_next",
          "skip_previous"
        ], "time", ["time", "schedule", "workflow", "task", "calendar"]),
        ...defineIcons([
          "flight",
          "directions_car",
          "local_shipping",
          "map",
          "location_on",
          "place",
          "my_location",
          "public",
          "language",
          "travel_explore",
          "explore",
          "route",
          "pin_drop",
          "near_me"
        ], "location", ["location", "maps", "travel", "logistics", "geo"]),
        ...defineIcons([
          "favorite",
          "favorite_border",
          "star",
          "star_border",
          "thumb_up",
          "thumb_down",
          "sentiment_satisfied",
          "celebration",
          "local_fire_department",
          "handshake",
          "military_tech"
        ], "engagement", ["engagement", "rating", "reaction", "social", "feedback"])
      ];
      var catalogByName = new Map(iconCatalog.map((icon) => [icon.name, icon]));
      exports.MATERIAL_ICON_STYLES = [
        "filled",
        "outlined",
        "rounded",
        "sharp"
      ];
      function normalizeMaterialIconName(value) {
        return value.trim().toLowerCase().replace(/[\s-]+/g, "_").replace(/[^a-z0-9_]/g, "");
      }
      function listMaterialIcons() {
        return [...iconCatalog];
      }
      function expandQueryTokens(tokens) {
        const expanded = new Set(tokens);
        for (const token of tokens) {
          const aliases = aliasKeywords[token] ?? [];
          for (const alias of aliases) {
            expanded.add(alias);
          }
        }
        return [...expanded];
      }
      function scoreIcon(icon, tokens, normalizedQuery) {
        const searchable = `${icon.name} ${icon.title} ${icon.category} ${icon.keywords.join(" ")}`.toLowerCase();
        let score = 0;
        if (normalizedQuery && icon.name === normalizedQuery) {
          score += 120;
        }
        if (normalizedQuery && icon.name.startsWith(normalizedQuery)) {
          score += 50;
        }
        for (const token of tokens) {
          if (!token) {
            continue;
          }
          if (icon.name.includes(token)) {
            score += 24;
          }
          if (icon.title.toLowerCase().includes(token)) {
            score += 16;
          }
          if (icon.keywords.some((keyword) => keyword.toLowerCase().includes(token))) {
            score += 12;
          }
          if (searchable.includes(token)) {
            score += 4;
          }
        }
        return score;
      }
      function searchMaterialIcons2(query, options = {}) {
        const limit = options.limit ?? 120;
        const normalizedQuery = normalizeMaterialIconName(query);
        if (!normalizedQuery) {
          return iconCatalog.slice(0, limit);
        }
        const tokenList = expandQueryTokens(normalizedQuery.split("_").filter(Boolean));
        const scored = iconCatalog.map((icon) => ({ icon, score: scoreIcon(icon, tokenList, normalizedQuery) })).filter((entry) => entry.score > 0).sort((left, right) => {
          if (right.score !== left.score) {
            return right.score - left.score;
          }
          return left.icon.name.localeCompare(right.icon.name);
        });
        const results = scored.map((entry) => entry.icon);
        if (results.length === 0) {
          return [
            {
              name: normalizedQuery,
              title: toTitle(normalizedQuery),
              category: "custom",
              keywords: ["custom", ...tokenList]
            }
          ];
        }
        return results.slice(0, limit);
      }
      function getMaterialIcon(name) {
        const normalized = normalizeMaterialIconName(name);
        return catalogByName.get(normalized) ?? null;
      }
      var familyByStyle = {
        filled: "'Material Symbols Outlined'",
        outlined: "'Material Symbols Outlined'",
        rounded: "'Material Symbols Rounded'",
        sharp: "'Material Symbols Sharp'"
      };
      function MaterialIcon2({ name, size = 20, styleVariant = "filled", filled, weight = 400, grade = 0, opticalSize = 24, style, ...props }) {
        const normalizedName = normalizeMaterialIconName(name);
        const resolvedFilled = typeof filled === "boolean" ? filled : styleVariant === "filled";
        const iconStyle = {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          fontFamily: familyByStyle[styleVariant],
          fontWeight: "normal",
          fontStyle: "normal",
          fontSize: size,
          lineHeight: 1,
          letterSpacing: "normal",
          textTransform: "none",
          whiteSpace: "nowrap",
          wordWrap: "normal",
          direction: "ltr",
          userSelect: "none",
          WebkitFontFeatureSettings: "'liga'",
          fontFeatureSettings: "'liga'",
          WebkitFontSmoothing: "antialiased",
          fontVariationSettings: `'FILL' ${resolvedFilled ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
          ...style
        };
        const ariaLabel = props["aria-label"];
        return (0, jsx_runtime_1.jsx)("span", { ...props, role: ariaLabel ? "img" : void 0, "aria-hidden": ariaLabel ? void 0 : true, style: iconStyle, children: normalizedName });
      }
    }
  });

  // ../avatars/dist/types.js
  var require_types = __commonJS({
    "../avatars/dist/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../avatars/dist/catalog.js
  var require_catalog = __commonJS({
    "../avatars/dist/catalog.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.listAvatarStyles = listAvatarStyles2;
      exports.getAvatarStyle = getAvatarStyle;
      exports.searchAvatarStyles = searchAvatarStyles2;
      var avatarStyles = [
        {
          id: "initials",
          label: "Initials",
          description: "Classic initials avatar with strong color fill.",
          tags: ["default", "profile", "team", "simple"]
        },
        {
          id: "beam",
          label: "Beam",
          description: "Diagonal beam lighting with bright accent overlay.",
          tags: ["gradient", "modern", "vibrant", "creative"]
        },
        {
          id: "ring",
          label: "Ring",
          description: "Concentric ring identity chip for dashboard rows.",
          tags: ["status", "dashboard", "indicator", "enterprise"]
        },
        {
          id: "blob",
          label: "Blob",
          description: "Organic abstract shape for playful product personas.",
          tags: ["playful", "organic", "social", "friendly"]
        },
        {
          id: "pixel",
          label: "Pixel",
          description: "Low-res mosaic style for gaming and retro themes.",
          tags: ["retro", "gaming", "tech", "matrix"]
        },
        {
          id: "sunset",
          label: "Sunset",
          description: "Warm horizon gradient with calm cinematic tone.",
          tags: ["warm", "soft", "brand", "marketing"]
        },
        {
          id: "soft",
          label: "Soft",
          description: "Pastel profile style for minimal interfaces.",
          tags: ["minimal", "clean", "editorial", "light"]
        },
        {
          id: "capsule",
          label: "Capsule",
          description: "Rounded card badge with capsule framing.",
          tags: ["badge", "identity", "saas", "ui"]
        },
        {
          id: "mono",
          label: "Mono",
          description: "Monochrome style for neutral products and docs.",
          tags: ["neutral", "professional", "docs", "b2b"]
        },
        {
          id: "orbit",
          label: "Orbit",
          description: "Orbital rings around core identity marker.",
          tags: ["ai", "motion", "platform", "future"]
        }
      ];
      var styleById = new Map(avatarStyles.map((style) => [style.id, style]));
      function normalizeQuery(query) {
        return query.trim().toLowerCase();
      }
      function listAvatarStyles2() {
        return [...avatarStyles];
      }
      function getAvatarStyle(style) {
        return styleById.get(style) ?? avatarStyles[0];
      }
      function searchAvatarStyles2(query, limit = 10) {
        const normalized = normalizeQuery(query);
        if (!normalized) {
          return avatarStyles.slice(0, limit);
        }
        const tokens = normalized.split(/\s+/).filter(Boolean);
        const scored = avatarStyles.map((style) => {
          const haystack = `${style.id} ${style.label} ${style.description} ${style.tags.join(" ")}`.toLowerCase();
          let score = 0;
          if (style.id === normalized) {
            score += 80;
          }
          for (const token of tokens) {
            if (style.id.includes(token)) {
              score += 40;
            }
            if (style.label.toLowerCase().includes(token)) {
              score += 30;
            }
            if (style.tags.some((tag) => tag.includes(token))) {
              score += 18;
            }
            if (haystack.includes(token)) {
              score += 8;
            }
          }
          return { style, score };
        }).filter((entry) => entry.score > 0).sort((left, right) => right.score - left.score || left.style.label.localeCompare(right.style.label));
        return scored.slice(0, limit).map((entry) => entry.style);
      }
    }
  });

  // ../avatars/dist/generator.js
  var require_generator = __commonJS({
    "../avatars/dist/generator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.generateAvatarSvg = generateAvatarSvg;
      exports.generateAvatar = generateAvatar2;
      function hash(input) {
        let value = 0;
        for (const char of input) {
          value = value * 31 + char.charCodeAt(0) >>> 0;
        }
        return value;
      }
      function initials2(name) {
        const fromName = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
        return fromName || "Z";
      }
      var defaultPalette = [
        "#121212",
        "#2f6fed",
        "#1094b3",
        "#0f766e",
        "#a43ff4",
        "#f97316",
        "#dc2626",
        "#1fc16b"
      ];
      var pastelPalette = ["#c4b5fd", "#bfdbfe", "#bae6fd", "#bbf7d0", "#fde68a", "#fecaca", "#fbcfe8"];
      function pickColor(seed, palette) {
        return palette[hash(seed) % palette.length];
      }
      function styleBackground(style, seed, fallback) {
        if (style === "soft") {
          return {
            base: pickColor(`soft-${seed}`, pastelPalette),
            accent: pickColor(`soft-accent-${seed}`, pastelPalette)
          };
        }
        if (style === "mono") {
          const tone = 30 + hash(seed) % 40;
          return {
            base: `hsl(220 8% ${tone}%)`,
            accent: `hsl(220 10% ${Math.max(12, tone - 14)}%)`
          };
        }
        return {
          base: fallback,
          accent: pickColor(`accent-${seed}`, defaultPalette)
        };
      }
      function svgForStyle(style, size, label, ariaLabel, base, accent, textColor) {
        const radius = Math.floor(size * 0.22);
        if (style === "beam") {
          return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <defs>
        <linearGradient id='beam' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${base}' />
          <stop offset='100%' stop-color='${accent}' />
        </linearGradient>
      </defs>
      <rect width='${size}' height='${size}' fill='url(#beam)' rx='${radius}' />
      <path d='M-8 ${size * 0.72} L${size * 0.38} ${size * 0.16} L${size + 8} ${size * 0.4} L${size * 0.6} ${size + 8} Z' fill='rgba(255,255,255,0.2)' />
      <text x='50%' y='53%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.34)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
        }
        if (style === "ring") {
          return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      <circle cx='${size / 2}' cy='${size / 2}' r='${size * 0.32}' fill='none' stroke='rgba(255,255,255,0.55)' stroke-width='${Math.max(2, Math.floor(size * 0.08))}' />
      <circle cx='${size / 2}' cy='${size / 2}' r='${size * 0.19}' fill='rgba(0,0,0,0.2)' />
      <text x='50%' y='53%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.28)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
        }
        if (style === "blob") {
          return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      <path d='M${size * 0.18} ${size * 0.52}C${size * 0.15} ${size * 0.3} ${size * 0.36} ${size * 0.14} ${size * 0.56} ${size * 0.22}C${size * 0.73} ${size * 0.28} ${size * 0.86} ${size * 0.46} ${size * 0.78} ${size * 0.64}C${size * 0.71} ${size * 0.82} ${size * 0.52} ${size * 0.9} ${size * 0.34} ${size * 0.84}C${size * 0.23} ${size * 0.8} ${size * 0.12} ${size * 0.68} ${size * 0.18} ${size * 0.52}Z' fill='rgba(255,255,255,0.2)' />
      <text x='50%' y='53%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.33)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
        }
        if (style === "pixel") {
          const cell = Math.max(4, Math.floor(size / 8));
          const blocks = Array.from({ length: 14 }, (_, index) => {
            const offset = hash(`pixel-${index}-${label}`);
            const x = offset % 8 * cell;
            const y = Math.floor(offset / 8) % 8 * cell;
            const alpha = 0.12 + offset % 35 / 100;
            return `<rect x='${x}' y='${y}' width='${cell}' height='${cell}' fill='rgba(255,255,255,${alpha.toFixed(2)})' />`;
          }).join("");
          return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      ${blocks}
      <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.3)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
        }
        if (style === "sunset") {
          return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <defs>
        <linearGradient id='sunset' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='${accent}' />
          <stop offset='100%' stop-color='${base}' />
        </linearGradient>
      </defs>
      <rect width='${size}' height='${size}' fill='url(#sunset)' rx='${radius}' />
      <circle cx='${size * 0.5}' cy='${size * 0.38}' r='${size * 0.16}' fill='rgba(255,255,255,0.3)' />
      <rect x='0' y='${size * 0.65}' width='${size}' height='${size * 0.35}' fill='rgba(0,0,0,0.16)' />
      <text x='50%' y='75%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.25)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
        }
        if (style === "soft") {
          return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      <circle cx='${size * 0.33}' cy='${size * 0.28}' r='${size * 0.2}' fill='rgba(255,255,255,0.36)' />
      <circle cx='${size * 0.72}' cy='${size * 0.78}' r='${size * 0.16}' fill='${accent}' opacity='0.34' />
      <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.3)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
        }
        if (style === "capsule") {
          return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      <rect x='${size * 0.12}' y='${size * 0.22}' width='${size * 0.76}' height='${size * 0.56}' rx='${size * 0.28}' fill='rgba(0,0,0,0.18)' />
      <rect x='${size * 0.16}' y='${size * 0.28}' width='${size * 0.68}' height='${size * 0.44}' rx='${size * 0.22}' fill='rgba(255,255,255,0.2)' />
      <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.26)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
        }
        if (style === "mono") {
          return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      <path d='M0 ${size * 0.7} L${size} ${size * 0.45} L${size} ${size} L0 ${size} Z' fill='rgba(255,255,255,0.09)' />
      <text x='50%' y='53%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.3)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
        }
        if (style === "orbit") {
          return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      <ellipse cx='${size * 0.5}' cy='${size * 0.5}' rx='${size * 0.35}' ry='${size * 0.14}' fill='none' stroke='rgba(255,255,255,0.45)' stroke-width='2' />
      <ellipse cx='${size * 0.5}' cy='${size * 0.5}' rx='${size * 0.14}' ry='${size * 0.35}' fill='none' stroke='rgba(255,255,255,0.35)' stroke-width='2' />
      <circle cx='${size * 0.5}' cy='${size * 0.5}' r='${size * 0.2}' fill='rgba(0,0,0,0.2)' />
      <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.24)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
        }
        return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
    <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
    <text x='50%' y='53%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.38)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
  </svg>`;
      }
      function generateAvatarSvg(options) {
        const size = options.size ?? 96;
        const seed = options.seed ?? options.name;
        const style = options.style ?? "initials";
        const fallback = options.background ?? pickColor(seed, defaultPalette);
        const colors = styleBackground(style, seed, fallback);
        const textColor = options.textColor ?? "#ffffff";
        const label = initials2(options.name);
        return svgForStyle(style, size, label, options.name, colors.base, colors.accent, textColor);
      }
      function generateAvatar2(options) {
        const svg = generateAvatarSvg(options);
        return {
          svg,
          dataUri: `data:image/svg+xml,${encodeURIComponent(svg)}`
        };
      }
    }
  });

  // ../avatars/dist/client.js
  var require_client = __commonJS({
    "../avatars/dist/client.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AvatarClient = void 0;
      var generator_1 = require_generator();
      var AvatarClient = class {
        apiBaseUrl;
        apiKey;
        constructor(options = {}) {
          this.apiBaseUrl = options.apiBaseUrl;
          this.apiKey = options.apiKey;
        }
        async createAvatar(options) {
          if (!this.apiBaseUrl || !this.apiKey) {
            return (0, generator_1.generateAvatar)(options);
          }
          try {
            const response = await fetch(`${this.apiBaseUrl.replace(/\/$/, "")}/v1/avatars`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`
              },
              body: JSON.stringify(options)
            });
            if (!response.ok) {
              return (0, generator_1.generateAvatar)(options);
            }
            const payload = await response.json();
            if (!payload.svg || !payload.dataUri) {
              return (0, generator_1.generateAvatar)(options);
            }
            return payload;
          } catch {
            return (0, generator_1.generateAvatar)(options);
          }
        }
      };
      exports.AvatarClient = AvatarClient;
    }
  });

  // ../avatars/dist/index.js
  var require_dist2 = __commonJS({
    "../avatars/dist/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_types(), exports);
      __exportStar(require_catalog(), exports);
      __exportStar(require_generator(), exports);
      __exportStar(require_client(), exports);
    }
  });

  // ../logos/dist/types.js
  var require_types2 = __commonJS({
    "../logos/dist/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../logos/dist/catalog.js
  var require_catalog2 = __commonJS({
    "../logos/dist/catalog.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.listLogoCatalog = listLogoCatalog2;
      exports.getLogoByDomain = getLogoByDomain;
      exports.searchLogoCatalog = searchLogoCatalog2;
      var seedLogos = [
        { name: "Zephr", domain: "zephr.local", category: "platform", color: "#121212", tags: ["ui", "design-system", "developer"] },
        { name: "OpenAI", domain: "openai.com", category: "ai", color: "#111827", tags: ["ai", "llm", "assistant"] },
        { name: "Anthropic", domain: "anthropic.com", category: "ai", color: "#d97706", tags: ["ai", "claude", "model"] },
        { name: "Perplexity", domain: "perplexity.ai", category: "ai", color: "#0f766e", tags: ["ai", "search", "assistant"] },
        { name: "xAI", domain: "x.ai", category: "ai", color: "#1d4ed8", tags: ["ai", "model", "platform"] },
        { name: "Google", domain: "google.com", category: "search", color: "#2563eb", tags: ["search", "cloud", "workspace"] },
        { name: "Microsoft", domain: "microsoft.com", category: "enterprise", color: "#0284c7", tags: ["enterprise", "cloud", "productivity"] },
        { name: "Apple", domain: "apple.com", category: "consumer", color: "#111827", tags: ["consumer", "hardware", "mobile"] },
        { name: "Meta", domain: "meta.com", category: "social", color: "#2563eb", tags: ["social", "platform", "reality"] },
        { name: "Amazon", domain: "amazon.com", category: "commerce", color: "#f59e0b", tags: ["commerce", "cloud", "retail"] },
        { name: "AWS", domain: "aws.amazon.com", category: "cloud", color: "#f97316", tags: ["cloud", "infra", "devops"] },
        { name: "Azure", domain: "azure.microsoft.com", category: "cloud", color: "#0284c7", tags: ["cloud", "infra", "enterprise"] },
        { name: "Google Cloud", domain: "cloud.google.com", category: "cloud", color: "#2563eb", tags: ["cloud", "infra", "kubernetes"] },
        { name: "Cloudflare", domain: "cloudflare.com", category: "cloud", color: "#f97316", tags: ["cdn", "security", "network"] },
        { name: "Vercel", domain: "vercel.com", category: "developer", color: "#111827", tags: ["hosting", "frontend", "deployment"] },
        { name: "Netlify", domain: "netlify.com", category: "developer", color: "#0f766e", tags: ["hosting", "frontend", "jamstack"] },
        { name: "Render", domain: "render.com", category: "developer", color: "#2563eb", tags: ["hosting", "api", "deploy"] },
        { name: "Fly.io", domain: "fly.io", category: "developer", color: "#7c3aed", tags: ["hosting", "edge", "infra"] },
        { name: "Railway", domain: "railway.app", category: "developer", color: "#111827", tags: ["hosting", "developer", "database"] },
        { name: "DigitalOcean", domain: "digitalocean.com", category: "cloud", color: "#2563eb", tags: ["cloud", "droplets", "infra"] },
        { name: "Linode", domain: "linode.com", category: "cloud", color: "#22c55e", tags: ["cloud", "compute", "infra"] },
        { name: "GitHub", domain: "github.com", category: "developer", color: "#111827", tags: ["git", "code", "collaboration"] },
        { name: "GitLab", domain: "gitlab.com", category: "developer", color: "#f97316", tags: ["git", "ci", "devops"] },
        { name: "Bitbucket", domain: "bitbucket.org", category: "developer", color: "#2563eb", tags: ["git", "code", "repository"] },
        { name: "Stack Overflow", domain: "stackoverflow.com", category: "developer", color: "#f97316", tags: ["community", "developer", "questions"] },
        { name: "npm", domain: "npmjs.com", category: "developer", color: "#dc2626", tags: ["package", "javascript", "registry"] },
        { name: "Yarn", domain: "yarnpkg.com", category: "developer", color: "#0ea5e9", tags: ["package", "javascript", "tooling"] },
        { name: "pnpm", domain: "pnpm.io", category: "developer", color: "#f59e0b", tags: ["package", "javascript", "monorepo"] },
        { name: "Bun", domain: "bun.sh", category: "developer", color: "#a16207", tags: ["runtime", "javascript", "tooling"] },
        { name: "Node.js", domain: "nodejs.org", category: "developer", color: "#15803d", tags: ["runtime", "javascript", "backend"] },
        { name: "Deno", domain: "deno.com", category: "developer", color: "#111827", tags: ["runtime", "typescript", "backend"] },
        { name: "React", domain: "react.dev", category: "frontend", color: "#0ea5e9", tags: ["frontend", "ui", "javascript"] },
        { name: "Vue", domain: "vuejs.org", category: "frontend", color: "#22c55e", tags: ["frontend", "ui", "javascript"] },
        { name: "Svelte", domain: "svelte.dev", category: "frontend", color: "#f97316", tags: ["frontend", "ui", "javascript"] },
        { name: "Angular", domain: "angular.dev", category: "frontend", color: "#dc2626", tags: ["frontend", "framework", "enterprise"] },
        { name: "Next.js", domain: "nextjs.org", category: "frontend", color: "#111827", tags: ["frontend", "react", "fullstack"] },
        { name: "Nuxt", domain: "nuxt.com", category: "frontend", color: "#16a34a", tags: ["frontend", "vue", "fullstack"] },
        { name: "Remix", domain: "remix.run", category: "frontend", color: "#1d4ed8", tags: ["frontend", "react", "routing"] },
        { name: "Astro", domain: "astro.build", category: "frontend", color: "#7c3aed", tags: ["frontend", "content", "website"] },
        { name: "Tailwind", domain: "tailwindcss.com", category: "frontend", color: "#0891b2", tags: ["css", "design", "utility"] },
        { name: "Figma", domain: "figma.com", category: "design", color: "#a855f7", tags: ["design", "ui", "collaboration"] },
        { name: "Framer", domain: "framer.com", category: "design", color: "#111827", tags: ["design", "prototype", "website"] },
        { name: "Sketch", domain: "sketch.com", category: "design", color: "#f59e0b", tags: ["design", "ui", "mac"] },
        { name: "Canva", domain: "canva.com", category: "design", color: "#06b6d4", tags: ["design", "marketing", "graphics"] },
        { name: "Notion", domain: "notion.so", category: "productivity", color: "#111827", tags: ["notes", "wiki", "workspace"] },
        { name: "Airtable", domain: "airtable.com", category: "productivity", color: "#f97316", tags: ["database", "no-code", "workspace"] },
        { name: "Asana", domain: "asana.com", category: "productivity", color: "#ec4899", tags: ["project", "task", "team"] },
        { name: "Trello", domain: "trello.com", category: "productivity", color: "#2563eb", tags: ["project", "kanban", "team"] },
        { name: "Monday", domain: "monday.com", category: "productivity", color: "#ec4899", tags: ["project", "workflow", "team"] },
        { name: "ClickUp", domain: "clickup.com", category: "productivity", color: "#7c3aed", tags: ["project", "tasks", "collaboration"] },
        { name: "Linear", domain: "linear.app", category: "productivity", color: "#111827", tags: ["issues", "engineering", "project"] },
        { name: "Jira", domain: "atlassian.com", category: "productivity", color: "#2563eb", tags: ["issues", "project", "enterprise"] },
        { name: "Confluence", domain: "confluence.atlassian.com", category: "productivity", color: "#2563eb", tags: ["wiki", "docs", "team"] },
        { name: "Slack", domain: "slack.com", category: "communication", color: "#7c3aed", tags: ["chat", "team", "communication"] },
        { name: "Discord", domain: "discord.com", category: "communication", color: "#5865f2", tags: ["community", "chat", "voice"] },
        { name: "Microsoft Teams", domain: "teams.microsoft.com", category: "communication", color: "#4f46e5", tags: ["chat", "enterprise", "meeting"] },
        { name: "Zoom", domain: "zoom.us", category: "communication", color: "#2563eb", tags: ["video", "meeting", "communication"] },
        { name: "Loom", domain: "loom.com", category: "communication", color: "#4338ca", tags: ["video", "async", "team"] },
        { name: "Twilio", domain: "twilio.com", category: "communication", color: "#dc2626", tags: ["sms", "voice", "api"] },
        { name: "SendGrid", domain: "sendgrid.com", category: "communication", color: "#2563eb", tags: ["email", "delivery", "api"] },
        { name: "Mailchimp", domain: "mailchimp.com", category: "marketing", color: "#f59e0b", tags: ["email", "marketing", "automation"] },
        { name: "HubSpot", domain: "hubspot.com", category: "marketing", color: "#f97316", tags: ["crm", "marketing", "sales"] },
        { name: "Salesforce", domain: "salesforce.com", category: "crm", color: "#0ea5e9", tags: ["crm", "sales", "enterprise"] },
        { name: "Intercom", domain: "intercom.com", category: "support", color: "#111827", tags: ["support", "chat", "customer"] },
        { name: "Zendesk", domain: "zendesk.com", category: "support", color: "#16a34a", tags: ["support", "customer", "ticketing"] },
        { name: "Freshdesk", domain: "freshworks.com", category: "support", color: "#16a34a", tags: ["support", "ticketing", "helpdesk"] },
        { name: "Stripe", domain: "stripe.com", category: "payments", color: "#635bff", tags: ["payments", "billing", "checkout"] },
        { name: "PayPal", domain: "paypal.com", category: "payments", color: "#0c4a6e", tags: ["payments", "wallet", "commerce"] },
        { name: "Square", domain: "squareup.com", category: "payments", color: "#111827", tags: ["payments", "pos", "commerce"] },
        { name: "Razorpay", domain: "razorpay.com", category: "payments", color: "#2563eb", tags: ["payments", "india", "gateway"] },
        { name: "Coinbase", domain: "coinbase.com", category: "crypto", color: "#2563eb", tags: ["crypto", "exchange", "wallet"] },
        { name: "Kraken", domain: "kraken.com", category: "crypto", color: "#4338ca", tags: ["crypto", "exchange", "trading"] },
        { name: "Binance", domain: "binance.com", category: "crypto", color: "#ca8a04", tags: ["crypto", "exchange", "trading"] },
        { name: "Visa", domain: "visa.com", category: "payments", color: "#1d4ed8", tags: ["payments", "cards", "finance"] },
        { name: "Mastercard", domain: "mastercard.com", category: "payments", color: "#f97316", tags: ["payments", "cards", "finance"] },
        { name: "American Express", domain: "americanexpress.com", category: "payments", color: "#0891b2", tags: ["payments", "cards", "finance"] },
        { name: "Plaid", domain: "plaid.com", category: "finance", color: "#16a34a", tags: ["fintech", "banking", "api"] },
        { name: "Brex", domain: "brex.com", category: "finance", color: "#111827", tags: ["finance", "cards", "startup"] },
        { name: "Ramp", domain: "ramp.com", category: "finance", color: "#2563eb", tags: ["finance", "spend", "cards"] },
        { name: "Mercury", domain: "mercury.com", category: "finance", color: "#0f766e", tags: ["banking", "startup", "finance"] },
        { name: "Robinhood", domain: "robinhood.com", category: "finance", color: "#16a34a", tags: ["investing", "trading", "retail"] },
        { name: "Postgres", domain: "postgresql.org", category: "database", color: "#0c4a6e", tags: ["database", "sql", "storage"] },
        { name: "MySQL", domain: "mysql.com", category: "database", color: "#2563eb", tags: ["database", "sql", "storage"] },
        { name: "MongoDB", domain: "mongodb.com", category: "database", color: "#15803d", tags: ["database", "nosql", "storage"] },
        { name: "Redis", domain: "redis.io", category: "database", color: "#dc2626", tags: ["cache", "database", "memory"] },
        { name: "Supabase", domain: "supabase.com", category: "database", color: "#16a34a", tags: ["database", "backend", "auth"] },
        { name: "Neon", domain: "neon.tech", category: "database", color: "#22c55e", tags: ["database", "postgres", "serverless"] },
        { name: "PlanetScale", domain: "planetscale.com", category: "database", color: "#f59e0b", tags: ["database", "mysql", "serverless"] },
        { name: "Prisma", domain: "prisma.io", category: "developer", color: "#1e293b", tags: ["orm", "database", "typescript"] },
        { name: "Drizzle", domain: "orm.drizzle.team", category: "developer", color: "#16a34a", tags: ["orm", "sql", "typescript"] },
        { name: "Firebase", domain: "firebase.google.com", category: "backend", color: "#f59e0b", tags: ["backend", "database", "auth"] },
        { name: "Appwrite", domain: "appwrite.io", category: "backend", color: "#f43f5e", tags: ["backend", "auth", "database"] },
        { name: "Hasura", domain: "hasura.io", category: "backend", color: "#9333ea", tags: ["graphql", "backend", "api"] },
        { name: "Nhost", domain: "nhost.io", category: "backend", color: "#0ea5e9", tags: ["backend", "auth", "database"] },
        { name: "Auth0", domain: "auth0.com", category: "auth", color: "#111827", tags: ["auth", "identity", "security"] },
        { name: "Clerk", domain: "clerk.com", category: "auth", color: "#2563eb", tags: ["auth", "identity", "developer"] },
        { name: "Stytch", domain: "stytch.com", category: "auth", color: "#0f766e", tags: ["auth", "passwordless", "security"] },
        { name: "Okta", domain: "okta.com", category: "auth", color: "#2563eb", tags: ["auth", "enterprise", "identity"] },
        { name: "Sentry", domain: "sentry.io", category: "observability", color: "#111827", tags: ["errors", "monitoring", "devops"] },
        { name: "Datadog", domain: "datadoghq.com", category: "observability", color: "#7c3aed", tags: ["monitoring", "logs", "metrics"] },
        { name: "New Relic", domain: "newrelic.com", category: "observability", color: "#16a34a", tags: ["monitoring", "apm", "metrics"] },
        { name: "Grafana", domain: "grafana.com", category: "observability", color: "#f97316", tags: ["dashboards", "monitoring", "metrics"] },
        { name: "Prometheus", domain: "prometheus.io", category: "observability", color: "#f97316", tags: ["monitoring", "metrics", "open-source"] },
        { name: "Elastic", domain: "elastic.co", category: "observability", color: "#2563eb", tags: ["search", "logs", "analytics"] },
        { name: "Algolia", domain: "algolia.com", category: "search", color: "#2563eb", tags: ["search", "api", "discovery"] },
        { name: "Meilisearch", domain: "meilisearch.com", category: "search", color: "#6366f1", tags: ["search", "open-source", "api"] },
        { name: "Typesense", domain: "typesense.org", category: "search", color: "#0ea5e9", tags: ["search", "open-source", "database"] },
        { name: "Contentful", domain: "contentful.com", category: "cms", color: "#111827", tags: ["cms", "content", "headless"] },
        { name: "Sanity", domain: "sanity.io", category: "cms", color: "#ef4444", tags: ["cms", "content", "headless"] },
        { name: "Strapi", domain: "strapi.io", category: "cms", color: "#4f46e5", tags: ["cms", "content", "api"] },
        { name: "Ghost", domain: "ghost.org", category: "cms", color: "#111827", tags: ["blog", "publishing", "content"] },
        { name: "WordPress", domain: "wordpress.org", category: "cms", color: "#0c4a6e", tags: ["blog", "cms", "website"] },
        { name: "Shopify", domain: "shopify.com", category: "commerce", color: "#15803d", tags: ["commerce", "store", "retail"] },
        { name: "WooCommerce", domain: "woocommerce.com", category: "commerce", color: "#7c3aed", tags: ["commerce", "wordpress", "store"] },
        { name: "BigCommerce", domain: "bigcommerce.com", category: "commerce", color: "#2563eb", tags: ["commerce", "enterprise", "store"] },
        { name: "Squarespace", domain: "squarespace.com", category: "website", color: "#111827", tags: ["website", "builder", "design"] },
        { name: "Webflow", domain: "webflow.com", category: "website", color: "#2563eb", tags: ["website", "builder", "design"] },
        { name: "Wix", domain: "wix.com", category: "website", color: "#111827", tags: ["website", "builder", "nocode"] },
        { name: "Framer Sites", domain: "framer.com/sites", category: "website", color: "#111827", tags: ["website", "design", "builder"] },
        { name: "YouTube", domain: "youtube.com", category: "media", color: "#dc2626", tags: ["video", "media", "content"] },
        { name: "Spotify", domain: "spotify.com", category: "media", color: "#16a34a", tags: ["music", "streaming", "media"] },
        { name: "Netflix", domain: "netflix.com", category: "media", color: "#dc2626", tags: ["video", "streaming", "media"] },
        { name: "Medium", domain: "medium.com", category: "media", color: "#111827", tags: ["writing", "blog", "media"] },
        { name: "Substack", domain: "substack.com", category: "media", color: "#f97316", tags: ["newsletter", "writing", "media"] },
        { name: "X", domain: "x.com", category: "social", color: "#111827", tags: ["social", "network", "content"] },
        { name: "LinkedIn", domain: "linkedin.com", category: "social", color: "#2563eb", tags: ["social", "professional", "network"] },
        { name: "Instagram", domain: "instagram.com", category: "social", color: "#ec4899", tags: ["social", "media", "creator"] },
        { name: "TikTok", domain: "tiktok.com", category: "social", color: "#111827", tags: ["social", "video", "creator"] },
        { name: "Pinterest", domain: "pinterest.com", category: "social", color: "#dc2626", tags: ["social", "images", "creator"] },
        { name: "Reddit", domain: "reddit.com", category: "social", color: "#f97316", tags: ["community", "social", "forum"] }
      ];
      function normalizeId(value) {
        return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      var catalog = seedLogos.map((logo) => ({
        id: normalizeId(logo.name),
        name: logo.name,
        domain: logo.domain,
        category: logo.category,
        color: logo.color,
        tags: logo.tags
      }));
      var byDomain = new Map(catalog.map((item) => [item.domain.toLowerCase(), item]));
      function normalizeDomain(domain) {
        return domain.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
      }
      function listLogoCatalog2() {
        return [...catalog];
      }
      function getLogoByDomain(domain) {
        const normalized = normalizeDomain(domain);
        const exact = byDomain.get(normalized);
        if (exact) {
          return exact;
        }
        const suffix = [...byDomain.keys()].find((item) => item.endsWith(normalized) || normalized.endsWith(item));
        if (!suffix) {
          return null;
        }
        return byDomain.get(suffix) ?? null;
      }
      function score(entry, tokens, normalized) {
        const haystack = `${entry.id} ${entry.name} ${entry.domain} ${entry.category} ${entry.tags.join(" ")}`.toLowerCase();
        let value = 0;
        if (entry.id === normalized || entry.domain === normalized || entry.name.toLowerCase() === normalized) {
          value += 120;
        }
        for (const token of tokens) {
          if (entry.name.toLowerCase().includes(token)) {
            value += 35;
          }
          if (entry.domain.includes(token)) {
            value += 28;
          }
          if (entry.tags.some((tag) => tag.includes(token))) {
            value += 16;
          }
          if (entry.category.includes(token)) {
            value += 10;
          }
          if (haystack.includes(token)) {
            value += 4;
          }
        }
        return value;
      }
      function searchLogoCatalog2(query, limit = 120) {
        const normalized = query.trim().toLowerCase();
        if (!normalized) {
          return catalog.slice(0, limit);
        }
        const tokens = normalized.split(/\s+/).filter(Boolean);
        return catalog.map((entry) => ({ entry, score: score(entry, tokens, normalized) })).filter((entry) => entry.score > 0).sort((left, right) => right.score - left.score || left.entry.name.localeCompare(right.entry.name)).slice(0, limit).map((entry) => entry.entry);
      }
    }
  });

  // ../logos/dist/fallback.js
  var require_fallback = __commonJS({
    "../logos/dist/fallback.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createCatalogLogoDataUri = createCatalogLogoDataUri2;
      exports.createFallbackLogoDataUri = createFallbackLogoDataUri;
      function hash(input) {
        let value = 0;
        for (const char of input) {
          value = value * 31 + char.charCodeAt(0) >>> 0;
        }
        return value;
      }
      function initials2(value) {
        return value.replace(/^https?:\/\//, "").split(/[\s.-]+/).filter(Boolean).slice(0, 2).map((token) => token[0]?.toUpperCase() ?? "").join("") || "Z";
      }
      function defaultPalette(seed) {
        const palette = ["#2563eb", "#0f766e", "#be123c", "#f97316", "#4338ca", "#0891b2", "#121212"];
        const base = palette[hash(seed) % palette.length];
        const accent = palette[(hash(`accent-${seed}`) + 2) % palette.length];
        return { base, accent };
      }
      function createCatalogLogoDataUri2(entry, size = 128) {
        const mark = initials2(entry.name);
        const radius = Math.floor(size * 0.16);
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${entry.color}' />
        <stop offset='100%' stop-color='#0f172a' />
      </linearGradient>
    </defs>
    <rect width='${size}' height='${size}' rx='${radius}' fill='url(#g)' />
    <rect x='${Math.floor(size * 0.12)}' y='${Math.floor(size * 0.12)}' width='${Math.floor(size * 0.76)}' height='${Math.floor(size * 0.76)}' rx='${Math.floor(size * 0.14)}' fill='rgba(255,255,255,0.1)' />
    <text x='50%' y='53%' text-anchor='middle' dominant-baseline='middle' font-family='IBM Plex Sans, Arial, sans-serif' font-size='${Math.floor(size * 0.33)}' font-weight='700' fill='#ffffff'>${mark}</text>
  </svg>`;
        return `data:image/svg+xml,${encodeURIComponent(svg)}`;
      }
      function createFallbackLogoDataUri(domain, size = 128) {
        const mark = initials2(domain);
        const palette = defaultPalette(domain);
        const radius = Math.floor(size * 0.16);
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
    <defs>
      <linearGradient id='fb' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${palette.base}' />
        <stop offset='100%' stop-color='${palette.accent}' />
      </linearGradient>
    </defs>
    <rect width='${size}' height='${size}' fill='url(#fb)' rx='${radius}' />
    <text x='50%' y='53%' text-anchor='middle' dominant-baseline='middle' font-family='IBM Plex Sans, Arial, sans-serif' font-size='${Math.floor(size * 0.33)}' font-weight='700' fill='#ffffff'>${mark}</text>
  </svg>`;
        return `data:image/svg+xml,${encodeURIComponent(svg)}`;
      }
    }
  });

  // ../logos/dist/providers.js
  var require_providers = __commonJS({
    "../logos/dist/providers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CatalogLogoProvider = exports.HttpLogoProvider = void 0;
      var fallback_1 = require_fallback();
      var catalog_1 = require_catalog2();
      var HttpLogoProvider = class {
        id;
        baseUrl;
        attribution;
        constructor(options = {}) {
          this.id = options.id ?? "http-provider";
          this.baseUrl = options.baseUrl ?? "https://assets.zephr.local/logos";
          this.attribution = options.attribution ?? "Zephr hosted logo asset";
        }
        async getLogo(domain) {
          if (!domain) {
            return null;
          }
          const normalized = domain.replace(/^https?:\/\//, "").split("/")[0];
          if (!normalized.includes(".")) {
            return null;
          }
          return {
            url: `${this.baseUrl}/${normalized}.svg`,
            attribution: this.attribution
          };
        }
        async healthCheck() {
          try {
            const response = await fetch(this.baseUrl, { method: "HEAD" });
            return response.ok;
          } catch {
            return false;
          }
        }
      };
      exports.HttpLogoProvider = HttpLogoProvider;
      var CatalogLogoProvider = class {
        id = "zephr-catalog";
        async getLogo(domain) {
          const found = (0, catalog_1.getLogoByDomain)(domain);
          if (!found) {
            return null;
          }
          return {
            url: (0, fallback_1.createCatalogLogoDataUri)(found),
            attribution: "Zephr catalog mark"
          };
        }
        async healthCheck() {
          return true;
        }
      };
      exports.CatalogLogoProvider = CatalogLogoProvider;
    }
  });

  // ../logos/dist/client.js
  var require_client2 = __commonJS({
    "../logos/dist/client.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LogoClient = void 0;
      var fallback_1 = require_fallback();
      var providers_1 = require_providers();
      var LogoClient = class {
        providers;
        cache = /* @__PURE__ */ new Map();
        denylist = /* @__PURE__ */ new Set();
        takedowns = [];
        cacheTtlMs;
        fallbackAttribution;
        constructor(options = {}) {
          this.providers = options.providers ?? [new providers_1.CatalogLogoProvider()];
          this.cacheTtlMs = options.cacheTtlMs ?? 1e3 * 60 * 60 * 24;
          this.fallbackAttribution = options.fallbackAttribution ?? "Zephr generated fallback logo";
          for (const item of options.denylist ?? []) {
            this.denylist.add(this.normalizeDomain(item));
          }
        }
        normalizeDomain(domain) {
          return domain.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
        }
        isDenied(domain) {
          return this.denylist.has(this.normalizeDomain(domain));
        }
        async resolve(domain) {
          const normalized = this.normalizeDomain(domain);
          if (this.isDenied(normalized)) {
            throw new Error(`Domain ${normalized} is blocked by compliance policy`);
          }
          const cached = this.cache.get(normalized);
          const now = Date.now();
          if (cached && cached.expiresAtMs > now) {
            return { ...cached.value, fromCache: true };
          }
          for (const provider of this.providers) {
            const resolved = await provider.getLogo(normalized);
            if (resolved?.url) {
              const expiresAtMs2 = now + this.cacheTtlMs;
              const payload = {
                domain: normalized,
                url: resolved.url,
                source: provider.id,
                attribution: resolved.attribution ?? "Unknown attribution",
                cacheExpiresAt: new Date(expiresAtMs2).toISOString(),
                fromCache: false,
                fallback: false
              };
              this.cache.set(normalized, { value: payload, expiresAtMs: expiresAtMs2 });
              return payload;
            }
          }
          const expiresAtMs = now + this.cacheTtlMs;
          const fallback = {
            domain: normalized,
            url: (0, fallback_1.createFallbackLogoDataUri)(normalized),
            source: "zephr-fallback",
            attribution: this.fallbackAttribution,
            cacheExpiresAt: new Date(expiresAtMs).toISOString(),
            fromCache: false,
            fallback: true
          };
          this.cache.set(normalized, { value: fallback, expiresAtMs });
          return fallback;
        }
        requestTakedown(domain, reason) {
          const normalized = this.normalizeDomain(domain);
          this.denylist.add(normalized);
          this.cache.delete(normalized);
          const record = {
            domain: normalized,
            reason,
            requestedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          this.takedowns.push(record);
          return record;
        }
        listTakedowns() {
          return [...this.takedowns];
        }
        async providerHealth() {
          return Promise.all(this.providers.map(async (provider) => ({
            provider: provider.id,
            healthy: provider.healthCheck ? await provider.healthCheck() : true
          })));
        }
      };
      exports.LogoClient = LogoClient;
    }
  });

  // ../logos/dist/index.js
  var require_dist3 = __commonJS({
    "../logos/dist/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_types2(), exports);
      __exportStar(require_catalog2(), exports);
      __exportStar(require_providers(), exports);
      __exportStar(require_fallback(), exports);
      __exportStar(require_client2(), exports);
    }
  });

  // ../ui-react/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    AccessRequestsWidget: () => AccessRequestsWidget,
    Accordion: () => Accordion,
    ActivityTimelineWidget: () => ActivityTimelineWidget,
    Alert: () => Alert,
    AlertDialog: () => AlertDialog,
    AnalyticsOverviewWidget: () => AnalyticsOverviewWidget,
    ApiKeysWidget: () => ApiKeysWidget,
    ApprovalModalWidget: () => ApprovalModalWidget,
    AssetReviewWidget: () => AssetReviewWidget,
    AuditTrailWidget: () => AuditTrailWidget,
    AuthPage: () => AuthPage,
    AutomationRunsWidget: () => AutomationRunsWidget,
    Avatar: () => Avatar,
    AvatarLibrary: () => AvatarLibrary,
    Badge: () => Badge,
    BillingRecoveryWidget: () => BillingRecoveryWidget,
    BillingUsageWidget: () => BillingUsageWidget,
    Box: () => Box,
    Breadcrumbs: () => Breadcrumbs,
    Button: () => Button,
    ButtonGroup: () => ButtonGroup,
    Card: () => Card,
    CardFooter: () => CardFooter,
    CardHeader: () => CardHeader,
    ChangelogFeedWidget: () => ChangelogFeedWidget,
    ChatPanelWidget: () => ChatPanelWidget,
    Checkbox: () => Checkbox,
    ColorPicker: () => ColorPicker,
    ComboBox: () => ComboBox,
    CommandBar: () => CommandBar,
    CommandPaletteWidget: () => CommandPaletteWidget,
    CommentThreadWidget: () => CommentThreadWidget,
    ContentCalendarWidget: () => ContentCalendarWidget,
    ConversionScoreWidget: () => ConversionScoreWidget,
    CustomerHealthWidget: () => CustomerHealthWidget,
    DashboardPage: () => DashboardPage,
    DataTable: () => DataTable,
    DataTableWidget: () => DataTableWidget,
    DatePicker: () => DatePicker,
    DatePickerWidget: () => DatePickerWidget,
    DealsPipelineWidget: () => DealsPipelineWidget,
    DeliveryTimelineWidget: () => DeliveryTimelineWidget,
    Divider: () => Divider,
    Dropdown: () => Dropdown,
    DropdownMenuWidget: () => DropdownMenuWidget,
    EventSchedulerWidget: () => EventSchedulerWidget,
    ExperimentResultsWidget: () => ExperimentResultsWidget,
    FeedbackInboxWidget: () => FeedbackInboxWidget,
    FileManagerWidget: () => FileManagerWidget,
    FiltersBar: () => FiltersBar,
    FormField: () => FormField,
    GoalTrackerWidget: () => GoalTrackerWidget,
    Grid: () => Grid,
    Header: () => Header,
    IconButton: () => IconButton,
    IconLibrary: () => IconLibrary,
    IncidentDigestWidget: () => IncidentDigestWidget,
    IncidentResponseWidget: () => IncidentResponseWidget,
    Input: () => Input,
    InputGroup: () => InputGroup,
    IntegrationStatusWidget: () => IntegrationStatusWidget,
    InviteMembersWidget: () => InviteMembersWidget,
    KanbanBoardWidget: () => KanbanBoardWidget,
    LaunchProgressWidget: () => LaunchProgressWidget,
    LayoutShell: () => LayoutShell,
    LicenseActivationsWidget: () => LicenseActivationsWidget,
    Logo: () => Logo,
    LogoLibrary: () => LogoLibrary,
    MarketingInsightsWidget: () => MarketingInsightsWidget,
    MarketingPage: () => MarketingPage,
    MetricsDashboardWidget: () => MetricsDashboardWidget,
    ModalDialog: () => ModalDialog,
    Navbar: () => Navbar,
    NavbarWidget: () => NavbarWidget,
    NotificationFeedWidget: () => NotificationFeedWidget,
    NumberInput: () => NumberInput,
    OnboardingPage: () => OnboardingPage,
    Pagination: () => Pagination,
    PaymentMethodsWidget: () => PaymentMethodsWidget,
    PlanComparisonWidget: () => PlanComparisonWidget,
    Popover: () => Popover,
    PricingTierWidget: () => PricingTierWidget,
    Progress: () => Progress,
    ProjectBriefFormWidget: () => ProjectBriefFormWidget,
    PromptComposerWidget: () => PromptComposerWidget,
    QuickActionsWidget: () => QuickActionsWidget,
    Radio: () => Radio,
    ReferralRewardWidget: () => ReferralRewardWidget,
    ReleaseChecklistWidget: () => ReleaseChecklistWidget,
    ReleaseNotesWidget: () => ReleaseNotesWidget,
    RevenueSnapshotWidget: () => RevenueSnapshotWidget,
    ReviewInboxWidget: () => ReviewInboxWidget,
    RichEditor: () => RichEditor,
    SearchBox: () => SearchBox,
    SearchResultsPanel: () => SearchResultsPanel,
    SecurityAccessWidget: () => SecurityAccessWidget,
    Select: () => Select,
    SettingsPage: () => SettingsPage,
    SettingsPanelWidget: () => SettingsPanelWidget,
    SetupJourneyWidget: () => SetupJourneyWidget,
    Sheet: () => Sheet,
    SidebarNav: () => SidebarNav,
    Skeleton: () => Skeleton,
    Slider: () => Slider,
    Spacer: () => Spacer,
    Stack: () => Stack,
    StatusPageWidget: () => StatusPageWidget,
    SupportQueueWidget: () => SupportQueueWidget,
    Switch: () => Switch,
    Tabs: () => Tabs,
    TagInput: () => TagInput,
    TeamDirectoryWidget: () => TeamDirectoryWidget,
    TeamPulseWidget: () => TeamPulseWidget,
    Textarea: () => Textarea,
    Toast: () => Toast,
    Tooltip: () => Tooltip,
    TravelItineraryWidget: () => TravelItineraryWidget,
    UploadQueueWidget: () => UploadQueueWidget,
    UserProfileCardWidget: () => UserProfileCardWidget,
    WelcomeProfileWidget: () => WelcomeProfileWidget
  });

  // ../ui-react/src/atoms/Button.tsx
  var import_react = __require("react");
  var import_jsx_runtime = __require("react/jsx-runtime");
  var sizeStyles = {
    sm: {
      minHeight: "32px",
      padding: "6px 10px",
      borderRadius: "8px",
      fontSize: "14px"
    },
    md: {
      minHeight: "36px",
      padding: "8px 12px",
      borderRadius: "8px",
      fontSize: "14px"
    },
    lg: {
      minHeight: "40px",
      padding: "10px 14px",
      borderRadius: "10px",
      fontSize: "14px"
    }
  };
  var spinnerStyle = {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    border: "2px solid currentColor",
    borderTopColor: "transparent",
    flexShrink: 0,
    animation: "z-spin 0.7s linear infinite"
  };
  var loadingSpinnerWrapStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none"
  };
  function getVariantStyles(variant, disabled, hovered, focused) {
    if (disabled) {
      return {
        background: "var(--z-color-weak, var(--z-color-background, #f7f7f7))",
        borderColor: "transparent",
        boxShadow: "none",
        color: "var(--z-color-text300, #a1a1aa)",
        cursor: "not-allowed",
        outline: "none"
      };
    }
    if (variant === "secondary") {
      return {
        background: hovered ? "var(--z-color-weak, var(--z-color-background, #f7f7f7))" : "var(--z-color-surface, #ffffff)",
        borderColor: "var(--z-color-border, #ebebeb)",
        boxShadow: hovered ? "0 2px 8px rgba(10, 13, 20, 0.08)" : "none",
        color: "var(--z-color-text, #171717)"
      };
    }
    if (variant === "ghost") {
      return {
        background: hovered ? "var(--z-color-border, #ebebeb)" : "var(--z-color-weak, var(--z-color-background, #f7f7f7))",
        borderColor: "transparent",
        boxShadow: "none",
        color: "var(--z-color-text, #171717)"
      };
    }
    if (variant === "danger") {
      return {
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%), var(--z-color-danger, #fb3748)",
        borderColor: "rgba(255, 255, 255, 0.12)",
        boxShadow: hovered ? "0 3px 10px rgba(14, 18, 27, 0.18), inset 0 0 0 1px var(--z-color-danger, #fb3748)" : "inset 0 0 0 1px var(--z-color-danger, #fb3748)",
        color: "var(--z-color-primaryContrast, #ffffff)"
      };
    }
    return {
      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%), var(--z-color-background950, #121212)",
      borderColor: "rgba(255, 255, 255, 0.12)",
      boxShadow: focused ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)" : hovered ? "0 3px 10px rgba(14, 18, 27, 0.18), inset 0 0 0 1px var(--z-color-background950, #121212)" : "inset 0 0 0 1px var(--z-color-background950, #121212)",
      color: "var(--z-color-primaryContrast, #ffffff)"
    };
  }
  var Button = (0, import_react.forwardRef)(function Button2({
    variant = "primary",
    size = "md",
    startIcon,
    endIcon,
    fullWidth = false,
    className,
    type = "button",
    disabled,
    loading = false,
    children,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onKeyDown,
    onKeyUp,
    onBlur,
    style,
    ...props
  }, ref) {
    const isDisabled = disabled || loading;
    const [isHovered, setHovered] = (0, import_react.useState)(false);
    const [isPressed, setPressed] = (0, import_react.useState)(false);
    const [isFocused, setFocused] = (0, import_react.useState)(false);
    function handlePointerEnter(event) {
      if (!isDisabled) {
        setHovered(true);
      }
      onPointerEnter?.(event);
    }
    function handlePointerLeave(event) {
      setHovered(false);
      setPressed(false);
      onPointerLeave?.(event);
    }
    function handlePointerDown(event) {
      if (!isDisabled && event.button === 0) {
        setPressed(true);
      }
      onPointerDown?.(event);
    }
    function handlePointerUp(event) {
      setPressed(false);
      onPointerUp?.(event);
    }
    function handlePointerCancel(event) {
      setPressed(false);
      onPointerCancel?.(event);
    }
    function handleKeyDown(event) {
      if (!isDisabled && (event.key === "Enter" || event.key === " ")) {
        setPressed(true);
      }
      onKeyDown?.(event);
    }
    function handleKeyUp(event) {
      setPressed(false);
      onKeyUp?.(event);
    }
    function handleBlur(event) {
      setPressed(false);
      setFocused(false);
      onBlur?.(event);
    }
    const computedStyle = {
      ...sizeStyles[size],
      ...getVariantStyles(variant, isDisabled, isHovered, isFocused),
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--z-space-2, 0.5rem)",
      borderWidth: "1px",
      borderStyle: "solid",
      transform: isPressed ? "scale(0.97)" : isHovered ? "translateY(-1px)" : "translateY(0)",
      willChange: "transform",
      fontWeight: 500,
      letterSpacing: "-0.006em",
      lineHeight: "20px",
      outline: "none",
      position: "relative",
      transition: "background-color 160ms ease, color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 90ms ease",
      ...style,
      width: fullWidth ? "100%" : void 0
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `@keyframes z-spin { to { transform: rotate(360deg); } }` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          ref,
          type,
          className,
          style: computedStyle,
          disabled: isDisabled,
          "aria-busy": loading || void 0,
          "data-z-button": "true",
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave,
          onPointerDown: handlePointerDown,
          onPointerUp: handlePointerUp,
          onPointerCancel: handlePointerCancel,
          onKeyDown: handleKeyDown,
          onKeyUp: handleKeyUp,
          onFocus: (event) => !isDisabled && setFocused(event.currentTarget.matches(":focus-visible")),
          onBlur: handleBlur,
          ...props,
          children: [
            loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": true, style: loadingSpinnerWrapStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: spinnerStyle }) }) : startIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": true, children: startIcon }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: loading ? { visibility: "hidden" } : void 0, children }),
            !loading && endIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": true, children: endIcon }) : null
          ]
        }
      )
    ] });
  });

  // ../ui-react/src/atoms/IconButton.tsx
  var import_react2 = __require("react");
  var import_jsx_runtime2 = __require("react/jsx-runtime");
  function toneStyles(tone, disabled, hovered, focused) {
    if (disabled) {
      return {
        background: "transparent",
        borderColor: "transparent",
        color: "var(--z-color-text300, #a1a1aa)",
        boxShadow: "none",
        cursor: "not-allowed"
      };
    }
    if (tone === "primary") {
      return {
        background: "var(--z-color-primary, #121212)",
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: "var(--z-color-primaryContrast, #ffffff)",
        boxShadow: focused ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)" : hovered ? "0 3px 10px rgba(14, 18, 27, 0.20), 0 0 0 1px var(--z-color-primary, #121212)" : "0 1px 2px rgba(14, 18, 27, 0.24), 0 0 0 1px var(--z-color-primary, #121212)"
      };
    }
    if (tone === "danger") {
      return {
        background: "var(--z-color-danger, #fb3748)",
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: "var(--z-color-primaryContrast, #ffffff)",
        boxShadow: focused ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)" : hovered ? "0 3px 10px rgba(14, 18, 27, 0.20), 0 0 0 1px var(--z-color-danger, #fb3748)" : "0 1px 2px rgba(14, 18, 27, 0.24), 0 0 0 1px var(--z-color-danger, #fb3748)"
      };
    }
    return {
      background: hovered ? "var(--z-color-weak, var(--z-color-background, #f7f7f7))" : "var(--z-color-surface, #ffffff)",
      borderColor: focused ? "var(--z-color-text, #171717)" : "var(--z-color-border, #ebebeb)",
      color: "var(--z-color-text, #171717)",
      boxShadow: focused ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.18)" : hovered ? "0 2px 8px rgba(10, 13, 20, 0.08)" : "0 1px 2px rgba(10, 13, 20, 0.03)"
    };
  }
  var IconButton = (0, import_react2.forwardRef)(
    function IconButton2({
      icon,
      label,
      tone = "default",
      compactSize = "lg",
      fullRadius = false,
      className,
      type = "button",
      disabled,
      onPointerEnter,
      onPointerLeave,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onKeyDown,
      onKeyUp,
      onBlur,
      style: styleProp,
      ...props
    }, ref) {
      const [isHovered, setHovered] = (0, import_react2.useState)(false);
      const [isPressed, setPressed] = (0, import_react2.useState)(false);
      const [isFocused, setFocused] = (0, import_react2.useState)(false);
      const size = compactSize === "lg" ? "28px" : "24px";
      function handlePointerEnter(event) {
        if (!disabled) {
          setHovered(true);
        }
        onPointerEnter?.(event);
      }
      function handlePointerLeave(event) {
        setHovered(false);
        setPressed(false);
        onPointerLeave?.(event);
      }
      function handlePointerDown(event) {
        if (!disabled && event.button === 0) {
          setPressed(true);
        }
        onPointerDown?.(event);
      }
      function handlePointerUp(event) {
        setPressed(false);
        onPointerUp?.(event);
      }
      function handlePointerCancel(event) {
        setPressed(false);
        onPointerCancel?.(event);
      }
      function handleKeyDown(event) {
        if (!disabled && (event.key === "Enter" || event.key === " ")) {
          setPressed(true);
        }
        onKeyDown?.(event);
      }
      function handleKeyUp(event) {
        setPressed(false);
        onKeyUp?.(event);
      }
      function handleBlur(event) {
        setPressed(false);
        setFocused(false);
        onBlur?.(event);
      }
      const style = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        padding: compactSize === "lg" ? "2px" : "1px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: fullRadius ? "999px" : "6px",
        transform: isPressed ? "scale(0.97)" : isHovered ? "translateY(-1px)" : "translateY(0)",
        transition: "background-color 120ms ease, border-color 120ms ease, box-shadow 120ms ease, transform 90ms ease",
        willChange: "transform",
        outline: "none",
        ...toneStyles(tone, Boolean(disabled), isHovered, isFocused),
        ...styleProp
      };
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          ref,
          type,
          "aria-label": label,
          title: label,
          className,
          style,
          disabled,
          "data-z-button": "true",
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handlePointerLeave,
          onPointerDown: handlePointerDown,
          onPointerUp: handlePointerUp,
          onPointerCancel: handlePointerCancel,
          onKeyDown: handleKeyDown,
          onKeyUp: handleKeyUp,
          onFocus: (event) => !disabled && setFocused(event.currentTarget.matches(":focus-visible")),
          onBlur: handleBlur,
          ...props,
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "aria-hidden": true, style: { width: "20px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center" }, children: icon })
        }
      );
    }
  );

  // ../ui-react/src/atoms/Input.tsx
  var import_react3 = __require("react");
  var import_jsx_runtime3 = __require("react/jsx-runtime");
  var sizeStyles2 = {
    xs: {
      minHeight: "32px",
      padding: "6px 10px",
      borderRadius: "8px"
    },
    sm: {
      minHeight: "36px",
      padding: "8px 12px",
      borderRadius: "8px"
    },
    md: {
      minHeight: "40px",
      padding: "10px 12px",
      borderRadius: "10px"
    }
  };
  var Input = (0, import_react3.forwardRef)(function Input2({
    className,
    type = "text",
    controlSize = "md",
    disabled,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    ...props
  }, ref) {
    const [focused, setFocused] = (0, import_react3.useState)(false);
    const [hovered, setHovered] = (0, import_react3.useState)(false);
    const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true";
    const readOnly = Boolean(props.readOnly) && !disabled;
    const dynamicStyles = {
      ...sizeStyles2[controlSize],
      borderWidth: "1px",
      borderStyle: "solid",
      width: "100%",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "-0.006em",
      transition: "border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease",
      background: "var(--z-color-surface, #ffffff)",
      borderColor: "var(--z-color-border, #ebebeb)",
      color: "var(--z-color-text, #171717)",
      boxShadow: "0 1px 2px rgba(10, 13, 20, 0.03)"
    };
    if (hovered && !focused && !disabled && !invalid && !readOnly) {
      dynamicStyles.background = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
      dynamicStyles.color = "var(--z-color-muted, #5c5c5c)";
      dynamicStyles.borderColor = "transparent";
      dynamicStyles.boxShadow = "none";
    }
    if (focused && !disabled) {
      dynamicStyles.background = "var(--z-color-surface, #ffffff)";
      dynamicStyles.borderColor = invalid ? "var(--z-color-danger, #fb3748)" : "var(--z-color-text, #171717)";
      dynamicStyles.color = "var(--z-color-text, #171717)";
      dynamicStyles.boxShadow = "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.16)";
    }
    if (invalid && !focused) {
      dynamicStyles.borderColor = "var(--z-color-danger, #fb3748)";
      dynamicStyles.color = "var(--z-color-text, #171717)";
      dynamicStyles.background = "var(--z-color-surface, #ffffff)";
      dynamicStyles.boxShadow = "none";
    }
    if (disabled) {
      dynamicStyles.background = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
      dynamicStyles.borderColor = "transparent";
      dynamicStyles.color = "var(--z-color-text300, #a1a1aa)";
      dynamicStyles.boxShadow = "none";
      dynamicStyles.cursor = "not-allowed";
    }
    if (readOnly) {
      dynamicStyles.background = "var(--z-color-background0, #ffffff)";
      dynamicStyles.borderColor = "var(--z-color-border, #ebebeb)";
      dynamicStyles.color = "var(--z-color-text, #171717)";
      dynamicStyles.boxShadow = "none";
      dynamicStyles.cursor = "default";
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "input",
      {
        ref,
        type,
        className,
        style: dynamicStyles,
        disabled,
        onFocus: (event) => {
          setFocused(event.currentTarget.matches(":focus-visible"));
          onFocus?.(event);
        },
        onBlur: (event) => {
          setFocused(false);
          onBlur?.(event);
        },
        onMouseEnter: (event) => {
          setHovered(true);
          onMouseEnter?.(event);
        },
        onMouseLeave: (event) => {
          setHovered(false);
          onMouseLeave?.(event);
        },
        ...props
      }
    );
  });

  // ../ui-react/src/atoms/Textarea.tsx
  var import_react4 = __require("react");
  var import_jsx_runtime4 = __require("react/jsx-runtime");
  var sizeStyles3 = {
    sm: {
      padding: "8px 12px",
      borderRadius: "8px"
    },
    md: {
      padding: "10px 12px",
      borderRadius: "10px"
    }
  };
  var Textarea = (0, import_react4.forwardRef)(function Textarea2({
    className,
    rows = 4,
    controlSize = "md",
    disabled,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    ...props
  }, ref) {
    const [focused, setFocused] = (0, import_react4.useState)(false);
    const [hovered, setHovered] = (0, import_react4.useState)(false);
    const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true";
    const readOnly = Boolean(props.readOnly) && !disabled;
    const dynamicStyles = {
      ...sizeStyles3[controlSize],
      width: "100%",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "var(--z-color-border, #ebebeb)",
      background: "var(--z-color-surface, #ffffff)",
      color: "var(--z-color-text, #171717)",
      boxShadow: "0 1px 2px rgba(10, 13, 20, 0.03)",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "-0.006em",
      transition: "border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease",
      resize: "vertical"
    };
    if (hovered && !focused && !disabled && !invalid && !readOnly) {
      dynamicStyles.background = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
      dynamicStyles.borderColor = "transparent";
      dynamicStyles.boxShadow = "none";
      dynamicStyles.color = "var(--z-color-muted, #5c5c5c)";
    }
    if (focused && !disabled) {
      dynamicStyles.background = "var(--z-color-surface, #ffffff)";
      dynamicStyles.borderColor = invalid ? "var(--z-color-danger, #fb3748)" : "var(--z-color-text, #171717)";
      dynamicStyles.boxShadow = "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.16)";
    }
    if (invalid && !focused) {
      dynamicStyles.borderColor = "var(--z-color-danger, #fb3748)";
      dynamicStyles.boxShadow = "none";
    }
    if (disabled) {
      dynamicStyles.background = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
      dynamicStyles.borderColor = "transparent";
      dynamicStyles.color = "var(--z-color-text300, #a1a1aa)";
      dynamicStyles.boxShadow = "none";
      dynamicStyles.cursor = "not-allowed";
      dynamicStyles.resize = "none";
    }
    if (readOnly) {
      dynamicStyles.background = "var(--z-color-background0, #ffffff)";
      dynamicStyles.borderColor = "var(--z-color-border, #ebebeb)";
      dynamicStyles.color = "var(--z-color-text, #171717)";
      dynamicStyles.boxShadow = "none";
      dynamicStyles.cursor = "default";
      dynamicStyles.resize = "none";
    }
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "textarea",
      {
        ref,
        rows,
        className,
        style: dynamicStyles,
        disabled,
        onFocus: (event) => {
          setFocused(event.currentTarget.matches(":focus-visible"));
          onFocus?.(event);
        },
        onBlur: (event) => {
          setFocused(false);
          onBlur?.(event);
        },
        onMouseEnter: (event) => {
          setHovered(true);
          onMouseEnter?.(event);
        },
        onMouseLeave: (event) => {
          setHovered(false);
          onMouseLeave?.(event);
        },
        ...props
      }
    );
  });

  // ../ui-react/src/atoms/Select.tsx
  var import_react5 = __require("react");
  var import_jsx_runtime5 = __require("react/jsx-runtime");
  var sizeStyles4 = {
    xs: {
      minHeight: "32px",
      padding: "6px 30px 6px 10px",
      borderRadius: "8px"
    },
    sm: {
      minHeight: "36px",
      padding: "8px 32px 8px 12px",
      borderRadius: "8px"
    },
    md: {
      minHeight: "40px",
      padding: "10px 34px 10px 12px",
      borderRadius: "10px"
    }
  };
  var Select = (0, import_react5.forwardRef)(function Select2({
    className,
    controlSize = "md",
    disabled,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    ...props
  }, ref) {
    const [focused, setFocused] = (0, import_react5.useState)(false);
    const [hovered, setHovered] = (0, import_react5.useState)(false);
    const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true";
    const dynamicStyles = {
      ...sizeStyles4[controlSize],
      width: "100%",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "var(--z-color-border, #ebebeb)",
      backgroundColor: "var(--z-color-surface, #ffffff)",
      color: "var(--z-color-text, #171717)",
      boxShadow: "0 1px 2px rgba(10, 13, 20, 0.03)",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "-0.006em",
      appearance: "none",
      backgroundImage: "linear-gradient(45deg, transparent 50%, var(--z-color-muted, #5c5c5c) 50%), linear-gradient(135deg, var(--z-color-muted, #5c5c5c) 50%, transparent 50%)",
      backgroundPosition: "calc(100% - 16px) calc(50% - 2px), calc(100% - 12px) calc(50% - 2px)",
      backgroundSize: "4px 4px, 4px 4px",
      backgroundRepeat: "no-repeat",
      transition: "border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease"
    };
    if (hovered && !focused && !disabled && !invalid) {
      dynamicStyles.backgroundColor = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
      dynamicStyles.borderColor = "transparent";
      dynamicStyles.boxShadow = "none";
    }
    if (focused && !disabled) {
      dynamicStyles.backgroundColor = "var(--z-color-surface, #ffffff)";
      dynamicStyles.borderColor = invalid ? "var(--z-color-danger, #fb3748)" : "var(--z-color-text, #171717)";
      dynamicStyles.boxShadow = "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.16)";
    }
    if (invalid && !focused) {
      dynamicStyles.borderColor = "var(--z-color-danger, #fb3748)";
      dynamicStyles.backgroundColor = "var(--z-color-surface, #ffffff)";
      dynamicStyles.boxShadow = "none";
    }
    if (disabled) {
      dynamicStyles.backgroundColor = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
      dynamicStyles.borderColor = "transparent";
      dynamicStyles.color = "var(--z-color-text300, #a1a1aa)";
      dynamicStyles.boxShadow = "none";
      dynamicStyles.cursor = "not-allowed";
    }
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "select",
      {
        ref,
        className,
        style: dynamicStyles,
        disabled,
        onFocus: (event) => {
          setFocused(event.currentTarget.matches(":focus-visible"));
          onFocus?.(event);
        },
        onBlur: (event) => {
          setFocused(false);
          onBlur?.(event);
        },
        onMouseEnter: (event) => {
          setHovered(true);
          onMouseEnter?.(event);
        },
        onMouseLeave: (event) => {
          setHovered(false);
          onMouseLeave?.(event);
        },
        ...props
      }
    );
  });

  // ../ui-react/src/atoms/Checkbox.tsx
  var import_react6 = __require("react");
  var import_jsx_runtime6 = __require("react/jsx-runtime");
  var Checkbox = (0, import_react6.forwardRef)(function Checkbox2({
    className,
    style,
    label,
    indeterminate = false,
    disabled,
    checked,
    defaultChecked,
    onChange,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    ...props
  }, ref) {
    const [hovered, setHovered] = (0, import_react6.useState)(false);
    const [focused, setFocused] = (0, import_react6.useState)(false);
    const [internalChecked, setInternalChecked] = (0, import_react6.useState)(defaultChecked ?? false);
    const isControlled = checked !== void 0;
    const isChecked = isControlled ? Boolean(checked) : internalChecked;
    const showIndeterminate = indeterminate && !isChecked;
    const wrapStyle = {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      cursor: disabled ? "not-allowed" : "pointer",
      userSelect: "none",
      opacity: disabled ? 0.5 : 1,
      ...style
    };
    const boxStyle = {
      width: 18,
      height: 18,
      flexShrink: 0,
      borderRadius: "var(--z-radius-sm, 4px)",
      borderWidth: "1.5px",
      borderStyle: "solid",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "border-color 140ms ease, background 140ms ease, box-shadow 140ms ease",
      background: isChecked || showIndeterminate ? "var(--z-color-primary, #335cff)" : "var(--z-color-surface, #ffffff)",
      borderColor: focused ? "var(--z-color-text, #171717)" : isChecked || showIndeterminate ? "var(--z-color-primary, #335cff)" : hovered ? "var(--z-color-muted, #5c5c5c)" : "var(--z-color-border, #ebebeb)",
      boxShadow: focused ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.18)" : "none"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { className, style: wrapStyle, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "input",
        {
          ref,
          type: "checkbox",
          checked: isControlled ? checked : void 0,
          defaultChecked: !isControlled ? defaultChecked : void 0,
          disabled,
          onChange: (event) => {
            if (!isControlled) setInternalChecked(event.target.checked);
            onChange?.(event);
          },
          onFocus: (event) => {
            setFocused(event.currentTarget.matches(":focus-visible"));
            onFocus?.(event);
          },
          onBlur: (event) => {
            setFocused(false);
            onBlur?.(event);
          },
          onMouseEnter: (event) => {
            if (!disabled) setHovered(true);
            onMouseEnter?.(event);
          },
          onMouseLeave: (event) => {
            setHovered(false);
            onMouseLeave?.(event);
          },
          style: {
            // Visually hidden but still focusable & form-accessible
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            border: 0
          },
          ...props
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { "aria-hidden": true, style: boxStyle, children: [
        isChecked && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { width: "10", height: "8", viewBox: "0 0 10 8", fill: "none", style: { display: "block" }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "path",
          {
            d: "M1 4L3.5 6.5L9 1",
            stroke: "white",
            strokeWidth: "1.75",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        showIndeterminate && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { width: "10", height: "2", viewBox: "0 0 10 2", fill: "none", style: { display: "block" }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M1 1H9", stroke: "white", strokeWidth: "1.75", strokeLinecap: "round" }) })
      ] }),
      label != null && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "span",
        {
          style: {
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "-0.006em",
            color: "var(--z-color-text, #171717)"
          },
          children: label
        }
      )
    ] });
  });

  // ../ui-react/src/atoms/Radio.tsx
  var import_react7 = __require("react");
  var import_jsx_runtime7 = __require("react/jsx-runtime");
  var Radio = (0, import_react7.forwardRef)(function Radio2({
    className,
    style,
    label,
    disabled,
    checked,
    defaultChecked,
    onChange,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    ...props
  }, ref) {
    const [hovered, setHovered] = (0, import_react7.useState)(false);
    const [focused, setFocused] = (0, import_react7.useState)(false);
    const [internalChecked, setInternalChecked] = (0, import_react7.useState)(defaultChecked ?? false);
    const isControlled = checked !== void 0;
    const isChecked = isControlled ? Boolean(checked) : internalChecked;
    const wrapStyle = {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      cursor: disabled ? "not-allowed" : "pointer",
      userSelect: "none",
      opacity: disabled ? 0.5 : 1,
      ...style
    };
    const outerRingStyle = {
      width: 18,
      height: 18,
      flexShrink: 0,
      borderRadius: "var(--z-radius-pill, 9999px)",
      borderWidth: "1.5px",
      borderStyle: "solid",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "border-color 140ms ease, background 140ms ease, box-shadow 140ms ease",
      background: isChecked ? "var(--z-color-primary, #335cff)" : "var(--z-color-surface, #ffffff)",
      borderColor: focused ? "var(--z-color-text, #171717)" : isChecked ? "var(--z-color-primary, #335cff)" : hovered ? "var(--z-color-muted, #5c5c5c)" : "var(--z-color-border, #ebebeb)",
      boxShadow: focused ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.18)" : "none"
    };
    const dotStyle = {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "white",
      opacity: isChecked ? 1 : 0,
      transform: isChecked ? "scale(1)" : "scale(0)",
      transition: "opacity 140ms ease, transform 140ms ease"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className, style: wrapStyle, children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "input",
        {
          ref,
          type: "radio",
          checked: isControlled ? checked : void 0,
          defaultChecked: !isControlled ? defaultChecked : void 0,
          disabled,
          onChange: (event) => {
            if (!isControlled) setInternalChecked(event.target.checked);
            onChange?.(event);
          },
          onFocus: (event) => {
            setFocused(event.currentTarget.matches(":focus-visible"));
            onFocus?.(event);
          },
          onBlur: (event) => {
            setFocused(false);
            onBlur?.(event);
          },
          onMouseEnter: (event) => {
            if (!disabled) setHovered(true);
            onMouseEnter?.(event);
          },
          onMouseLeave: (event) => {
            setHovered(false);
            onMouseLeave?.(event);
          },
          style: {
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            border: 0
          },
          ...props
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { "aria-hidden": true, style: outerRingStyle, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { style: dotStyle }) }),
      label != null && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "span",
        {
          style: {
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "-0.006em",
            color: "var(--z-color-text, #171717)"
          },
          children: label
        }
      )
    ] });
  });

  // ../ui-react/src/atoms/Switch.tsx
  var import_react8 = __require("react");
  var import_jsx_runtime8 = __require("react/jsx-runtime");
  var SIZES = {
    sm: { trackW: 32, trackH: 20, thumbSize: 12, thumbGap: 4 },
    md: { trackW: 40, trackH: 24, thumbSize: 16, thumbGap: 4 }
  };
  function Switch({ checked, onChange, disabled, visualState, className, label, size = "md" }) {
    const [focused, setFocused] = (0, import_react8.useState)(false);
    const [hovered, setHovered] = (0, import_react8.useState)(false);
    const { trackW, trackH, thumbSize, thumbGap } = SIZES[size];
    const thumbTravel = trackW - thumbSize - thumbGap * 2;
    const computedDisabled = Boolean(disabled) || visualState === "disabled";
    const computedHovered = visualState ? visualState === "hover" : hovered;
    const computedPressed = visualState === "pressed";
    function onKeyDown(event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!computedDisabled) onChange(!checked);
      }
    }
    const trackStyle = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      width: trackW,
      height: trackH,
      minWidth: trackW,
      borderRadius: "var(--z-radius-pill, 9999px)",
      border: "1px solid",
      borderColor: focused ? "var(--z-color-text, #171717)" : checked ? "var(--z-color-primary, #335cff)" : computedHovered && !computedDisabled ? "var(--z-color-muted, #5c5c5c)" : computedDisabled ? "var(--z-color-border, #ebebeb)" : "transparent",
      background: checked ? "var(--z-color-primary, #335cff)" : computedHovered ? "var(--z-color-sub, #d1d1d1)" : computedDisabled ? "var(--z-color-surface, #ffffff)" : "var(--z-color-weak, #ebebeb)",
      cursor: computedDisabled ? "not-allowed" : "pointer",
      opacity: computedDisabled ? 0.72 : 1,
      transition: "background 160ms ease, border-color 140ms ease, box-shadow 140ms ease, transform 80ms ease",
      outline: "none",
      boxShadow: focused ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.18)" : "none",
      transform: computedPressed ? "scale(0.96)" : computedHovered && !computedDisabled && !focused ? "scale(1.02)" : "scale(1)"
    };
    const thumbStyle = {
      position: "absolute",
      left: thumbGap,
      width: thumbSize,
      height: thumbSize,
      borderRadius: "var(--z-radius-pill, 9999px)",
      background: "var(--z-color-surface, #ffffff)",
      boxShadow: computedPressed ? "0 1px 2px rgba(0,0,0,0.14)" : "0 1px 3px rgba(0,0,0,0.18)",
      transform: checked ? `translateX(${thumbTravel}px)` : "translateX(0)",
      transition: "transform 160ms ease"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-label": label,
        disabled: computedDisabled,
        onClick: () => !computedDisabled && onChange(!checked),
        onKeyDown,
        onFocus: (event) => setFocused(event.currentTarget.matches(":focus-visible")),
        onBlur: () => setFocused(false),
        onMouseEnter: () => {
          if (!computedDisabled) setHovered(true);
        },
        onMouseLeave: () => setHovered(false),
        className,
        style: trackStyle,
        children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { "aria-hidden": true, style: thumbStyle })
      }
    );
  }

  // ../ui-react/src/atoms/Badge.tsx
  var import_jsx_runtime9 = __require("react/jsx-runtime");
  var colorPalettes = {
    gray: {
      filled: "var(--z-color-text700, #475467)",
      lighter: "var(--z-color-background200, #f2f4f7)",
      stroke: "var(--z-color-stroke300, #d0d5dd)",
      text: "var(--z-color-text700, #475467)",
      onFilled: "#ffffff"
    },
    blue: {
      filled: "var(--z-color-info, var(--z-color-primary, #335cff))",
      lighter: "#eef4ff",
      stroke: "#b9c8ff",
      text: "var(--z-color-info, var(--z-color-primary, #335cff))",
      onFilled: "#ffffff"
    },
    orange: {
      filled: "var(--z-color-warning, #f79009)",
      lighter: "#fff6e7",
      stroke: "#fecd8a",
      text: "#b54708",
      onFilled: "#ffffff"
    },
    red: {
      filled: "var(--z-color-danger, #f04438)",
      lighter: "#fff1f0",
      stroke: "#fda29b",
      text: "var(--z-color-danger, #f04438)",
      onFilled: "#ffffff"
    },
    green: {
      filled: "var(--z-color-success, #12b76a)",
      lighter: "#ecfdf3",
      stroke: "#a6f4c5",
      text: "var(--z-color-success, #12b76a)",
      onFilled: "#ffffff"
    },
    yellow: {
      filled: "#eaaa08",
      lighter: "#fef7e6",
      stroke: "#fedf89",
      text: "#b54708",
      onFilled: "#1f2937"
    },
    purple: {
      filled: "#7a5af8",
      lighter: "#f4f3ff",
      stroke: "#d9d6fe",
      text: "#6941c6",
      onFilled: "#ffffff"
    },
    sky: {
      filled: "#0ba5ec",
      lighter: "#f0f9ff",
      stroke: "#b9e6fe",
      text: "#026aa2",
      onFilled: "#ffffff"
    },
    pink: {
      filled: "#ee46bc",
      lighter: "#fdf2fa",
      stroke: "#fcceee",
      text: "#c11574",
      onFilled: "#ffffff"
    },
    teal: {
      filled: "#15b79e",
      lighter: "#f0fdfa",
      stroke: "#99f6e4",
      text: "#0f766e",
      onFilled: "#ffffff"
    }
  };
  function toneToConfig(tone) {
    if (tone === "info") {
      return { color: "blue", variant: "filled" };
    }
    if (tone === "success") {
      return { color: "green", variant: "filled" };
    }
    if (tone === "danger") {
      return { color: "red", variant: "filled" };
    }
    if (tone === "subtle") {
      return { color: "gray", variant: "lighter" };
    }
    return { color: "gray", variant: "stroke" };
  }
  var sizeTokens = {
    sm: {
      minHeight: "16px",
      minWidth: "16px",
      borderRadius: "999px",
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: "0.01em",
      paddingInline: "6px",
      gap: "4px"
    },
    md: {
      minHeight: "20px",
      minWidth: "20px",
      borderRadius: "999px",
      fontSize: "11px",
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: "0.01em",
      paddingInline: "7px",
      gap: "4px"
    }
  };
  function Badge({
    children,
    tone = "neutral",
    variant,
    color,
    type = "basic",
    size = "md",
    icon,
    number,
    disabled = false,
    className,
    style
  }) {
    const legacy = toneToConfig(tone);
    const resolvedColor = color ?? legacy.color;
    const resolvedVariant = variant ?? legacy.variant;
    const palette = colorPalettes[resolvedColor];
    let content = children;
    if (typeof number === "number" || typeof number === "string") {
      content = number;
    } else if (number === true) {
      content = 8;
    }
    const isNumberOnly = number !== void 0 && number !== false;
    const showDot = type === "dot" && !isNumberOnly;
    const showLeftIcon = type === "left-icon" && !isNumberOnly;
    const showRightIcon = type === "right-icon" && !isNumberOnly;
    const iconNode = icon ?? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "span",
      {
        className: "ms",
        "aria-hidden": true,
        style: { fontSize: size === "sm" ? "11px" : "12px", lineHeight: 1 },
        children: "star"
      }
    );
    const frameStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid transparent",
      whiteSpace: "nowrap",
      userSelect: "none",
      ...sizeTokens[size]
    };
    if (resolvedVariant === "filled") {
      frameStyle.background = palette.filled;
      frameStyle.borderColor = palette.filled;
      frameStyle.color = palette.onFilled;
    } else if (resolvedVariant === "lighter") {
      frameStyle.background = palette.lighter;
      frameStyle.borderColor = "transparent";
      frameStyle.color = palette.text;
    } else if (resolvedVariant === "stroke") {
      frameStyle.background = "var(--z-color-surface, #ffffff)";
      frameStyle.borderColor = palette.stroke;
      frameStyle.color = palette.text;
    } else {
      frameStyle.background = "var(--z-color-surface, #ffffff)";
      frameStyle.borderColor = "transparent";
      frameStyle.color = palette.text;
    }
    if (isNumberOnly) {
      frameStyle.paddingInline = "0";
    }
    if (disabled) {
      frameStyle.opacity = 0.45;
      frameStyle.cursor = "not-allowed";
      frameStyle.filter = "saturate(0.65)";
    }
    const dotStyle = {
      width: size === "sm" ? "6px" : "7px",
      height: size === "sm" ? "6px" : "7px",
      borderRadius: "999px",
      background: resolvedVariant === "filled" ? palette.onFilled : palette.text,
      flexShrink: 0
    };
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className, style: { ...frameStyle, ...style }, children: [
      showDot ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { "aria-hidden": true, style: dotStyle }) : null,
      showLeftIcon ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { "aria-hidden": true, children: iconNode }) : null,
      content,
      showRightIcon ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { "aria-hidden": true, children: iconNode }) : null
    ] });
  }

  // ../ui-react/src/atoms/Avatar.tsx
  var import_react9 = __require("react");
  var import_jsx_runtime10 = __require("react/jsx-runtime");
  var STATUS_COLORS = {
    online: "#1fc16b",
    offline: "#8b949e",
    busy: "#fb3748"
  };
  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
  }
  function AvatarImage({
    name,
    src,
    size,
    className,
    style,
    loading
  }) {
    const baseStyle = {
      width: size,
      height: size,
      borderRadius: "var(--z-radius-pill, 9999px)",
      flexShrink: 0
    };
    if (loading) {
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("style", { children: `@keyframes z-pulse { 0%,100%{opacity:1} 50%{opacity:.45} }` }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "div",
          {
            role: "img",
            "aria-label": `Loading ${name}`,
            className,
            style: {
              ...baseStyle,
              background: "var(--z-color-weak, #ebebeb)",
              animation: "z-pulse 1.4s ease-in-out infinite",
              ...style
            }
          }
        )
      ] });
    }
    if (src) {
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "img",
        {
          src,
          alt: name,
          className,
          style: {
            ...baseStyle,
            border: "1px solid var(--z-color-border, #ebebeb)",
            objectFit: "cover",
            ...style
          }
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "div",
      {
        role: "img",
        "aria-label": name,
        className,
        style: {
          ...baseStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--z-color-primary, #335cff)",
          color: "var(--z-color-primaryContrast, #ffffff)",
          fontWeight: 600,
          fontSize: Math.round((size ?? 40) * 0.35),
          userSelect: "none",
          ...style
        },
        children: initials(name)
      }
    );
  }
  function Avatar({
    name,
    src,
    size = 40,
    className,
    style,
    loading = false,
    status,
    onClick,
    buttonLabel
  }) {
    const [hovered, setHovered] = (0, import_react9.useState)(false);
    const [pressed, setPressed] = (0, import_react9.useState)(false);
    const [focused, setFocused] = (0, import_react9.useState)(false);
    const inner = /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AvatarImage, { name, src, size, loading });
    const statusDot = status ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "span",
      {
        "aria-hidden": true,
        style: {
          position: "absolute",
          bottom: 0,
          right: 0,
          width: Math.round(size * 0.28),
          height: Math.round(size * 0.28),
          borderRadius: "50%",
          background: STATUS_COLORS[status],
          border: "2px solid var(--z-color-surface, #ffffff)"
        }
      }
    ) : null;
    if (onClick) {
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
        "button",
        {
          type: "button",
          "aria-label": buttonLabel ?? name,
          onClick,
          onPointerEnter: (e) => setHovered(true),
          onPointerLeave: (e) => {
            setHovered(false);
            setPressed(false);
          },
          onPointerDown: (e) => {
            if (e.button === 0) setPressed(true);
          },
          onPointerUp: (e) => setPressed(false),
          onFocus: (e) => setFocused(e.currentTarget.matches(":focus-visible")),
          onBlur: (e) => {
            setFocused(false);
            setPressed(false);
          },
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setPressed(true);
            }
          },
          onKeyUp: (e) => setPressed(false),
          className,
          style: {
            position: "relative",
            display: "inline-flex",
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            borderRadius: "var(--z-radius-pill, 9999px)",
            outline: "none",
            transform: pressed ? "scale(0.93)" : hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 100ms ease, box-shadow 140ms ease",
            boxShadow: focused ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)" : "none",
            ...style
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AvatarImage, { name, src, size, loading }),
            statusDot
          ]
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
      "div",
      {
        className,
        style: { position: "relative", display: "inline-flex", ...style },
        children: [
          inner,
          statusDot
        ]
      }
    );
  }

  // ../ui-react/src/atoms/Logo.tsx
  var import_jsx_runtime11 = __require("react/jsx-runtime");
  function fallbackLogo(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((value) => value[0]?.toUpperCase() ?? "").join("");
  }
  function Logo({ name, src, size = 32, className, style }) {
    const baseStyle = {
      width: size,
      height: size,
      borderRadius: "var(--z-radius-sm, 0.25rem)",
      flexShrink: 0
    };
    if (src) {
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "img",
        {
          src,
          alt: `${name} logo`,
          className,
          style: { ...baseStyle, objectFit: "contain", ...style }
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "div",
      {
        "aria-label": `${name} logo`,
        role: "img",
        className,
        style: {
          ...baseStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--z-color-accent, #fa7319)",
          color: "var(--z-color-primaryContrast, #ffffff)",
          fontWeight: 600,
          fontSize: Math.round(size * 0.4),
          userSelect: "none",
          ...style
        },
        children: fallbackLogo(name)
      }
    );
  }

  // ../ui-react/src/atoms/Card.tsx
  var import_jsx_runtime12 = __require("react/jsx-runtime");
  var shadowMap = {
    none: "none",
    sm: "var(--z-shadow-sm, 0 1px 3px rgba(14,18,27,0.08))",
    md: "var(--z-shadow-md, 0 4px 12px rgba(14,18,27,0.10))",
    lg: "var(--z-shadow-lg, 0 8px 24px rgba(14,18,27,0.14))"
  };
  var paddingMap = {
    none: "0",
    sm: "var(--z-space-3, 0.75rem)",
    md: "var(--z-space-5, 1.25rem)",
    lg: "var(--z-space-7, 1.75rem)"
  };
  var variantStyles = {
    outlined: {
      background: "var(--z-color-surface, #ffffff)",
      border: "1px solid var(--z-color-border, #ebebeb)"
    },
    filled: {
      background: "var(--z-color-weak, #f7f7f7)",
      border: "none"
    },
    elevated: {
      background: "var(--z-color-surface, #ffffff)",
      border: "none"
    }
  };
  function Card({
    children,
    shadow = "sm",
    padding = "md",
    variant = "outlined",
    radius,
    className,
    style,
    onClick
  }) {
    const baseStyle = {
      display: "flex",
      flexDirection: "column",
      borderRadius: radius ?? "var(--z-radius-lg, 12px)",
      padding: paddingMap[padding],
      boxShadow: shadowMap[shadow],
      transition: "box-shadow 160ms ease",
      cursor: onClick ? "pointer" : void 0,
      ...variantStyles[variant],
      ...style
    };
    if (onClick) {
      return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        "button",
        {
          type: "button",
          className,
          style: { ...baseStyle, textAlign: "left", fontFamily: "inherit", width: "100%" },
          onClick,
          children
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className, style: baseStyle, children });
  }
  function CardHeader({ children, style }) {
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      "div",
      {
        style: {
          paddingBottom: "var(--z-space-3, 0.75rem)",
          borderBottom: "1px solid var(--z-color-border, #ebebeb)",
          marginBottom: "var(--z-space-4, 1rem)",
          ...style
        },
        children
      }
    );
  }
  function CardFooter({ children, style }) {
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      "div",
      {
        style: {
          paddingTop: "var(--z-space-3, 0.75rem)",
          borderTop: "1px solid var(--z-color-border, #ebebeb)",
          marginTop: "auto",
          ...style
        },
        children
      }
    );
  }

  // ../ui-react/src/atoms/Divider.tsx
  var import_jsx_runtime13 = __require("react/jsx-runtime");
  function Divider({
    orientation = "horizontal",
    label,
    thickness = 1,
    className,
    style
  }) {
    const isVertical = orientation === "vertical";
    if (label) {
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
        "div",
        {
          role: "separator",
          className,
          style: {
            display: "flex",
            alignItems: "center",
            gap: "var(--z-space-3, 0.75rem)",
            width: "100%",
            ...style
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              "span",
              {
                "aria-hidden": true,
                style: {
                  flex: 1,
                  height: thickness,
                  background: "var(--z-color-border, #ebebeb)"
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              "span",
              {
                style: {
                  fontSize: "var(--z-type-size-sm, 0.875rem)",
                  color: "var(--z-color-muted, #737373)",
                  whiteSpace: "nowrap",
                  fontWeight: "var(--z-type-weight-medium, 500)"
                },
                children: label
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              "span",
              {
                "aria-hidden": true,
                style: {
                  flex: 1,
                  height: thickness,
                  background: "var(--z-color-border, #ebebeb)"
                }
              }
            )
          ]
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      "div",
      {
        role: "separator",
        className,
        "aria-orientation": orientation,
        style: isVertical ? {
          display: "inline-block",
          width: thickness,
          alignSelf: "stretch",
          background: "var(--z-color-border, #ebebeb)",
          flexShrink: 0,
          ...style
        } : {
          width: "100%",
          height: thickness,
          background: "var(--z-color-border, #ebebeb)",
          flexShrink: 0,
          ...style
        }
      }
    );
  }

  // ../ui-react/src/atoms/Progress.tsx
  var import_jsx_runtime14 = __require("react/jsx-runtime");
  var LINE_SIZE_MAP = {
    sm: 4,
    md: 6,
    lg: 8
  };
  var CIRCLE_STROKE_MAP = {
    48: 4,
    56: 4,
    64: 4,
    72: 4,
    80: 4
  };
  var TONE_COLOR_MAP = {
    primary: "var(--z-color-primary, #335cff)",
    success: "var(--z-color-success, #1fc16b)",
    danger: "var(--z-color-danger, #ef4444)",
    warning: "var(--z-color-warning, #f59e0b)",
    neutral: "var(--z-color-muted, #8b8b8b)"
  };
  var indeterminateKeyframes = `
@keyframes z-progress-indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
`;
  var keyframesInjected = false;
  function ensureKeyframes() {
    if (typeof document === "undefined" || keyframesInjected) return;
    const style = document.createElement("style");
    style.textContent = indeterminateKeyframes;
    document.head.appendChild(style);
    keyframesInjected = true;
  }
  function clamp(value) {
    return Math.min(100, Math.max(0, value));
  }
  function circleTypography(size) {
    if (size <= 56) {
      return {
        fontSize: "12px",
        lineHeight: "16px"
      };
    }
    return {
      fontSize: "14px",
      lineHeight: "20px"
    };
  }
  function ProgressLine({
    clamped,
    indeterminate,
    height,
    tone,
    label
  }) {
    const color = TONE_COLOR_MAP[tone];
    if (indeterminate && typeof document !== "undefined") {
      ensureKeyframes();
    }
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      "div",
      {
        role: "progressbar",
        "aria-label": label,
        "aria-valuenow": indeterminate ? void 0 : clamped,
        "aria-valuemin": indeterminate ? void 0 : 0,
        "aria-valuemax": indeterminate ? void 0 : 100,
        style: {
          width: "100%",
          height,
          borderRadius: 999,
          background: "var(--z-color-background200, #ebebeb)",
          overflow: "hidden",
          position: "relative"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "div",
          {
            "aria-hidden": true,
            style: {
              position: "absolute",
              inset: 0,
              width: indeterminate ? "35%" : `${clamped}%`,
              background: color,
              borderRadius: 999,
              transition: indeterminate ? void 0 : "width 320ms cubic-bezier(0.4, 0, 0.2, 1)",
              animation: indeterminate ? "z-progress-indeterminate 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite" : void 0
            }
          }
        )
      }
    );
  }
  function ProgressCircle({
    clamped,
    size,
    tone,
    label,
    showValue
  }) {
    const strokeWidth = CIRCLE_STROKE_MAP[size];
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - clamped / 100);
    const textStyles = circleTypography(size);
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      "div",
      {
        role: "progressbar",
        "aria-label": label,
        "aria-valuenow": clamped,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, "aria-hidden": true, children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "circle",
              {
                cx: size / 2,
                cy: size / 2,
                r: radius,
                fill: "none",
                stroke: "var(--z-color-background200, #ebebeb)",
                strokeWidth
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "circle",
              {
                cx: size / 2,
                cy: size / 2,
                r: radius,
                fill: "none",
                stroke: TONE_COLOR_MAP[tone],
                strokeWidth,
                strokeLinecap: "round",
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                transform: `rotate(-90 ${size / 2} ${size / 2})`,
                style: { transition: "stroke-dashoffset 220ms ease" }
              }
            )
          ] }),
          showValue ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "span",
            {
              "aria-hidden": true,
              style: {
                position: "absolute",
                color: "var(--z-color-text, #171717)",
                fontWeight: 500,
                letterSpacing: "-0.006em",
                fontFeatureSettings: "'ss11' 1, 'calt' 0, 'liga' 0",
                ...textStyles
              },
              children: [
                Math.round(clamped),
                "%"
              ]
            }
          ) : null
        ]
      }
    );
  }
  function Progress({
    value,
    label = "Loading",
    variant = "line",
    size = "md",
    circleSize = 64,
    tone = "primary",
    showValue = false,
    title = "Data Storage",
    description,
    actionLabel,
    onAction,
    labelPlacement = "top",
    disabled = false,
    className,
    style
  }) {
    const indeterminate = value === void 0 || value === null;
    const clamped = indeterminate ? 0 : clamp(value);
    const lineHeight = LINE_SIZE_MAP[size];
    const hasDescription = Boolean(description);
    const isRightLayout = labelPlacement === "right";
    if (variant === "circle") {
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className, style: { display: "inline-flex", ...style }, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        ProgressCircle,
        {
          clamped,
          size: circleSize,
          tone,
          label,
          showValue
        }
      ) });
    }
    if (variant === "line-label") {
      const barNode = /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        ProgressLine,
        {
          clamped,
          indeterminate,
          height: lineHeight,
          tone,
          label
        }
      );
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
        "div",
        {
          className,
          style: {
            width: "320px",
            display: "grid",
            gap: hasDescription || !isRightLayout ? "6px" : "8px",
            ...style
          },
          children: [
            isRightLayout ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "8px", width: "100%" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: { flex: 1, minWidth: 0 }, children: barNode }),
              showValue && !indeterminate ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                "span",
                {
                  style: {
                    color: "var(--z-color-muted, #5c5c5c)",
                    fontSize: "12px",
                    lineHeight: "16px",
                    whiteSpace: "nowrap",
                    fontFeatureSettings: "'ss11' 1, 'calt' 0, 'liga' 0"
                  },
                  children: [
                    clamped,
                    "%"
                  ]
                }
              ) : null
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: { display: "flex", alignItems: "flex-start", gap: "6px", width: "100%" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "span",
                  {
                    style: {
                      flex: 1,
                      minWidth: 0,
                      color: "var(--z-color-text, #171717)",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      letterSpacing: "-0.006em",
                      fontFeatureSettings: "'ss11' 1, 'calt' 0, 'liga' 0"
                    },
                    children: title
                  }
                ),
                showValue && !indeterminate ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                  "span",
                  {
                    style: {
                      color: "var(--z-color-muted, #5c5c5c)",
                      fontSize: "12px",
                      lineHeight: "16px",
                      whiteSpace: "nowrap",
                      fontFeatureSettings: "'ss11' 1, 'calt' 0, 'liga' 0"
                    },
                    children: [
                      clamped,
                      "%"
                    ]
                  }
                ) : null
              ] }),
              barNode
            ] }),
            hasDescription ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: { display: "flex", alignItems: "flex-start", gap: "4px", width: "100%" }, children: [
              actionLabel ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                "button",
                {
                  type: "button",
                  disabled,
                  onClick: onAction,
                  style: {
                    border: 0,
                    background: "transparent",
                    color: "var(--z-color-primary, #335cff)",
                    textDecoration: "underline",
                    textDecorationSkipInk: "none",
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontWeight: 500,
                    padding: 0,
                    cursor: disabled ? "not-allowed" : "pointer",
                    whiteSpace: "nowrap",
                    opacity: disabled ? 0.6 : 1,
                    fontFeatureSettings: "'ss11' 1, 'calt' 0, 'liga' 0"
                  },
                  children: actionLabel
                }
              ) : null,
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                "span",
                {
                  style: {
                    color: "var(--z-color-muted, #5c5c5c)",
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontFeatureSettings: "'ss11' 1, 'calt' 0, 'liga' 0"
                  },
                  children: description
                }
              )
            ] }) : null
          ]
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      "div",
      {
        className,
        style: {
          display: "flex",
          alignItems: "center",
          gap: "var(--z-space-2, 0.5rem)",
          width: "100%",
          ...style
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            ProgressLine,
            {
              clamped,
              indeterminate,
              height: lineHeight,
              tone,
              label
            }
          ),
          showValue && !indeterminate ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "span",
            {
              "aria-hidden": true,
              style: {
                fontSize: "12px",
                lineHeight: "16px",
                color: "var(--z-color-muted, #5c5c5c)",
                fontVariantNumeric: "tabular-nums",
                minWidth: "3ch",
                textAlign: "right"
              },
              children: [
                clamped,
                "%"
              ]
            }
          ) : null
        ]
      }
    );
  }

  // ../ui-react/src/atoms/Skeleton.tsx
  var import_jsx_runtime15 = __require("react/jsx-runtime");
  var radiusMap = {
    none: "0",
    sm: "var(--z-radius-sm, 4px)",
    md: "var(--z-radius-md, 8px)",
    lg: "var(--z-radius-lg, 12px)",
    full: "9999px"
  };
  var shimmerKeyframes = `
@keyframes z-skeleton-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;
  var keyframesInjected2 = false;
  function ensureKeyframes2() {
    if (typeof document === "undefined" || keyframesInjected2) return;
    const style = document.createElement("style");
    style.textContent = shimmerKeyframes;
    document.head.appendChild(style);
    keyframesInjected2 = true;
  }
  function SkeletonBlock({ width, height, radius }) {
    if (typeof document !== "undefined") ensureKeyframes2();
    const resolvedRadius = radius ? radiusMap[radius] ?? radius : "var(--z-radius-sm, 4px)";
    const w = typeof width === "number" ? `${width}px` : width ?? "100%";
    const h = typeof height === "number" ? `${height}px` : height ?? "1.25em";
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      "span",
      {
        "aria-hidden": "true",
        style: {
          display: "block",
          width: w,
          height: h,
          borderRadius: resolvedRadius,
          background: "linear-gradient(90deg, var(--z-color-weak, #f0f0f0) 25%, var(--z-color-border, #e5e5e5) 37%, var(--z-color-weak, #f0f0f0) 63%)",
          backgroundSize: "400% 100%",
          animation: "z-skeleton-shimmer 1.4s ease infinite"
        }
      }
    );
  }
  function Skeleton({
    width,
    height,
    radius,
    lines,
    lineGap = "0.5rem",
    className,
    style
  }) {
    if (lines && lines > 1) {
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        "div",
        {
          className,
          style: { display: "flex", flexDirection: "column", gap: lineGap, ...style },
          "aria-busy": "true",
          "aria-label": "Loading",
          children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            SkeletonBlock,
            {
              width: i === lines - 1 ? "65%" : "100%",
              height,
              radius
            },
            i
          ))
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      "div",
      {
        className,
        style,
        "aria-busy": "true",
        "aria-label": "Loading",
        children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SkeletonBlock, { width, height, radius })
      }
    );
  }

  // ../ui-react/src/atoms/Slider.tsx
  var import_react10 = __require("react");
  var import_jsx_runtime16 = __require("react/jsx-runtime");
  var sizeMap = {
    sm: { track: 4, thumb: 14 },
    md: { track: 6, thumb: 18 },
    lg: { track: 8, thumb: 22 }
  };
  var toneColorMap = {
    primary: "var(--z-color-primary, #335cff)",
    success: "var(--z-color-success, #1fc16b)",
    danger: "var(--z-color-danger, #ef4444)"
  };
  function Slider({
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    label,
    showRange = false,
    showValue = false,
    tone = "primary",
    size = "md",
    onChange,
    className,
    style
  }) {
    const [internalValue, setInternalValue] = (0, import_react10.useState)(defaultValue);
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const trackRef = (0, import_react10.useRef)(null);
    const { track, thumb } = sizeMap[size];
    const color = toneColorMap[tone];
    const percent = (value - min) / (max - min) * 100;
    const commit = (0, import_react10.useCallback)(
      (next) => {
        const snapped = Math.round((next - min) / step) * step + min;
        const clamped = Math.min(max, Math.max(min, snapped));
        if (!isControlled) setInternalValue(clamped);
        onChange?.(clamped);
      },
      [min, max, step, isControlled, onChange]
    );
    function handlePointerMove(e) {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      commit(min + ratio * (max - min));
    }
    function handlePointerDown(e) {
      if (disabled) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      handlePointerMove(e);
    }
    function handleKeyDown(e) {
      if (disabled) return;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") commit(value + step);
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") commit(value - step);
      if (e.key === "Home") commit(min);
      if (e.key === "End") commit(max);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
      "div",
      {
        className,
        style: { display: "flex", flexDirection: "column", gap: "var(--z-space-1, 0.25rem)", ...style },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
            "div",
            {
              ref: trackRef,
              role: "slider",
              tabIndex: disabled ? -1 : 0,
              "aria-label": label ?? "Slider",
              "aria-valuemin": min,
              "aria-valuemax": max,
              "aria-valuenow": value,
              "aria-disabled": disabled,
              onPointerDown: handlePointerDown,
              onPointerMove: (e) => {
                if (e.buttons === 1) handlePointerMove(e);
              },
              onKeyDown: handleKeyDown,
              style: {
                position: "relative",
                height: thumb + 16,
                display: "flex",
                alignItems: "center",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
                outline: "none"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                  "div",
                  {
                    "aria-hidden": true,
                    style: {
                      position: "absolute",
                      left: 0,
                      right: 0,
                      height: track,
                      borderRadius: 9999,
                      background: "var(--z-color-weak, #e8e8e8)"
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                  "div",
                  {
                    "aria-hidden": true,
                    style: {
                      position: "absolute",
                      left: 0,
                      width: `${percent}%`,
                      height: track,
                      borderRadius: 9999,
                      background: color,
                      transition: "width 60ms linear"
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                  "div",
                  {
                    "aria-hidden": true,
                    style: {
                      position: "absolute",
                      left: `${percent}%`,
                      transform: "translateX(-50%)",
                      width: thumb,
                      height: thumb,
                      borderRadius: "50%",
                      background: "var(--z-color-surface, #ffffff)",
                      border: `2px solid ${color}`,
                      boxShadow: "0 1px 4px rgba(14,18,27,0.18)",
                      transition: "border-color 120ms ease",
                      zIndex: 1
                    }
                  }
                ),
                showValue && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                  "div",
                  {
                    "aria-hidden": true,
                    style: {
                      position: "absolute",
                      left: `${percent}%`,
                      transform: "translateX(-50%) translateY(-100%)",
                      top: 0,
                      marginTop: -4,
                      background: "var(--z-color-text, #171717)",
                      color: "var(--z-color-primaryContrast, #ffffff)",
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 6px",
                      borderRadius: 4,
                      whiteSpace: "nowrap",
                      pointerEvents: "none"
                    },
                    children: value
                  }
                )
              ]
            }
          ),
          showRange && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
            "div",
            {
              "aria-hidden": true,
              style: {
                display: "flex",
                justifyContent: "space-between",
                fontSize: "var(--z-type-size-xs, 0.75rem)",
                color: "var(--z-color-muted, #737373)"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { children: min }),
                /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { children: max })
              ]
            }
          )
        ]
      }
    );
  }

  // ../ui-react/src/molecules/SearchBox.tsx
  var import_jsx_runtime17 = __require("react/jsx-runtime");
  function SearchBox({
    value,
    onValueChange,
    onSearch,
    placeholder = "Search...",
    className,
    style
  }) {
    function handleSubmit(event) {
      event.preventDefault();
      onSearch(value);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
      "form",
      {
        className,
        style: {
          display: "flex",
          alignItems: "center",
          gap: "var(--z-space-2, 0.5rem)",
          ...style
        },
        onSubmit: handleSubmit,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
            Input,
            {
              "aria-label": "Search input",
              placeholder,
              value,
              onChange: (event) => onValueChange(event.target.value)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Button, { type: "submit", children: "Search" })
        ]
      }
    );
  }

  // ../ui-react/src/molecules/FormField.tsx
  var import_jsx_runtime18 = __require("react/jsx-runtime");
  var spinnerStyle2 = {
    display: "inline-block",
    width: "11px",
    height: "11px",
    borderRadius: "50%",
    border: "1.5px solid currentColor",
    borderTopColor: "transparent",
    animation: "z-spin 0.7s linear infinite",
    verticalAlign: "middle",
    marginLeft: "5px",
    opacity: 0.5
  };
  function FormField({
    label,
    required = false,
    optional = false,
    hint,
    error,
    success,
    pending = false,
    htmlFor,
    className,
    style,
    children
  }) {
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("style", { children: `@keyframes z-spin { to { transform: rotate(360deg); } }` }),
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
        "div",
        {
          className,
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "var(--z-space-1, 0.25rem)",
            ...style
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
              "label",
              {
                htmlFor,
                style: {
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "-0.006em",
                  fontWeight: "var(--z-type-weight-medium, 500)",
                  color: "var(--z-color-text, #171717)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "1px"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { children: label }),
                  required ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { style: { color: "var(--z-color-primary, #335cff)" }, children: "*" }) : null,
                  optional ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { style: { color: "var(--z-color-muted, #5c5c5c)", fontWeight: 400 }, children: "(Optional)" }) : null,
                  pending ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { "aria-hidden": true, style: spinnerStyle2 }) : null,
                  pending ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                    "span",
                    {
                      style: {
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "var(--z-color-muted, #5c5c5c)",
                        marginLeft: "4px"
                      },
                      children: "Saving\u2026"
                    }
                  ) : null
                ]
              }
            ),
            children,
            hint && !hasError && !hasSuccess ? /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
              "span",
              {
                style: {
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "var(--z-color-muted, #5c5c5c)",
                  display: "inline-flex",
                  gap: "4px"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { "aria-hidden": true, style: { width: "16px", textAlign: "center" }, children: "i" }),
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { children: hint })
                ]
              }
            ) : null,
            hasError ? /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
              "span",
              {
                style: {
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "var(--z-color-danger, #ef4444)",
                  display: "inline-flex",
                  gap: "4px"
                },
                role: "alert",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { "aria-hidden": true, style: { width: "16px", textAlign: "center" }, children: "!" }),
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { children: error })
                ]
              }
            ) : null,
            hasSuccess ? /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
              "span",
              {
                style: {
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "var(--z-color-success, #16a34a)",
                  display: "inline-flex",
                  gap: "4px"
                },
                role: "status",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { "aria-hidden": true, style: { width: "16px", textAlign: "center" }, children: "\u2713" }),
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { children: success })
                ]
              }
            ) : null
          ]
        }
      )
    ] });
  }

  // ../ui-react/src/molecules/InputGroup.tsx
  var import_jsx_runtime19 = __require("react/jsx-runtime");
  function InputGroup({
    startAdornment,
    endAdornment,
    prefix,
    suffix,
    className,
    style,
    ...props
  }) {
    const leading = startAdornment ?? prefix;
    const trailing = endAdornment ?? suffix;
    const adornmentStyle = {
      paddingLeft: "var(--z-space-3, 0.75rem)",
      paddingRight: "var(--z-space-3, 0.75rem)",
      color: "var(--z-color-muted, #5c5c5c)",
      display: "flex",
      alignItems: "center",
      flexShrink: 0
    };
    return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
      "div",
      {
        className,
        style: {
          display: "flex",
          alignItems: "center",
          border: "1px solid var(--z-color-border, #ebebeb)",
          borderRadius: "var(--z-radius-md, 0.5rem)",
          background: "var(--z-color-surface, #ffffff)",
          overflow: "hidden",
          ...style
        },
        children: [
          leading ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { style: adornmentStyle, children: leading }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
            Input,
            {
              style: { border: 0, borderRadius: 0, boxShadow: "none", flex: 1 },
              ...props
            }
          ),
          trailing ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { style: adornmentStyle, children: trailing }) : null
        ]
      }
    );
  }

  // ../ui-react/src/molecules/Dropdown.tsx
  var import_react11 = __require("react");
  var import_jsx_runtime20 = __require("react/jsx-runtime");
  function Dropdown({ label, items, align = "start", className, style, trigger }) {
    const [open, setOpen] = (0, import_react11.useState)(false);
    const [hoveredId, setHoveredId] = (0, import_react11.useState)(null);
    const [focusedId, setFocusedId] = (0, import_react11.useState)(null);
    const ref = (0, import_react11.useRef)(null);
    (0, import_react11.useEffect)(() => {
      if (!open) return;
      function onPointerDown(event) {
        if (!ref.current?.contains(event.target)) {
          setOpen(false);
        }
      }
      document.addEventListener("pointerdown", onPointerDown);
      return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);
    (0, import_react11.useEffect)(() => {
      if (!open) return;
      function onKey(event) {
        if (event.key === "Escape") setOpen(false);
      }
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [open]);
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
      "div",
      {
        ref,
        className,
        style: { position: "relative", display: "inline-block", ...style },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            "button",
            {
              type: "button",
              "aria-haspopup": "menu",
              "aria-expanded": open,
              "aria-label": label,
              onClick: () => setOpen((prev) => !prev),
              style: {
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer"
              },
              children: trigger ?? label
            }
          ),
          open && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            "ul",
            {
              role: "menu",
              "aria-label": label,
              style: {
                position: "absolute",
                [align === "end" ? "right" : "left"]: 0,
                top: "calc(100% + 6px)",
                minWidth: "12rem",
                zIndex: 200,
                background: "var(--z-color-surface, #ffffff)",
                border: "1px solid var(--z-color-border, #ebebeb)",
                borderRadius: "10px",
                boxShadow: "0 8px 24px rgba(14, 18, 27, 0.12), 0 2px 6px rgba(14, 18, 27, 0.06)",
                padding: "var(--z-space-1, 0.25rem)",
                listStyle: "none",
                margin: 0
              },
              children: items.map((item) => {
                const isHovered = hoveredId === item.id && !item.disabled;
                const isFocused = focusedId === item.id && !item.disabled;
                return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("li", { role: "none", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
                  "button",
                  {
                    type: "button",
                    role: "menuitem",
                    disabled: item.disabled,
                    style: {
                      width: "100%",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--z-space-2, 0.5rem)",
                      padding: "var(--z-space-2, 0.5rem) var(--z-space-3, 0.75rem)",
                      borderRadius: "8px",
                      border: 0,
                      background: isHovered ? item.danger ? "rgba(251, 55, 72, 0.08)" : "var(--z-color-weak, var(--z-color-background, #f7f7f7))" : "transparent",
                      color: item.disabled ? "var(--z-color-text300, #a1a1aa)" : item.danger ? "var(--z-color-danger, #fb3748)" : "var(--z-color-text, #171717)",
                      fontSize: "14px",
                      lineHeight: "20px",
                      letterSpacing: "-0.006em",
                      cursor: item.disabled ? "not-allowed" : "pointer",
                      outline: "none",
                      boxShadow: isFocused ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.18)" : "none",
                      transition: "background 120ms ease, color 120ms ease"
                    },
                    onClick: () => {
                      if (!item.disabled) {
                        item.onSelect();
                        setOpen(false);
                      }
                    },
                    onMouseEnter: () => setHoveredId(item.id),
                    onMouseLeave: () => setHoveredId(null),
                    onFocus: (event) => setFocusedId(event.currentTarget.matches(":focus-visible") ? item.id : null),
                    onBlur: () => setFocusedId(null),
                    children: [
                      item.icon && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { "aria-hidden": true, style: { display: "inline-flex", flexShrink: 0 }, children: item.icon }),
                      item.label
                    ]
                  }
                ) }, item.id);
              })
            }
          )
        ]
      }
    );
  }

  // ../ui-react/src/molecules/Tabs.tsx
  var import_react12 = __require("react");
  var import_jsx_runtime21 = __require("react/jsx-runtime");
  function Tabs({ items, initialTabId, className, style }) {
    const initialId = (0, import_react12.useMemo)(() => initialTabId ?? items[0]?.id, [initialTabId, items]);
    const [activeId, setActiveId] = (0, import_react12.useState)(initialId);
    const [hoveredId, setHoveredId] = (0, import_react12.useState)(null);
    const [focusedId, setFocusedId] = (0, import_react12.useState)(null);
    const active = items.find((item) => item.id === activeId) ?? items[0];
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
      "div",
      {
        className,
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "var(--z-space-3, 0.75rem)",
          ...style
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
            "div",
            {
              role: "tablist",
              "aria-label": "Tabs",
              style: {
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "var(--z-space-2, 0.5rem)"
              },
              children: items.map((item) => {
                const isActive = active?.id === item.id;
                const isHovered = hoveredId === item.id && !item.disabled;
                const isFocused = focusedId === item.id && !item.disabled;
                return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                  "button",
                  {
                    type: "button",
                    role: "tab",
                    "aria-selected": isActive,
                    disabled: item.disabled,
                    style: {
                      minHeight: "32px",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      border: "1px solid transparent",
                      background: isActive ? "var(--z-color-text, #171717)" : isHovered ? "var(--z-color-border, #ebebeb)" : "var(--z-color-weak, var(--z-color-background, #f7f7f7))",
                      color: isActive ? "var(--z-color-primaryContrast, #ffffff)" : item.disabled ? "var(--z-color-text300, #a1a1aa)" : "var(--z-color-text, #171717)",
                      fontSize: "14px",
                      fontWeight: "var(--z-type-weight-medium, 500)",
                      lineHeight: "20px",
                      letterSpacing: "-0.006em",
                      cursor: item.disabled ? "not-allowed" : "pointer",
                      outline: "none",
                      transform: !item.disabled && !isActive && isHovered ? "translateY(-1px)" : "translateY(0)",
                      boxShadow: isFocused ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)" : "none",
                      transition: "background 140ms ease, color 140ms ease, transform 90ms ease, box-shadow 140ms ease",
                      opacity: item.disabled ? 0.5 : 1
                    },
                    onClick: () => !item.disabled && setActiveId(item.id),
                    onMouseEnter: () => !item.disabled && setHoveredId(item.id),
                    onMouseLeave: () => setHoveredId(null),
                    onFocus: (event) => !item.disabled && setFocusedId(event.currentTarget.matches(":focus-visible") ? item.id : null),
                    onBlur: () => setFocusedId(null),
                    children: item.label
                  },
                  item.id
                );
              })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
            "div",
            {
              role: "tabpanel",
              style: {
                padding: "14px",
                border: "1px solid var(--z-color-border, #ebebeb)",
                borderRadius: "10px",
                background: "var(--z-color-surface, #ffffff)",
                color: "var(--z-color-text, #171717)"
              },
              children: active?.content
            }
          )
        ]
      }
    );
  }

  // ../ui-react/src/molecules/Accordion.tsx
  var import_react13 = __require("react");
  var import_jsx_runtime22 = __require("react/jsx-runtime");
  function isOpenItem(itemId, openIds) {
    return openIds.includes(itemId);
  }
  function Accordion({
    items,
    allowMultiple = false,
    defaultOpenIds,
    iconPosition = "right",
    leadingIcon,
    forceHoveredId,
    emptyState,
    className,
    style,
    onValueChange
  }) {
    const initialOpenIds = (0, import_react13.useMemo)(() => {
      if (defaultOpenIds?.length) {
        return defaultOpenIds;
      }
      return items.filter((item) => item.defaultOpen).map((item) => item.id);
    }, [defaultOpenIds, items]);
    const [openIds, setOpenIds] = (0, import_react13.useState)(initialOpenIds);
    const [hoveredItemId, setHoveredItemId] = (0, import_react13.useState)(null);
    const [focusedItemId, setFocusedItemId] = (0, import_react13.useState)(null);
    function updateOpenIds(nextIds) {
      setOpenIds(nextIds);
      onValueChange?.(nextIds);
    }
    function toggleItem(itemId) {
      const isOpen = isOpenItem(itemId, openIds);
      if (isOpen) {
        updateOpenIds(openIds.filter((openId) => openId !== itemId));
        return;
      }
      if (allowMultiple) {
        updateOpenIds([...openIds, itemId]);
        return;
      }
      updateOpenIds([itemId]);
    }
    if (items.length === 0) {
      return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className, style, children: emptyState ?? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        "p",
        {
          style: {
            padding: "var(--z-space-4, 1rem)",
            textAlign: "center",
            color: "var(--z-color-muted, #5c5c5c)",
            fontSize: "var(--z-type-size-sm, 0.875rem)",
            margin: 0
          },
          children: "No items."
        }
      ) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className, style: { display: "flex", flexDirection: "column", gap: "var(--z-space-2, 0.5rem)", ...style }, children: items.map((item) => {
      const isOpen = isOpenItem(item.id, openIds);
      const isHovered = forceHoveredId !== void 0 ? forceHoveredId === item.id : hoveredItemId === item.id;
      const isFocused = focusedItemId === item.id;
      const panelId = `accordion-panel-${item.id}`;
      const buttonId = `accordion-trigger-${item.id}`;
      return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
        "div",
        {
          style: {
            borderRadius: "10px",
            border: isOpen || isHovered ? "1px solid transparent" : "1px solid var(--z-color-border, #ebebeb)",
            background: isOpen || isHovered ? "var(--z-color-weak, var(--z-color-background, #f7f7f7))" : "var(--z-color-surface, #ffffff)",
            boxShadow: isOpen || isHovered ? "none" : "0 1px 2px rgba(10, 13, 20, 0.03)",
            transition: "background-color 140ms ease, border-color 140ms ease"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
              "button",
              {
                id: buttonId,
                type: "button",
                "aria-expanded": isOpen,
                "aria-controls": panelId,
                onClick: () => {
                  if (!item.disabled) {
                    toggleItem(item.id);
                  }
                },
                onMouseEnter: () => setHoveredItemId(item.id),
                onMouseLeave: () => setHoveredItemId((current) => current === item.id ? null : current),
                onFocus: (event) => !item.disabled && setFocusedItemId(event.currentTarget.matches(":focus-visible") ? item.id : null),
                onBlur: () => setFocusedItemId(null),
                disabled: item.disabled,
                style: {
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--z-space-2, 0.5rem)",
                  width: "100%",
                  textAlign: "left",
                  padding: "14px",
                  border: "0",
                  background: "transparent",
                  color: item.disabled ? "#d1d1d1" : "var(--z-color-text, #171717)",
                  cursor: item.disabled ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "-0.006em",
                  outline: "none",
                  borderRadius: "10px",
                  boxShadow: isFocused ? "inset 0 0 0 2px rgba(153, 160, 174, 0.22), inset 0 0 0 2px var(--z-color-primary, #335cff)" : "none",
                  transition: "box-shadow 140ms ease"
                },
                children: [
                  iconPosition === "left" ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                    "span",
                    {
                      "aria-hidden": true,
                      style: { width: "24px", textAlign: "center", fontSize: "16px", lineHeight: "20px" },
                      children: isOpen ? "\u2212" : "+"
                    }
                  ) : null,
                  leadingIcon ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                    "span",
                    {
                      "aria-hidden": true,
                      style: { width: "24px", minWidth: "24px", textAlign: "center", fontSize: "14px", lineHeight: "20px" },
                      children: leadingIcon
                    }
                  ) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("span", { style: { flex: 1 }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { style: { fontWeight: 500, display: "block" }, children: item.title }),
                    isOpen && item.description ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                      "span",
                      {
                        style: {
                          marginTop: "6px",
                          display: "block",
                          color: "var(--z-color-muted, #5c5c5c)",
                          fontWeight: 400
                        },
                        children: item.description
                      }
                    ) : null
                  ] }),
                  iconPosition === "right" ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                    "span",
                    {
                      "aria-hidden": true,
                      style: { width: "24px", textAlign: "center", fontSize: "16px", lineHeight: "20px" },
                      children: isOpen ? "\u2212" : "+"
                    }
                  ) : null
                ]
              }
            ),
            isOpen && item.content ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
              "div",
              {
                id: panelId,
                role: "region",
                "aria-labelledby": buttonId,
                style: {
                  padding: "0 14px 14px 14px",
                  color: "var(--z-color-muted, #5c5c5c)",
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "-0.006em"
                },
                children: item.content
              }
            ) : null
          ]
        },
        item.id
      );
    }) });
  }

  // ../ui-react/src/molecules/DatePicker.tsx
  var import_react14 = __require("react");
  var import_jsx_runtime23 = __require("react/jsx-runtime");
  var WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  var TIME_FILTERS = ["Any time", "Morning", "Afternoon", "Evening"];
  var RANGE_PRESETS = [
    "Today",
    "Yesterday",
    "Last 7 days",
    "Last 30 days",
    "This month",
    "Last month"
  ];
  function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  function shiftMonth(date, amount) {
    return new Date(date.getFullYear(), date.getMonth() + amount, 1);
  }
  function monthLabel(date) {
    return date.toLocaleString(void 0, { month: "long", year: "numeric" });
  }
  function buildMonthCells(date) {
    const firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const dayCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push(null);
    }
    for (let day = 1; day <= dayCount; day += 1) {
      cells.push(day);
    }
    while (cells.length % 7 !== 0) {
      cells.push(null);
    }
    return cells;
  }
  function isSameDay(day, target) {
    return day !== null && day === target;
  }
  function inRange(day, range) {
    if (range.startDay === null || range.endDay === null) {
      return false;
    }
    const min = Math.min(range.startDay, range.endDay);
    const max = Math.max(range.startDay, range.endDay);
    return day > min && day < max;
  }
  function DatePicker({
    mode = "single",
    showTimeFilters = false,
    showFooter = false,
    className,
    style,
    onChange,
    onApply,
    onCancel
  }) {
    const [leftMonth, setLeftMonth] = (0, import_react14.useState)(() => startOfMonth(new Date(2025, 9, 1)));
    const [singleDay, setSingleDay] = (0, import_react14.useState)(16);
    const [range, setRange] = (0, import_react14.useState)({ startDay: 11, endDay: 16 });
    const [timeFilter, setTimeFilter] = (0, import_react14.useState)(TIME_FILTERS[0]);
    const [preset, setPreset] = (0, import_react14.useState)(RANGE_PRESETS[2]);
    const rightMonth = (0, import_react14.useMemo)(() => shiftMonth(leftMonth, 1), [leftMonth]);
    const leftCells = (0, import_react14.useMemo)(() => buildMonthCells(leftMonth), [leftMonth]);
    const rightCells = (0, import_react14.useMemo)(() => buildMonthCells(rightMonth), [rightMonth]);
    function emitChange(nextSingleDay, nextRange) {
      onChange?.({
        mode,
        singleDay: nextSingleDay,
        range: nextRange
      });
    }
    function handleSingleSelect(day) {
      setSingleDay(day);
      emitChange(day, range);
    }
    function handleRangeSelect(day) {
      setRange((currentRange) => {
        let nextRange;
        if (currentRange.startDay === null || currentRange.endDay !== null) {
          nextRange = { startDay: day, endDay: null };
        } else if (day < currentRange.startDay) {
          nextRange = { startDay: day, endDay: currentRange.startDay };
        } else {
          nextRange = { startDay: currentRange.startDay, endDay: day };
        }
        emitChange(singleDay, nextRange);
        return nextRange;
      });
    }
    function renderCalendar(currentMonth, cells, options) {
      return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
        "div",
        {
          style: {
            border: "1px solid var(--z-color-border, #ebebeb)",
            borderRadius: "10px",
            padding: "10px",
            background: "var(--z-color-surface, #ffffff)"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: options.onPrev,
                      disabled: !options.showPrev,
                      "aria-label": "Previous month",
                      style: {
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        border: "1px solid var(--z-color-border, #ebebeb)",
                        background: "var(--z-color-surface, #ffffff)",
                        color: "var(--z-color-text, #171717)",
                        cursor: options.showPrev ? "pointer" : "default",
                        opacity: options.showPrev ? 1 : 0,
                        visibility: options.showPrev ? "visible" : "hidden"
                      },
                      children: "<"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("strong", { style: { fontSize: "14px", fontWeight: 500 }, children: monthLabel(currentMonth) }),
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: options.onNext,
                      disabled: !options.showNext,
                      "aria-label": "Next month",
                      style: {
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        border: "1px solid var(--z-color-border, #ebebeb)",
                        background: "var(--z-color-surface, #ffffff)",
                        color: "var(--z-color-text, #171717)",
                        cursor: options.showNext ? "pointer" : "default",
                        opacity: options.showNext ? 1 : 0,
                        visibility: options.showNext ? "visible" : "hidden"
                      },
                      children: ">"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                  gap: "4px"
                },
                children: [
                  WEEKDAY_LABELS.map((label) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                    "span",
                    {
                      style: {
                        height: "24px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        color: "var(--z-color-muted, #5c5c5c)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      },
                      children: label
                    },
                    label
                  )),
                  cells.map((day, index) => {
                    if (day === null) {
                      return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { style: { height: "30px" } }, `empty-${currentMonth.toISOString()}-${index}`);
                    }
                    const isSingleActive = mode === "single" && isSameDay(singleDay, day);
                    const isRangeStart = mode === "range" && isSameDay(range.startDay, day);
                    const isRangeEnd = mode === "range" && isSameDay(range.endDay, day);
                    const isMidRange = mode === "range" && inRange(day, range);
                    const isActive = isSingleActive || isRangeStart || isRangeEnd;
                    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                      "button",
                      {
                        type: "button",
                        onClick: () => mode === "single" ? handleSingleSelect(day) : handleRangeSelect(day),
                        "aria-pressed": isActive,
                        style: {
                          height: "30px",
                          borderRadius: "8px",
                          border: isActive ? "1px solid var(--z-color-primary, #121212)" : "1px solid transparent",
                          background: isActive ? "var(--z-color-primary, #121212)" : isMidRange ? "color-mix(in srgb, var(--z-color-primary, #121212) 14%, transparent)" : "transparent",
                          color: isActive ? "var(--z-color-primaryContrast, #ffffff)" : "var(--z-color-text, #171717)",
                          fontSize: "13px",
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "background-color 120ms ease, color 120ms ease"
                        },
                        children: day
                      },
                      `${currentMonth.toISOString()}-${day}`
                    );
                  })
                ]
              }
            )
          ]
        }
      );
    }
    const currentValue = {
      mode,
      singleDay,
      range
    };
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
      "div",
      {
        className,
        style: {
          width: "100%",
          maxWidth: mode === "range" ? "920px" : "520px",
          border: "1px solid var(--z-color-border, #ebebeb)",
          borderRadius: "12px",
          background: "var(--z-color-surface, #ffffff)",
          padding: "12px",
          display: "grid",
          gap: "12px",
          ...style
        },
        children: [
          showTimeFilters ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" }, children: TIME_FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            "button",
            {
              type: "button",
              onClick: () => setTimeFilter(item),
              style: {
                border: "1px solid var(--z-color-border, #ebebeb)",
                borderRadius: "999px",
                background: timeFilter === item ? "var(--z-color-weak, var(--z-color-background, #f7f7f7))" : "var(--z-color-surface, #ffffff)",
                color: "var(--z-color-text, #171717)",
                padding: "5px 10px",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer"
              },
              children: item
            },
            item
          )) }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: mode === "range" ? "168px minmax(0, 1fr)" : "minmax(0, 1fr)",
                gap: "12px"
              },
              children: [
                mode === "range" ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                  "div",
                  {
                    style: {
                      border: "1px solid var(--z-color-border, #ebebeb)",
                      borderRadius: "10px",
                      padding: "8px",
                      display: "grid",
                      gap: "6px",
                      alignContent: "start",
                      background: "var(--z-color-surface, #ffffff)"
                    },
                    children: RANGE_PRESETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                      "button",
                      {
                        type: "button",
                        onClick: () => setPreset(item),
                        style: {
                          border: "1px solid transparent",
                          borderRadius: "8px",
                          background: preset === item ? "color-mix(in srgb, var(--z-color-primary, #121212) 12%, transparent)" : "transparent",
                          color: "var(--z-color-text, #171717)",
                          textAlign: "left",
                          fontSize: "13px",
                          lineHeight: "18px",
                          padding: "6px 8px",
                          cursor: "pointer"
                        },
                        children: item
                      },
                      item
                    ))
                  }
                ) : null,
                /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: mode === "range" ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)",
                      gap: "10px"
                    },
                    children: [
                      renderCalendar(leftMonth, leftCells, {
                        showPrev: true,
                        showNext: mode === "single",
                        onPrev: () => setLeftMonth((month) => shiftMonth(month, -1)),
                        onNext: () => setLeftMonth((month) => shiftMonth(month, 1))
                      }),
                      mode === "range" ? renderCalendar(rightMonth, rightCells, {
                        showNext: true,
                        onNext: () => setLeftMonth((month) => shiftMonth(month, 1))
                      }) : null
                    ]
                  }
                )
              ]
            }
          ),
          showFooter ? /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
            "div",
            {
              style: {
                borderTop: "1px solid var(--z-color-border, #ebebeb)",
                paddingTop: "10px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Button, { size: "sm", variant: "secondary", onClick: onCancel, children: "Cancel" }),
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Button, { size: "sm", onClick: () => onApply?.(currentValue), children: "Apply" })
              ]
            }
          ) : null
        ]
      }
    );
  }

  // ../ui-react/src/molecules/ColorPicker.tsx
  var import_react15 = __require("react");
  var import_jsx_runtime24 = __require("react/jsx-runtime");
  var DEFAULT_COLOR = "#335cff";
  var DEFAULT_RECOMMENDED_COLORS = [
    "#707483",
    "#335cff",
    "#f17a1a",
    "#f04438",
    "#1fc16b",
    "#f6b51e",
    "#7d52f4",
    "#47c2ff"
  ];
  function clamp2(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
  function normalizeHex(input) {
    const trimmed = input.trim().replace(/^#/, "");
    if (/^[0-9a-fA-F]{3}$/.test(trimmed)) {
      return `#${trimmed.split("").map((char) => char + char).join("").toLowerCase()}`;
    }
    if (/^[0-9a-fA-F]{6}$/.test(trimmed)) {
      return `#${trimmed.toLowerCase()}`;
    }
    return null;
  }
  function parseRgbInput(input) {
    const cleaned = input.trim().replace(/^rgba?\(/i, "").replace(/\)$/i, "");
    const parts = cleaned.split(/[\s,]+/).filter(Boolean);
    if (parts.length < 3) return null;
    const [r, g, b] = parts.slice(0, 3).map((part) => Number(part));
    if ([r, g, b].some((value) => Number.isNaN(value))) return null;
    return [clamp2(Math.round(r), 0, 255), clamp2(Math.round(g), 0, 255), clamp2(Math.round(b), 0, 255)];
  }
  function parseHslInput(input) {
    const cleaned = input.trim().replace(/^hsla?\(/i, "").replace(/\)$/i, "").replace(/%/g, "");
    const parts = cleaned.split(/[\s,]+/).filter(Boolean);
    if (parts.length < 3) return null;
    const h = Number(parts[0]);
    const s = Number(parts[1]);
    const l = Number(parts[2]);
    if ([h, s, l].some((value) => Number.isNaN(value))) return null;
    return [(h % 360 + 360) % 360, clamp2(s, 0, 100), clamp2(l, 0, 100)];
  }
  function hsvToRgb(h, s, v) {
    const sat = clamp2(s, 0, 100) / 100;
    const val = clamp2(v, 0, 100) / 100;
    const hh = (h % 360 + 360) % 360;
    const c = val * sat;
    const x = c * (1 - Math.abs(hh / 60 % 2 - 1));
    const m = val - c;
    let rr = 0;
    let gg = 0;
    let bb = 0;
    if (hh < 60) {
      rr = c;
      gg = x;
    } else if (hh < 120) {
      rr = x;
      gg = c;
    } else if (hh < 180) {
      gg = c;
      bb = x;
    } else if (hh < 240) {
      gg = x;
      bb = c;
    } else if (hh < 300) {
      rr = x;
      bb = c;
    } else {
      rr = c;
      bb = x;
    }
    return [
      Math.round((rr + m) * 255),
      Math.round((gg + m) * 255),
      Math.round((bb + m) * 255)
    ];
  }
  function rgbToHsv(r, g, b) {
    const rr = clamp2(r, 0, 255) / 255;
    const gg = clamp2(g, 0, 255) / 255;
    const bb = clamp2(b, 0, 255) / 255;
    const max = Math.max(rr, gg, bb);
    const min = Math.min(rr, gg, bb);
    const delta = max - min;
    let h = 0;
    if (delta !== 0) {
      if (max === rr) {
        h = 60 * ((gg - bb) / delta % 6);
      } else if (max === gg) {
        h = 60 * ((bb - rr) / delta + 2);
      } else {
        h = 60 * ((rr - gg) / delta + 4);
      }
    }
    if (h < 0) h += 360;
    const s = max === 0 ? 0 : delta / max * 100;
    const v = max * 100;
    return { h, s, v };
  }
  function rgbToHsl(r, g, b) {
    const rr = clamp2(r, 0, 255) / 255;
    const gg = clamp2(g, 0, 255) / 255;
    const bb = clamp2(b, 0, 255) / 255;
    const max = Math.max(rr, gg, bb);
    const min = Math.min(rr, gg, bb);
    const delta = max - min;
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;
    if (delta !== 0) {
      s = delta / (1 - Math.abs(2 * l - 1));
      if (max === rr) {
        h = 60 * ((gg - bb) / delta % 6);
      } else if (max === gg) {
        h = 60 * ((bb - rr) / delta + 2);
      } else {
        h = 60 * ((rr - gg) / delta + 4);
      }
    }
    if (h < 0) h += 360;
    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
  }
  function hslToRgb(h, s, l) {
    const sat = clamp2(s, 0, 100) / 100;
    const light = clamp2(l, 0, 100) / 100;
    const hh = (h % 360 + 360) % 360;
    const c = (1 - Math.abs(2 * light - 1)) * sat;
    const x = c * (1 - Math.abs(hh / 60 % 2 - 1));
    const m = light - c / 2;
    let rr = 0;
    let gg = 0;
    let bb = 0;
    if (hh < 60) {
      rr = c;
      gg = x;
    } else if (hh < 120) {
      rr = x;
      gg = c;
    } else if (hh < 180) {
      gg = c;
      bb = x;
    } else if (hh < 240) {
      gg = x;
      bb = c;
    } else if (hh < 300) {
      rr = x;
      bb = c;
    } else {
      rr = c;
      bb = x;
    }
    return [
      Math.round((rr + m) * 255),
      Math.round((gg + m) * 255),
      Math.round((bb + m) * 255)
    ];
  }
  function toHexByte(value) {
    return clamp2(Math.round(value), 0, 255).toString(16).padStart(2, "0");
  }
  function hsvaToHex(hsva) {
    const [r, g, b] = hsvToRgb(hsva.h, hsva.s, hsva.v);
    return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
  }
  function formatHexValue(hsva) {
    return hsvaToHex(hsva).replace("#", "").toUpperCase();
  }
  function formatRgbValue(hsva) {
    const [r, g, b] = hsvToRgb(hsva.h, hsva.s, hsva.v);
    return `${r}, ${g}, ${b}`;
  }
  function formatHslValue(hsva) {
    const [r, g, b] = hsvToRgb(hsva.h, hsva.s, hsva.v);
    const [h, s, l] = rgbToHsl(r, g, b);
    return `${h}, ${s}%, ${l}%`;
  }
  function formatByMode(mode, hsva) {
    if (mode === "rgb") return formatRgbValue(hsva);
    if (mode === "hsl") return formatHslValue(hsva);
    return formatHexValue(hsva);
  }
  function parseInputByMode(value, mode) {
    if (mode === "hex") {
      const hex = normalizeHex(value);
      if (!hex) return null;
      const raw = hex.replace("#", "");
      const r2 = Number.parseInt(raw.slice(0, 2), 16);
      const g2 = Number.parseInt(raw.slice(2, 4), 16);
      const b2 = Number.parseInt(raw.slice(4, 6), 16);
      return rgbToHsv(r2, g2, b2);
    }
    if (mode === "rgb") {
      const rgb = parseRgbInput(value);
      if (!rgb) return null;
      return rgbToHsv(rgb[0], rgb[1], rgb[2]);
    }
    const hsl = parseHslInput(value);
    if (!hsl) return null;
    const [r, g, b] = hslToRgb(hsl[0], hsl[1], hsl[2]);
    return rgbToHsv(r, g, b);
  }
  function parseInitialColor(value) {
    const parsed = parseInputByMode(value ?? "", "hex");
    if (parsed) return parsed;
    return parseInputByMode(DEFAULT_COLOR, "hex");
  }
  function ChevronDownIcon() {
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 20 20", fill: "none", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      "path",
      {
        d: "M5 7.5L10 12.5L15 7.5",
        stroke: "currentColor",
        strokeWidth: "1.7",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ) });
  }
  function EyedropperIcon() {
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 20 20", fill: "none", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      "path",
      {
        d: "M12.54 3.22a2.25 2.25 0 013.18 3.18l-1.1 1.1 1.08 1.08a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06 0l-1.08-1.08-4.66 4.66a1.5 1.5 0 01-.65.38l-2.27.63a.75.75 0 01-.92-.92l.63-2.27a1.5 1.5 0 01.38-.65l4.66-4.66-1.08-1.08a.75.75 0 010-1.06L9.72 3.5a.75.75 0 011.06 0l1.08 1.08 1.1-1.1z",
        stroke: "currentColor",
        strokeWidth: "1.35",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ) });
  }
  function ColorPicker({
    value = DEFAULT_COLOR,
    format = "hex",
    opacity = 100,
    showRecommendedColors = true,
    recommendedColors = DEFAULT_RECOMMENDED_COLORS,
    disabled = false,
    className,
    style,
    onChange
  }) {
    const spectrumRef = (0, import_react15.useRef)(null);
    const [draggingSpectrum, setDraggingSpectrum] = (0, import_react15.useState)(false);
    const [hsva, setHsva] = (0, import_react15.useState)(() => parseInitialColor(value));
    const [currentFormat, setCurrentFormat] = (0, import_react15.useState)(format);
    const [alphaPercent, setAlphaPercent] = (0, import_react15.useState)(clamp2(opacity, 0, 100));
    const [inputValue, setInputValue] = (0, import_react15.useState)(() => formatByMode(format, parseInitialColor(value)));
    const [isEditingInput, setIsEditingInput] = (0, import_react15.useState)(false);
    (0, import_react15.useEffect)(() => {
      setHsva(parseInitialColor(value));
    }, [value]);
    (0, import_react15.useEffect)(() => {
      setCurrentFormat(format);
    }, [format]);
    (0, import_react15.useEffect)(() => {
      setAlphaPercent(clamp2(opacity, 0, 100));
    }, [opacity]);
    const normalizedOpacity = clamp2(alphaPercent, 0, 100);
    const rgb = (0, import_react15.useMemo)(() => hsvToRgb(hsva.h, hsva.s, hsva.v), [hsva]);
    const hueColor = (0, import_react15.useMemo)(() => {
      const [r, g, b] = hsvToRgb(hsva.h, 100, 100);
      return `rgb(${r}, ${g}, ${b})`;
    }, [hsva.h]);
    const opaqueColor = (0, import_react15.useMemo)(() => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`, [rgb]);
    const displayValue = (0, import_react15.useMemo)(() => formatByMode(currentFormat, hsva), [currentFormat, hsva]);
    const normalizedHex = (0, import_react15.useMemo)(() => hsvaToHex(hsva), [hsva]);
    (0, import_react15.useEffect)(() => {
      if (!isEditingInput) {
        setInputValue(displayValue);
      }
    }, [displayValue, isEditingInput]);
    (0, import_react15.useEffect)(() => {
      if (!onChange) return;
      const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
      onChange({
        hex: normalizedHex,
        rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
        hsl: `hsl(${h} ${s}% ${l}%)`,
        opacity: normalizedOpacity,
        format: currentFormat
      });
    }, [currentFormat, normalizedHex, normalizedOpacity, onChange, rgb, hsva]);
    function updateSpectrumFromPointer(clientX, clientY) {
      if (disabled || !spectrumRef.current) return;
      const rect = spectrumRef.current.getBoundingClientRect();
      const x = clamp2(clientX - rect.left, 0, rect.width);
      const y = clamp2(clientY - rect.top, 0, rect.height);
      const nextS = rect.width === 0 ? 0 : x / rect.width * 100;
      const nextV = rect.height === 0 ? 100 : 100 - y / rect.height * 100;
      setHsva((current) => ({
        ...current,
        s: clamp2(nextS, 0, 100),
        v: clamp2(nextV, 0, 100)
      }));
    }
    function commitInput(raw) {
      const parsed = parseInputByMode(raw, currentFormat);
      if (!parsed) {
        setInputValue(displayValue);
        return;
      }
      setHsva(parsed);
      setInputValue(formatByMode(currentFormat, parsed));
    }
    const recommendedValues = (0, import_react15.useMemo)(
      () => recommendedColors.map((color) => normalizeHex(color)).filter((color) => Boolean(color)),
      [recommendedColors]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
      "div",
      {
        className,
        style: {
          width: "272px",
          border: "1px solid var(--z-color-stroke200, #ebebeb)",
          borderRadius: "16px",
          background: "var(--z-color-background0, #ffffff)",
          boxShadow: "0 16px 32px -12px rgba(14, 18, 27, 0.1)",
          overflow: "hidden",
          opacity: disabled ? 0.72 : 1,
          ...style
        },
        "aria-disabled": disabled,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
            "div",
            {
              style: {
                padding: "16px",
                borderBottom: "1px solid var(--z-color-stroke200, #ebebeb)",
                display: "grid",
                gap: "12px"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                  "div",
                  {
                    ref: spectrumRef,
                    role: "presentation",
                    onPointerDown: (event) => {
                      if (disabled) return;
                      event.preventDefault();
                      setDraggingSpectrum(true);
                      event.currentTarget.setPointerCapture(event.pointerId);
                      updateSpectrumFromPointer(event.clientX, event.clientY);
                    },
                    onPointerMove: (event) => {
                      if (!draggingSpectrum || disabled) return;
                      updateSpectrumFromPointer(event.clientX, event.clientY);
                    },
                    onPointerUp: () => setDraggingSpectrum(false),
                    onPointerCancel: () => setDraggingSpectrum(false),
                    style: {
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: "8px",
                      background: `linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 60%), linear-gradient(to top, #000000 0%, rgba(0,0,0,0) 65%), ${hueColor}`,
                      cursor: disabled ? "default" : "crosshair",
                      userSelect: "none",
                      touchAction: "none"
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                      "span",
                      {
                        style: {
                          position: "absolute",
                          left: `calc(${hsva.s}% - 8px)`,
                          top: `calc(${100 - hsva.v}% - 8px)`,
                          width: "16px",
                          height: "16px",
                          borderRadius: "999px",
                          border: "2px solid #ffffff",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                          background: "transparent",
                          pointerEvents: "none"
                        },
                        "aria-hidden": true
                      }
                    )
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: { display: "grid", gap: "8px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
                    "div",
                    {
                      style: {
                        position: "relative",
                        width: "100%",
                        height: "8px",
                        borderRadius: "999px",
                        background: "linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)"
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                          "span",
                          {
                            style: {
                              position: "absolute",
                              top: "50%",
                              left: `calc(${hsva.h / 360 * 100}% - 8px)`,
                              width: "16px",
                              height: "16px",
                              borderRadius: "999px",
                              transform: "translateY(-50%)",
                              border: "2px solid #ffffff",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
                              background: hueColor,
                              pointerEvents: "none"
                            },
                            "aria-hidden": true
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                          "input",
                          {
                            "aria-label": "Hue",
                            type: "range",
                            min: 0,
                            max: 360,
                            step: 1,
                            disabled,
                            value: Math.round(hsva.h),
                            onChange: (event) => {
                              const nextHue = clamp2(Number(event.target.value), 0, 360);
                              setHsva((current) => ({ ...current, h: nextHue }));
                            },
                            style: {
                              position: "absolute",
                              inset: 0,
                              width: "100%",
                              height: "100%",
                              opacity: 0,
                              margin: 0,
                              cursor: disabled ? "default" : "pointer"
                            }
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
                    "div",
                    {
                      style: {
                        position: "relative",
                        width: "100%",
                        height: "8px",
                        borderRadius: "999px",
                        border: "1px solid var(--z-color-stroke200, #ebebeb)",
                        backgroundImage: `linear-gradient(45deg, rgba(17,24,39,0.14) 25%, transparent 25%), linear-gradient(-45deg, rgba(17,24,39,0.14) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(17,24,39,0.14) 75%), linear-gradient(-45deg, transparent 75%, rgba(17,24,39,0.14) 75%), linear-gradient(90deg, rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0) 0%, ${opaqueColor} 100%)`,
                        backgroundSize: "8px 8px, 8px 8px, 8px 8px, 8px 8px, 100% 100%",
                        backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0, 0 0"
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                          "span",
                          {
                            style: {
                              position: "absolute",
                              top: "50%",
                              left: `calc(${normalizedOpacity}% - 8px)`,
                              width: "16px",
                              height: "16px",
                              borderRadius: "999px",
                              transform: "translateY(-50%)",
                              border: "2px solid #ffffff",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
                              background: normalizedHex,
                              pointerEvents: "none"
                            },
                            "aria-hidden": true
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                          "input",
                          {
                            "aria-label": "Opacity",
                            type: "range",
                            min: 0,
                            max: 100,
                            step: 1,
                            disabled,
                            value: Math.round(normalizedOpacity),
                            onChange: (event) => setAlphaPercent(clamp2(Number(event.target.value), 0, 100)),
                            style: {
                              position: "absolute",
                              inset: 0,
                              width: "100%",
                              height: "100%",
                              opacity: 0,
                              margin: 0,
                              cursor: disabled ? "default" : "pointer"
                            }
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: { display: "grid", gap: "4px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
                    "label",
                    {
                      style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "2px",
                        width: "fit-content",
                        color: "var(--z-color-text, #171717)",
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: "-0.006em",
                        fontWeight: 500
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
                          "select",
                          {
                            value: currentFormat,
                            disabled,
                            "aria-label": "Color format",
                            onChange: (event) => setCurrentFormat(event.target.value),
                            style: {
                              border: "none",
                              background: "transparent",
                              color: "inherit",
                              font: "inherit",
                              appearance: "none",
                              WebkitAppearance: "none",
                              MozAppearance: "none",
                              cursor: disabled ? "default" : "pointer",
                              paddingRight: "14px"
                            },
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("option", { value: "hex", children: "Hex" }),
                              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("option", { value: "rgb", children: "RGB" }),
                              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("option", { value: "hsl", children: "HSL" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { style: { marginLeft: "-12px", color: "var(--z-color-muted, #5c5c5c)" }, "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(ChevronDownIcon, {}) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
                    "div",
                    {
                      style: {
                        display: "flex",
                        border: "1px solid var(--z-color-stroke200, #ebebeb)",
                        borderRadius: "8px",
                        background: "var(--z-color-background0, #ffffff)",
                        overflow: "hidden",
                        minHeight: "36px"
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                          "button",
                          {
                            type: "button",
                            "aria-label": "Color picker tool",
                            disabled,
                            style: {
                              width: "36px",
                              border: "none",
                              borderRight: "1px solid var(--z-color-stroke200, #ebebeb)",
                              background: "transparent",
                              color: "var(--z-color-muted, #5c5c5c)",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: disabled ? "default" : "pointer"
                            },
                            children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(EyedropperIcon, {})
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                          "input",
                          {
                            value: inputValue,
                            disabled,
                            "aria-label": `${currentFormat.toUpperCase()} value`,
                            onFocus: () => setIsEditingInput(true),
                            onChange: (event) => setInputValue(event.target.value),
                            onBlur: () => {
                              setIsEditingInput(false);
                              commitInput(inputValue);
                            },
                            onKeyDown: (event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                commitInput(inputValue);
                                event.currentTarget.blur();
                              }
                            },
                            style: {
                              flex: 1,
                              minWidth: 0,
                              border: "none",
                              background: "transparent",
                              padding: "0 10px",
                              color: "var(--z-color-text, #171717)",
                              fontSize: "14px",
                              lineHeight: "20px",
                              letterSpacing: "-0.006em",
                              outline: "none"
                            }
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
                          "span",
                          {
                            style: {
                              minWidth: "56px",
                              borderLeft: "1px solid var(--z-color-stroke200, #ebebeb)",
                              padding: "0 10px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--z-color-muted, #5c5c5c)",
                              fontSize: "14px",
                              lineHeight: "20px",
                              letterSpacing: "-0.006em"
                            },
                            children: [
                              Math.round(normalizedOpacity),
                              "%"
                            ]
                          }
                        )
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          showRecommendedColors ? /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
            "div",
            {
              style: {
                padding: "16px",
                display: "grid",
                gap: "8px"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                  "p",
                  {
                    style: {
                      margin: 0,
                      color: "var(--z-color-muted, #5c5c5c)",
                      fontSize: "12px",
                      lineHeight: "16px"
                    },
                    children: "Recommended Colors"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px" }, children: recommendedValues.map((color) => {
                  const selected = color === normalizedHex.toLowerCase();
                  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Set color ${color}`,
                      disabled,
                      onClick: () => {
                        const next = parseInputByMode(color, "hex");
                        if (next) {
                          setHsva(next);
                        }
                      },
                      style: {
                        width: "24px",
                        height: "24px",
                        borderRadius: "999px",
                        border: selected ? "2px solid var(--z-color-primary, #121212)" : "1px solid transparent",
                        padding: selected ? "2px" : "3px",
                        background: "transparent",
                        cursor: disabled ? "default" : "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                        "span",
                        {
                          style: {
                            width: "100%",
                            height: "100%",
                            borderRadius: "999px",
                            background: color,
                            border: "1px solid rgba(0,0,0,0.08)"
                          },
                          "aria-hidden": true
                        }
                      )
                    },
                    color
                  );
                }) })
              ]
            }
          ) : null
        ]
      }
    );
  }

  // ../ui-react/src/molecules/Alert.tsx
  var import_jsx_runtime25 = __require("react/jsx-runtime");
  function paletteForStatus(status) {
    if (status === "error") {
      return {
        base: "var(--z-color-danger, #fb3748)",
        light: "#ffd7dc",
        lighter: "#fff0f2",
        onBase: "#ffffff",
        onLight: "var(--z-color-text, #171717)",
        icon: "!"
      };
    }
    if (status === "warning") {
      return {
        base: "var(--z-color-warning, var(--z-color-semanticYellow500, #f6b51e))",
        light: "var(--z-color-warning-light, #fff1c2)",
        lighter: "var(--z-color-warning-lighter, #fff8e1)",
        onBase: "#1f2937",
        onLight: "var(--z-color-text, #171717)",
        icon: "!"
      };
    }
    if (status === "success") {
      return {
        base: "var(--z-color-success, #1fc16b)",
        light: "#c2f5da",
        lighter: "#ecfbf3",
        onBase: "#ffffff",
        onLight: "var(--z-color-text, #171717)",
        icon: "\u2713"
      };
    }
    if (status === "feature") {
      return {
        base: "var(--z-color-feature, var(--z-color-accent, #7d52f4))",
        light: "#e7ddff",
        lighter: "#f5f0ff",
        onBase: "#ffffff",
        onLight: "var(--z-color-text, #171717)",
        icon: "\u2726"
      };
    }
    if (status === "neutral") {
      return {
        base: "var(--z-color-muted, #7b7b7b)",
        light: "#ebebeb",
        lighter: "#f5f5f5",
        onBase: "#ffffff",
        onLight: "var(--z-color-text, #171717)",
        icon: "\u2726"
      };
    }
    return {
      base: "var(--z-color-info, var(--z-color-verified, #3b82f6))",
      light: "var(--z-color-info-light, #dbeafe)",
      lighter: "var(--z-color-info-lighter, #eff6ff)",
      onBase: "#ffffff",
      onLight: "var(--z-color-text, #171717)",
      icon: "i"
    };
  }
  function styleForVariant(variant, palette) {
    if (variant === "filled") {
      return {
        background: palette.base,
        color: palette.onBase,
        border: "1px solid transparent",
        boxShadow: "none"
      };
    }
    if (variant === "light") {
      return {
        background: palette.light,
        color: palette.onLight,
        border: "1px solid transparent",
        boxShadow: "none"
      };
    }
    if (variant === "lighter") {
      return {
        background: palette.lighter,
        color: palette.onLight,
        border: "1px solid transparent",
        boxShadow: "none"
      };
    }
    return {
      background: "var(--z-color-surface, #ffffff)",
      color: "var(--z-color-text, #171717)",
      border: "1px solid var(--z-color-border, #ebebeb)",
      boxShadow: "0 16px 32px -12px rgba(14, 18, 27, 0.1)"
    };
  }
  function sizeStyles5(size) {
    if (size === "xs") {
      return {
        minHeight: "32px",
        padding: "8px",
        borderRadius: "8px",
        fontSize: "12px",
        lineHeight: "16px"
      };
    }
    if (size === "sm") {
      return {
        minHeight: "36px",
        padding: "10px",
        borderRadius: "8px",
        fontSize: "12px",
        lineHeight: "16px"
      };
    }
    return {
      minHeight: "124px",
      padding: "14px",
      borderRadius: "10px",
      fontSize: "14px",
      lineHeight: "20px"
    };
  }
  function Alert({
    title,
    description,
    status = "info",
    variant = "filled",
    size = "xs",
    actionLabel,
    onAction,
    dismissible = false,
    onDismiss,
    icon,
    className
  }) {
    const palette = paletteForStatus(status);
    const toneStyles2 = styleForVariant(variant, palette);
    const frameStyles = sizeStyles5(size);
    const hasBody = Boolean(description) || size === "lg";
    const iconColor = variant === "filled" ? palette.onBase : palette.base;
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
      "div",
      {
        className,
        role: "status",
        style: {
          ...frameStyles,
          ...toneStyles2,
          display: "flex",
          alignItems: "flex-start",
          gap: "var(--z-space-2, 0.5rem)",
          letterSpacing: "0",
          width: "100%"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
            "span",
            {
              "aria-hidden": true,
              style: {
                width: "24px",
                minWidth: "24px",
                textAlign: "center",
                color: iconColor,
                fontWeight: 700
              },
              children: icon ?? palette.icon
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("span", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { style: { display: "block", fontWeight: 500 }, children: title }),
            description ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              "span",
              {
                style: {
                  marginTop: "6px",
                  display: "block",
                  color: variant === "filled" ? palette.onBase : "var(--z-color-muted, #5c5c5c)",
                  opacity: hasBody ? 0.95 : 1
                },
                children: description
              }
            ) : null
          ] }),
          actionLabel ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
            "button",
            {
              type: "button",
              onClick: onAction,
              style: {
                border: 0,
                background: "transparent",
                color: "inherit",
                textDecoration: "underline",
                fontSize: "12px",
                lineHeight: "16px",
                fontWeight: 500,
                cursor: "pointer"
              },
              children: actionLabel
            }
          ) : null,
          dismissible ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
            "button",
            {
              type: "button",
              "aria-label": "Dismiss alert",
              onClick: onDismiss,
              style: {
                border: 0,
                background: "transparent",
                color: "inherit",
                fontSize: "14px",
                lineHeight: "16px",
                cursor: "pointer",
                opacity: 0.8
              },
              children: "\xD7"
            }
          ) : null
        ]
      }
    );
  }

  // ../ui-react/src/molecules/Toast.tsx
  var import_jsx_runtime26 = __require("react/jsx-runtime");
  function Toast({ open = true, onClose, ...props }) {
    if (!open) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      Alert,
      {
        ...props,
        variant: "stroke",
        dismissible: true,
        onDismiss: onClose,
        className: props.className
      }
    );
  }

  // ../ui-react/src/molecules/Breadcrumbs.tsx
  var import_react16 = __require("react");
  var import_jsx_runtime27 = __require("react/jsx-runtime");
  function Breadcrumbs({ items, separator = "/", className, style }) {
    const [hoveredId, setHoveredId] = (0, import_react16.useState)(null);
    const [focusedId, setFocusedId] = (0, import_react16.useState)(null);
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("nav", { "aria-label": "Breadcrumb", className, style, children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
      "ol",
      {
        style: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--z-space-2, 0.5rem)",
          listStyle: "none",
          margin: 0,
          padding: 0
        },
        children: items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHovered = hoveredId === item.id;
          const isFocused = focusedId === item.id;
          const isInteractive = !isLast && (item.href != null || item.onClick != null);
          return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
            "li",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "var(--z-space-2, 0.5rem)"
              },
              children: [
                isInteractive ? item.href ? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
                  "a",
                  {
                    href: item.href,
                    onClick: item.onClick,
                    "aria-current": isLast ? "page" : void 0,
                    onMouseEnter: () => setHoveredId(item.id),
                    onMouseLeave: () => setHoveredId(null),
                    onFocus: (event) => setFocusedId(event.currentTarget.matches(":focus-visible") ? item.id : null),
                    onBlur: () => setFocusedId(null),
                    style: {
                      color: isHovered ? "var(--z-color-text, #171717)" : "var(--z-color-primary, #335cff)",
                      textDecoration: isHovered ? "underline" : "none",
                      borderRadius: "4px",
                      outline: "none",
                      boxShadow: isFocused ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)" : "none",
                      transition: "color 120ms ease, text-decoration 120ms ease"
                    },
                    children: item.label
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: item.onClick,
                    onMouseEnter: () => setHoveredId(item.id),
                    onMouseLeave: () => setHoveredId(null),
                    onFocus: (event) => setFocusedId(event.currentTarget.matches(":focus-visible") ? item.id : null),
                    onBlur: () => setFocusedId(null),
                    style: {
                      border: "none",
                      background: "transparent",
                      padding: 0,
                      cursor: "pointer",
                      color: isHovered ? "var(--z-color-text, #171717)" : "var(--z-color-primary, #335cff)",
                      textDecoration: isHovered ? "underline" : "none",
                      fontSize: "inherit",
                      borderRadius: "4px",
                      outline: "none",
                      boxShadow: isFocused ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)" : "none",
                      transition: "color 120ms ease"
                    },
                    children: item.label
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
                  "span",
                  {
                    "aria-current": isLast ? "page" : void 0,
                    style: {
                      color: isLast ? "var(--z-color-text, #171717)" : "var(--z-color-muted, #5c5c5c)"
                    },
                    children: item.label
                  }
                ),
                !isLast ? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { "aria-hidden": true, style: { color: "var(--z-color-muted, #5c5c5c)" }, children: separator }) : null
              ]
            },
            item.id
          );
        })
      }
    ) });
  }

  // ../ui-react/src/molecules/Pagination.tsx
  var import_jsx_runtime28 = __require("react/jsx-runtime");
  function clampPage(page, totalPages) {
    return Math.min(Math.max(1, page), Math.max(1, totalPages));
  }
  function buildPageCells(currentPage, totalPages, maxVisiblePages) {
    const safeTotal = Math.max(1, totalPages);
    const safeMaxVisible = Math.max(5, maxVisiblePages);
    if (safeTotal <= safeMaxVisible) {
      return Array.from({ length: safeTotal }, (_, index) => index + 1);
    }
    const sideCount = Math.max(1, Math.floor((safeMaxVisible - 3) / 2));
    const start = Math.max(2, currentPage - sideCount);
    const end = Math.min(safeTotal - 1, currentPage + sideCount);
    const cells = [1];
    if (start > 2) cells.push("ellipsis");
    for (let value = start; value <= end; value += 1) {
      cells.push(value);
    }
    if (end < safeTotal - 1) cells.push("ellipsis");
    cells.push(safeTotal);
    return cells;
  }
  function IconArrow({
    direction,
    double = false
  }) {
    const icon = direction === "left" ? double ? "<<" : "<" : double ? ">>" : ">";
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { "aria-hidden": true, children: icon });
  }
  function navButtonStyle(disabled) {
    return {
      border: "none",
      background: "transparent",
      color: disabled ? "var(--z-color-text300, #a3a3a3)" : "var(--z-color-muted, #5c5c5c)",
      fontSize: "18px",
      lineHeight: 1,
      width: "32px",
      height: "32px",
      borderRadius: "8px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background-color 120ms ease, color 120ms ease"
    };
  }
  function Pagination({
    page,
    totalPages,
    onPageChange,
    loading = false,
    type = "basic",
    showFirstLast = true,
    showPrevNext = true,
    showMeta = true,
    showPageSizeSelect = true,
    pageSize = 7,
    pageSizeOptions = [7, 10, 20, 50],
    onPageSizeChange,
    maxVisiblePages = 7,
    ariaLabel = "Pagination",
    className,
    style
  }) {
    const safeTotal = Math.max(1, totalPages);
    const currentPage = clampPage(page, safeTotal);
    const pageCells = buildPageCells(currentPage, safeTotal, maxVisiblePages);
    const canPrevious = !loading && currentPage > 1;
    const canNext = !loading && currentPage < safeTotal;
    const isGroup = type === "group";
    const isFullRadius = type === "full-radius";
    const wrapperRadius = isFullRadius ? "999px" : "8px";
    function goTo(nextPage) {
      if (loading) return;
      onPageChange(clampPage(nextPage, safeTotal));
    }
    function renderLooseCells() {
      return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { style: { display: "inline-flex", alignItems: "center", gap: "8px" }, children: [
        showFirstLast ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          "button",
          {
            type: "button",
            "aria-label": "First page",
            disabled: !canPrevious,
            onClick: () => goTo(1),
            style: navButtonStyle(!canPrevious),
            children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(IconArrow, { direction: "left", double: true })
          }
        ) : null,
        showPrevNext ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          "button",
          {
            type: "button",
            "aria-label": "Previous page",
            disabled: !canPrevious,
            onClick: () => goTo(currentPage - 1),
            style: navButtonStyle(!canPrevious),
            children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(IconArrow, { direction: "left" })
          }
        ) : null,
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { style: { display: "inline-flex", alignItems: "center", gap: "8px" }, children: pageCells.map((cell, index) => {
          const isActive = cell === currentPage;
          return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
            "button",
            {
              type: "button",
              "aria-current": isActive ? "page" : void 0,
              "aria-label": cell === "ellipsis" ? "More pages" : `Page ${cell}`,
              disabled: loading || cell === "ellipsis",
              onClick: () => {
                if (typeof cell === "number") goTo(cell);
              },
              style: {
                minWidth: "32px",
                height: "32px",
                borderRadius: wrapperRadius,
                border: "1px solid var(--z-color-stroke200, #ebebeb)",
                background: isActive ? "var(--z-color-background200, #f7f7f7)" : "var(--z-color-background0, #ffffff)",
                color: "var(--z-color-muted, #5c5c5c)",
                padding: "6px",
                fontSize: "14px",
                fontWeight: isActive ? 500 : 500,
                lineHeight: "20px",
                letterSpacing: "-0.006em",
                cursor: loading || cell === "ellipsis" ? "default" : "pointer"
              },
              children: cell === "ellipsis" ? "..." : cell
            },
            `${cell}-${index}`
          );
        }) }),
        showPrevNext ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          "button",
          {
            type: "button",
            "aria-label": "Next page",
            disabled: !canNext,
            onClick: () => goTo(currentPage + 1),
            style: navButtonStyle(!canNext),
            children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(IconArrow, { direction: "right" })
          }
        ) : null,
        showFirstLast ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          "button",
          {
            type: "button",
            "aria-label": "Last page",
            disabled: !canNext,
            onClick: () => goTo(safeTotal),
            style: navButtonStyle(!canNext),
            children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(IconArrow, { direction: "right", double: true })
          }
        ) : null
      ] });
    }
    function renderGroupCells() {
      const cells = [];
      if (showFirstLast) {
        cells.push({
          id: "first",
          label: "First page",
          icon: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(IconArrow, { direction: "left", double: true }),
          onClick: () => goTo(1),
          disabled: !canPrevious
        });
      }
      if (showPrevNext) {
        cells.push({
          id: "previous",
          label: "Previous page",
          icon: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(IconArrow, { direction: "left" }),
          onClick: () => goTo(currentPage - 1),
          disabled: !canPrevious
        });
      }
      pageCells.forEach((cell, index) => {
        if (cell === "ellipsis") {
          cells.push({
            id: `ellipsis-${index}`,
            label: "More pages",
            icon: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { "aria-hidden": true, children: "..." }),
            disabled: true
          });
        } else {
          cells.push({
            id: `page-${cell}`,
            label: `Page ${cell}`,
            icon: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { "aria-hidden": true, children: cell }),
            onClick: () => goTo(cell),
            active: cell === currentPage
          });
        }
      });
      if (showPrevNext) {
        cells.push({
          id: "next",
          label: "Next page",
          icon: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(IconArrow, { direction: "right" }),
          onClick: () => goTo(currentPage + 1),
          disabled: !canNext
        });
      }
      if (showFirstLast) {
        cells.push({
          id: "last",
          label: "Last page",
          icon: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(IconArrow, { direction: "right", double: true }),
          onClick: () => goTo(safeTotal),
          disabled: !canNext
        });
      }
      return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
        "div",
        {
          style: {
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid var(--z-color-stroke200, #ebebeb)",
            borderRadius: "8px",
            overflow: "hidden",
            background: "var(--z-color-background0, #ffffff)"
          },
          children: cells.map((cell, index) => {
            const isLast = index === cells.length - 1;
            return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
              "button",
              {
                type: "button",
                "aria-label": cell.label,
                "aria-current": cell.active ? "page" : void 0,
                disabled: Boolean(cell.disabled || loading),
                onClick: cell.onClick,
                style: {
                  minWidth: "40px",
                  height: "32px",
                  border: "none",
                  borderRight: isLast ? "none" : "1px solid var(--z-color-stroke200, #ebebeb)",
                  background: cell.active ? "var(--z-color-background200, #f7f7f7)" : "var(--z-color-background0, #ffffff)",
                  color: cell.disabled || loading ? "var(--z-color-text300, #a3a3a3)" : "var(--z-color-muted, #5c5c5c)",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                  letterSpacing: "-0.006em",
                  padding: "6px",
                  cursor: cell.disabled || loading ? "default" : "pointer"
                },
                children: cell.icon
              },
              cell.id
            );
          })
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
      "nav",
      {
        className,
        "aria-label": ariaLabel,
        "aria-busy": loading || void 0,
        style: {
          display: "flex",
          alignItems: "center",
          gap: "24px",
          width: "100%",
          justifyContent: "space-between",
          opacity: loading ? 0.6 : 1,
          transition: "opacity 200ms ease",
          ...style
        },
        children: [
          showMeta ? /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
            "div",
            {
              style: {
                minWidth: "200px",
                padding: "6px 0",
                color: "var(--z-color-muted, #5c5c5c)",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "-0.006em"
              },
              children: [
                "Page ",
                currentPage,
                " of ",
                safeTotal
              ]
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { style: { minWidth: "200px" } }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
            "div",
            {
              style: {
                display: "flex",
                flex: "1 0 0",
                alignItems: "center",
                justifyContent: "center"
              },
              children: isGroup ? renderGroupCells() : renderLooseCells()
            }
          ),
          showPageSizeSelect ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { style: { minWidth: "200px", display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
            "label",
            {
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
                border: "1px solid var(--z-color-stroke200, #ebebeb)",
                borderRadius: "8px",
                background: "var(--z-color-background0, #ffffff)",
                boxShadow: "0 1px 2px rgba(10, 13, 20, 0.03)",
                padding: "6px 10px"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                  "select",
                  {
                    value: String(pageSize),
                    "aria-label": "Rows per page",
                    disabled: loading,
                    onChange: (event) => onPageSizeChange?.(Number(event.target.value)),
                    style: {
                      border: "none",
                      background: "transparent",
                      font: "inherit",
                      color: "var(--z-color-muted, #5c5c5c)",
                      fontSize: "14px",
                      lineHeight: "20px",
                      letterSpacing: "-0.006em",
                      outline: "none",
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      cursor: loading ? "default" : "pointer",
                      paddingRight: "14px"
                    },
                    children: pageSizeOptions.map((value) => /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("option", { value, children: [
                      value,
                      " / page"
                    ] }, value))
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                  "span",
                  {
                    "aria-hidden": true,
                    style: {
                      marginLeft: "-12px",
                      color: "var(--z-color-muted, #5c5c5c)",
                      fontSize: "14px"
                    },
                    children: "v"
                  }
                )
              ]
            }
          ) }) : /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { style: { minWidth: "200px" } })
        ]
      }
    );
  }

  // ../ui-react/src/molecules/CommandBar.tsx
  var import_jsx_runtime29 = __require("react/jsx-runtime");
  var spinnerStyle3 = {
    display: "inline-block",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    border: "2px solid var(--z-color-muted, #5c5c5c)",
    borderTopColor: "transparent",
    animation: "z-spin 0.7s linear infinite",
    flexShrink: 0
  };
  function CommandBar({ query, onQueryChange, actions, loading = false, className, style }) {
    function onSubmit(event) {
      event.preventDefault();
      if (actions[0] && !loading) {
        actions[0].onRun(query);
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_jsx_runtime29.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("style", { children: `@keyframes z-spin { to { transform: rotate(360deg); } }` }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
        "form",
        {
          onSubmit,
          className,
          style: {
            display: "flex",
            alignItems: "center",
            gap: "var(--z-space-2, 0.5rem)",
            ...style
          },
          "aria-busy": loading || void 0,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
              Input,
              {
                value: query,
                onChange: (event) => onQueryChange(event.target.value),
                disabled: loading
              }
            ),
            loading ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { "aria-label": "Running\u2026", style: { display: "flex", alignItems: "center", padding: "0 0.5rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { "aria-hidden": true, style: spinnerStyle3 }) }) : actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
              "button",
              {
                type: "button",
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--z-space-2, 0.5rem)",
                  paddingLeft: "var(--z-space-3, 0.75rem)",
                  paddingRight: "var(--z-space-3, 0.75rem)",
                  paddingTop: "var(--z-space-2, 0.5rem)",
                  paddingBottom: "var(--z-space-2, 0.5rem)",
                  borderRadius: "var(--z-radius-md, 0.5rem)",
                  border: "1px solid var(--z-color-border, #ebebeb)",
                  background: "var(--z-color-surface, #ffffff)",
                  color: "var(--z-color-text, #171717)",
                  fontSize: "14px",
                  cursor: "pointer"
                },
                onClick: () => action.onRun(query),
                children: [
                  action.icon,
                  action.label
                ]
              },
              action.id
            ))
          ]
        }
      )
    ] });
  }

  // ../ui-react/src/molecules/ButtonGroup.tsx
  var import_react17 = __require("react");
  var import_jsx_runtime30 = __require("react/jsx-runtime");
  var SIZE_TOKENS = {
    sm: {
      minHeight: "36px",
      padding: "8px 16px",
      borderRadius: "8px",
      fontSize: "14px",
      lineHeight: "20px"
    },
    xs: {
      minHeight: "32px",
      padding: "6px 14px",
      borderRadius: "8px",
      fontSize: "14px",
      lineHeight: "20px"
    },
    "2xs": {
      minHeight: "24px",
      padding: "4px 12px",
      borderRadius: "6px",
      fontSize: "12px",
      lineHeight: "16px"
    }
  };
  function clampIndex(index, quantity) {
    if (Number.isNaN(index)) return 0;
    return Math.max(0, Math.min(quantity - 1, index));
  }
  function ButtonGroup({
    quantity = 6,
    size = "sm",
    labels,
    value,
    defaultValue = 0,
    onValueChange,
    disabled = false,
    className,
    style,
    ariaLabel = "Button group"
  }) {
    const isControlled = typeof value === "number";
    const [internalValue, setInternalValue] = (0, import_react17.useState)(clampIndex(defaultValue, quantity));
    const selectedIndex = clampIndex(isControlled ? value : internalValue, quantity);
    const tokens = SIZE_TOKENS[size];
    const items = (0, import_react17.useMemo)(() => {
      const fallback = Array.from({ length: quantity }, (_, index) => `Button ${index + 1}`);
      if (!labels?.length) return fallback;
      return fallback.map((item, index) => labels[index] ?? item);
    }, [labels, quantity]);
    function updateValue(nextIndex) {
      if (disabled) return;
      if (!isControlled) {
        setInternalValue(nextIndex);
      }
      onValueChange?.(nextIndex);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      "div",
      {
        role: "group",
        "aria-label": ariaLabel,
        className,
        style: {
          display: "inline-flex",
          alignItems: "stretch",
          border: "1px solid var(--z-color-border, #ebebeb)",
          borderRadius: tokens.borderRadius,
          overflow: "hidden",
          background: "var(--z-color-surface, #ffffff)",
          ...style
        },
        children: items.map((label, index) => {
          const isActive = index === selectedIndex;
          return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
            "button",
            {
              type: "button",
              "aria-pressed": isActive,
              disabled,
              onClick: () => updateValue(index),
              style: {
                minHeight: tokens.minHeight,
                padding: tokens.padding,
                border: "none",
                borderRight: index === items.length - 1 ? "none" : "1px solid var(--z-color-border, #ebebeb)",
                background: isActive ? "var(--z-color-weak, var(--z-color-background, #f7f7f7))" : "var(--z-color-surface, #ffffff)",
                color: isActive ? "var(--z-color-text, #171717)" : "var(--z-color-muted, #5c5c5c)",
                fontSize: tokens.fontSize,
                lineHeight: tokens.lineHeight,
                fontWeight: 500,
                letterSpacing: size === "2xs" ? "0" : "-0.006em",
                whiteSpace: "nowrap",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
                transition: "background-color 140ms ease, color 140ms ease"
              },
              children: labels ? label : "Button"
            },
            `${label}-${index}`
          );
        })
      }
    );
  }

  // ../ui-react/src/molecules/RichEditor.tsx
  var import_jsx_runtime31 = __require("react/jsx-runtime");
  function iconLabel(action) {
    if (action === "bold") return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { style: { fontWeight: 700 }, children: "B" });
    if (action === "italic") return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { style: { fontStyle: "italic" }, children: "I" });
    if (action === "underline") return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { style: { textDecoration: "underline" }, children: "U" });
    if (action === "strikethrough") return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { style: { textDecoration: "line-through" }, children: "S" });
    if (action === "align") return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { style: { letterSpacing: "-0.04em" }, children: "|||" });
    if (action === "comment") return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { children: "( )" });
    if (action === "link") return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { children: "oo" });
    if (action === "mention") return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { children: "@" });
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { children: "..." });
  }
  function ItemButton({
    label,
    icon,
    dropdown = false,
    disabled = false,
    onClick
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
      "button",
      {
        type: "button",
        disabled,
        onClick,
        style: {
          border: 0,
          background: "var(--z-color-background0, #ffffff)",
          borderRadius: "6px",
          minHeight: "28px",
          padding: label ? "4px 4px 4px 10px" : "4px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          color: "var(--z-color-muted, #5c5c5c)",
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 500,
          letterSpacing: "-0.006em",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1
        },
        children: [
          label ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { children: label }) : null,
          icon ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
            "span",
            {
              "aria-hidden": true,
              style: {
                width: "20px",
                height: "20px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center"
              },
              children: icon
            }
          ) : null,
          dropdown ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
            "span",
            {
              "aria-hidden": true,
              style: {
                width: "20px",
                height: "20px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px"
              },
              children: "v"
            }
          ) : null
        ]
      }
    );
  }
  function Divider2() {
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      "span",
      {
        "aria-hidden": true,
        style: {
          width: "4px",
          height: "16px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          "span",
          {
            style: {
              width: "1px",
              height: "100%",
              background: "var(--z-color-stroke200, #ebebeb)"
            }
          }
        )
      }
    );
  }
  function RichEditor({
    variant = "01",
    showMore = true,
    headerLabel = "Header",
    fontSizeLabel = "14px",
    disabled = false,
    className,
    style,
    onAction
  }) {
    const is01 = variant === "01";
    const is02 = variant === "02";
    const is03 = variant === "03";
    const is04 = variant === "04";
    const quickTextTools = /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        ItemButton,
        {
          icon: iconLabel("bold"),
          disabled,
          onClick: () => onAction?.("bold")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        ItemButton,
        {
          icon: iconLabel("italic"),
          disabled,
          onClick: () => onAction?.("italic")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        ItemButton,
        {
          icon: iconLabel("underline"),
          disabled,
          onClick: () => onAction?.("underline")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        ItemButton,
        {
          icon: iconLabel("strikethrough"),
          disabled,
          onClick: () => onAction?.("strikethrough")
        }
      )
    ] });
    const socialTools = /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        ItemButton,
        {
          icon: iconLabel("comment"),
          disabled,
          onClick: () => onAction?.("comment")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        ItemButton,
        {
          icon: iconLabel("link"),
          disabled,
          onClick: () => onAction?.("link")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        ItemButton,
        {
          icon: iconLabel("mention"),
          disabled,
          onClick: () => onAction?.("mention")
        }
      )
    ] });
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
      "div",
      {
        className,
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "2px",
          padding: "2px",
          border: "1px solid var(--z-color-stroke200, #ebebeb)",
          borderRadius: "8px",
          background: "var(--z-color-background0, #ffffff)",
          boxShadow: "0 1px 2px rgba(10, 13, 20, 0.03)",
          overflow: "hidden",
          ...style
        },
        children: [
          is01 || is02 ? /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              ItemButton,
              {
                label: headerLabel,
                dropdown: true,
                disabled,
                onClick: () => onAction?.("header")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(Divider2, {}),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              ItemButton,
              {
                label: fontSizeLabel,
                dropdown: true,
                disabled,
                onClick: () => onAction?.("font-size")
              }
            )
          ] }) : null,
          is01 ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(Divider2, {}) : null,
          is01 ? quickTextTools : null,
          is03 ? quickTextTools : null,
          is01 || is03 ? /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(Divider2, {}),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              ItemButton,
              {
                icon: iconLabel("align"),
                dropdown: true,
                disabled,
                onClick: () => onAction?.("align")
              }
            )
          ] }) : null,
          is01 || is04 ? socialTools : null,
          showMore && (is01 || is02 || is03 || is04) ? /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(Divider2, {}),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              ItemButton,
              {
                icon: iconLabel("more"),
                disabled,
                onClick: () => onAction?.("more")
              }
            )
          ] }) : null
        ]
      }
    );
  }

  // ../ui-react/src/molecules/Tooltip.tsx
  var import_react18 = __require("react");
  var import_jsx_runtime32 = __require("react/jsx-runtime");
  function bubblePlacement(side, align, gap) {
    if (side === "top") {
      return {
        bottom: `calc(100% + ${gap}px)`,
        left: align === "start" ? "0%" : align === "end" ? "100%" : "50%",
        transform: align === "start" ? "translateX(0)" : align === "end" ? "translateX(-100%)" : "translateX(-50%)"
      };
    }
    if (side === "bottom") {
      return {
        top: `calc(100% + ${gap}px)`,
        left: align === "start" ? "0%" : align === "end" ? "100%" : "50%",
        transform: align === "start" ? "translateX(0)" : align === "end" ? "translateX(-100%)" : "translateX(-50%)"
      };
    }
    if (side === "left") {
      return {
        right: `calc(100% + ${gap}px)`,
        top: align === "start" ? "0%" : align === "end" ? "100%" : "50%",
        transform: align === "start" ? "translateY(0)" : align === "end" ? "translateY(-100%)" : "translateY(-50%)"
      };
    }
    return {
      left: `calc(100% + ${gap}px)`,
      top: align === "start" ? "0%" : align === "end" ? "100%" : "50%",
      transform: align === "start" ? "translateY(0)" : align === "end" ? "translateY(-100%)" : "translateY(-50%)"
    };
  }
  function tailPlacement(side, align, sizePx) {
    const crossPosition = align === "start" ? "14px" : align === "end" ? "calc(100% - 14px)" : "50%";
    const half = `${Math.floor(sizePx / 2)}px`;
    if (side === "top") {
      return {
        left: crossPosition,
        top: "100%",
        marginTop: `-${half}`,
        transform: align === "center" ? "translateX(-50%) rotate(45deg)" : "rotate(45deg)"
      };
    }
    if (side === "bottom") {
      return {
        left: crossPosition,
        bottom: "100%",
        marginBottom: `-${half}`,
        transform: align === "center" ? "translateX(-50%) rotate(45deg)" : "rotate(45deg)"
      };
    }
    if (side === "left") {
      return {
        top: crossPosition,
        left: "100%",
        marginLeft: `-${half}`,
        transform: align === "center" ? "translateY(-50%) rotate(45deg)" : "rotate(45deg)"
      };
    }
    return {
      top: crossPosition,
      right: "100%",
      marginRight: `-${half}`,
      transform: align === "center" ? "translateY(-50%) rotate(45deg)" : "rotate(45deg)"
    };
  }
  function Tooltip({
    content,
    description,
    children,
    side = "top",
    align = "center",
    delayMs = 300,
    variant = "dark",
    size = "xs",
    showTail = true,
    showIcon = false,
    dismissible = false,
    open,
    className,
    style
  }) {
    const [hoverVisible, setHoverVisible] = (0, import_react18.useState)(false);
    const timerRef = (0, import_react18.useRef)(null);
    const id = (0, import_react18.useId)();
    const isControlled = typeof open === "boolean";
    const visible = isControlled ? open : hoverVisible;
    const isLarge = size === "lg";
    const showCompactMeta = !isLarge && (showIcon || dismissible);
    function show() {
      if (isControlled) return;
      timerRef.current = setTimeout(() => setHoverVisible(true), delayMs);
    }
    function hide() {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (isControlled) return;
      setHoverVisible(false);
    }
    (0, import_react18.useEffect)(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);
    const gap = size === "2xs" ? 4 : 6;
    const tailSize = size === "2xs" ? 8 : 10;
    const palette = variant === "dark" ? {
      background: "var(--z-color-text, #171717)",
      text: "var(--z-color-staticWhite, #ffffff)",
      subText: "var(--z-color-text300, #a3a3a3)",
      border: "transparent"
    } : {
      background: "var(--z-color-surface, #ffffff)",
      text: "var(--z-color-text, #171717)",
      subText: "var(--z-color-muted, #5c5c5c)",
      border: "var(--z-color-border, #ebebeb)"
    };
    const sizeStyle = size === "2xs" ? {
      padding: "2px 6px",
      borderRadius: "4px",
      fontSize: "12px",
      lineHeight: "16px"
    } : size === "xs" ? {
      padding: "4px 10px",
      borderRadius: "6px",
      fontSize: "14px",
      lineHeight: "20px"
    } : {
      padding: "12px",
      borderRadius: "12px",
      width: "280px",
      fontSize: "14px",
      lineHeight: "20px"
    };
    const tipStyle = {
      position: "absolute",
      zIndex: 500,
      whiteSpace: size === "lg" ? "normal" : "nowrap",
      pointerEvents: visible ? "auto" : "none",
      background: palette.background,
      color: palette.text,
      border: `1px solid ${palette.border}`,
      boxShadow: "0 12px 24px rgba(14, 18, 27, 0.06), 0 1px 2px rgba(14, 18, 27, 0.03)",
      opacity: visible ? 1 : 0,
      transition: "opacity 120ms ease",
      ...sizeStyle,
      ...bubblePlacement(side, align, gap)
    };
    const caretStyle = {
      position: "absolute",
      width: `${tailSize}px`,
      height: `${tailSize}px`,
      background: palette.background,
      border: `1px solid ${palette.border}`,
      ...tailPlacement(side, align, tailSize)
    };
    return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
      "span",
      {
        className,
        style: { position: "relative", display: "inline-flex", ...style },
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("span", { "aria-describedby": visible ? id : void 0, style: { display: "inherit" }, children }),
          /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("span", { id, role: "tooltip", "aria-hidden": !visible, style: tipStyle, children: [
            showTail ? /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("span", { "aria-hidden": true, style: caretStyle }) : null,
            isLarge ? /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("span", { style: { display: "flex", alignItems: "flex-start", gap: "12px" }, children: [
              showIcon ? /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
                "span",
                {
                  "aria-hidden": true,
                  style: {
                    width: "20px",
                    minWidth: "20px",
                    height: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    lineHeight: 1,
                    opacity: 0.9
                  },
                  children: "+"
                }
              ) : null,
              /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("span", { style: { display: "grid", gap: "4px", flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("span", { style: { fontSize: "14px", lineHeight: "20px", fontWeight: 500 }, children: content }),
                description ? /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("span", { style: { fontSize: "12px", lineHeight: "16px", color: palette.subText }, children: description }) : null
              ] }),
              dismissible ? /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
                "span",
                {
                  "aria-hidden": true,
                  style: {
                    width: "20px",
                    minWidth: "20px",
                    height: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    lineHeight: 1,
                    opacity: 0.8
                  },
                  children: "x"
                }
              ) : null
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
              "span",
              {
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                },
                children: [
                  showCompactMeta && showIcon ? /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
                    "span",
                    {
                      "aria-hidden": true,
                      style: {
                        width: "12px",
                        height: "12px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        lineHeight: 1,
                        opacity: 0.85
                      },
                      children: "\u2022"
                    }
                  ) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("span", { children: content }),
                  showCompactMeta && dismissible ? /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
                    "span",
                    {
                      "aria-hidden": true,
                      style: {
                        width: "12px",
                        height: "12px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        lineHeight: 1,
                        opacity: 0.85
                      },
                      children: "x"
                    }
                  ) : null
                ]
              }
            )
          ] })
        ]
      }
    );
  }

  // ../ui-react/src/molecules/Popover.tsx
  var import_react19 = __require("react");
  var import_jsx_runtime33 = __require("react/jsx-runtime");
  function Popover({
    trigger,
    children,
    side = "bottom",
    align = "start",
    open: controlledOpen,
    onOpenChange,
    width = 280,
    className,
    style
  }) {
    const [internalOpen, setInternalOpen] = (0, import_react19.useState)(false);
    const isControlled = controlledOpen !== void 0;
    const open = isControlled ? controlledOpen : internalOpen;
    const id = (0, import_react19.useId)();
    const wrapRef = (0, import_react19.useRef)(null);
    function toggle() {
      const next = !open;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    }
    function close() {
      if (!isControlled) setInternalOpen(false);
      onOpenChange?.(false);
    }
    (0, import_react19.useEffect)(() => {
      if (!open) return;
      function onPointerDown(e) {
        if (!wrapRef.current?.contains(e.target)) close();
      }
      document.addEventListener("pointerdown", onPointerDown);
      return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);
    (0, import_react19.useEffect)(() => {
      if (!open) return;
      function onKey(e) {
        if (e.key === "Escape") close();
      }
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [open]);
    const panelStyle2 = {
      position: "absolute",
      zIndex: 400,
      minWidth: typeof width === "number" ? `${width}px` : width,
      background: "var(--z-color-surface, #ffffff)",
      border: "1px solid var(--z-color-border, #ebebeb)",
      borderRadius: "var(--z-radius-md, 10px)",
      boxShadow: "0 8px 24px rgba(14,18,27,0.12), 0 2px 6px rgba(14,18,27,0.06)",
      padding: "var(--z-space-3, 0.75rem)",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
      transform: open ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.97)",
      transformOrigin: "top left",
      transition: "opacity 150ms ease, transform 150ms ease",
      ...side === "bottom" && { top: "calc(100% + 6px)" },
      ...side === "top" && { bottom: "calc(100% + 6px)" },
      ...side === "left" && { right: "calc(100% + 6px)", top: 0 },
      ...side === "right" && { left: "calc(100% + 6px)", top: 0 },
      ...align === "start" && side !== "left" && side !== "right" && { left: 0 },
      ...align === "end" && side !== "left" && side !== "right" && { right: 0 },
      ...align === "center" && side !== "left" && side !== "right" && {
        left: "50%",
        transform: `translateX(-50%) ${open ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.97)"}`
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
      "div",
      {
        ref: wrapRef,
        className,
        style: { position: "relative", display: "inline-block", ...style },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            "span",
            {
              "aria-haspopup": "dialog",
              "aria-expanded": open,
              "aria-controls": id,
              onClick: toggle,
              style: { cursor: "pointer", display: "inline-flex" },
              children: trigger
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            "div",
            {
              id,
              role: "dialog",
              "aria-modal": "false",
              style: panelStyle2,
              children
            }
          )
        ]
      }
    );
  }

  // ../ui-react/src/molecules/ComboBox.tsx
  var import_react20 = __require("react");
  var import_jsx_runtime34 = __require("react/jsx-runtime");
  function ComboBox({
    options,
    value: controlledValue,
    defaultValue = "",
    placeholder = "Search\u2026",
    label,
    disabled = false,
    allowCustomValue = false,
    onChange,
    onInputChange,
    loading = false,
    emptyMessage = "No results found",
    className,
    style
  }) {
    const [internalValue, setInternalValue] = (0, import_react20.useState)(defaultValue);
    const isControlled = controlledValue !== void 0;
    const selectedValue = isControlled ? controlledValue : internalValue;
    const [query, setQuery] = (0, import_react20.useState)(
      () => options.find((o) => o.value === selectedValue)?.label ?? selectedValue
    );
    const [open, setOpen] = (0, import_react20.useState)(false);
    const [activeIndex, setActiveIndex] = (0, import_react20.useState)(-1);
    const inputRef = (0, import_react20.useRef)(null);
    const listRef = (0, import_react20.useRef)(null);
    const wrapRef = (0, import_react20.useRef)(null);
    const listId = (0, import_react20.useId)();
    const optionIdPrefix = (0, import_react20.useId)();
    const filtered = options.filter(
      (o) => !query || o.label.toLowerCase().includes(query.toLowerCase())
    );
    function selectOption(opt) {
      if (opt.disabled) return;
      setQuery(opt.label);
      setOpen(false);
      setActiveIndex(-1);
      if (!isControlled) setInternalValue(opt.value);
      onChange?.(opt.value);
    }
    function handleInputChange(e) {
      const v = e.target.value;
      setQuery(v);
      setOpen(true);
      setActiveIndex(-1);
      onInputChange?.(v);
      if (allowCustomValue) {
        if (!isControlled) setInternalValue(v);
        onChange?.(v);
      }
    }
    function handleKey(e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === "Enter") {
        if (activeIndex >= 0 && filtered[activeIndex]) {
          e.preventDefault();
          selectOption(filtered[activeIndex]);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    (0, import_react20.useEffect)(() => {
      if (!listRef.current || activeIndex < 0) return;
      const item = listRef.current.children[activeIndex];
      item?.scrollIntoView?.({ block: "nearest" });
    }, [activeIndex]);
    (0, import_react20.useEffect)(() => {
      if (!open) return;
      function onPD(e) {
        if (!wrapRef.current?.contains(e.target)) setOpen(false);
      }
      document.addEventListener("pointerdown", onPD);
      return () => document.removeEventListener("pointerdown", onPD);
    }, [open]);
    const inputStyle = {
      width: "100%",
      height: 38,
      padding: "0 var(--z-space-3, 0.75rem)",
      fontSize: "var(--z-type-size-sm, 0.875rem)",
      color: "var(--z-color-text, #171717)",
      background: "var(--z-color-surface, #ffffff)",
      border: "1px solid var(--z-color-border, #ebebeb)",
      borderRadius: "var(--z-radius-md, 8px)",
      outline: "none",
      boxSizing: "border-box",
      cursor: disabled ? "not-allowed" : "text",
      opacity: disabled ? 0.5 : 1
    };
    return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
      "div",
      {
        ref: wrapRef,
        className,
        style: { position: "relative", display: "flex", flexDirection: "column", ...style },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
            "input",
            {
              ref: inputRef,
              role: "combobox",
              "aria-autocomplete": "list",
              "aria-expanded": open,
              "aria-controls": open ? listId : void 0,
              "aria-activedescendant": activeIndex >= 0 ? `${optionIdPrefix}-${activeIndex}` : void 0,
              "aria-label": label ?? placeholder,
              disabled,
              value: query,
              placeholder,
              onChange: handleInputChange,
              onFocus: () => setOpen(true),
              onKeyDown: handleKey,
              autoComplete: "off",
              style: inputStyle
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
            "span",
            {
              "aria-hidden": true,
              style: {
                position: "absolute",
                right: "var(--z-space-3, 0.75rem)",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "var(--z-color-muted, #737373)",
                fontSize: 12,
                lineHeight: 1
              },
              children: open ? "\u25B2" : "\u25BC"
            }
          ),
          open && /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
            "ul",
            {
              ref: listRef,
              id: listId,
              role: "listbox",
              "aria-label": label ?? "Options",
              style: {
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                right: 0,
                zIndex: 300,
                background: "var(--z-color-surface, #ffffff)",
                border: "1px solid var(--z-color-border, #ebebeb)",
                borderRadius: "var(--z-radius-md, 10px)",
                boxShadow: "0 8px 24px rgba(14,18,27,0.12)",
                padding: "var(--z-space-1, 0.25rem)",
                maxHeight: "240px",
                overflowY: "auto",
                listStyle: "none",
                margin: 0
              },
              children: [
                loading && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("li", { "aria-live": "polite", style: { padding: "var(--z-space-2, 0.5rem) var(--z-space-3, 0.75rem)", color: "var(--z-color-muted, #737373)", fontSize: 14 }, children: "Loading\u2026" }),
                !loading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("li", { style: { padding: "var(--z-space-2, 0.5rem) var(--z-space-3, 0.75rem)", color: "var(--z-color-muted, #737373)", fontSize: 14 }, children: emptyMessage }),
                !loading && filtered.map((opt, i) => {
                  const isActive = i === activeIndex;
                  const isSelected = opt.value === selectedValue;
                  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
                    "li",
                    {
                      id: `${optionIdPrefix}-${i}`,
                      role: "option",
                      "aria-selected": isSelected,
                      "aria-disabled": opt.disabled,
                      onClick: () => selectOption(opt),
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        padding: "var(--z-space-2, 0.5rem) var(--z-space-3, 0.75rem)",
                        borderRadius: "var(--z-radius-sm, 6px)",
                        cursor: opt.disabled ? "not-allowed" : "pointer",
                        background: isActive ? "var(--z-color-weak, #f5f5f5)" : isSelected ? "var(--z-color-primary, #335cff)14" : "transparent",
                        color: opt.disabled ? "var(--z-color-muted, #737373)" : "var(--z-color-text, #171717)",
                        fontSize: 14,
                        lineHeight: "20px",
                        outline: "none"
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("span", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { children: opt.label }),
                          isSelected && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { "aria-hidden": true, style: { fontSize: 12 }, children: "\u2713" })
                        ] }),
                        opt.description && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { style: { fontSize: 12, color: "var(--z-color-muted, #737373)" }, children: opt.description })
                      ]
                    },
                    opt.value
                  );
                })
              ]
            }
          )
        ]
      }
    );
  }

  // ../ui-react/src/molecules/NumberInput.tsx
  var import_react21 = __require("react");
  var import_jsx_runtime35 = __require("react/jsx-runtime");
  function NumberInput({
    value: controlledValue,
    defaultValue = 0,
    min,
    max,
    step = 1,
    disabled = false,
    placeholder = "0",
    label,
    formatValue = false,
    onChange,
    className,
    style
  }) {
    const [internalValue, setInternalValue] = (0, import_react21.useState)(defaultValue);
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const [focused, setFocused] = (0, import_react21.useState)(false);
    const inputRef = (0, import_react21.useRef)(null);
    function clamp3(v) {
      let n = v;
      if (min !== void 0) n = Math.max(min, n);
      if (max !== void 0) n = Math.min(max, n);
      return n;
    }
    function commit(next) {
      const clamped = clamp3(next);
      if (!isControlled) setInternalValue(clamped);
      onChange?.(clamped);
    }
    function handleChange(e) {
      const parsed = parseFloat(e.target.value);
      if (!Number.isNaN(parsed)) commit(parsed);
      else if (e.target.value === "" || e.target.value === "-") {
        if (!isControlled) setInternalValue(0);
      }
    }
    function handleKey(e) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        commit(value + step);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        commit(value - step);
      }
    }
    const displayValue = focused ? String(value) : formatValue ? value.toLocaleString() : String(value);
    const borderColor = focused ? "var(--z-color-primary, #335cff)" : "var(--z-color-border, #ebebeb)";
    const btnStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      flexShrink: 0,
      background: "var(--z-color-weak, #f7f7f7)",
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      color: "var(--z-color-text, #171717)",
      fontSize: 16,
      lineHeight: 1
    };
    return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
      "div",
      {
        className,
        style: {
          display: "flex",
          alignItems: "stretch",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--z-radius-md, 8px)",
          overflow: "hidden",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color 120ms ease",
          ...style
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
            "button",
            {
              type: "button",
              "aria-label": "Decrease",
              disabled: disabled || min !== void 0 && value <= min,
              onClick: () => commit(value - step),
              style: { ...btnStyle, borderRight: "1px solid var(--z-color-border, #ebebeb)" },
              children: "\u2212"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
            "input",
            {
              ref: inputRef,
              type: "number",
              "aria-label": label ?? "Number input",
              value: displayValue,
              min,
              max,
              step,
              disabled,
              placeholder,
              onFocus: (event) => setFocused(event.currentTarget.matches(":focus-visible")),
              onBlur: () => setFocused(false),
              onChange: handleChange,
              onKeyDown: handleKey,
              style: {
                flex: 1,
                textAlign: "center",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "var(--z-type-size-sm, 0.875rem)",
                color: "var(--z-color-text, #171717)",
                fontVariantNumeric: "tabular-nums",
                minWidth: 0,
                padding: "0 var(--z-space-2, 0.5rem)"
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
            "button",
            {
              type: "button",
              "aria-label": "Increase",
              disabled: disabled || max !== void 0 && value >= max,
              onClick: () => commit(value + step),
              style: { ...btnStyle, borderLeft: "1px solid var(--z-color-border, #ebebeb)" },
              children: "+"
            }
          )
        ]
      }
    );
  }

  // ../ui-react/src/molecules/TagInput.tsx
  var import_react22 = __require("react");
  var import_jsx_runtime36 = __require("react/jsx-runtime");
  function TagInput({
    value: controlledTags,
    defaultValue = [],
    placeholder = "Add tag\u2026",
    label,
    disabled = false,
    maxTags,
    validate,
    onChange,
    className,
    style
  }) {
    const [internalTags, setInternalTags] = (0, import_react22.useState)(defaultValue);
    const isControlled = controlledTags !== void 0;
    const tags = isControlled ? controlledTags : internalTags;
    const [inputValue, setInputValue] = (0, import_react22.useState)("");
    const [focused, setFocused] = (0, import_react22.useState)(false);
    const inputRef = (0, import_react22.useRef)(null);
    const id = (0, import_react22.useId)();
    function addTag(raw) {
      const tag = raw.trim();
      if (!tag) return;
      if (tags.includes(tag)) {
        setInputValue("");
        return;
      }
      if (maxTags !== void 0 && tags.length >= maxTags) return;
      if (validate && !validate(tag)) return;
      const next = [...tags, tag];
      if (!isControlled) setInternalTags(next);
      onChange?.(next);
      setInputValue("");
    }
    function removeTag(index) {
      const next = tags.filter((_, i) => i !== index);
      if (!isControlled) setInternalTags(next);
      onChange?.(next);
    }
    function handleKey(e) {
      if ((e.key === "Enter" || e.key === ",") && inputValue) {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    }
    const borderColor = focused ? "var(--z-color-primary, #335cff)" : "var(--z-color-border, #ebebeb)";
    return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
      "div",
      {
        id,
        className,
        onClick: () => inputRef.current?.focus(),
        style: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "var(--z-space-1, 0.25rem)",
          minHeight: 40,
          padding: "var(--z-space-1, 0.25rem) var(--z-space-2, 0.5rem)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--z-radius-md, 8px)",
          background: "var(--z-color-surface, #ffffff)",
          cursor: disabled ? "not-allowed" : "text",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color 120ms ease",
          ...style
        },
        children: [
          tags.map((tag, i) => /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
            "span",
            {
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "2px var(--z-space-2, 0.5rem)",
                borderRadius: "var(--z-radius-pill, 9999px)",
                background: "var(--z-color-primary, #335cff)18",
                color: "var(--z-color-primary, #335cff)",
                fontSize: "var(--z-type-size-xs, 0.75rem)",
                fontWeight: "var(--z-type-weight-medium, 500)",
                lineHeight: "20px"
              },
              children: [
                tag,
                !disabled && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Remove ${tag}`,
                    onClick: (e) => {
                      e.stopPropagation();
                      removeTag(i);
                    },
                    style: {
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      color: "inherit",
                      fontSize: 14,
                      lineHeight: 1,
                      display: "inline-flex",
                      alignItems: "center"
                    },
                    children: "\xD7"
                  }
                )
              ]
            },
            `${tag}-${i}`
          )),
          /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
            "input",
            {
              ref: inputRef,
              "aria-label": label ?? "Tag input",
              disabled,
              value: inputValue,
              placeholder: tags.length === 0 ? placeholder : "",
              onChange: (e) => setInputValue(e.target.value),
              onKeyDown: handleKey,
              onBlur: (e) => {
                setFocused(false);
                addTag(e.target.value);
              },
              onFocus: (event) => setFocused(event.currentTarget.matches(":focus-visible")),
              style: {
                flex: "1 1 80px",
                minWidth: 80,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "var(--z-type-size-sm, 0.875rem)",
                color: "var(--z-color-text, #171717)",
                padding: "0 var(--z-space-1, 0.25rem)"
              }
            }
          )
        ]
      }
    );
  }

  // ../ui-react/src/organisms/Navbar.tsx
  var import_jsx_runtime37 = __require("react/jsx-runtime");
  function Navbar({ brand, links, activeLinkId, actions, className, style }) {
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
      "nav",
      {
        className,
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "56px",
          padding: "0.5rem 0.75rem",
          borderBottom: "1px solid var(--z-color-border, #ebebeb)",
          background: "var(--z-color-surface, #ffffff)",
          ...style
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "var(--z-space-3, 0.75rem)",
                minWidth: "180px"
              },
              children: brand
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
            "ul",
            {
              "aria-label": "Primary navigation",
              style: {
                display: "flex",
                alignItems: "center",
                gap: "var(--z-space-2, 0.5rem)",
                listStyle: "none",
                margin: 0,
                padding: 0
              },
              children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
                "a",
                {
                  href: link.href,
                  style: {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "32px",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    border: activeLinkId === link.id ? "1px solid var(--z-color-border, #ebebeb)" : "1px solid transparent",
                    background: activeLinkId === link.id ? "var(--z-color-weak, var(--z-color-background, #f7f7f7))" : "transparent",
                    color: activeLinkId === link.id ? "var(--z-color-text, #171717)" : "var(--z-color-muted, #5c5c5c)",
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.006em",
                    fontWeight: activeLinkId === link.id ? 600 : 500
                  },
                  children: link.label
                }
              ) }, link.id))
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { style: { display: "flex", alignItems: "center", gap: "var(--z-space-2, 0.5rem)" }, children: actions })
        ]
      }
    );
  }

  // ../ui-react/src/organisms/Header.tsx
  var import_react23 = __require("react");
  var import_jsx_runtime38 = __require("react/jsx-runtime");
  function Header({ title, subtitle, actions, className, style, level = 2 }) {
    const headingTag = `h${level}`;
    return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
      "header",
      {
        className,
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--z-space-4, 1rem)",
          border: "1px solid var(--z-color-border, #ebebeb)",
          background: "var(--z-color-surface, #ffffff)",
          ...style
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
            (0, import_react23.createElement)(
              headingTag,
              {
                style: {
                  fontSize: "var(--z-type-size-2xl, 1.5rem)",
                  fontWeight: "var(--z-type-weight-bold, 700)",
                  color: "var(--z-color-text, #171717)",
                  margin: 0
                }
              },
              title
            ),
            subtitle ? /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
              "p",
              {
                style: {
                  color: "var(--z-color-muted, #5c5c5c)",
                  fontSize: "var(--z-type-size-sm, 0.875rem)",
                  margin: "0.25rem 0 0"
                },
                children: subtitle
              }
            ) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "var(--z-space-2, 0.5rem)"
              },
              children: actions
            }
          )
        ]
      }
    );
  }

  // ../ui-react/src/organisms/SidebarNav.tsx
  var import_jsx_runtime39 = __require("react/jsx-runtime");
  var shimmerStyle = {
    height: "14px",
    borderRadius: "6px",
    background: "linear-gradient(90deg, var(--z-color-weak,#f0f0f0) 25%, var(--z-color-border,#ebebeb) 50%, var(--z-color-weak,#f0f0f0) 75%)",
    backgroundSize: "200% 100%",
    animation: "z-shimmer 1.4s ease-in-out infinite"
  };
  function SkeletonNav() {
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_jsx_runtime39.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("style", { children: `@keyframes z-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }` }),
      [1, 2].map((sectionIdx) => /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { style: { marginBottom: "var(--z-space-4, 1rem)" }, "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", { style: { ...shimmerStyle, width: "40%", marginBottom: "var(--z-space-2, 0.5rem)" } }),
        [1, 2, 3].map((itemIdx) => /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          "div",
          {
            style: {
              ...shimmerStyle,
              width: `${50 + (sectionIdx * 17 + itemIdx * 23) % 35}%`,
              height: "32px",
              marginBottom: "var(--z-space-1, 0.25rem)",
              borderRadius: "var(--z-radius-md, 0.5rem)"
            }
          },
          itemIdx
        ))
      ] }, sectionIdx))
    ] });
  }
  function SidebarNav({ sections, loading = false, emptyState, className, style }) {
    const isEmpty = !loading && sections.length === 0;
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
      "aside",
      {
        className,
        "aria-busy": loading || void 0,
        style: {
          padding: "var(--z-space-4, 1rem)",
          border: "1px solid var(--z-color-border, #ebebeb)",
          background: "var(--z-color-surface, #ffffff)",
          ...style
        },
        children: loading ? /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(SkeletonNav, {}) : isEmpty ? emptyState ?? /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          "p",
          {
            style: {
              padding: "var(--z-space-4, 1rem)",
              textAlign: "center",
              color: "var(--z-color-muted, #5c5c5c)",
              fontSize: "var(--z-type-size-sm, 0.875rem)",
              margin: 0
            },
            children: "No navigation items."
          }
        ) : sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("section", { style: { marginBottom: "var(--z-space-4, 1rem)" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
            "h2",
            {
              style: {
                fontSize: "var(--z-type-size-sm, 0.875rem)",
                fontWeight: "var(--z-type-weight-semibold, 600)",
                color: "var(--z-color-muted, #5c5c5c)",
                margin: "0 0 var(--z-space-2, 0.5rem)"
              },
              children: section.title
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
            "ul",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "var(--z-space-1, 0.25rem)",
                listStyle: "none",
                margin: 0,
                padding: 0
              },
              children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
                "a",
                {
                  href: item.href,
                  style: {
                    display: "block",
                    paddingTop: "var(--z-space-2, 0.5rem)",
                    paddingBottom: "var(--z-space-2, 0.5rem)",
                    paddingLeft: "var(--z-space-3, 0.75rem)",
                    paddingRight: "var(--z-space-3, 0.75rem)",
                    borderRadius: "var(--z-radius-md, 0.5rem)",
                    border: item.active ? "1px solid var(--z-color-primary, #335cff)" : "1px solid var(--z-color-border, #ebebeb)",
                    background: item.active ? "var(--z-color-primary, #335cff)" : "var(--z-color-surface, #ffffff)",
                    color: item.active ? "var(--z-color-primaryContrast, #ffffff)" : "var(--z-color-text, #171717)",
                    textDecoration: "none",
                    fontSize: "14px"
                  },
                  children: item.label
                }
              ) }, item.id))
            }
          )
        ] }, section.id))
      }
    );
  }

  // ../ui-react/src/organisms/DataTable.tsx
  var import_jsx_runtime40 = __require("react/jsx-runtime");
  var shimmerStyle2 = {
    height: "14px",
    borderRadius: "6px",
    background: "linear-gradient(90deg, var(--z-color-weak,#f0f0f0) 25%, var(--z-color-border,#ebebeb) 50%, var(--z-color-weak,#f0f0f0) 75%)",
    backgroundSize: "200% 100%",
    animation: "z-shimmer 1.4s ease-in-out infinite"
  };
  function SkeletonRows({ columns, rows = 5 }) {
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_jsx_runtime40.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("style", { children: `@keyframes z-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }` }),
      Array.from({ length: rows }).map((_, rowIdx) => (
        // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("tr", { "aria-hidden": "true", children: Array.from({ length: columns }).map((__, colIdx) => (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
            "td",
            {
              style: {
                paddingLeft: "var(--z-space-3, 0.75rem)",
                paddingRight: "var(--z-space-3, 0.75rem)",
                paddingTop: "var(--z-space-2, 0.5rem)",
                paddingBottom: "var(--z-space-2, 0.5rem)",
                borderBottom: "1px solid var(--z-color-border, #ebebeb)"
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { style: { ...shimmerStyle2, width: `${55 + (rowIdx * 7 + colIdx * 13) % 30}%` } })
            },
            colIdx
          )
        )) }, rowIdx)
      ))
    ] });
  }
  function DefaultEmptyState({ colSpan }) {
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      "td",
      {
        colSpan,
        style: {
          padding: "2.5rem 1rem",
          textAlign: "center",
          color: "var(--z-color-muted, #5c5c5c)",
          fontSize: "var(--z-type-size-sm, 0.875rem)"
        },
        children: "No data to display."
      }
    ) });
  }
  function DataTable({ data, columns, rowKey, loading = false, emptyState, className, style }) {
    const cellStyle = {
      paddingLeft: "var(--z-space-3, 0.75rem)",
      paddingRight: "var(--z-space-3, 0.75rem)",
      paddingTop: "var(--z-space-2, 0.5rem)",
      paddingBottom: "var(--z-space-2, 0.5rem)",
      borderBottom: "1px solid var(--z-color-border, #ebebeb)"
    };
    const isEmpty = !loading && data.length === 0;
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      "div",
      {
        className,
        style: {
          border: "1px solid var(--z-color-border, #ebebeb)",
          borderRadius: "var(--z-radius-md, 0.5rem)",
          background: "var(--z-color-surface, #ffffff)",
          overflow: "hidden",
          ...style
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("table", { style: { width: "100%", borderCollapse: "collapse" }, "aria-busy": loading || void 0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("tr", { children: columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
            "th",
            {
              style: {
                ...cellStyle,
                textAlign: "left",
                fontSize: "var(--z-type-size-sm, 0.875rem)",
                color: "var(--z-color-muted, #5c5c5c)"
              },
              children: column.header
            },
            column.id
          )) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("tbody", { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(SkeletonRows, { columns: columns.length }) : isEmpty ? emptyState ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("td", { colSpan: columns.length, children: emptyState }) }) : /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(DefaultEmptyState, { colSpan: columns.length }) : data.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("tr", { children: columns.map((column) => {
            const value = column.accessor ? row[column.accessor] : null;
            return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
              "td",
              {
                style: {
                  ...cellStyle,
                  color: "var(--z-color-text, #171717)"
                },
                children: column.render ? column.render(row) : value
              },
              column.id
            );
          }) }, rowKey(row, index))) })
        ] })
      }
    );
  }

  // ../ui-react/src/organisms/SearchResultsPanel.tsx
  var import_jsx_runtime41 = __require("react/jsx-runtime");
  var shimmerStyle3 = {
    height: "12px",
    borderRadius: "6px",
    background: "linear-gradient(90deg, var(--z-color-weak,#f0f0f0) 25%, var(--z-color-border,#ebebeb) 50%, var(--z-color-weak,#f0f0f0) 75%)",
    backgroundSize: "200% 100%",
    animation: "z-shimmer 1.4s ease-in-out infinite",
    marginBottom: "6px"
  };
  function SkeletonResults() {
    return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(import_jsx_runtime41.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("style", { children: `@keyframes z-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }` }),
      [70, 50, 85, 60].map((w, i) => (
        // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("li", { "aria-hidden": "true", style: { padding: "0.75rem 0.75rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("div", { style: { ...shimmerStyle3, width: `${w}%` } }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("div", { style: { ...shimmerStyle3, width: `${w - 20}%`, opacity: 0.6 } })
        ] }, i)
      ))
    ] });
  }
  function SearchResultsPanel({
    query,
    results,
    loading = false,
    emptyState,
    className,
    style
  }) {
    const isEmpty = !loading && results.length === 0;
    return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
      "section",
      {
        className,
        style: {
          border: "1px solid var(--z-color-border, #ebebeb)",
          borderRadius: "var(--z-radius-md, 0.5rem)",
          background: "var(--z-color-surface, #ffffff)",
          overflow: "hidden",
          ...style
        },
        "aria-busy": loading || void 0,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
            "header",
            {
              style: {
                paddingLeft: "var(--z-space-3, 0.75rem)",
                paddingRight: "var(--z-space-3, 0.75rem)",
                paddingTop: "var(--z-space-2, 0.5rem)",
                paddingBottom: "var(--z-space-2, 0.5rem)",
                borderBottom: "1px solid var(--z-color-border, #ebebeb)",
                fontSize: "var(--z-type-size-sm, 0.875rem)",
                color: "var(--z-color-muted, #5c5c5c)"
              },
              children: loading ? `Searching for "${query}"\u2026` : `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("ul", { style: { listStyle: "none", margin: 0, padding: 0 }, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(SkeletonResults, {}) : isEmpty ? /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("li", { children: emptyState ?? /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
            "div",
            {
              style: {
                padding: "2rem 0.75rem",
                textAlign: "center",
                fontSize: "var(--z-type-size-sm, 0.875rem)",
                color: "var(--z-color-muted, #5c5c5c)"
              },
              children: [
                "No results for \u201C",
                query,
                "\u201D."
              ]
            }
          ) }) : results.map((result) => /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
            "button",
            {
              type: "button",
              onClick: result.onSelect,
              style: {
                width: "100%",
                textAlign: "left",
                paddingLeft: "var(--z-space-3, 0.75rem)",
                paddingRight: "var(--z-space-3, 0.75rem)",
                paddingTop: "var(--z-space-3, 0.75rem)",
                paddingBottom: "var(--z-space-3, 0.75rem)",
                borderBottom: "1px solid var(--z-color-border, #ebebeb)",
                background: "var(--z-color-surface, #ffffff)",
                border: "none",
                cursor: "pointer"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
                  "div",
                  {
                    style: {
                      color: "var(--z-color-text, #171717)",
                      fontWeight: "var(--z-type-weight-medium, 500)"
                    },
                    children: result.title
                  }
                ),
                result.description ? /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
                  "div",
                  {
                    style: {
                      fontSize: "var(--z-type-size-sm, 0.875rem)",
                      color: "var(--z-color-muted, #5c5c5c)"
                    },
                    children: result.description
                  }
                ) : null,
                result.metadata ? /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
                  "div",
                  {
                    style: {
                      fontSize: "var(--z-type-size-sm, 0.875rem)",
                      color: "var(--z-color-muted, #5c5c5c)"
                    },
                    children: result.metadata
                  }
                ) : null
              ]
            }
          ) }, result.id)) })
        ]
      }
    );
  }

  // ../ui-react/src/organisms/FiltersBar.tsx
  var import_jsx_runtime42 = __require("react/jsx-runtime");
  function FiltersBar({ items, onReset, loading = false, className, style }) {
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
      "div",
      {
        className,
        "aria-busy": loading || void 0,
        style: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--z-space-3, 0.75rem)",
          padding: "var(--z-space-3, 0.75rem)",
          border: "1px solid var(--z-color-border, #ebebeb)",
          borderRadius: "var(--z-radius-md, 0.5rem)",
          background: "var(--z-color-surface, #ffffff)",
          opacity: loading ? 0.6 : 1,
          pointerEvents: loading ? "none" : void 0,
          transition: "opacity 200ms ease",
          ...style
        },
        children: [
          items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "var(--z-space-2, 0.5rem)"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
                  "span",
                  {
                    style: {
                      fontSize: "var(--z-type-size-sm, 0.875rem)",
                      color: "var(--z-color-muted, #5c5c5c)"
                    },
                    children: item.label
                  }
                ),
                item.control
              ]
            },
            item.id
          )),
          onReset ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(Button, { variant: "secondary", onClick: onReset, disabled: loading, children: "Reset" }) : null
        ]
      }
    );
  }

  // ../ui-react/src/organisms/ModalDialog.tsx
  var import_jsx_runtime43 = __require("react/jsx-runtime");
  function ModalDialog({
    open,
    title,
    description,
    children,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    loading = false,
    error,
    className,
    style
  }) {
    if (!open) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": title,
        style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 100 },
        onClick: onCancel,
        children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
          "div",
          {
            className,
            style: {
              width: "min(540px, 90vw)",
              margin: "10vh auto",
              background: "var(--z-color-surface, #ffffff)",
              borderRadius: "var(--z-radius-lg, 0.75rem)",
              boxShadow: "var(--z-shadow-lg, 0 16px 35px rgba(0,0,0,0.16))",
              padding: "var(--z-space-4, 1rem)",
              border: "1px solid var(--z-color-border, #ebebeb)",
              ...style
            },
            onClick: (event) => event.stopPropagation(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
                "h2",
                {
                  style: {
                    fontSize: "var(--z-type-size-xl, 1.25rem)",
                    fontWeight: "var(--z-type-weight-semibold, 600)",
                    color: "var(--z-color-text, #171717)",
                    margin: 0
                  },
                  children: title
                }
              ),
              description ? /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
                "p",
                {
                  style: {
                    color: "var(--z-color-muted, #5c5c5c)",
                    marginTop: "var(--z-space-2, 0.5rem)"
                  },
                  children: description
                }
              ) : null,
              children ? /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { style: { marginTop: "var(--z-space-3, 0.75rem)" }, children }) : null,
              error ? /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
                "p",
                {
                  role: "alert",
                  style: {
                    color: "var(--z-color-danger, #fb3748)",
                    fontSize: "var(--z-type-size-sm, 0.875rem)",
                    marginTop: "var(--z-space-3, 0.75rem)",
                    marginBottom: 0
                  },
                  children: error
                }
              ) : null,
              /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
                "footer",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "var(--z-space-4, 1rem)",
                    gap: "var(--z-space-2, 0.5rem)"
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(Button, { variant: "secondary", onClick: onCancel, disabled: loading, children: cancelLabel }),
                    onConfirm ? /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(Button, { onClick: onConfirm, loading, children: confirmLabel }) : null
                  ]
                }
              )
            ]
          }
        )
      }
    );
  }

  // ../ui-react/src/organisms/LayoutShell.tsx
  var import_jsx_runtime44 = __require("react/jsx-runtime");
  function LayoutShell({
    topNav,
    sidebar,
    rightRail,
    header,
    children,
    className,
    style
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
      "div",
      {
        className,
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "var(--z-space-3, 0.75rem)",
          ...style
        },
        children: [
          topNav ? /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { children: topNav }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "260px minmax(0, 1fr) 220px",
                gap: "var(--z-space-3, 0.75rem)",
                alignItems: "start"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("aside", { children: sidebar }),
                /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
                  "main",
                  {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--z-space-3, 0.75rem)"
                    },
                    children: [
                      header ? /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { children: header }) : null,
                      /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { children })
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("aside", { children: rightRail })
              ]
            }
          )
        ]
      }
    );
  }

  // ../ui-react/src/organisms/IconLibrary.tsx
  var import_react24 = __require("react");
  var MaterialIcons = __toESM(require_dist());
  var import_jsx_runtime45 = __require("react/jsx-runtime");
  var {
    MaterialIcon,
    MATERIAL_ICON_STYLES,
    searchMaterialIcons
  } = MaterialIcons;
  async function copyValue(value) {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }
  function IconLibrary({
    initialQuery = "",
    query: controlledQuery,
    onQueryChange,
    initialStyle = "filled",
    styleVariant: controlledStyleVariant,
    onStyleVariantChange,
    icons,
    limit = 120,
    onCopy,
    className,
    style
  }) {
    const [uncontrolledQuery, setUncontrolledQuery] = (0, import_react24.useState)(initialQuery);
    const [uncontrolledStyleVariant, setUncontrolledStyleVariant] = (0, import_react24.useState)(initialStyle);
    const query = controlledQuery ?? uncontrolledQuery;
    const styleVariant = controlledStyleVariant ?? uncontrolledStyleVariant;
    const results = (0, import_react24.useMemo)(() => {
      if (icons) {
        return icons.slice(0, limit);
      }
      return searchMaterialIcons(query, { limit, style: styleVariant });
    }, [icons, limit, query, styleVariant]);
    return /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className, style: { display: "grid", gap: "var(--z-space-3, 0.75rem)", ...style }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { style: { display: "grid", gap: "0.625rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
          Input,
          {
            value: query,
            onChange: (event) => {
              const nextQuery = event.target.value;
              if (onQueryChange) {
                onQueryChange(nextQuery);
              } else {
                setUncontrolledQuery(nextQuery);
              }
            },
            placeholder: "Search icons by name or use case (settings, billing, ai, support)",
            "aria-label": "Search icon library"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.375rem" }, children: MATERIAL_ICON_STYLES.map((styleName) => {
          const selected = styleName === styleVariant;
          return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
            "button",
            {
              type: "button",
              onClick: () => {
                if (onStyleVariantChange) {
                  onStyleVariantChange(styleName);
                } else {
                  setUncontrolledStyleVariant(styleName);
                }
              },
              style: {
                border: "1px solid var(--z-color-border, #ebebeb)",
                background: selected ? "var(--z-color-text, #171717)" : "var(--z-color-surface, #ffffff)",
                color: selected ? "var(--z-color-primaryContrast, #ffffff)" : "var(--z-color-text, #171717)",
                borderRadius: "var(--z-radius-pill, 9999px)",
                minHeight: "28px",
                padding: "4px 10px",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
                textTransform: "capitalize"
              },
              children: styleName
            },
            styleName
          );
        }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("p", { style: { margin: 0, color: "var(--z-color-muted, #5c5c5c)", fontSize: "12px" }, children: [
        results.length,
        " icon",
        results.length === 1 ? "" : "s",
        " \u2022 click any icon to copy its name."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "0.5rem"
          },
          children: results.map((icon) => /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(
            "button",
            {
              type: "button",
              onClick: async () => {
                const value = icon.name;
                const ok = await copyValue(value);
                if (ok) {
                  onCopy?.(value);
                }
              },
              style: {
                border: "1px solid var(--z-color-border, #ebebeb)",
                background: "var(--z-color-surface, #ffffff)",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "left",
                display: "grid",
                gap: "8px",
                cursor: "pointer",
                minHeight: "94px"
              },
              title: `Copy ${icon.name}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(MaterialIcon, { name: icon.name, size: 22, styleVariant }),
                  /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                    "span",
                    {
                      style: {
                        fontSize: "10px",
                        color: "var(--z-color-muted, #5c5c5c)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      },
                      children: icon.category
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { style: { fontSize: "12px", lineHeight: "16px", color: "var(--z-color-text, #171717)" }, children: icon.name })
              ]
            },
            `${styleVariant}-${icon.name}`
          ))
        }
      )
    ] });
  }

  // ../ui-react/src/organisms/AvatarLibrary.tsx
  var import_react25 = __require("react");
  var AvatarAssets = __toESM(require_dist2());
  var import_jsx_runtime46 = __require("react/jsx-runtime");
  var { generateAvatar, listAvatarStyles, searchAvatarStyles } = AvatarAssets;
  async function copyValue2(value) {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }
  function AvatarLibrary({
    initialQuery = "",
    query: controlledQuery,
    onQueryChange,
    sampleName = "Akhil Krishnan",
    styles: providedStyles,
    seed: controlledSeed,
    onSeedChange,
    onCopy,
    className,
    style
  }) {
    const [uncontrolledQuery, setUncontrolledQuery] = (0, import_react25.useState)(initialQuery);
    const [uncontrolledSeed, setUncontrolledSeed] = (0, import_react25.useState)("zephr");
    const query = controlledQuery ?? uncontrolledQuery;
    const seed = controlledSeed ?? uncontrolledSeed;
    const styles = (0, import_react25.useMemo)(() => {
      if (providedStyles) {
        return providedStyles;
      }
      const result = searchAvatarStyles(query, 24);
      if (result.length > 0 || query.trim()) {
        return result;
      }
      return listAvatarStyles();
    }, [providedStyles, query]);
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className, style: { display: "grid", gap: "var(--z-space-3, 0.75rem)", ...style }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { style: { display: "grid", gap: "0.625rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
          Input,
          {
            value: query,
            onChange: (event) => {
              const nextQuery = event.target.value;
              if (onQueryChange) {
                onQueryChange(nextQuery);
              } else {
                setUncontrolledQuery(nextQuery);
              }
            },
            placeholder: "Search avatar style (retro, playful, enterprise, ai)",
            "aria-label": "Search avatar styles"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
          Input,
          {
            value: seed,
            onChange: (event) => {
              const nextSeed = event.target.value;
              if (onSeedChange) {
                onSeedChange(nextSeed);
              } else {
                setUncontrolledSeed(nextSeed);
              }
            },
            placeholder: "Seed (change to regenerate)",
            "aria-label": "Avatar style seed"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("p", { style: { margin: 0, color: "var(--z-color-muted, #5c5c5c)", fontSize: "12px" }, children: [
        styles.length,
        " style",
        styles.length === 1 ? "" : "s",
        " \u2022 click any style tile to copy its style id."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap: "0.5rem"
          },
          children: styles.map((entry) => {
            const generated = generateAvatar({
              name: sampleName,
              seed: `${seed}-${entry.id}`,
              style: entry.id,
              size: 64
            });
            return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(
              "button",
              {
                type: "button",
                onClick: async () => {
                  const ok = await copyValue2(entry.id);
                  if (ok) {
                    onCopy?.(entry.id);
                  }
                },
                style: {
                  border: "1px solid var(--z-color-border, #ebebeb)",
                  background: "var(--z-color-surface, #ffffff)",
                  borderRadius: "10px",
                  padding: "10px",
                  textAlign: "left",
                  display: "grid",
                  gap: "8px",
                  cursor: "pointer",
                  minHeight: "136px"
                },
                title: `Copy style ${entry.id}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "0.625rem" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Avatar, { name: sampleName, src: generated.dataUri, size: 44 }),
                    /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { style: { display: "grid", gap: "2px" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("span", { style: { fontSize: "12px", color: "var(--z-color-text, #171717)", fontWeight: 600 }, children: entry.label }),
                      /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("span", { style: { fontSize: "11px", color: "var(--z-color-muted, #5c5c5c)" }, children: entry.id })
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("span", { style: { fontSize: "11px", color: "var(--z-color-muted, #5c5c5c)", lineHeight: 1.5 }, children: entry.description })
                ]
              },
              entry.id
            );
          })
        }
      )
    ] });
  }

  // ../ui-react/src/organisms/LogoLibrary.tsx
  var import_react26 = __require("react");
  var LogoAssets = __toESM(require_dist3());
  var import_jsx_runtime47 = __require("react/jsx-runtime");
  var { createCatalogLogoDataUri, listLogoCatalog, searchLogoCatalog } = LogoAssets;
  async function copyValue3(value) {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }
  function LogoLibrary({
    initialQuery = "",
    query: controlledQuery,
    onQueryChange,
    logos,
    onCopy,
    className,
    style
  }) {
    const [uncontrolledQuery, setUncontrolledQuery] = (0, import_react26.useState)(initialQuery);
    const query = controlledQuery ?? uncontrolledQuery;
    const results = (0, import_react26.useMemo)(() => {
      if (logos) {
        return logos;
      }
      const searched = searchLogoCatalog(query, 180);
      if (searched.length > 0 || query.trim()) {
        return searched;
      }
      return listLogoCatalog().slice(0, 180);
    }, [logos, query]);
    return /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { className, style: { display: "grid", gap: "var(--z-space-3, 0.75rem)", ...style }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
        Input,
        {
          value: query,
          onChange: (event) => {
            const nextQuery = event.target.value;
            if (onQueryChange) {
              onQueryChange(nextQuery);
            } else {
              setUncontrolledQuery(nextQuery);
            }
          },
          placeholder: "Search brands or domains (openai, github, payments, ecommerce, social)",
          "aria-label": "Search logos"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("p", { style: { margin: 0, color: "var(--z-color-muted, #5c5c5c)", fontSize: "12px" }, children: [
        results.length,
        " brand marks \u2022 click any item to copy its domain."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
            gap: "0.5rem"
          },
          children: results.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(
            "button",
            {
              type: "button",
              onClick: async () => {
                const ok = await copyValue3(entry.domain);
                if (ok) {
                  onCopy?.(entry.domain);
                }
              },
              style: {
                border: "1px solid var(--z-color-border, #ebebeb)",
                background: "var(--z-color-surface, #ffffff)",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "left",
                display: "grid",
                gap: "8px",
                cursor: "pointer",
                minHeight: "86px"
              },
              title: `Copy ${entry.domain}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "0.625rem" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Logo, { name: entry.name, src: createCatalogLogoDataUri(entry, 64), size: 36 }),
                  /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { style: { display: "grid", gap: "1px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("span", { style: { fontSize: "12px", color: "var(--z-color-text, #171717)", fontWeight: 600 }, children: entry.name }),
                    /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("span", { style: { fontSize: "11px", color: "var(--z-color-muted, #5c5c5c)" }, children: entry.domain })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("span", { style: { fontSize: "10px", color: "var(--z-color-muted, #5c5c5c)", textTransform: "uppercase", letterSpacing: "0.05em" }, children: entry.category })
              ]
            },
            entry.id
          ))
        }
      )
    ] });
  }

  // ../ui-react/src/organisms/Sheet.tsx
  var import_react27 = __require("react");
  var import_jsx_runtime48 = __require("react/jsx-runtime");
  var ANIMATION = `
@keyframes z-sheet-in-right  { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes z-sheet-in-left   { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes z-sheet-in-bottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes z-sheet-out-right  { from { transform: translateX(0); } to { transform: translateX(100%); } }
@keyframes z-sheet-out-left   { from { transform: translateX(0); } to { transform: translateX(-100%); } }
@keyframes z-sheet-out-bottom { from { transform: translateY(0); } to { transform: translateY(100%); } }
`;
  var sheetKFInjected = false;
  function ensureSheetKeyframes() {
    if (typeof document === "undefined" || sheetKFInjected) return;
    const s = document.createElement("style");
    s.textContent = ANIMATION;
    document.head.appendChild(s);
    sheetKFInjected = true;
  }
  function Sheet({
    open,
    onClose,
    side = "right",
    size = side === "bottom" ? "50vh" : "380px",
    children,
    title,
    overlay = true,
    className,
    style
  }) {
    const titleId = (0, import_react27.useId)();
    const resolvedSize = typeof size === "number" ? `${size}px` : size;
    (0, import_react27.useEffect)(() => {
      ensureSheetKeyframes();
    }, []);
    (0, import_react27.useEffect)(() => {
      if (!open) return;
      function onKey(e) {
        if (e.key === "Escape") onClose();
      }
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);
    (0, import_react27.useEffect)(() => {
      if (typeof document === "undefined") return;
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);
    if (!open) return null;
    const panelStyle2 = {
      position: "fixed",
      zIndex: 600,
      background: "var(--z-color-surface, #ffffff)",
      boxShadow: "0 0 40px rgba(14,18,27,0.18)",
      display: "flex",
      flexDirection: "column",
      ...side === "right" && { top: 0, right: 0, bottom: 0, width: resolvedSize },
      ...side === "left" && { top: 0, left: 0, bottom: 0, width: resolvedSize },
      ...side === "bottom" && { left: 0, right: 0, bottom: 0, height: resolvedSize },
      animation: `z-sheet-in-${side} 260ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
    };
    return /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(import_jsx_runtime48.Fragment, { children: [
      overlay && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
        "div",
        {
          "aria-hidden": true,
          onClick: onClose,
          style: {
            position: "fixed",
            inset: 0,
            zIndex: 599,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(2px)",
            animation: "none"
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(
        "div",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": title ? titleId : void 0,
          className,
          style: { ...panelStyle2, ...style },
          children: [
            title && /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--z-space-4, 1rem) var(--z-space-5, 1.25rem)",
                  borderBottom: "1px solid var(--z-color-border, #ebebeb)"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                    "span",
                    {
                      id: titleId,
                      style: {
                        fontWeight: "var(--z-type-weight-semibold, 600)",
                        fontSize: "var(--z-type-size-base, 1rem)",
                        color: "var(--z-color-text, #171717)"
                      },
                      children: title
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Close panel",
                      onClick: onClose,
                      style: {
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 20,
                        lineHeight: 1,
                        color: "var(--z-color-muted, #737373)",
                        padding: "var(--z-space-1, 0.25rem)"
                      },
                      children: "\xD7"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
              "div",
              {
                style: {
                  flex: 1,
                  overflowY: "auto",
                  padding: "var(--z-space-5, 1.25rem)"
                },
                children
              }
            )
          ]
        }
      )
    ] });
  }

  // ../ui-react/src/organisms/AlertDialog.tsx
  var import_react28 = __require("react");
  var import_jsx_runtime49 = __require("react/jsx-runtime");
  var toneColors = {
    primary: {
      background: "var(--z-color-primary, #335cff)",
      color: "var(--z-color-primaryContrast, #ffffff)"
    },
    danger: {
      background: "var(--z-color-danger, #ef4444)",
      color: "#ffffff"
    }
  };
  function AlertDialog({
    open,
    onClose,
    title,
    description,
    confirmLabel = "Confirm",
    onConfirm,
    cancelLabel = "Cancel",
    confirmTone = "primary",
    loading = false,
    className,
    style
  }) {
    const titleId = (0, import_react28.useId)();
    const descId = (0, import_react28.useId)();
    (0, import_react28.useEffect)(() => {
      if (!open) return;
      function onKey(e) {
        if (e.key === "Escape") onClose();
      }
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);
    (0, import_react28.useEffect)(() => {
      if (typeof document === "undefined") return;
      if (open) document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);
    if (!open) return null;
    const btnBase = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height: 36,
      padding: "0 var(--z-space-4, 1rem)",
      borderRadius: "var(--z-radius-md, 8px)",
      border: "none",
      fontSize: "var(--z-type-size-sm, 0.875rem)",
      fontWeight: "var(--z-type-weight-medium, 500)",
      cursor: "pointer",
      transition: "opacity 120ms ease, background 120ms ease"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(import_jsx_runtime49.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
        "div",
        {
          "aria-hidden": true,
          onClick: onClose,
          style: {
            position: "fixed",
            inset: 0,
            zIndex: 700,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(2px)"
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(
        "div",
        {
          role: "alertdialog",
          "aria-modal": "true",
          "aria-labelledby": titleId,
          "aria-describedby": description ? descId : void 0,
          className,
          style: {
            position: "fixed",
            zIndex: 701,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(440px, calc(100vw - 2rem))",
            background: "var(--z-color-surface, #ffffff)",
            border: "1px solid var(--z-color-border, #ebebeb)",
            borderRadius: "var(--z-radius-lg, 14px)",
            boxShadow: "0 16px 48px rgba(14,18,27,0.2)",
            padding: "var(--z-space-6, 1.5rem)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--z-space-4, 1rem)",
            ...style
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
              "p",
              {
                id: titleId,
                style: {
                  margin: 0,
                  fontWeight: "var(--z-type-weight-semibold, 600)",
                  fontSize: "var(--z-type-size-lg, 1.125rem)",
                  color: "var(--z-color-text, #171717)",
                  lineHeight: 1.4
                },
                children: title
              }
            ),
            description && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
              "p",
              {
                id: descId,
                style: {
                  margin: 0,
                  fontSize: "var(--z-type-size-sm, 0.875rem)",
                  color: "var(--z-color-muted, #737373)",
                  lineHeight: 1.6
                },
                children: description
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "var(--z-space-2, 0.5rem)",
                  marginTop: "var(--z-space-2, 0.5rem)"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      disabled: loading,
                      style: {
                        ...btnBase,
                        background: "var(--z-color-weak, #f5f5f5)",
                        color: "var(--z-color-text, #171717)"
                      },
                      children: cancelLabel
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: onConfirm,
                      disabled: loading,
                      "aria-busy": loading,
                      style: {
                        ...btnBase,
                        ...toneColors[confirmTone],
                        opacity: loading ? 0.7 : 1
                      },
                      children: loading ? "\u2026" : confirmLabel
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    ] });
  }

  // ../ui-react/src/layout/Stack.tsx
  var import_react29 = __require("react");
  var import_jsx_runtime50 = __require("react/jsx-runtime");
  var Stack = (0, import_react29.forwardRef)(function Stack2({
    direction = "vertical",
    gap = "var(--z-space-4, 1rem)",
    align,
    justify,
    wrap = false,
    fullWidth = false,
    as: Tag = "div",
    className,
    style,
    children,
    ...props
  }, ref) {
    const resolvedGap = typeof gap === "number" ? `var(--z-space-${gap}, ${gap * 0.25}rem)` : gap;
    const computedStyle = {
      display: "flex",
      flexDirection: direction === "horizontal" ? "row" : "column",
      gap: resolvedGap,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? "wrap" : void 0,
      width: fullWidth ? "100%" : void 0,
      ...style
    };
    return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(Tag, { ref, className, style: computedStyle, ...props, children });
  });

  // ../ui-react/src/layout/Grid.tsx
  var import_react30 = __require("react");
  var import_jsx_runtime51 = __require("react/jsx-runtime");
  var Grid = (0, import_react30.forwardRef)(function Grid2({
    columns = 2,
    gap,
    rowGap,
    columnGap,
    align,
    justify,
    as: Tag = "div",
    className,
    style,
    children,
    ...props
  }, ref) {
    const resolveToken = (value) => {
      if (value === void 0) return void 0;
      return typeof value === "number" ? `var(--z-space-${value}, ${value * 0.25}rem)` : value;
    };
    const templateColumns = typeof columns === "number" ? `repeat(${columns}, minmax(0, 1fr))` : columns;
    const computedStyle = {
      display: "grid",
      gridTemplateColumns: templateColumns,
      gap: resolveToken(gap),
      rowGap: resolveToken(rowGap),
      columnGap: resolveToken(columnGap),
      alignItems: align,
      justifyItems: justify,
      ...style
    };
    return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(Tag, { ref, className, style: computedStyle, ...props, children });
  });

  // ../ui-react/src/layout/Box.tsx
  var import_react31 = __require("react");
  var import_jsx_runtime52 = __require("react/jsx-runtime");
  var Box = (0, import_react31.forwardRef)(function Box2({
    padding,
    paddingX,
    paddingY,
    margin,
    radius,
    background,
    border,
    as: Tag = "div",
    className,
    style,
    children,
    ...props
  }, ref) {
    const resolveToken = (value) => {
      if (value === void 0) return void 0;
      return typeof value === "number" ? `var(--z-space-${value}, ${value * 0.25}rem)` : value;
    };
    const resolveRadius = (value) => {
      if (value === void 0) return void 0;
      const presets = ["none", "sm", "md", "lg", "xl", "pill"];
      return presets.includes(value) ? `var(--z-radius-${value})` : value;
    };
    const computedStyle = {
      padding: resolveToken(padding),
      paddingLeft: resolveToken(paddingX),
      paddingRight: resolveToken(paddingX),
      paddingTop: resolveToken(paddingY),
      paddingBottom: resolveToken(paddingY),
      margin: resolveToken(margin),
      borderRadius: resolveRadius(radius),
      background,
      border: border === true ? "1px solid var(--z-color-border, #ebebeb)" : border === false ? void 0 : border,
      ...style
    };
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(Tag, { ref, className, style: computedStyle, ...props, children });
  });

  // ../ui-react/src/layout/Spacer.tsx
  var import_jsx_runtime53 = __require("react/jsx-runtime");
  function Spacer({ size = 4, axis = "both", className, style }) {
    const resolvedSize = size === "auto" ? "auto" : typeof size === "number" ? `var(--z-space-${size}, ${size * 0.25}rem)` : size;
    const computedStyle = {
      display: "block",
      width: axis === "y" ? void 0 : resolvedSize,
      height: axis === "x" ? void 0 : resolvedSize,
      flexShrink: 0,
      ...size === "auto" && axis !== "x" && axis !== "y" ? { flex: 1 } : {},
      ...style
    };
    return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("span", { "aria-hidden": true, className, style: computedStyle });
  }

  // ../ui-react/src/templates/DashboardPage.tsx
  var import_react32 = __require("react");
  var import_jsx_runtime54 = __require("react/jsx-runtime");
  var Icon = ({ d, size = 16, strokeWidth = 1.6 }) => /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("path", { d }) });
  var Icons = {
    plus: "M12 5v14M5 12h14",
    filter: "M4 6h16M7 12h10M10 18h4",
    download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
    arrowUp: "M18 15l-6-6-6 6",
    arrowDown: "M6 9l6 6 6-6",
    home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
    chart: "M18 20V10M12 20V4M6 20v-6",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
    bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
    bolt: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    trending: "M22 7l-8.5 8.5-5-5L1 17",
    zap: "M13 2L3 14h9l-1 8 10-12h-9",
    check: "M20 6L9 17 4 12",
    inbox: "M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
    code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
    layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    more: "M12 5h.01M12 12h.01M12 19h.01",
    externalLink: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3",
    chevronRight: "M9 18l6-6-6-6"
  };
  function Sparkline({ data, positive }) {
    const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
    const w = 72, h = 28, pad = 2;
    const pts = data.map((v, i) => {
      const x = pad + i / (data.length - 1) * (w - pad * 2);
      const y = h - pad - (v - min) / range * (h - pad * 2);
      return `${x},${y}`;
    }).join(" ");
    const color = positive ? "#10b981" : "#ef4444";
    const fillPts = `${pad},${h - pad} ${pts} ${w - pad},${h - pad}`;
    return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("svg", { width: w, height: h, viewBox: `0 0 ${w} ${h}`, fill: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("polygon", { points: fillPts, fill: color, opacity: "0.08" }),
      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("polyline", { points: pts, stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
    ] });
  }
  function AreaChart({ data }) {
    const max = Math.max(...data.map((d) => d.value));
    const w = 480, h = 120, padX = 8, padY = 12;
    const stepX = (w - padX * 2) / (data.length - 1);
    const pts = data.map((d, i) => {
      const x = padX + i * stepX;
      const y = padY + (1 - d.value / max) * (h - padY * 2);
      return { x, y };
    });
    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
    const area = `${line} L${pts[pts.length - 1].x},${h - padY} L${pts[0].x},${h - padY} Z`;
    return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("svg", { width: "100%", viewBox: `0 0 ${w} ${h}`, fill: "none", preserveAspectRatio: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("linearGradient", { id: "areaGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("stop", { offset: "0%", stopColor: "#335cff", stopOpacity: "0.14" }),
        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("stop", { offset: "100%", stopColor: "#335cff", stopOpacity: "0" })
      ] }) }),
      [0.25, 0.5, 0.75, 1].map((pct) => /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
        "line",
        {
          x1: padX,
          y1: padY + (1 - pct) * (h - padY * 2),
          x2: w - padX,
          y2: padY + (1 - pct) * (h - padY * 2),
          stroke: "#f1f3f5",
          strokeWidth: "1"
        },
        pct
      )),
      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("path", { d: area, fill: "url(#areaGrad)" }),
      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("path", { d: line, stroke: "#335cff", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round" }),
      pts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("circle", { cx: p.x, cy: p.y, r: "2.5", fill: "#335cff" }, i))
    ] });
  }
  function DonutChart({ segments }) {
    const r = 36, cx = 48, cy = 48, strokeWidth = 11;
    const circumference = 2 * Math.PI * r;
    let offset = 0;
    return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("svg", { width: "96", height: "96", viewBox: "0 0 96 96", children: [
      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("circle", { cx, cy, r, fill: "none", stroke: "#f1f3f5", strokeWidth }),
      segments.map((seg, i) => {
        const dash = seg.pct / 100 * circumference;
        const el = /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
          "circle",
          {
            cx,
            cy,
            r,
            fill: "none",
            stroke: seg.color,
            strokeWidth,
            strokeDasharray: `${dash} ${circumference - dash}`,
            strokeDashoffset: -(offset / 100) * circumference + circumference / 4,
            strokeLinecap: "round"
          },
          i
        );
        offset += seg.pct;
        return el;
      })
    ] });
  }
  var WEEKLY = [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 68 },
    { label: "Wed", value: 55 },
    { label: "Thu", value: 78 },
    { label: "Fri", value: 91 },
    { label: "Sat", value: 64 },
    { label: "Sun", value: 84 }
  ];
  var DEFAULT_STATS = [
    { id: "1", label: "Total Revenue", value: "$84,210", delta: "+12.5%", deltaPositive: true, sparkData: [40, 45, 38, 55, 52, 60, 58, 70, 68, 80] },
    { id: "2", label: "Active Users", value: "12,841", delta: "+8.3%", deltaPositive: true, sparkData: [28, 30, 27, 35, 32, 38, 36, 40, 37, 42] },
    { id: "3", label: "Open Issues", value: "17", delta: "-5", deltaPositive: false, sparkData: [22, 20, 25, 18, 22, 17, 20, 16, 19, 17] },
    { id: "4", label: "Deploy Rate", value: "98.2%", delta: "+0.4%", deltaPositive: true, sparkData: [94, 95, 93, 96, 97, 95, 98, 96, 99, 98] }
  ];
  var DEFAULT_ROWS = [
    { id: "1", name: "Atlas Platform", status: "active", updated: "2 min ago", progress: 82, revenue: "$24,500" },
    { id: "2", name: "Nebula API", status: "active", updated: "18 min ago", progress: 67, revenue: "$18,200" },
    { id: "3", name: "Orbit Dashboard", status: "pending", updated: "Yesterday", progress: 45, revenue: "$9,100" },
    { id: "4", name: "Pulse Reporter", status: "inactive", updated: "Mar 1", progress: 20, revenue: "$3,400" },
    { id: "5", name: "Quasar Sync", status: "active", updated: "Today", progress: 91, revenue: "$31,800" }
  ];
  var DEFAULT_ACTIVITY = [
    { id: "1", actor: "Akhil K.", action: "deployed Atlas v2.4.1 to production", timestamp: "5m ago", type: "deploy" },
    { id: "2", actor: "Maya R.", action: "opened issue #183 \u2014 Button hover", timestamp: "22m ago", type: "issue" },
    { id: "3", actor: "Noah T.", action: "merged PR #91 into main", timestamp: "1h ago", type: "merge" },
    { id: "4", actor: "Liam P.", action: "updated product roadmap Q2", timestamp: "3h ago", type: "update" },
    { id: "5", actor: "Priya S.", action: "created Figma sync branch", timestamp: "5h ago", type: "default" }
  ];
  var TRAFFIC = [
    { label: "Direct", pct: 38, color: "#335cff" },
    { label: "Organic", pct: 27, color: "#10b981" },
    { label: "Referral", pct: 21, color: "#f59e0b" },
    { label: "Social", pct: 14, color: "#8b5cf6" }
  ];
  var ACTIVITY_STYLE = {
    deploy: { bg: "#ecfdf5", color: "#059669" },
    issue: { bg: "#fff7ed", color: "#d97706" },
    merge: { bg: "#eff4ff", color: "#335cff" },
    update: { bg: "#faf5ff", color: "#7c3aed" },
    default: { bg: "#f4f4f5", color: "#71717a" }
  };
  var ACTIVITY_ICON = {
    deploy: Icons.bolt,
    issue: Icons.bell,
    merge: Icons.code,
    update: Icons.layers,
    default: Icons.check
  };
  var STATUS_COLOR = { active: "#10b981", inactive: "#d1d5db", pending: "#f59e0b" };
  var STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap');

.dp-root { box-sizing: border-box; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
.dp-root *, .dp-root *::before, .dp-root *::after { box-sizing: border-box; }

@keyframes dp-fade-up {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* \u2500\u2500 Sidebar \u2500\u2500 */
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

/* \u2500\u2500 Topbar \u2500\u2500 */
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

/* \u2500\u2500 Page body \u2500\u2500 */
.dp-body { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: auto; background: #fafafa; }
.dp-page { flex: 1; padding: 24px 24px 40px; }

/* \u2500\u2500 Page header \u2500\u2500 */
.dp-page-head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 22px; }
.dp-page-title { font-size: 18px; font-weight: 700; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 3px; }
.dp-page-sub { font-size: 13px; color: #71717a; margin: 0; }
.dp-head-actions { display: flex; gap: 8px; }

/* \u2500\u2500 Secondary button \u2500\u2500 */
.dp-sec-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 7px; font-size: 13px; font-weight: 500;
  cursor: pointer; border: 1px solid #e4e4e7; background: #fff; color: #3f3f46;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  transition: background 0.1s, box-shadow 0.1s;
}
.dp-sec-btn:hover { background: #fafafa; box-shadow: 0 2px 6px rgba(0,0,0,0.07); }

/* \u2500\u2500 Tab bar \u2500\u2500 */
.dp-tabs { display: flex; gap: 0; border-bottom: 1px solid #f0f0f0; margin-bottom: 20px; }
.dp-tab {
  font-size: 13.5px; font-weight: 500; color: #71717a;
  padding: 8px 14px; cursor: pointer; border: none; background: none;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
  transition: color 0.12s;
}
.dp-tab.active { color: #0f172a; font-weight: 600; border-bottom-color: #335cff; }
.dp-tab:hover:not(.active) { color: #3f3f46; }

/* \u2500\u2500 Stat cards \u2500\u2500 */
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

/* \u2500\u2500 Chart cards \u2500\u2500 */
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

/* \u2500\u2500 Projects table \u2500\u2500 */
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

/* \u2500\u2500 Activity \u2500\u2500 */
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

/* \u2500\u2500 Bottom row \u2500\u2500 */
.dp-bottom { display: grid; grid-template-columns: 1fr 280px; gap: 14px; }
`;
  function NavItem({ icon, label, active, badge, onClick }) {
    return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("button", { type: "button", className: `dp-nav-item${active ? " active" : ""}`, onClick, children: [
      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Icon, { d: icon, size: 15 }),
      label,
      badge && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { className: "dp-nav-badge", children: badge })
    ] });
  }
  function StatCard({ stat, delay }) {
    const pos = stat.deltaPositive !== false;
    return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-stat", style: { animationDelay: delay }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { className: "dp-stat-label", children: stat.label }),
      /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-stat-meta", children: [
        /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-stat-value", children: stat.value }),
          stat.delta && /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-stat-delta", style: { color: pos ? "#10b981" : "#ef4444", marginTop: "6px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Icon, { d: pos ? Icons.arrowUp : Icons.arrowDown, size: 12, strokeWidth: 2.5 }),
            stat.delta,
            /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { style: { fontWeight: 400, color: "#a1a1aa" }, children: "vs last mo" })
          ] })
        ] }),
        stat.sparkData && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Sparkline, { data: stat.sparkData, positive: pos })
      ] })
    ] });
  }
  function DashboardPage({
    title = "Overview",
    subtitle = "Welcome back, Akhil. Here's what's happening today.",
    stats = DEFAULT_STATS,
    tableData = DEFAULT_ROWS,
    activity = DEFAULT_ACTIVITY,
    loading = false,
    onNewItem,
    className,
    style
  }) {
    const [activeNav, setActiveNav] = (0, import_react32.useState)("overview");
    const [activeTab, setActiveTab] = (0, import_react32.useState)("overview");
    return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(
      "div",
      {
        className: `dp-root${className ? ` ${className}` : ""}`,
        style: { minHeight: "960px", background: "#fafafa", display: "flex", ...style },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("style", { children: STYLES }),
          /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("aside", { className: "dp-sidebar", children: [
            /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-sidebar-brand", children: [
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-sidebar-logo", children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Icon, { d: Icons.zap, size: 14, strokeWidth: 2.2 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { className: "dp-sidebar-wordmark", children: "Zephr" }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { className: "dp-sidebar-plan", children: "Pro" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("nav", { className: "dp-sidebar-nav", children: [
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { className: "dp-nav-label", children: "Workspace" }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(NavItem, { icon: Icons.home, label: "Overview", active: activeNav === "overview", onClick: () => setActiveNav("overview") }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(NavItem, { icon: Icons.grid, label: "Projects", active: activeNav === "projects", onClick: () => setActiveNav("projects"), badge: "4" }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(NavItem, { icon: Icons.chart, label: "Analytics", active: activeNav === "analytics", onClick: () => setActiveNav("analytics") }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(NavItem, { icon: Icons.inbox, label: "Inbox", active: activeNav === "inbox", onClick: () => setActiveNav("inbox"), badge: "3" }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { className: "dp-nav-label", children: "Account" }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(NavItem, { icon: Icons.users, label: "Team", active: activeNav === "team", onClick: () => setActiveNav("team") }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(NavItem, { icon: Icons.settings, label: "Settings", active: activeNav === "settings", onClick: () => setActiveNav("settings") })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-sidebar-footer", children: [
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Avatar, { name: "Akhil Krishnan", size: 28 }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-sidebar-footer-info", children: [
                /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-sidebar-footer-name", children: "Akhil Krishnan" }),
                /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-sidebar-footer-role", children: "Admin \xB7 Pro plan" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-body", children: [
            /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("header", { className: "dp-topbar", children: [
              /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-search", children: [
                /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Icon, { d: Icons.search, size: 14 }),
                /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { children: "Search projects, docs\u2026" }),
                /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { style: { marginLeft: "auto", fontSize: "11.5px", color: "#c4c4cc", border: "1px solid #e4e4e7", borderRadius: "5px", padding: "1px 6px", fontFamily: "monospace" }, children: "\u2318K" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-topbar-actions", children: [
                /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("button", { type: "button", className: "dp-icon-btn", "aria-label": "Notifications", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Icon, { d: Icons.bell, size: 15 }),
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { className: "dp-notif-dot" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Avatar, { name: "Akhil Krishnan", size: 28 }),
                /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("button", { type: "button", className: "dp-primary-btn", onClick: onNewItem, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Icon, { d: Icons.plus, size: 14, strokeWidth: 2.2 }),
                  "New project"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-page", children: [
              /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-page-head", children: [
                /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("h1", { className: "dp-page-title", children: title }),
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("p", { className: "dp-page-sub", children: subtitle })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-head-actions", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("button", { type: "button", className: "dp-sec-btn", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Icon, { d: Icons.filter, size: 13 }),
                    "Filter"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("button", { type: "button", className: "dp-sec-btn", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Icon, { d: Icons.download, size: 13 }),
                    "Export"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-tabs", children: ["overview", "analytics", "reports"].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("button", { type: "button", className: `dp-tab${activeTab === tab ? " active" : ""}`, onClick: () => setActiveTab(tab), children: tab.charAt(0).toUpperCase() + tab.slice(1) }, tab)) }),
              activeTab !== "reports" && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-stats", children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(StatCard, { stat: s, delay: `${i * 50}ms` }, s.id)) }),
              activeTab !== "reports" && /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-charts", children: [
                /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-card", style: { animationDelay: "220ms" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-card-head", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-card-title", children: "Revenue" }),
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-card-sub", children: "Weekly performance" })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("button", { type: "button", className: "dp-sec-btn", style: { fontSize: "12px", padding: "4px 10px" }, children: [
                      "This week",
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Icon, { d: Icons.chevronRight, size: 12 })
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-card-body", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-chart-value", children: "$84,210" }),
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-chart-delta", children: "\u2191 12.5% vs last week" }),
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-chart-area", children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(AreaChart, { data: WEEKLY }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { style: { display: "flex", justifyContent: "space-between", marginTop: "4px" }, children: WEEKLY.map((d) => /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { style: { fontSize: "10.5px", color: "#a1a1aa" }, children: d.label }, d.label)) })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-card", style: { animationDelay: "270ms" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-card-head", children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-card-title", children: "Traffic" }),
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-card-sub", children: "By source" })
                  ] }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-card-body", children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-traffic", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(DonutChart, { segments: TRAFFIC }),
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-traffic-legend", children: TRAFFIC.map((t) => /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-traffic-row", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-traffic-label", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("span", { className: "dp-traffic-name", children: [
                          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { className: "dp-traffic-dot", style: { background: t.color } }),
                          t.label
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("span", { className: "dp-traffic-pct", children: [
                          t.pct,
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-traffic-bar", children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-traffic-bar-fill", style: { width: `${t.pct}%`, background: t.color } }) })
                    ] }, t.label)) })
                  ] }) })
                ] })
              ] }),
              activeTab === "analytics" && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "12px", marginBottom: "16px" }, children: [
                { label: "Conversion rate", value: "3.4%", trend: "\u2191 0.4pp", color: "#22c55e" },
                { label: "Avg. session", value: "4m 12s", trend: "\u2191 18s", color: "#22c55e" },
                { label: "Bounce rate", value: "38%", trend: "\u2193 2%", color: "#22c55e" }
              ].map((m) => /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-card", style: { padding: "16px 18px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-card-sub", style: { marginBottom: "4px" }, children: m.label }),
                /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { style: { fontSize: "22px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em" }, children: m.value }),
                /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { style: { fontSize: "12px", color: m.color, fontWeight: 500, marginTop: "2px" }, children: [
                  m.trend,
                  " this week"
                ] })
              ] }, m.label)) }),
              /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-bottom", children: [
                /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-table-wrap", style: { animationDelay: "320ms" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-table-head", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-card-title", children: "Projects" }),
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-card-sub", children: [
                        tableData.length,
                        " total"
                      ] })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("button", { type: "button", className: "dp-text-link", children: [
                      "View all ",
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Icon, { d: Icons.externalLink, size: 11 })
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("table", { className: "dp-table", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("tr", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("th", { children: "Project" }),
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("th", { children: "Status" }),
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("th", { children: "Progress" }),
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("th", { children: "Revenue" }),
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("th", { children: "Updated" })
                    ] }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("tbody", { children: tableData.map((row) => {
                      const statusColor = STATUS_COLOR[row.status];
                      const progColor = row.status === "active" ? "#335cff" : row.status === "pending" ? "#f59e0b" : "#d1d5db";
                      return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("tr", { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Avatar, { name: row.name, size: 26 }),
                          /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { children: [
                            /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-project-name", children: row.name }),
                            /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-project-id", children: [
                              "#",
                              row.id.padStart(4, "0")
                            ] })
                          ] })
                        ] }) }),
                        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("span", { className: "dp-status", children: [
                          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { className: "dp-status-dot", style: { background: statusColor } }),
                          row.status.charAt(0).toUpperCase() + row.status.slice(1)
                        ] }) }),
                        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-progress-wrap", children: [
                          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-progress-bar", children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-progress-fill", style: { width: `${row.progress ?? 0}%`, background: progColor } }) }),
                          /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("span", { className: "dp-progress-pct", children: [
                            row.progress ?? 0,
                            "%"
                          ] })
                        ] }) }),
                        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("td", { style: { fontWeight: 600, color: "#0f172a", fontVariantNumeric: "tabular-nums" }, children: row.revenue ?? "\u2014" }),
                        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("td", { style: { color: "#71717a" }, children: row.updated })
                      ] }, row.id);
                    }) })
                  ] })
                ] }),
                activeTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-card dp-activity", style: { animationDelay: "360ms" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-activity-head", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-card-title", children: "Activity" }),
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-card-sub", children: "Recent team events" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-activity-body", children: activity.map((item, i) => {
                    const type = item.type ?? "default";
                    const s = ACTIVITY_STYLE[type] ?? ACTIVITY_STYLE.default;
                    const iconPath = ACTIVITY_ICON[type] ?? Icons.check;
                    const isLast = i === activity.length - 1;
                    return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-activity-item", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-activity-line-wrap", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-activity-icon", style: { background: s.bg }, children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: s.color, strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("path", { d: iconPath }) }) }),
                        !isLast && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-activity-connector" })
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-activity-content", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("span", { className: "dp-activity-actor", children: [
                          item.actor,
                          " "
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { className: "dp-activity-action", children: item.action }),
                        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-activity-time", children: item.timestamp })
                      ] })
                    ] }, item.id);
                  }) })
                ] }),
                activeTab === "reports" && /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-card", style: { padding: "20px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "dp-card-head", style: { marginBottom: "16px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-card-title", children: "Monthly summary" }),
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "dp-card-sub", children: "March 2026" })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("button", { type: "button", className: "dp-sec-btn", style: { fontSize: "12px", padding: "4px 10px" }, children: [
                      "Export CSV ",
                      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Icon, { d: Icons.download, size: 12 })
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "10px" }, children: [
                    { label: "Total revenue", value: "$48,210", change: "+12.5%" },
                    { label: "New customers", value: "142", change: "+8.3%" },
                    { label: "Support tickets", value: "38", change: "-4.2%" },
                    { label: "Avg. response time", value: "2.1h", change: "-11%" }
                  ].map((r) => /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { style: { padding: "14px 16px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #f1f5f9" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { style: { fontSize: "11.5px", color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }, children: r.label }),
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { style: { fontSize: "18px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em" }, children: r.value }),
                    /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { style: { fontSize: "11.5px", color: "#22c55e", fontWeight: 500, marginTop: "2px" }, children: [
                      r.change,
                      " vs last month"
                    ] })
                  ] }, r.label)) })
                ] })
              ] })
            ] })
          ] })
        ]
      }
    );
  }

  // ../ui-react/src/templates/AuthPage.tsx
  var import_react33 = __require("react");
  var import_jsx_runtime55 = __require("react/jsx-runtime");
  var GitHubIcon = () => /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21.5c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" }) });
  var GoogleIcon = () => /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("svg", { width: "18", height: "18", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z", fill: "#4285F4" }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })
  ] });
  var AppleIcon = () => /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-2.12 4.53-3.74 4.25z" }) });
  var MailIcon = () => /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M2 7l10 7 10-7" })
  ] });
  var LockIcon = () => /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M7 11V7a5 5 0 0110 0v4" })
  ] });
  var EyeIcon = ({ show }) => show ? /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("circle", { cx: "12", cy: "12", r: "3" })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M17.94 17.94A10.07 10.07 0 0112 20C5 20 1 12 1 12a18.46 18.46 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("line", { x1: "1", y1: "1", x2: "23", y2: "23" })
  ] });
  var CheckIcon = () => /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("svg", { width: "10", height: "8", viewBox: "0 0 10 8", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M1 4L3.5 6.5L9 1", stroke: "white", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round" }) });
  var ArrowIcon = () => /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M5 12h14M12 5l7 7-7 7" }) });
  var ProductPreview = () => /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(
    "svg",
    {
      viewBox: "0 0 380 260",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { width: "100%", maxWidth: "380px", filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.5))" },
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { width: "380", height: "260", rx: "16", fill: "#111827" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { width: "380", height: "260", rx: "16", fill: "url(#card-grad)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "0.5", y: "0.5", width: "379", height: "259", rx: "15.5", stroke: "rgba(255,255,255,0.08)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "20", y: "20", width: "120", height: "10", rx: "5", fill: "rgba(255,255,255,0.12)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "316", y: "16", width: "44", height: "18", rx: "9", fill: "rgba(51,92,255,0.3)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "317", y: "17", width: "42", height: "16", rx: "8", stroke: "rgba(51,92,255,0.5)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("text", { x: "338", y: "28", textAnchor: "middle", fontSize: "8", fill: "rgba(255,255,255,0.7)", fontFamily: "system-ui", children: "Export" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "20", y: "50", width: "104", height: "64", rx: "10", fill: "rgba(255,255,255,0.05)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "20.5", y: "50.5", width: "103", height: "63", rx: "9.5", stroke: "rgba(255,255,255,0.06)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "32", y: "62", width: "36", height: "6", rx: "3", fill: "rgba(255,255,255,0.25)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("text", { x: "32", y: "90", fontSize: "18", fontWeight: "700", fill: "white", fontFamily: "system-ui", children: "$84k" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "32", y: "98", width: "52", height: "5", rx: "2.5", fill: "rgba(74,222,128,0.6)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("polyline", { points: "70,82 76,76 82,79 88,70 94,72 100,65 106,68 112,60", stroke: "#4ade80", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "138", y: "50", width: "104", height: "64", rx: "10", fill: "rgba(255,255,255,0.05)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "138.5", y: "50.5", width: "103", height: "63", rx: "9.5", stroke: "rgba(255,255,255,0.06)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "150", y: "62", width: "44", height: "6", rx: "3", fill: "rgba(255,255,255,0.25)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("text", { x: "150", y: "90", fontSize: "18", fontWeight: "700", fill: "white", fontFamily: "system-ui", children: "12.8k" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "150", y: "98", width: "44", height: "5", rx: "2.5", fill: "rgba(96,165,250,0.6)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("polyline", { points: "188,82 194,78 200,80 206,72 212,74 218,68 224,70 230,63", stroke: "#60a5fa", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "256", y: "50", width: "104", height: "64", rx: "10", fill: "rgba(255,255,255,0.05)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "256.5", y: "50.5", width: "103", height: "63", rx: "9.5", stroke: "rgba(255,255,255,0.06)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "268", y: "62", width: "32", height: "6", rx: "3", fill: "rgba(255,255,255,0.25)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("text", { x: "268", y: "90", fontSize: "18", fontWeight: "700", fill: "white", fontFamily: "system-ui", children: "98.2%" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "268", y: "98", width: "36", height: "5", rx: "2.5", fill: "rgba(167,139,250,0.6)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("polyline", { points: "306,82 312,80 318,77 324,75 330,72 336,69 342,71 348,64", stroke: "#a78bfa", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "20", y: "130", width: "220", height: "110", rx: "10", fill: "rgba(255,255,255,0.04)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "20.5", y: "130.5", width: "219", height: "109", rx: "9.5", stroke: "rgba(255,255,255,0.06)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "32", y: "142", width: "60", height: "7", rx: "3.5", fill: "rgba(255,255,255,0.2)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("defs", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("linearGradient", { id: "card-grad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("stop", { offset: "0%", stopColor: "rgba(255,255,255,0.03)" }),
            /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("stop", { offset: "100%", stopColor: "rgba(0,0,0,0)" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("linearGradient", { id: "area-fill", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("stop", { offset: "0%", stopColor: "#335cff", stopOpacity: "0.35" }),
            /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("stop", { offset: "100%", stopColor: "#335cff", stopOpacity: "0" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
          "path",
          {
            d: "M32 220 L 55 198 L 80 205 L 105 185 L 130 190 L 155 170 L 180 175 L 205 158 L 228 162 L 228 228 L 32 228 Z",
            fill: "url(#area-fill)"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
          "path",
          {
            d: "M32 220 L 55 198 L 80 205 L 105 185 L 130 190 L 155 170 L 180 175 L 205 158 L 228 162",
            stroke: "#335cff",
            strokeWidth: "1.75",
            fill: "none",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        [32, 80, 130, 180, 228].map((x, i) => {
          const ys = [220, 205, 190, 175, 162];
          return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("circle", { cx: x, cy: ys[i], r: "3", fill: "#335cff" }, i);
        }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "256", y: "130", width: "104", height: "110", rx: "10", fill: "rgba(255,255,255,0.04)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "256.5", y: "130.5", width: "103", height: "109", rx: "9.5", stroke: "rgba(255,255,255,0.06)" }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "268", y: "142", width: "48", height: "7", rx: "3.5", fill: "rgba(255,255,255,0.2)" }),
        [0, 1, 2, 3].map((i) => /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("g", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "268", y: 164 + i * 18, width: "8", height: "8", rx: "4", fill: ["#335cff", "#4ade80", "#f59e0b", "#a78bfa"][i] }),
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: "282", y: 165 + i * 18, width: [38, 30, 44, 26][i], height: "6", rx: "3", fill: "rgba(255,255,255,0.15)" }),
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("rect", { x: 316 + [6, 14, 2, 18][i], y: 165 + i * 18, width: [22, 14, 26, 10][i], height: "6", rx: "3", fill: "rgba(255,255,255,0.08)" })
        ] }, i))
      ]
    }
  );
  function AvatarStack() {
    const initials2 = ["SC", "AK", "MR", "JL", "PW"];
    const colors = ["#335cff", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];
    return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: { display: "flex" }, children: initials2.map((init, i) => /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
      "div",
      {
        style: {
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          background: colors[i],
          border: "2px solid #0a0d14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "8px",
          fontWeight: 700,
          color: "white",
          marginLeft: i === 0 ? 0 : "-8px",
          zIndex: initials2.length - i,
          position: "relative"
        },
        children: init
      },
      i
    )) });
  }
  function Checkbox3({ checked, onChange }) {
    return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
      "button",
      {
        type: "button",
        role: "checkbox",
        "aria-checked": checked,
        onClick: () => onChange(!checked),
        style: {
          width: "17px",
          height: "17px",
          minWidth: "17px",
          borderRadius: "5px",
          border: checked ? "none" : "1.5px solid #d1d5db",
          background: checked ? "#335cff" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 120ms ease",
          outline: "none",
          padding: 0,
          boxShadow: checked ? "0 0 0 3px rgba(51,92,255,0.12)" : "none"
        },
        children: checked && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(CheckIcon, {})
      }
    );
  }
  function Field({ label, htmlFor, children, error, action }) {
    return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("label", { htmlFor, style: { fontSize: "13.5px", fontWeight: 500, color: "#111827", letterSpacing: "-0.01em" }, children: label }),
        action
      ] }),
      children,
      error && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("p", { style: { margin: 0, fontSize: "12px", color: "#ef4444" }, children: error })
    ] });
  }
  var STYLES2 = `
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
  var defaultProviders = [
    { id: "github", label: "Continue with GitHub", icon: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(GitHubIcon, {}), onSignIn: () => {
    } },
    { id: "google", label: "Continue with Google", icon: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(GoogleIcon, {}), onSignIn: () => {
    } },
    { id: "apple", label: "Continue with Apple", icon: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(AppleIcon, {}), onSignIn: () => {
    } }
  ];
  function AuthPage({
    brand,
    title,
    subtitle,
    providers = defaultProviders,
    onSubmit,
    mode = "sign-in",
    onModeSwitch,
    onForgotPassword,
    footerNote,
    testimonialQuote = "Zephr cut our UI build time by 80%. The component quality is unmatched \u2014 every detail is already done.",
    testimonialAuthor = "Sarah Chen",
    testimonialRole = "Staff Engineer, Vercel",
    className,
    style
  }) {
    const [email, setEmail] = (0, import_react33.useState)("");
    const [password, setPassword] = (0, import_react33.useState)("");
    const [showPw, setShowPw] = (0, import_react33.useState)(false);
    const [agreed, setAgreed] = (0, import_react33.useState)(false);
    const [loading, setLoading] = (0, import_react33.useState)(false);
    const [fieldError, setFieldError] = (0, import_react33.useState)({});
    const isSignIn = mode === "sign-in";
    const heading = title ?? (isSignIn ? "Welcome back" : "Create your account");
    const sub = subtitle ?? (isSignIn ? "Sign in to continue to your workspace." : "Get started \u2014 it's free.");
    const switchLabel = isSignIn ? "No account yet?" : "Already have an account?";
    const switchAction = isSignIn ? "Sign up free" : "Sign in";
    async function handleSubmit(e) {
      e.preventDefault();
      setFieldError({});
      const errs = {};
      if (!email) errs.email = "Email is required.";
      if (!password) errs.password = "Password is required.";
      if (Object.keys(errs).length) {
        setFieldError(errs);
        return;
      }
      setLoading(true);
      try {
        await onSubmit?.(email, password);
      } catch (err) {
        setFieldError({ global: err instanceof Error ? err.message : "Something went wrong." });
      } finally {
        setLoading(false);
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(
      "div",
      {
        className: `ap-root${className ? ` ${className}` : ""}`,
        style: {
          minHeight: "760px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "#ffffff",
          ...style
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("style", { children: STYLES2 }),
          /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(
            "div",
            {
              className: "ap-left",
              style: {
                position: "relative",
                overflow: "hidden",
                background: "#0a0d14",
                display: "flex",
                flexDirection: "column",
                padding: "clamp(2rem, 3.5vw, 3rem)"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { "aria-hidden": true, style: { position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: { position: "absolute", top: "-20%", left: "-10%", width: "70%", height: "70%", borderRadius: "50%", background: "radial-gradient(circle, rgba(51,92,255,0.18) 0%, transparent 70%)", filter: "blur(48px)" } }),
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: { position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)", filter: "blur(60px)" } })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { "aria-hidden": true, style: { position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(51,92,255,0.5) 40%, rgba(99,102,241,0.5) 60%, transparent)" } }),
                /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: { position: "relative", zIndex: 1, marginBottom: "auto" }, children: brand ?? /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: {
                    width: "34px",
                    height: "34px",
                    borderRadius: "9px",
                    background: "linear-gradient(135deg, #335cff 0%, #6366f1 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 4px 16px rgba(51,92,255,0.35)"
                  }, children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", fill: "white", stroke: "white", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { style: { fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.03em" }, children: "Zephr" })
                ] }) }),
                /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: { position: "relative", zIndex: 1, marginBottom: "28px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("h2", { className: "ap-left-heading", children: [
                    "Build beautiful UI,",
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("br", {}),
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { style: { color: "rgba(255,255,255,0.4)" }, children: "ship it faster." })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("p", { className: "ap-left-sub", children: "200+ production-ready components. 6 design systems. Full TypeScript." }),
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" }, children: [
                    { v: "200+", l: "Components" },
                    { v: "6", l: "Style packs" },
                    { v: "100%", l: "TypeScript" }
                  ].map(({ v, l }) => /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    borderRadius: "100px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.09)"
                  }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { style: { fontSize: "13px", fontWeight: 700, color: "#fff" }, children: v }),
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { style: { fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "-0.005em" }, children: l })
                  ] }, l)) })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: { position: "relative", zIndex: 1, marginBottom: "28px" }, children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(ProductPreview, {}) }),
                /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: {
                  position: "relative",
                  zIndex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px",
                  padding: "20px"
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: { display: "flex", gap: "3px", marginBottom: "10px" }, children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "#f59e0b", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) }),
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("p", { style: { margin: "0 0 14px", fontSize: "13.5px", lineHeight: 1.65, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.01em", fontStyle: "italic" }, children: [
                    "\u201C",
                    testimonialQuote,
                    "\u201D"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(AvatarStack, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: { marginLeft: "4px" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: { fontSize: "12.5px", fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.01em" }, children: testimonialAuthor }),
                      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: { fontSize: "11.5px", color: "rgba(255,255,255,0.35)", marginTop: "1px" }, children: testimonialRole })
                    ] })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(
            "div",
            {
              className: "ap-right",
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "clamp(1.5rem, 4vw, 3rem)",
                background: "#ffffff"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: { width: "100%", maxWidth: "380px", animation: "ap-fade-up 0.45s ease both" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: { marginBottom: "28px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("h1", { style: {
                      margin: "0 0 6px",
                      fontSize: "26px",
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      color: "#0f172a",
                      lineHeight: 1.2
                    }, children: heading }),
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("p", { style: { margin: 0, fontSize: "14.5px", color: "#6b7280", letterSpacing: "-0.01em", lineHeight: 1.5 }, children: sub })
                  ] }),
                  providers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(import_jsx_runtime55.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "9px", marginBottom: "20px" }, children: providers.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(
                      "button",
                      {
                        type: "button",
                        className: "ap-oauth-btn",
                        onClick: p.onSignIn,
                        style: { animationDelay: `${i * 40}ms`, animation: "ap-fade-up 0.45s ease both" },
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { style: { display: "flex", flexShrink: 0 }, children: p.icon }),
                          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { style: { fontSize: "13.5px" }, children: p.label })
                        ]
                      },
                      p.id
                    )) }),
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: { flex: 1, height: "1px", background: "#f1f3f5" } }),
                      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { style: { fontSize: "11.5px", color: "#c1c7cd", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }, children: "or with email" }),
                      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { style: { flex: 1, height: "1px", background: "#f1f3f5" } })
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("form", { onSubmit: handleSubmit, noValidate: true, children: /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "14px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
                      Field,
                      {
                        label: "Email address",
                        htmlFor: "ap-email",
                        error: fieldError.email,
                        children: /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: { position: "relative" }, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { style: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", display: "flex", pointerEvents: "none" }, children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(MailIcon, {}) }),
                          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
                            "input",
                            {
                              id: "ap-email",
                              type: "email",
                              className: `ap-input${fieldError.email ? " ap-error" : ""}`,
                              placeholder: "you@company.com",
                              value: email,
                              onChange: (e) => setEmail(e.target.value),
                              autoComplete: "email"
                            }
                          )
                        ] })
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
                      Field,
                      {
                        label: "Password",
                        htmlFor: "ap-password",
                        error: fieldError.password,
                        action: isSignIn && onForgotPassword ? /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("button", { type: "button", className: "ap-link", onClick: onForgotPassword, style: { fontSize: "12.5px" }, children: "Forgot password?" }) : void 0,
                        children: /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { style: { position: "relative" }, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { style: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", display: "flex", pointerEvents: "none" }, children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(LockIcon, {}) }),
                          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
                            "input",
                            {
                              id: "ap-password",
                              type: showPw ? "text" : "password",
                              className: `ap-input${fieldError.password ? " ap-error" : ""}`,
                              placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                              value: password,
                              onChange: (e) => setPassword(e.target.value),
                              autoComplete: isSignIn ? "current-password" : "new-password",
                              style: { paddingRight: "40px" }
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
                            "button",
                            {
                              type: "button",
                              onClick: () => setShowPw((v) => !v),
                              "aria-label": showPw ? "Hide password" : "Show password",
                              style: {
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#9ca3af",
                                display: "flex",
                                padding: "4px",
                                borderRadius: "4px"
                              },
                              children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(EyeIcon, { show: showPw })
                            }
                          )
                        ] })
                      }
                    ),
                    !isSignIn && /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("label", { style: { display: "flex", alignItems: "flex-start", gap: "9px", cursor: "pointer", userSelect: "none" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(Checkbox3, { checked: agreed, onChange: setAgreed }),
                      /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("span", { style: { fontSize: "13px", color: "#6b7280", lineHeight: 1.5, paddingTop: "1px" }, children: [
                        "I agree to the",
                        " ",
                        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("button", { type: "button", className: "ap-link", style: { fontSize: "13px" }, children: "Terms" }),
                        " ",
                        "and",
                        " ",
                        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("button", { type: "button", className: "ap-link", style: { fontSize: "13px" }, children: "Privacy Policy" })
                      ] })
                    ] }),
                    fieldError.global && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("p", { style: { margin: 0, fontSize: "13px", color: "#ef4444", textAlign: "center", padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px" }, children: fieldError.global }),
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("button", { type: "submit", className: "ap-submit", disabled: loading, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(import_jsx_runtime55.Fragment, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { style: {
                        width: "13px",
                        height: "13px",
                        border: "2px solid rgba(255,255,255,0.25)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        animation: "ap-spin 0.7s linear infinite",
                        display: "inline-block"
                      } }),
                      isSignIn ? "Signing in\u2026" : "Creating account\u2026"
                    ] }) : /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(import_jsx_runtime55.Fragment, { children: [
                      isSignIn ? "Sign in" : "Create account",
                      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(ArrowIcon, {})
                    ] }) })
                  ] }) }),
                  onModeSwitch && /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("p", { style: { margin: "20px 0 0", textAlign: "center", fontSize: "13.5px", color: "#9ca3af", letterSpacing: "-0.005em" }, children: [
                    switchLabel,
                    " ",
                    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("button", { type: "button", className: "ap-link", onClick: onModeSwitch, style: { fontSize: "13.5px" }, children: switchAction })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("p", { style: { marginTop: "32px", textAlign: "center", fontSize: "12px", color: "#c4c9d4", lineHeight: 1.6, maxWidth: "320px", letterSpacing: "-0.005em" }, children: footerNote ?? /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(import_jsx_runtime55.Fragment, { children: [
                  "By continuing, you agree to our",
                  " ",
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("button", { type: "button", className: "ap-link", style: { fontSize: "12px", color: "#9ca3af" }, children: "Terms of Service" }),
                  " ",
                  "and",
                  " ",
                  /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("button", { type: "button", className: "ap-link", style: { fontSize: "12px", color: "#9ca3af" }, children: "Privacy Policy" }),
                  "."
                ] }) })
              ]
            }
          )
        ]
      }
    );
  }

  // ../ui-react/src/templates/SettingsPage.tsx
  var import_react34 = __require("react");
  var import_jsx_runtime56 = __require("react/jsx-runtime");
  var Ico = ({ d, size = 15, stroke = "currentColor" }) => /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("path", { d }) });
  var IC = {
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z",
    bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
    users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    camera: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z",
    check: "M20 6L9 17 4 12",
    send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    bolt: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    billing: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    chevron: "M9 18l6-6-6-6"
  };
  var STYLES3 = `
@keyframes sp-fade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
@keyframes sp-spin { to{transform:rotate(360deg)} }

.sp-root * { box-sizing:border-box; font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif; }

/* \u2500\u2500 Sidebar nav buttons \u2500\u2500 */
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

/* \u2500\u2500 Save button \u2500\u2500 */
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

/* \u2500\u2500 Secondary button \u2500\u2500 */
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

/* \u2500\u2500 Danger button \u2500\u2500 */
.sp-btn-danger {
  display:inline-flex; align-items:center; gap:5px;
  padding:7px 13px; border-radius:8px; font-size:13px; font-weight:500;
  cursor:pointer; border:1px solid #fecaca;
  background:#fff; color:#dc2626;
  transition:background 100ms,box-shadow 100ms;
  letter-spacing:-0.01em;
}
.sp-btn-danger:hover { background:#fef2f2; box-shadow:0 0 0 3px rgba(220,38,38,0.08); }

/* \u2500\u2500 Input field \u2500\u2500 */
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

/* \u2500\u2500 Settings card \u2500\u2500 */
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

/* \u2500\u2500 Toggle switch \u2500\u2500 */
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

/* \u2500\u2500 Avatar \u2500\u2500 */
.sp-avatar {
  border-radius:50%; display:flex; align-items:center; justify-content:center;
  font-weight:700; color:#fff; flex-shrink:0; font-size:13px;
  background:linear-gradient(135deg,#335cff,#6366f1);
}

/* \u2500\u2500 Section animation \u2500\u2500 */
.sp-section { animation:sp-fade 0.25s ease both; }

/* \u2500\u2500 Invite input combo \u2500\u2500 */
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
  function Avatar2({ name, size = 36 }) {
    const initials2 = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "sp-avatar", style: { width: size, height: size, fontSize: size * 0.36 }, children: initials2 });
  }
  function Toggle({ on, onChange }) {
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": on,
        className: `sp-toggle ${on ? "on" : "off"}`,
        onClick: () => onChange(!on)
      }
    );
  }
  function Field2({ label, htmlFor, hint, children }) {
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("label", { htmlFor, style: { fontSize: "13px", fontWeight: 500, color: "#374151", letterSpacing: "-0.01em" }, children: label }),
      children,
      hint && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("p", { style: { margin: 0, fontSize: "12px", color: "#9ca3af" }, children: hint })
    ] });
  }
  function ToggleRow({ label, desc, value, onChange }) {
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "sp-card-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { flex: 1, paddingRight: "20px", minWidth: 0 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: { fontSize: "13.5px", fontWeight: 500, color: "#111827" }, children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: { fontSize: "12px", color: "#9ca3af", marginTop: "2px", lineHeight: 1.5 }, children: desc })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Toggle, { on: value, onChange })
    ] });
  }
  function SectionLabel({ children }) {
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: { fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#b0b7c3", padding: "16px 12px 6px" }, children });
  }
  function ProfileSection() {
    const [name, setName] = (0, import_react34.useState)("Akhil Krishnan");
    const [email, setEmail] = (0, import_react34.useState)("akhil@zephr.ai");
    const [bio, setBio] = (0, import_react34.useState)("");
    const [role, setRole] = (0, import_react34.useState)("Full-stack engineer");
    const [pending, setPending] = (0, import_react34.useState)(false);
    const [saved, setSaved] = (0, import_react34.useState)(false);
    async function save(e) {
      e.preventDefault();
      setPending(true);
      setSaved(false);
      await new Promise((r) => setTimeout(r, 900));
      setPending(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2800);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("form", { onSubmit: save, className: "sp-section", style: { display: "flex", flexDirection: "column", gap: "20px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "sp-card", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "sp-card-body", style: { display: "flex", alignItems: "center", gap: "16px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { position: "relative", flexShrink: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Avatar2, { name, size: 56 }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
            "button",
            {
              type: "button",
              style: {
                position: "absolute",
                bottom: "-2px",
                right: "-2px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#1f2937",
                color: "white",
                border: "2px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Ico, { d: IC.camera, size: 10 })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: { fontSize: "15px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }, children: name }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: { fontSize: "13px", color: "#9ca3af", marginTop: "2px" }, children: email }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("button", { type: "button", className: "sp-btn-secondary", style: { marginTop: "8px", fontSize: "12px", padding: "4px 10px" }, children: "Change photo" })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "sp-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "sp-card-header", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { fontSize: "13.5px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }, children: "Personal information" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "sp-card-body", style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Field2, { label: "Display name", htmlFor: "sp-name", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("input", { id: "sp-name", className: "sp-input", value: name, onChange: (e) => setName(e.target.value) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Field2, { label: "Email address", htmlFor: "sp-email", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("input", { id: "sp-email", type: "email", className: "sp-input", value: email, onChange: (e) => setEmail(e.target.value) }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Field2, { label: "Role / title", htmlFor: "sp-role", hint: "Shown on your team profile", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("input", { id: "sp-role", className: "sp-input", value: role, onChange: (e) => setRole(e.target.value) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Field2, { label: "Bio", htmlFor: "sp-bio", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("textarea", { id: "sp-bio", className: "sp-textarea", value: bio, onChange: (e) => setBio(e.target.value), placeholder: "A short bio about yourself\u2026", rows: 3 }) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("button", { type: "submit", className: "sp-btn-primary", disabled: pending, children: pending ? /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_jsx_runtime56.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { width: "13px", height: "13px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "sp-spin 0.7s linear infinite", display: "inline-block" } }),
          "Saving\u2026"
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_jsx_runtime56.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Ico, { d: IC.check, size: 13 }),
          "Save changes"
        ] }) }),
        saved && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("span", { style: { fontSize: "13px", color: "#10b981", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Ico, { d: IC.check, size: 12, stroke: "#10b981" }),
          " Saved"
        ] })
      ] })
    ] });
  }
  function NotificationsSection() {
    const [st, setSt] = (0, import_react34.useState)({ email: true, slack: false, weekly: true, marketing: false, security: true });
    const toggle = (k) => setSt((s) => ({ ...s, [k]: !s[k] }));
    const groups = [
      {
        title: "Activity",
        icon: IC.bolt,
        items: [
          { key: "email", label: "Email notifications", desc: "Get notified when someone mentions you or assigns a task." },
          { key: "slack", label: "Slack notifications", desc: "Real-time alerts in your connected Slack workspace." }
        ]
      },
      {
        title: "Marketing",
        icon: IC.send,
        items: [
          { key: "weekly", label: "Weekly digest", desc: "A summary of workspace activity every Monday morning." },
          { key: "marketing", label: "Product updates", desc: "New features, changelogs, and tips from the Zephr team." }
        ]
      },
      {
        title: "Security",
        icon: IC.shield,
        items: [
          { key: "security", label: "Security alerts", desc: "Immediate alerts for suspicious logins or changes." }
        ]
      }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "sp-section", style: { display: "flex", flexDirection: "column", gap: "16px" }, children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "sp-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "sp-card-header", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "7px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Ico, { d: g.icon, size: 14 }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { fontSize: "13.5px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }, children: g.title })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "sp-card-body", style: { padding: "0 20px" }, children: g.items.map((row) => /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(ToggleRow, { label: row.label, desc: row.desc, value: st[row.key], onChange: () => toggle(row.key) }, row.key)) })
    ] }, g.title)) });
  }
  function TeamSection() {
    const members = [
      { name: "Akhil Krishnan", email: "akhil@zephr.ai", role: "Owner", color: "#335cff" },
      { name: "Maya Carter", email: "maya@zephr.ai", role: "Admin", color: "#8b5cf6" },
      { name: "Noah Kim", email: "noah@zephr.ai", role: "Member", color: "#06b6d4" },
      { name: "Liam Torres", email: "liam@zephr.ai", role: "Member", color: "#10b981" }
    ];
    const rolePill = {
      Owner: { bg: "#eff6ff", color: "#1d4ed8" },
      Admin: { bg: "#f5f3ff", color: "#6d28d9" },
      Member: { bg: "#f3f4f6", color: "#374151" }
    };
    const [invite, setInvite] = (0, import_react34.useState)("");
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "sp-section", style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "sp-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "sp-card-header", children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { fontSize: "13.5px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }, children: "Invite a teammate" }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { fontSize: "12px", color: "#9ca3af" }, children: "4 / 10 seats used" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "sp-card-body", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "sp-invite-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
            "input",
            {
              type: "email",
              className: "sp-invite-input",
              placeholder: "colleague@company.com",
              value: invite,
              onChange: (e) => setInvite(e.target.value)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("button", { type: "button", className: "sp-invite-btn", children: [
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Ico, { d: IC.send, size: 12 }),
            " Send invite"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "sp-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "sp-card-header", children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { fontSize: "13.5px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }, children: "Team members" }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("span", { style: { fontSize: "12px", color: "#9ca3af" }, children: [
            members.length,
            " members"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: { padding: "0 20px" }, children: members.map((m, i) => {
          const pill = rolePill[m.role] ?? rolePill.Member;
          return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 0",
            borderBottom: i < members.length - 1 ? "1px solid #f9fafb" : "none"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "sp-avatar", style: { width: 34, height: 34, fontSize: 12, background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)` }, children: m.name.split(" ").map((w) => w[0]).join("").slice(0, 2) }),
            /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: { fontSize: "13.5px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }, children: m.name }),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: { fontSize: "12px", color: "#9ca3af", marginTop: "1px" }, children: m.email })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: {
              fontSize: "11.5px",
              fontWeight: 600,
              padding: "2px 9px",
              borderRadius: "100px",
              background: pill.bg,
              color: pill.color,
              letterSpacing: "0.01em"
            }, children: m.role }),
            m.role !== "Owner" && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("button", { type: "button", className: "sp-btn-secondary", style: { fontSize: "11.5px", padding: "3px 9px" }, children: "Remove" })
          ] }, m.email);
        }) })
      ] })
    ] });
  }
  function DangerSection() {
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "sp-section", style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
      {
        title: "Deactivate account",
        desc: "Temporarily disable your account. You can reactivate it at any time by signing back in.",
        btn: "Deactivate",
        isDanger: false
      },
      {
        title: "Delete account",
        desc: "Permanently delete your account and all data associated with it. This action cannot be undone.",
        btn: "Delete account",
        isDanger: true
      }
    ].map((item) => /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "20px",
      padding: "18px 20px",
      background: "#fff",
      border: `1px solid ${item.isDanger ? "#fecaca" : "#eaecf0"}`,
      borderRadius: "12px",
      boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: { fontSize: "14px", fontWeight: 600, color: item.isDanger ? "#dc2626" : "#0f172a", marginBottom: "4px", letterSpacing: "-0.01em" }, children: item.title }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("p", { style: { margin: 0, fontSize: "13px", color: "#6b7280", lineHeight: 1.6 }, children: item.desc })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("button", { type: "button", className: item.isDanger ? "sp-btn-danger" : "sp-btn-secondary", children: item.btn })
    ] }, item.title)) });
  }
  var DEFAULT_SECTIONS = [
    { id: "profile", label: "Profile", icon: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Ico, { d: IC.user }), content: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(ProfileSection, {}) },
    { id: "notifications", label: "Notifications", icon: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Ico, { d: IC.bell }), content: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(NotificationsSection, {}) },
    { id: "team", label: "Team", icon: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Ico, { d: IC.users }), content: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(TeamSection, {}) },
    { id: "billing", label: "Billing", icon: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Ico, { d: IC.billing }), content: null },
    { id: "danger", label: "Danger Zone", icon: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Ico, { d: IC.shield }), content: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(DangerSection, {}) }
  ];
  function SettingsPage({
    sections,
    useDefaultSections = true,
    className,
    style
  }) {
    const resolved = sections ?? (useDefaultSections ? DEFAULT_SECTIONS : []);
    const [active, setActive] = (0, import_react34.useState)(resolved[0]?.id ?? "");
    const activeSection = resolved.find((s) => s.id === active);
    const isDanger = (id) => id === "danger";
    const sectionDesc = {
      profile: "Manage your personal information and profile photo.",
      notifications: "Control how and when you receive alerts.",
      team: "Invite teammates and manage access levels.",
      billing: "Manage your plan, invoices and payment method.",
      danger: "Irreversible actions \u2014 proceed with extreme caution."
    };
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(
      "div",
      {
        className: `sp-root${className ? ` ${className}` : ""}`,
        style: { background: "#f7f8fa", minHeight: "900px", display: "flex", flexDirection: "column", ...style },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("style", { children: STYLES3 }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("header", { style: {
            background: "#ffffff",
            borderBottom: "1px solid #eaecf0",
            height: "56px",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            gap: "12px",
            flexShrink: 0
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: {
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                background: "linear-gradient(135deg, #335cff 0%, #6366f1 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 4px rgba(51,92,255,0.3)"
              }, children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", fill: "white", stroke: "white", strokeWidth: "0.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { fontSize: "14.5px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em" }, children: "Zephr" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: { display: "flex", alignItems: "center", gap: "4px", color: "#9ca3af" }, children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Ico, { d: IC.chevron, size: 14 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { fontSize: "13.5px", color: "#6b7280", letterSpacing: "-0.01em" }, children: "Settings" }),
            /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { fontSize: "13px", fontWeight: 500, color: "#374151", letterSpacing: "-0.01em" }, children: "Akhil Krishnan" }),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Avatar2, { name: "Akhil Krishnan", size: 28 })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { display: "flex", flex: 1, minHeight: 0 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("aside", { style: {
              width: "224px",
              background: "#ffffff",
              borderRight: "1px solid #eaecf0",
              padding: "16px 10px",
              display: "flex",
              flexDirection: "column",
              flexShrink: 0
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(SectionLabel, { children: "Account" }),
              resolved.filter((s) => !isDanger(s.id) && s.id !== "billing").map((s) => /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(
                "button",
                {
                  type: "button",
                  className: `sp-nav-item${active === s.id ? " is-active" : ""}`,
                  onClick: () => setActive(s.id),
                  children: [
                    s.icon && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { display: "flex", opacity: active === s.id ? 1 : 0.6 }, children: s.icon }),
                    s.label
                  ]
                },
                s.id
              )),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(SectionLabel, { children: "Workspace" }),
              resolved.filter((s) => s.id === "team" || s.id === "billing").map((s) => /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(
                "button",
                {
                  type: "button",
                  className: `sp-nav-item${active === s.id ? " is-active" : ""}`,
                  onClick: () => setActive(s.id),
                  children: [
                    s.icon && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { display: "flex", opacity: active === s.id ? 1 : 0.6 }, children: s.icon }),
                    s.label
                  ]
                },
                s.id
              )),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: { flex: 1 } }),
              resolved.filter((s) => isDanger(s.id)).map((s) => /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(
                "button",
                {
                  type: "button",
                  className: `sp-nav-item is-danger${active === s.id ? " is-active" : ""}`,
                  onClick: () => setActive(s.id),
                  children: [
                    s.icon && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { display: "flex" }, children: s.icon }),
                    s.label,
                    active !== s.id && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { style: { marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "#dc2626", flexShrink: 0 } })
                  ]
                },
                s.id
              ))
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("main", { style: { flex: 1, padding: "28px 32px 48px", overflowY: "auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { maxWidth: "640px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { style: { marginBottom: "22px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("h1", { style: { margin: "0 0 4px", fontSize: "17px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em" }, children: activeSection?.label }),
                /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("p", { style: { margin: 0, fontSize: "13px", color: "#9ca3af", letterSpacing: "-0.005em" }, children: sectionDesc[active] ?? "" })
              ] }),
              activeSection?.content ?? /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "sp-card", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "sp-card-body", style: { textAlign: "center", padding: "48px 32px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: {
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px"
                }, children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Ico, { d: IC.billing, size: 20, stroke: "#9ca3af" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { style: { fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "6px" }, children: "Billing" }),
                /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("p", { style: { margin: "0 0 16px", fontSize: "13px", color: "#9ca3af", lineHeight: 1.6 }, children: "Your plan details, invoices, and payment method will appear here." }),
                /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("button", { type: "button", className: "sp-btn-primary", children: "Manage billing" })
              ] }) })
            ] }) })
          ] })
        ]
      }
    );
  }

  // ../ui-react/src/templates/OnboardingPage.tsx
  var import_react35 = __require("react");
  var import_jsx_runtime57 = __require("react/jsx-runtime");
  var CheckSVG = ({ size = 10, color = "white" }) => /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("polyline", { points: "20 6 9 17 4 12" }) });
  var ArrowRight = () => /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.25", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("path", { d: "M5 12h14M12 5l7 7-7 7" }) });
  function SetupChecklist({ items }) {
    return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "2px" }, children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "11px 14px",
          borderRadius: "10px",
          background: item.active ? "rgba(255,255,255,0.08)" : "transparent",
          border: item.active ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
          transition: "background 0.2s ease"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: {
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: item.done ? "#335cff" : item.active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
            border: item.done ? "none" : item.active ? "1.5px solid rgba(255,255,255,0.3)" : "1.5px solid rgba(255,255,255,0.12)",
            transition: "all 0.2s ease"
          }, children: item.done ? /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(CheckSVG, { size: 9 }) : /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { style: { fontSize: "10px", fontWeight: 700, color: item.active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)" }, children: i + 1 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { style: {
            fontSize: "13.5px",
            fontWeight: item.active ? 600 : 400,
            color: item.done ? "rgba(255,255,255,0.5)" : item.active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
            letterSpacing: "-0.01em",
            textDecoration: item.done ? "line-through" : "none",
            transition: "color 0.2s ease"
          }, children: item.label }),
          item.active && /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "#335cff", boxShadow: "0 0 8px rgba(51,92,255,0.8)" } })
        ]
      },
      i
    )) });
  }
  var STYLES4 = `
@keyframes ob-slide-in { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }
@keyframes ob-fade-up  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
@keyframes ob-spin     { to { transform:rotate(360deg); } }

.ob-root * { box-sizing:border-box; font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif; }

.ob-next-btn {
  display:inline-flex; align-items:center; gap:8px;
  padding:10px 20px; border-radius:10px;
  font-size:14px; font-weight:600; color:white;
  cursor:pointer; border:none;
  background:#111827;
  box-shadow:0 1px 2px rgba(0,0,0,0.12);
  transition:background 100ms,box-shadow 100ms,transform 80ms;
  letter-spacing:-0.01em;
}
.ob-next-btn:hover { background:#0f172a; box-shadow:0 4px 12px rgba(0,0,0,0.18); transform:translateY(-1px); }
.ob-next-btn:active { transform:scale(0.99); }

.ob-back-btn {
  display:inline-flex; align-items:center; gap:6px;
  padding:9px 16px; border-radius:10px;
  font-size:13.5px; font-weight:500; color:#6b7280;
  cursor:pointer; border:1px solid #e5e7eb; background:#fff;
  transition:background 100ms,border-color 100ms;
  letter-spacing:-0.01em;
}
.ob-back-btn:hover { background:#f9fafb; border-color:#d1d5db; }

.ob-pack-card {
  display:flex; align-items:center; gap:14px;
  padding:12px 14px; border-radius:10px; cursor:pointer;
  border:1.5px solid #eaecf0; background:#fff;
  transition:border-color 120ms,box-shadow 120ms,background 120ms;
}
.ob-pack-card:hover { border-color:#c7d2fe; box-shadow:0 2px 8px rgba(51,92,255,0.06); }
.ob-pack-card.is-selected { border-color:#335cff; background:#f5f7ff; box-shadow:0 0 0 3px rgba(51,92,255,0.1); }

@media (max-width:560px) {
  .ob-left { display:none !important; }
}
`;
  var CODE_SNIPPET = `import { Button } from "@zephrui/ui-react";

export default function App() {
  return <Button>Hello Zephr \u26A1</Button>;
}`;
  function WelcomeContent() {
    return /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "14px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("p", { style: { margin: 0, fontSize: "14.5px", color: "#6b7280", lineHeight: 1.7, letterSpacing: "-0.01em" }, children: "Zephr gives you 200+ production-ready React components, unified design tokens, and AI-powered tooling \u2014 everything you need to ship premium UI fast." }),
      /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }, children: [
        { icon: "\u26A1", label: "Zero config", desc: "Works out of the box" },
        { icon: "\u{1F3A8}", label: "Accent tokens", desc: "Personalize the core accent" },
        { icon: "\u{1F916}", label: "AI-native", desc: "Built for LLM tooling" },
        { icon: "\u{1F4E6}", label: "200+ comps", desc: "Every pattern covered" }
      ].map((f) => /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: {
        padding: "14px",
        borderRadius: "10px",
        background: "#f9fafb",
        border: "1px solid #f0f0f2"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { fontSize: "20px", marginBottom: "6px" }, children: f.icon }),
        /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { fontSize: "13px", fontWeight: 600, color: "#111827", letterSpacing: "-0.01em" }, children: f.label }),
        /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { fontSize: "12px", color: "#9ca3af", marginTop: "2px" }, children: f.desc })
      ] }, f.label)) })
    ] });
  }
  function InstallContent() {
    const [pm, setPm] = (0, import_react35.useState)("pnpm");
    const cmds = {
      pnpm: "pnpm add @zephrui/ui-react",
      npm: "npm install @zephrui/ui-react",
      yarn: "yarn add @zephrui/ui-react"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: {
        display: "inline-flex",
        background: "#f3f4f6",
        borderRadius: "8px",
        padding: "3px",
        gap: "2px"
      }, children: ["pnpm", "npm", "yarn"].map((p) => /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("button", { type: "button", onClick: () => setPm(p), style: {
        padding: "4px 12px",
        borderRadius: "6px",
        border: "none",
        background: pm === p ? "#fff" : "transparent",
        color: pm === p ? "#111827" : "#6b7280",
        fontSize: "12.5px",
        fontWeight: pm === p ? 600 : 400,
        cursor: "pointer",
        boxShadow: pm === p ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
        transition: "all 100ms"
      }, children: p }, p)) }),
      /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { background: "#0f172a", borderRadius: "10px", padding: "14px 16px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { fontSize: "10.5px", color: "#475569", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.07em" }, children: "Terminal" }),
        /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("code", { style: { fontFamily: "'IBM Plex Mono', 'Fira Code', monospace", fontSize: "13.5px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { style: { color: "#475569" }, children: "$" }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { style: { color: pm === "npm" ? "#e74c8b" : pm === "pnpm" ? "#f59e0b" : "#2b8fd7", fontWeight: 600 }, children: pm === "npm" ? "npm" : pm === "pnpm" ? "pnpm" : "yarn" }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { style: { color: "#60a5fa" }, children: pm === "npm" ? "install" : pm === "pnpm" ? "add" : "add" }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { style: { color: "#e2e8f0" }, children: "@zephrui/ui-react" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "14px 16px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { fontSize: "10.5px", color: "#15803d", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.07em" }, children: "Usage" }),
        /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("pre", { style: { margin: 0, fontFamily: "'IBM Plex Mono', 'Fira Code', monospace", fontSize: "12px", color: "#166534", lineHeight: 1.7 }, children: CODE_SNIPPET })
      ] })
    ] });
  }
  function AccentContent() {
    const [selected, setSelected] = (0, import_react35.useState)("indigo");
    const accents = [
      { name: "indigo", desc: "Balanced product accent for polished interfaces.", swatches: ["#335cff", "#dbe4ff", "#ffffff"] },
      { name: "teal", desc: "Calm operational accent for product and support surfaces.", swatches: ["#0f766e", "#ccfbf1", "#ffffff"] },
      { name: "orange", desc: "High-signal accent for growth, actions, and CTAs.", swatches: ["#f97316", "#ffedd5", "#ffffff"] },
      { name: "violet", desc: "Expressive accent for AI, insights, and creative tooling.", swatches: ["#7c3aed", "#ede9fe", "#ffffff"] }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: accents.map((p) => /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(
      "button",
      {
        type: "button",
        className: `ob-pack-card${selected === p.name ? " is-selected" : ""}`,
        onClick: () => setSelected(p.name),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { display: "flex", gap: "3px", flexShrink: 0 }, children: p.swatches.map((c, j) => /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { width: "10px", height: "32px", borderRadius: "4px", background: c, border: "1px solid rgba(0,0,0,0.07)" } }, j)) }),
          /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { flex: 1, textAlign: "left" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { fontSize: "13.5px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }, children: p.name }),
            /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { fontSize: "12px", color: "#6b7280", marginTop: "2px" }, children: p.desc })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: {
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            flexShrink: 0,
            background: selected === p.name ? "#335cff" : "#f3f4f6",
            border: selected === p.name ? "none" : "1.5px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 120ms"
          }, children: selected === p.name && /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(CheckSVG, { size: 9 }) })
        ]
      },
      p.name
    )) });
  }
  var DEFAULT_STEPS = [
    {
      id: "welcome",
      emoji: "\u{1F44B}",
      title: "Welcome to Zephr",
      subtitle: "The AI-native UI system \u2014 production-ready, beautiful by default.",
      nextLabel: "Get started",
      content: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(WelcomeContent, {})
    },
    {
      id: "install",
      emoji: "\u{1F4E6}",
      title: "Install the package",
      subtitle: "One command, zero configuration required.",
      nextLabel: "Done, continue",
      content: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(InstallContent, {})
    },
    {
      id: "accent",
      emoji: "\u{1F3A8}",
      title: "Choose your accent",
      subtitle: "Keep the premium default theme and personalize the accent across the product.",
      nextLabel: "Finish setup",
      content: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(AccentContent, {})
    }
  ];
  function OnboardingPage({
    steps = DEFAULT_STEPS,
    brand,
    onComplete,
    className,
    style
  }) {
    const [idx, setIdx] = (0, import_react35.useState)(0);
    const step = steps[idx];
    const isLast = idx === steps.length - 1;
    const pct = Math.round((idx + 1) / steps.length * 100);
    const checklistItems = steps.map((s, i) => ({
      label: s.title,
      done: i < idx,
      active: i === idx
    }));
    return /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(
      "div",
      {
        className: `ob-root${className ? ` ${className}` : ""}`,
        style: { minHeight: "760px", display: "grid", gridTemplateColumns: "2fr 3fr", ...style },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("style", { children: STYLES4 }),
          /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(
            "div",
            {
              className: "ob-left",
              style: {
                position: "relative",
                overflow: "hidden",
                background: "#0a0d14",
                display: "flex",
                flexDirection: "column",
                padding: "clamp(2rem, 3.5vw, 3rem)"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { "aria-hidden": true, style: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { position: "absolute", top: "-20%", left: "-15%", width: "70%", height: "70%", borderRadius: "50%", background: "radial-gradient(circle, rgba(51,92,255,0.2) 0%, transparent 70%)", filter: "blur(48px)" } }),
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", filter: "blur(60px)" } })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { "aria-hidden": true, style: { position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(51,92,255,0.5) 40%, rgba(99,102,241,0.4) 60%, transparent)" } }),
                /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { position: "relative", zIndex: 1, marginBottom: "auto" }, children: brand ?? /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "9px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: {
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #335cff 0%, #6366f1 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 4px 12px rgba(51,92,255,0.35)"
                  }, children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", fill: "white" }) }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { style: { fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.03em" }, children: "Zephr" })
                ] }) }),
                /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { position: "relative", zIndex: 1, marginBottom: "24px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("p", { style: { margin: "0 0 4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }, children: "Setup progress" }),
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("h2", { style: { margin: "0 0 6px", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.04em", color: "#ffffff", lineHeight: 1.2 }, children: pct === 100 ? "All done! \u{1F389}" : `${pct}% complete` }),
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { width: "100%", height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "99px", overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #335cff, #6366f1)", borderRadius: "99px", transition: "width 0.4s ease" } }) })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { position: "relative", zIndex: 1, marginBottom: "32px" }, children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(SetupChecklist, { items: checklistItems }) }),
                /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { position: "relative", zIndex: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: {
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px",
                  padding: "16px"
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("p", { style: { margin: "0 0 10px", fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.6)", fontStyle: "italic", letterSpacing: "-0.01em" }, children: "\u201CTakes about 3 minutes to get from zero to production-ready UI.\u201D" }),
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg, #335cff, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, color: "white" }, children: "SC" }),
                    /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }, children: "Sarah Chen" }),
                      /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { fontSize: "11px", color: "rgba(255,255,255,0.35)" }, children: "Staff Eng, Vercel" })
                    ] })
                  ] })
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: {
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(2rem, 5vw, 4rem)"
          }, children: /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { width: "100%", maxWidth: "440px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { display: "flex", alignItems: "center", marginBottom: "36px" }, children: steps.map((s, i) => {
              const done = i < idx;
              const active = i === idx;
              return /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: {
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: done ? "#111827" : active ? "#fff" : "#f3f4f6",
                    border: active ? "2px solid #111827" : done ? "none" : "2px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: active ? "0 0 0 4px rgba(17,24,39,0.08)" : "none",
                    transition: "all 0.25s ease",
                    flexShrink: 0
                  }, children: done ? /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(CheckSVG, { size: 11, color: "white" }) : /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { style: { fontSize: "11px", fontWeight: 700, color: active ? "#111827" : "#9ca3af" }, children: i + 1 }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { style: { fontSize: "10.5px", fontWeight: active ? 600 : 400, color: active ? "#111827" : done ? "#9ca3af" : "#c4c9d4", letterSpacing: "-0.005em", whiteSpace: "nowrap" }, children: s.id.charAt(0).toUpperCase() + s.id.slice(1) })
                ] }),
                i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { flex: 1, height: "2px", background: done ? "#111827" : "#e5e7eb", margin: "0 8px", marginBottom: "18px", borderRadius: "999px", transition: "background 0.3s ease" } })
              ] }, s.id);
            }) }),
            /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { animation: "ob-slide-in 0.3s ease both" }, children: [
              step?.emoji && /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: {
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #f3f4f6, #ffffff)",
                border: "1px solid #eaecf0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                marginBottom: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
              }, children: step.emoji }),
              /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("h2", { style: { margin: "0 0 6px", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.04em", color: "#0f172a", lineHeight: 1.2 }, children: step?.title }),
              step?.subtitle && /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("p", { style: { margin: "0 0 24px", fontSize: "14.5px", color: "#6b7280", lineHeight: 1.6, letterSpacing: "-0.01em" }, children: step.subtitle }),
              /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { style: { marginBottom: "28px" }, children: step?.content }),
              /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { children: idx > 0 && /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("button", { type: "button", className: "ob-back-btn", onClick: () => setIdx((i) => Math.max(0, i - 1)), children: "\u2190 Back" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(
                  "button",
                  {
                    type: "button",
                    className: "ob-next-btn",
                    onClick: () => isLast ? onComplete?.() : setIdx((i) => i + 1),
                    children: [
                      step?.nextLabel ?? (isLast ? "Finish" : "Continue"),
                      !isLast && /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(ArrowRight, {})
                    ]
                  }
                )
              ] })
            ] }, idx),
            /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("p", { style: { marginTop: "20px", textAlign: "center", fontSize: "12px", color: "#c4c9d4", letterSpacing: "-0.005em" }, children: "You can change these settings anytime from your dashboard." })
          ] }) })
        ]
      }
    );
  }

  // ../ui-react/src/templates/MarketingPage.tsx
  var import_react36 = __require("react");
  var import_jsx_runtime58 = __require("react/jsx-runtime");
  var CheckSVG2 = () => /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "#335cff", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("polyline", { points: "20 6 9 17 4 12" }) });
  var ArrowRight2 = ({ size = 14, color = "currentColor" }) => /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2.25", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("path", { d: "M5 12h14M12 5l7 7-7 7" }) });
  function ProductMockup() {
    return /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(
      "svg",
      {
        viewBox: "0 0 860 460",
        width: "100%",
        style: { borderRadius: "12px", display: "block" },
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { width: "860", height: "460", rx: "10", fill: "#0f1420" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { width: "860", height: "38", rx: "0", fill: "#161b2e" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { y: "0", width: "860", height: "38", rx: "10", fill: "#161b2e" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { y: "28", width: "860", height: "10", fill: "#161b2e" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("circle", { cx: "20", cy: "19", r: "5", fill: "#ff5f57" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("circle", { cx: "36", cy: "19", r: "5", fill: "#febc2e" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("circle", { cx: "52", cy: "19", r: "5", fill: "#28c840" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "180", y: "10", width: "500", height: "18", rx: "5", fill: "#1e2538" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: "430", y: "22.5", textAnchor: "middle", fill: "rgba(255,255,255,0.3)", fontSize: "10", fontFamily: "-apple-system,sans-serif", children: "zephr.app/dashboard" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "0", y: "38", width: "190", height: "422", fill: "#111827" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "16", y: "56", width: "26", height: "26", rx: "7", fill: "url(#mpGrad)" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: "46", y: "74", fill: "rgba(255,255,255,0.9)", fontSize: "13", fontWeight: "700", fontFamily: "-apple-system,sans-serif", letterSpacing: "-0.5", children: "Zephr" }),
          [
            { y: 104, label: "Dashboard", active: true },
            { y: 128, label: "Components", active: false },
            { y: 152, label: "Style Packs", active: false },
            { y: 176, label: "Settings", active: false }
          ].map((item) => /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("g", { children: [
            item.active && /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "8", y: item.y - 10, width: "174", height: "26", rx: "6", fill: "rgba(51,92,255,0.2)" }),
            item.active && /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "8", y: item.y - 10, width: "3", height: "26", rx: "2", fill: "#335cff" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: "24", y: item.y + 8, fill: item.active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)", fontSize: "12", fontFamily: "-apple-system,sans-serif", fontWeight: item.active ? "600" : "400", children: item.label })
          ] }, item.y)),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "190", y: "38", width: "670", height: "422", fill: "#f8fafc" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "190", y: "38", width: "670", height: "48", fill: "#ffffff" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "190", y: "85", width: "670", height: "1", fill: "#e2e8f0" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: "210", y: "68", fill: "#0f172a", fontSize: "16", fontWeight: "700", fontFamily: "-apple-system,sans-serif", letterSpacing: "-0.5", children: "Dashboard" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "500", y: "52", width: "160", height: "22", rx: "6", fill: "#f1f5f9" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: "512", y: "66", fill: "#94a3b8", fontSize: "10", fontFamily: "-apple-system,sans-serif", children: "Search..." }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("circle", { cx: "790", cy: "63", r: "14", fill: "url(#mpGrad)" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: "790", y: "67.5", textAnchor: "middle", fill: "white", fontSize: "9", fontWeight: "700", fontFamily: "-apple-system,sans-serif", children: "SC" }),
          [
            { x: 210, label: "Components", value: "200+", sub: "foundation to pages", color: "#335cff" },
            { x: 380, label: "Widgets", value: "40+", sub: "real product blocks", color: "#8b5cf6" },
            { x: 550, label: "AI Prompts", value: "48", sub: "context-ready snippets", color: "#06b6d4" },
            { x: 720, label: "Saved Time", value: "3\xD7", sub: "faster first ship", color: "#10b981" }
          ].map((card) => /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("g", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: card.x, y: "100", width: "150", height: "78", rx: "10", fill: "#ffffff" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: card.x, y: "100", width: "150", height: "78", rx: "10", fill: "none", stroke: "#e2e8f0", strokeWidth: "1" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: card.x + 14, y: "122", fill: "#64748b", fontSize: "11", fontFamily: "-apple-system,sans-serif", children: card.label }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: card.x + 14, y: "148", fill: "#0f172a", fontSize: "22", fontWeight: "800", fontFamily: "-apple-system,sans-serif", letterSpacing: "-1", children: card.value }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: card.x + 14, y: "166", fill: card.color, fontSize: "10", fontFamily: "-apple-system,sans-serif", children: card.sub }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: card.x + 118, y: "104", width: "28", height: "28", rx: "8", fill: `${card.color}18` }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: card.x + 124, y: "114", width: "16", height: "8", rx: "3", fill: card.color, opacity: "0.6" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: card.x + 124, y: "110", width: "10", height: "12", rx: "2", fill: card.color, opacity: "0.3" })
          ] }, card.x)),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "210", y: "194", width: "320", height: "250", rx: "10", fill: "#ffffff" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "210", y: "194", width: "320", height: "250", rx: "10", fill: "none", stroke: "#e2e8f0", strokeWidth: "1" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: "226", y: "218", fill: "#0f172a", fontSize: "13", fontWeight: "700", fontFamily: "-apple-system,sans-serif", letterSpacing: "-0.3", children: "Component Library" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: "226", y: "232", fill: "#94a3b8", fontSize: "10", fontFamily: "-apple-system,sans-serif", children: "29 free \xB7 29 Pro" }),
          [
            { x: 226, y: 246, name: "Button", bg: "#f8fafc" },
            { x: 326, y: 246, name: "Input", bg: "#f8fafc" },
            { x: 426, y: 246, name: "Badge", bg: "#f8fafc" },
            { x: 226, y: 316, name: "Avatar", bg: "#f8fafc" },
            { x: 326, y: 316, name: "Switch", bg: "#f8fafc" },
            { x: 426, y: 316, name: "Card", bg: "#f8fafc" }
          ].map((comp) => /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("g", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: comp.x, y: comp.y, width: "90", height: "62", rx: "7", fill: comp.bg }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: comp.x, y: comp.y, width: "90", height: "62", rx: "7", fill: "none", stroke: "#e2e8f0", strokeWidth: "1" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: comp.x + 30, y: comp.y + 12, width: "30", height: "22", rx: "4", fill: "#e2e8f0" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: comp.x + 45, y: comp.y + 52, textAnchor: "middle", fill: "#64748b", fontSize: "9.5", fontFamily: "-apple-system,sans-serif", fontWeight: "600", children: comp.name })
          ] }, `${comp.x}-${comp.y}`)),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "544", y: "194", width: "316", height: "250", rx: "10", fill: "#ffffff" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: "544", y: "194", width: "316", height: "250", rx: "10", fill: "none", stroke: "#e2e8f0", strokeWidth: "1" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: "560", y: "218", fill: "#0f172a", fontSize: "13", fontWeight: "700", fontFamily: "-apple-system,sans-serif", letterSpacing: "-0.3", children: "Premium widgets" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: "560", y: "232", fill: "#94a3b8", fontSize: "10", fontFamily: "-apple-system,sans-serif", children: "workflows, forms, metrics, AI" }),
          [
            { x: 560, y: 244, name: "Approval", color1: "#f97316", color2: "#fdba74", badge: "Workflow" },
            { x: 680, y: 244, name: "Composer", color1: "#7c3aed", color2: "#c4b5fd", badge: "AI" },
            { x: 560, y: 330, name: "Insights", color1: "#06b6d4", color2: "#67e8f9", badge: "Metrics" },
            { x: 680, y: 330, name: "Onboarding", color1: "#10b981", color2: "#86efac", badge: "Setup" }
          ].map((pack) => /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("g", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: pack.x, y: pack.y, width: "106", height: "72", rx: "8", fill: "#f8fafc" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: pack.x, y: pack.y, width: "106", height: "72", rx: "8", fill: "none", stroke: "#e2e8f0", strokeWidth: "1" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("circle", { cx: pack.x + 18, cy: pack.y + 26, r: "10", fill: pack.color1 }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("circle", { cx: pack.x + 34, cy: pack.y + 26, r: "10", fill: pack.color2 }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("circle", { cx: pack.x + 50, cy: pack.y + 26, r: "10", fill: "#ffffff" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: pack.x + 10, y: pack.y + 52, fill: "#0f172a", fontSize: "11", fontWeight: "600", fontFamily: "-apple-system,sans-serif", children: pack.name }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { x: pack.x + 58, y: pack.y + 8, width: "40", height: "14", rx: "4", fill: "rgba(51,92,255,0.1)" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("text", { x: pack.x + 78, y: pack.y + 18, textAnchor: "middle", fill: "#335cff", fontSize: "8.5", fontWeight: "700", fontFamily: "-apple-system,sans-serif", children: pack.badge })
          ] }, pack.name)),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("linearGradient", { id: "mpGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("stop", { offset: "0%", stopColor: "#335cff" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("stop", { offset: "100%", stopColor: "#6366f1" })
          ] }) })
        ]
      }
    );
  }
  var STYLES5 = `
.mp-root * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; }

/* Navbar */
.mp-nav-link {
  font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,0.55);
  text-decoration: none; cursor: pointer; transition: color 150ms;
  padding: 4px 0;
}
.mp-nav-link:hover { color: rgba(255,255,255,0.9); }

/* Buttons */
.mp-cta-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 22px; border-radius: 10px;
  background: #ffffff; color: #0f172a;
  font-size: 14px; font-weight: 600; letter-spacing: -0.01em;
  border: none; cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  transition: background 100ms, box-shadow 100ms, transform 80ms;
}
.mp-cta-primary:hover { background: #f0f4ff; box-shadow: 0 4px 16px rgba(0,0,0,0.15); transform: translateY(-1px); }
.mp-cta-primary:active { transform: scale(0.99); }

.mp-cta-secondary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 22px; border-radius: 10px;
  background: transparent; color: rgba(255,255,255,0.75);
  font-size: 14px; font-weight: 500; letter-spacing: -0.01em;
  border: 1px solid rgba(255,255,255,0.18); cursor: pointer;
  transition: border-color 100ms, color 100ms, background 100ms;
}
.mp-cta-secondary:hover { border-color: rgba(255,255,255,0.35); color: rgba(255,255,255,0.95); background: rgba(255,255,255,0.06); }

/* Feature cards */
.mp-feature-card {
  padding: 24px; border-radius: 12px;
  background: #ffffff; border: 1px solid #eaecf0;
  transition: border-color 150ms, box-shadow 150ms, transform 150ms;
}
.mp-feature-card:hover { border-color: #c7d2fe; box-shadow: 0 4px 20px rgba(51,92,255,0.07); transform: translateY(-2px); }

/* Testimonial cards */
.mp-testimonial-card {
  padding: 28px; border-radius: 14px;
  background: #ffffff; border: 1px solid #eaecf0;
}

/* Pricing cards */
.mp-plan-card {
  padding: 28px; border-radius: 14px;
  background: #ffffff; border: 1px solid #eaecf0;
  position: relative;
  transition: border-color 150ms, box-shadow 150ms;
}
.mp-plan-card:hover { border-color: #c7d2fe; box-shadow: 0 4px 24px rgba(51,92,255,0.08); }
.mp-plan-card.is-pro {
  background: #0f172a; border-color: #1e293b;
  box-shadow: 0 8px 40px rgba(0,0,0,0.25);
}
.mp-plan-card.is-pro:hover { border-color: #334155; box-shadow: 0 12px 48px rgba(0,0,0,0.35); }

/* Plan CTA buttons */
.mp-plan-btn {
  width: 100%; padding: 10px; border-radius: 9px;
  font-size: 14px; font-weight: 600; cursor: pointer;
  border: 1px solid #e2e8f0; background: #ffffff; color: #0f172a;
  transition: background 100ms, border-color 100ms;
  letter-spacing: -0.01em;
}
.mp-plan-btn:hover { background: #f8fafc; border-color: #c7d2fe; }
.mp-plan-btn.is-pro {
  background: #335cff; color: #ffffff;
  border: none;
  box-shadow: 0 1px 2px rgba(51,92,255,0.3), 0 4px 12px rgba(51,92,255,0.25);
}
.mp-plan-btn.is-pro:hover { background: #2448e8; box-shadow: 0 1px 2px rgba(51,92,255,0.4), 0 6px 16px rgba(51,92,255,0.35); }

/* Footer install command */
.mp-install-cmd {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 12px 20px; border-radius: 10px;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
  font-size: 14px; color: rgba(255,255,255,0.85);
  font-family: 'SF Mono','JetBrains Mono','Fira Code',monospace;
  letter-spacing: -0.02em;
}

@keyframes mp-fade-up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
`;
  var defaultFeatures = [
    { id: "f1", title: "Zero Config", description: "One install command, works immediately. No setup files, no config, no fighting with build tools.", icon: "\u26A1" },
    { id: "f2", title: "AI-Native", description: "Every component ships with an AI prompt. Claude, Cursor, and Copilot understand your UI out of the box.", icon: "\u{1F916}" },
    { id: "f3", title: "Premium default theme", description: "One polished visual system with accent customization, premium spacing, and consistent surfaces across the whole product.", icon: "\u{1F3A8}" },
    { id: "f4", title: "Dark Mode Built-in", description: "Every token has a dark-mode variant. Light/dark switching works without extra code.", icon: "\u{1F319}" },
    { id: "f5", title: "No Utility Classes", description: "Components self-style via CSS variables. Zero Tailwind dependency, zero className pollution.", icon: "\u2702\uFE0F" },
    { id: "f6", title: "Free to Start", description: "All 55 components, 4 style packs, and CLI tools \u2014 completely free, no account required. Pay once for premium page examples.", icon: "\u{1F381}" }
  ];
  var defaultPlans = [
    {
      id: "templates",
      name: "Zephr Templates",
      price: "$49",
      period: "one-time",
      description: "Lifetime access to all 20 premium page examples. All future examples included.",
      features: [
        "20 production-ready page examples",
        "Ops Center, CRM, Analytics, Support Desk, and more",
        "All future examples included",
        "Use in unlimited projects",
        "License key \u2014 instant delivery"
      ],
      ctaLabel: "Get Templates",
      highlighted: true
    }
  ];
  var defaultLogos = ["Vercel", "Supabase", "Stripe", "Linear", "Notion", "Planetscale"];
  var defaultTestimonials = [
    {
      id: "t1",
      quote: "Zephr cut our component development time in half. The AI prompts are genuinely useful \u2014 not a gimmick.",
      name: "Sarah Chen",
      title: "Staff Engineer, Vercel",
      avatarColor: "#335cff"
    },
    {
      id: "t2",
      quote: "We switched from shadcn and haven't looked back. Style packs make every project feel uniquely designed.",
      name: "Marcus Rodriguez",
      title: "Design Lead, Linear",
      avatarColor: "#8b5cf6"
    },
    {
      id: "t3",
      quote: "Finally, a component library that AI tools actually understand. Our team ships features 3\xD7 faster now.",
      name: "Priya Patel",
      title: "CTO, Acme Labs",
      avatarColor: "#10b981"
    }
  ];
  function MarketingPage({
    brand,
    heroTitle = "Build beautiful UIs \u2014 instantly.",
    heroSubtitle = "The AI-native component system. 200+ components, premium widgets, zero config, and a polished default visual system. Ship production UI in minutes.",
    heroBadge = "New in v0.4",
    features = defaultFeatures,
    pricingPlans = defaultPlans,
    logos = defaultLogos,
    testimonials = defaultTestimonials,
    ctaLabel = "Get Started Free",
    secondaryCtaLabel = "View Docs",
    onCtaClick,
    onSecondaryCtaClick,
    className,
    style
  }) {
    const hasAnnualPricing = pricingPlans.some((p) => p.priceAnnual);
    const [billingAnnual, setBillingAnnual] = (0, import_react36.useState)(false);
    return /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(
      "div",
      {
        className: `mp-root${className ? ` ${className}` : ""}`,
        style: { background: "#ffffff", ...style },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("style", { children: STYLES5 }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("section", { style: {
            background: "#0a0d14",
            position: "relative",
            overflow: "hidden",
            paddingBottom: "0"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { "aria-hidden": true, style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: { position: "absolute", top: "-10%", left: "20%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, rgba(51,92,255,0.18) 0%, transparent 65%)", filter: "blur(80px)" } }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: { position: "absolute", top: "30%", right: "-10%", width: "40%", height: "40%", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)", filter: "blur(60px)" } }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: { position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(51,92,255,0.6) 40%, rgba(99,102,241,0.5) 60%, transparent)" } }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("svg", { style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }, xmlns: "http://www.w3.org/2000/svg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("pattern", { id: "mp-dots", x: "0", y: "0", width: "28", height: "28", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("circle", { cx: "1.5", cy: "1.5", r: "1.5", fill: "rgba(255,255,255,0.5)" }) }) }),
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("rect", { width: "100%", height: "100%", fill: "url(#mp-dots)" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("nav", { style: {
              position: "relative",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 clamp(1.5rem, 4vw, 3rem)",
              height: "60px",
              borderBottom: "1px solid rgba(255,255,255,0.06)"
            }, children: [
              brand ?? /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "9px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: {
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #335cff 0%, #6366f1 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 4px 12px rgba(51,92,255,0.35)",
                  flexShrink: 0
                }, children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", fill: "white" }) }) }),
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { style: { fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.03em" }, children: "Zephr" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: { display: "flex", alignItems: "center", gap: "28px" }, children: ["Docs", "Components", "Widgets", "Pricing"].map((link) => /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { className: "mp-nav-link", children: link }, link)) }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { className: "mp-nav-link", style: { cursor: "pointer" }, children: "Sign in" }),
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("button", { className: "mp-cta-primary", style: { padding: "7px 16px", fontSize: "13px" }, onClick: onCtaClick, children: "Get started" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: {
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem) 0",
              maxWidth: "860px",
              margin: "0 auto"
            }, children: [
              heroBadge && /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "5px 14px",
                borderRadius: "99px",
                background: "rgba(51,92,255,0.15)",
                border: "1px solid rgba(51,92,255,0.3)",
                marginBottom: "24px"
              }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { style: { width: "6px", height: "6px", borderRadius: "50%", background: "#335cff", display: "block", boxShadow: "0 0 8px rgba(51,92,255,0.9)" } }),
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { style: { fontSize: "12px", fontWeight: 600, color: "#93b4ff", letterSpacing: "0.01em" }, children: heroBadge })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("h1", { style: {
                margin: "0 0 20px",
                fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.08,
                letterSpacing: "-0.05em"
              }, children: heroTitle }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("p", { style: {
                margin: "0 auto 32px",
                maxWidth: "560px",
                fontSize: "clamp(1rem, 2vw, 1.1rem)",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
                letterSpacing: "-0.01em"
              }, children: heroSubtitle }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: { display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("button", { className: "mp-cta-primary", onClick: onCtaClick, children: [
                  ctaLabel,
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(ArrowRight2, { size: 14, color: "#0f172a" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("button", { className: "mp-cta-secondary", onClick: onSecondaryCtaClick, children: secondaryCtaLabel })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: {
              position: "relative",
              zIndex: 1,
              maxWidth: "900px",
              margin: "0 auto",
              padding: "0 clamp(1rem, 3vw, 2rem)",
              paddingBottom: 0
            }, children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: {
              borderRadius: "12px 12px 0 0",
              border: "1px solid rgba(255,255,255,0.1)",
              borderBottom: "none",
              overflow: "hidden",
              boxShadow: "0 -20px 80px rgba(51,92,255,0.15), 0 0 0 1px rgba(255,255,255,0.06)"
            }, children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(ProductMockup, {}) }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("section", { style: {
            padding: "40px clamp(1.5rem, 4vw, 3rem)",
            borderBottom: "1px solid #f0f2f5",
            background: "#fafbfc"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("p", { style: {
              textAlign: "center",
              margin: "0 0 24px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#94a3b8"
            }, children: "Trusted by developers at" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(1.5rem, 4vw, 3.5rem)", flexWrap: "wrap" }, children: logos.map((logo, i) => {
              const name = typeof logo === "string" ? logo : logo.name;
              return /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { style: {
                fontSize: "15px",
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: "-0.02em",
                opacity: 0.7 + i % 3 * 0.1
              }, children: name }, name);
            }) })
          ] }),
          features.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("section", { style: { padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)", maxWidth: "1120px", margin: "0 auto" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: { textAlign: "center", marginBottom: "52px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("p", { style: { margin: "0 0 10px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#335cff" }, children: "Why Zephr" }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("h2", { style: { margin: "0 0 14px", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.15 }, children: "Everything you need to ship" }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("p", { style: { margin: 0, maxWidth: "520px", marginLeft: "auto", marginRight: "auto", fontSize: "16px", color: "#64748b", lineHeight: 1.7 }, children: "Production-ready components with a workflow built for AI-assisted development." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }, children: features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "mp-feature-card", children: [
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: {
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #f0f4ff, #e8eeff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                marginBottom: "16px",
                border: "1px solid rgba(51,92,255,0.1)"
              }, children: feature.icon }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("h3", { style: { margin: "0 0 8px", fontSize: "15px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }, children: feature.title }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("p", { style: { margin: 0, fontSize: "13.5px", color: "#64748b", lineHeight: 1.7 }, children: feature.description })
            ] }, feature.id)) })
          ] }),
          testimonials.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("section", { style: { padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)", background: "#f8fafc" }, children: /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: { maxWidth: "1120px", margin: "0 auto" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: { textAlign: "center", marginBottom: "48px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("h2", { style: { margin: "0 0 10px", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.04em" }, children: "Loved by builders" }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("p", { style: { margin: 0, color: "#64748b", fontSize: "16px" }, children: "Join thousands of developers shipping faster with Zephr." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }, children: testimonials.map((t) => /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "mp-testimonial-card", children: [
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: { fontSize: "36px", color: "#335cff", lineHeight: 1, marginBottom: "12px", fontFamily: "Georgia, serif" }, children: "\u201C" }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("p", { style: { margin: "0 0 20px", fontSize: "14.5px", color: "#334155", lineHeight: 1.75, letterSpacing: "-0.01em" }, children: t.quote }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: {
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: t.avatarColor ?? "#335cff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0
                }, children: t.name.split(" ").map((w) => w[0]).join("").slice(0, 2) }),
                /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: { fontSize: "13.5px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em" }, children: t.name }),
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: { fontSize: "12px", color: "#94a3b8" }, children: t.title })
                ] })
              ] })
            ] }, t.id)) })
          ] }) }),
          pricingPlans.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("section", { style: { padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)", maxWidth: "1120px", margin: "0 auto" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: { textAlign: "center", marginBottom: "52px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("h2", { style: { margin: "0 0 12px", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.04em" }, children: "One plan. One price." }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("p", { style: { margin: "0 0 20px", fontSize: "16px", color: "#64748b" }, children: "All components are free. Pay once to unlock premium page examples." }),
              hasAnnualPricing && /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: { display: "inline-flex", alignItems: "center", gap: "10px", background: "#f1f5f9", borderRadius: "99px", padding: "5px 6px 5px 16px", fontSize: "13.5px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { style: { color: billingAnnual ? "#94a3b8" : "#0f172a", fontWeight: billingAnnual ? 400 : 600, transition: "color 150ms" }, children: "Monthly" }),
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(
                  "button",
                  {
                    type: "button",
                    role: "switch",
                    "aria-checked": billingAnnual,
                    onClick: () => setBillingAnnual((a) => !a),
                    style: {
                      width: "36px",
                      height: "20px",
                      borderRadius: "99px",
                      border: "none",
                      cursor: "pointer",
                      background: billingAnnual ? "#335cff" : "#cbd5e1",
                      position: "relative",
                      transition: "background 200ms",
                      flexShrink: 0,
                      outline: "none"
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { style: {
                      position: "absolute",
                      top: "2px",
                      left: billingAnnual ? "18px" : "2px",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "#ffffff",
                      transition: "left 200ms",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
                    } })
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { style: { color: billingAnnual ? "#0f172a" : "#94a3b8", fontWeight: billingAnnual ? 600 : 400, transition: "color 150ms" }, children: "Annual" }),
                billingAnnual && /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { style: { background: "#dcfce7", color: "#166534", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "99px", letterSpacing: "0.02em" }, children: "Save up to 20%" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: { display: "grid", gridTemplateColumns: `repeat(${Math.min(pricingPlans.length, 3)}, minmax(0, 420px))`, gap: "16px", alignItems: "start", justifyContent: "center" }, children: pricingPlans.map((plan) => {
              const isPro = plan.highlighted;
              const displayPrice = billingAnnual && plan.priceAnnual ? plan.priceAnnual : plan.price;
              const displayPeriod = billingAnnual && plan.periodAnnual ? plan.periodAnnual : plan.period;
              return /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: `mp-plan-card${isPro ? " is-pro" : ""}`, children: [
                isPro && /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: {
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "3px 12px",
                  borderRadius: "99px",
                  background: "linear-gradient(135deg, #335cff, #6366f1)",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap"
                }, children: "Most Popular" }),
                /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: { marginBottom: "20px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("h3", { style: { margin: "0 0 4px", fontSize: "15px", fontWeight: 700, color: isPro ? "rgba(255,255,255,0.9)" : "#0f172a", letterSpacing: "-0.02em" }, children: plan.name }),
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: { display: "flex", alignItems: "baseline", gap: "6px", margin: "12px 0 8px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { style: { fontSize: "36px", fontWeight: 800, color: isPro ? "#ffffff" : "#0f172a", letterSpacing: "-0.04em", lineHeight: 1, transition: "all 150ms" }, children: displayPrice }),
                    displayPeriod && /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { style: { fontSize: "14px", color: isPro ? "rgba(255,255,255,0.4)" : "#94a3b8" }, children: displayPeriod }),
                    billingAnnual && plan.savingsLabel && /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { style: { fontSize: "11px", fontWeight: 700, color: "#166534", background: "#dcfce7", padding: "2px 7px", borderRadius: "99px" }, children: plan.savingsLabel })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("p", { style: { margin: 0, fontSize: "13.5px", color: isPro ? "rgba(255,255,255,0.5)" : "#64748b", lineHeight: 1.5 }, children: plan.description })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("ul", { style: { margin: "0 0 24px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }, children: plan.features.map((feat) => /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("li", { style: { display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13.5px", color: isPro ? "rgba(255,255,255,0.75)" : "#334155" }, children: [
                  isPro ? /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "rgba(255,255,255,0.5)", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0, marginTop: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("polyline", { points: "20 6 9 17 4 12" }) }) : /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(CheckSVG2, {}),
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { children: feat })
                ] }, feat)) }),
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("button", { className: `mp-plan-btn${isPro ? " is-pro" : ""}`, onClick: plan.onCtaClick, children: plan.ctaLabel })
              ] }, plan.id);
            }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("section", { style: {
            background: "#0a0d14",
            padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)",
            position: "relative",
            overflow: "hidden",
            textAlign: "center"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { "aria-hidden": true, style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60%", height: "200%", borderRadius: "50%", background: "radial-gradient(circle, rgba(51,92,255,0.15) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" } }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { style: { position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("h2", { style: { margin: "0 0 14px", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.045em", lineHeight: 1.15 }, children: "Ready to start building?" }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("p", { style: { margin: "0 0 32px", fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }, children: "Install Zephr and ship beautiful interfaces in minutes." }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { style: { display: "flex", gap: "12px", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginBottom: "24px" }, children: /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "mp-install-cmd", children: [
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { style: { color: "rgba(255,255,255,0.35)" }, children: "$" }),
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { children: "npm install @zephrui/ui-react" })
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("button", { className: "mp-cta-primary", style: { margin: "0 auto" }, onClick: onCtaClick, children: [
                ctaLabel,
                /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(ArrowRight2, { size: 14, color: "#0f172a" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("p", { style: { margin: "16px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.25)" }, children: "No credit card required" })
            ] })
          ] })
        ]
      }
    );
  }

  // ../ui-react/src/widgets/Widgets.tsx
  var import_react37 = __require("react");
  var import_jsx_runtime59 = __require("react/jsx-runtime");
  var defaultRevenueMetrics = [
    { label: "Booked", value: "$182k" },
    { label: "Open", value: "$41k" },
    { label: "Win rate", value: "32%" }
  ];
  var defaultReleaseTasks = [
    { label: "QA sign-off", checked: true },
    { label: "Migration dry run", checked: false },
    { label: "Status page copy", checked: false }
  ];
  var defaultTeamMembers = [
    { name: "Maya Carter", role: "Frontend", note: "Reviewing 4 PRs", status: "online" },
    { name: "Noah Kim", role: "Design Systems", note: "Token pass in progress", status: "busy" },
    { name: "Liam Torres", role: "PM", note: "Running launch checklist", status: "online" }
  ];
  var defaultBillingMetrics = [
    { label: "API requests", value: "4.1M / 6M" },
    { label: "Seats", value: "8 / 12" },
    { label: "Asset sync", value: "92 GB / 120 GB" }
  ];
  var defaultCustomerAccounts = [
    { name: "Northstar", owner: "Maya", tier: "Enterprise", health: 92 },
    { name: "Patchwork", owner: "Noah", tier: "Startup", health: 71 },
    { name: "Vector Labs", owner: "Liam", tier: "Growth", health: 54 }
  ];
  var defaultIncidentUpdates = [
    { timestamp: "14:24 UTC", note: "Mitigation shipped to the ingest worker" },
    { timestamp: "14:42 UTC", note: "Canary healthy in 2 regions" },
    { timestamp: "15:05 UTC", note: "Monitoring stable, customer comms drafted" }
  ];
  var defaultReviewItems = [
    { name: "Design review", owner: "Maya Carter", priority: "High" },
    { name: "Billing copy", owner: "Liam Torres", priority: "Medium" },
    { name: "Launch email", owner: "Noah Kim", priority: "High" }
  ];
  function surfaceProps(surface) {
    return surface === "outlined" ? { variant: "outlined", shadow: "none" } : { variant: "elevated", shadow: "md" };
  }
  function cardStyle(style) {
    return {
      gap: "1rem",
      border: "1px solid color-mix(in srgb, var(--z-color-border, #ebebeb) 88%, #ffffff 12%)",
      background: "var(--z-color-surface, #ffffff)",
      boxShadow: "none",
      ...style
    };
  }
  function panelStyle(style) {
    return {
      padding: "1rem",
      borderRadius: 18,
      border: "1px solid color-mix(in srgb, var(--z-color-border, #ebebeb) 92%, #ffffff 8%)",
      background: "var(--z-color-background100, #f4f6fa)",
      ...style
    };
  }
  function summaryBandStyle(style) {
    return {
      padding: "1rem 1.1rem",
      borderRadius: 18,
      border: "1px solid color-mix(in srgb, var(--z-color-border, #ebebeb) 92%, #ffffff 8%)",
      background: "var(--z-color-background100, #f4f6fa)",
      ...style
    };
  }
  function stackStyle(gap = "0.75rem") {
    return {
      display: "flex",
      flexDirection: "column",
      gap
    };
  }
  function dividedListStyle(style) {
    return {
      display: "grid",
      gap: 0,
      ...style
    };
  }
  function dividedRowStyle(style) {
    return {
      padding: "0.95rem 0",
      borderTop: "1px solid var(--z-color-border, #ebebeb)",
      ...style
    };
  }
  function inlineRowStyle() {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.75rem"
    };
  }
  function personMetaStyle() {
    return {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      minWidth: 0
    };
  }
  function personCopyStyle() {
    return {
      display: "flex",
      flexDirection: "column",
      gap: "0.15rem",
      minWidth: 0
    };
  }
  function kickerStyle() {
    return {
      fontSize: "0.73rem",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--z-color-muted, #667085)"
    };
  }
  function titleStyle() {
    return {
      margin: "0.35rem 0 0",
      fontSize: "1.12rem",
      lineHeight: 1.25,
      letterSpacing: "-0.02em",
      color: "var(--z-color-text, #171717)"
    };
  }
  function mutedTextStyle() {
    return {
      color: "var(--z-color-muted, #667085)"
    };
  }
  function actionRow(actions) {
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.6rem" }, children: actions.filter(Boolean).map((action, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
      Button,
      {
        size: "sm",
        variant: action?.variant === "secondary" ? "secondary" : "primary",
        onClick: action?.onClick,
        children: action?.label
      },
      `${action.label}-${index}`
    )) });
  }
  function healthColor(health) {
    if (health > 80) {
      return { badgeColor: "green", tone: "success" };
    }
    if (health > 60) {
      return { badgeColor: "yellow", tone: "warning" };
    }
    return { badgeColor: "red", tone: "danger" };
  }
  function priorityColor(priority) {
    if (priority === "High") return "red";
    if (priority === "Medium") return "yellow";
    return "gray";
  }
  function statusTone(status) {
    return status;
  }
  function RevenueSnapshotWidget({
    title = "Q2 pipeline",
    subtitle = "Revenue snapshot",
    statusLabel = "Live",
    metrics = defaultRevenueMetrics,
    targetLabel = "Quarter target",
    targetValue = 76,
    primaryAction = { label: "Open dashboard" },
    secondaryAction = { label: "Export CSV", variant: "secondary" },
    surface = "elevated",
    className,
    style
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: subtitle }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "success", children: statusLabel })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        "div",
        {
          style: {
            ...summaryBandStyle(),
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1rem"
          },
          children: metrics.map((metric, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
            "div",
            {
              style: {
                ...stackStyle("0.15rem"),
                paddingLeft: index === 0 ? 0 : "1rem",
                borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: metric.label }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)" }, children: metric.value })
              ]
            },
            metric.label
          ))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...inlineRowStyle(), fontSize: "0.9rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: targetLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: { color: "var(--z-color-text, #171717)" }, children: [
            targetValue,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Progress, { value: targetValue, tone: "primary" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Divider, {}),
      actionRow([primaryAction, secondaryAction])
    ] });
  }
  function ReleaseChecklistWidget({
    title = "Release checklist",
    subtitle = "Launch operations",
    notice = "Release branch freezes at 17:00.",
    tasks = defaultReleaseTasks,
    onTasksChange,
    primaryAction = { label: "Ship release" },
    secondaryAction = { label: "View runbook", variant: "secondary" },
    surface = "elevated",
    className,
    style
  }) {
    const [internalTasks, setInternalTasks] = (0, import_react37.useState)(tasks);
    const activeTasks = onTasksChange ? tasks : internalTasks;
    const completeCount = (0, import_react37.useMemo)(() => activeTasks.filter((task) => task.checked).length, [activeTasks]);
    const percent = Math.round(completeCount / activeTasks.length * 100);
    function updateTasks(nextTasks) {
      if (!onTasksChange) {
        setInternalTasks(nextTasks);
      }
      onTasksChange?.(nextTasks);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: subtitle }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "orange", variant: "lighter", children: "Today" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Alert, { size: "xs", variant: "lighter", status: "info", title: notice }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle(), children: activeTasks.map((task, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "auto minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
              Checkbox,
              {
                checked: task.checked,
                onChange: (event) => updateTasks(
                  activeTasks.map(
                    (item, itemIndex) => itemIndex === index ? { ...item, checked: event.target.checked } : item
                  )
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: task.label }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { variant: task.checked ? "lighter" : "stroke", color: task.checked ? "green" : "gray", children: task.checked ? "Done" : "Pending" })
          ]
        },
        task.label
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...inlineRowStyle(), fontSize: "0.9rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Launch readiness" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: { color: "var(--z-color-text, #171717)" }, children: [
            completeCount,
            "/",
            activeTasks.length,
            " complete"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Progress, { value: percent, tone: "success" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Divider, {}),
      actionRow([primaryAction, secondaryAction])
    ] });
  }
  function TeamPulseWidget({
    title = "Team pulse",
    subtitle = "Team operations",
    members = defaultTeamMembers,
    action = { label: "Open staffing board", variant: "secondary" },
    surface = "elevated",
    className,
    style
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: subtitle }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Badge, { color: "sky", variant: "lighter", children: [
          members.length,
          " active"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle(), children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: personMetaStyle(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Avatar, { name: member.name, size: 36, status: member.status }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: personCopyStyle(), children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)" }, children: member.name }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: { ...mutedTextStyle(), whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: [
              member.role,
              " \xB7 ",
              member.note
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: member.status === "busy" ? "danger" : "success", children: member.status === "busy" ? "Busy" : "Online" })
      ] }, member.name)) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Divider, {}),
      actionRow([action])
    ] });
  }
  function BillingUsageWidget({
    title = "Billing usage",
    subtitle = "Commercials",
    planLabel = "Startup",
    currentSpend = "$428",
    budget = "$600 monthly budget",
    usagePercent = 71,
    metrics = defaultBillingMetrics,
    warningTitle = "API burst limit approaching.",
    warningDescription = "Scale before launch week.",
    primaryAction = { label: "Upgrade plan" },
    secondaryAction = { label: "Download invoice", variant: "secondary" },
    surface = "elevated",
    className,
    style
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: subtitle }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "neutral", children: planLabel })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "baseline", gap: "0.45rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { fontSize: "1.85rem", lineHeight: 1, color: "var(--z-color-text, #171717)" }, children: currentSpend }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: mutedTextStyle(), children: [
          "/ ",
          budget
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...inlineRowStyle(), fontSize: "0.9rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Current month" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: { color: "var(--z-color-text, #171717)" }, children: [
            usagePercent,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Progress, { value: usagePercent, tone: "warning" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle(), children: metrics.map((metric) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...inlineRowStyle(), fontSize: "0.9rem", padding: "0.2rem 0" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: metric.label }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)" }, children: metric.value })
      ] }, metric.label)) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Alert, { size: "xs", variant: "stroke", status: "warning", title: warningTitle, description: warningDescription }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Divider, {}),
      actionRow([primaryAction, secondaryAction])
    ] });
  }
  function CustomerHealthWidget({
    title = "Customer health",
    subtitle = "Customer success",
    tagLabel = "CS",
    accounts = defaultCustomerAccounts,
    action = { label: "Open customer health", variant: "secondary" },
    surface = "elevated",
    className,
    style
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: subtitle }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "teal", variant: "lighter", children: tagLabel })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: accounts.map((account, index) => {
        const palette = healthColor(account.health);
        return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
          "div",
          {
            style: {
              ...stackStyle("0.5rem"),
              ...dividedRowStyle({
                borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              })
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: personMetaStyle(), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Avatar, { name: account.name, size: 32 }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: personCopyStyle(), children: [
                    /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)" }, children: account.name }),
                    /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: mutedTextStyle(), children: [
                      account.owner,
                      " \xB7 ",
                      account.tier
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Badge, { variant: "lighter", color: palette.badgeColor, children: [
                  account.health,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Progress, { value: account.health, tone: palette.tone })
            ]
          },
          account.name
        );
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Divider, {}),
      actionRow([action])
    ] });
  }
  function IncidentDigestWidget({
    title = "Incident digest",
    subtitle = "Reliability",
    severityLabel = "P1",
    incidents = [
      { title: "Search indexing degraded in eu-west.", status: "error", variant: "filled" },
      { title: "Queue latency elevated for image transforms.", status: "warning", variant: "lighter" }
    ],
    updates = defaultIncidentUpdates,
    primaryAction = { label: "Open status page" },
    secondaryAction = { label: "Escalate", variant: "secondary" },
    surface = "elevated",
    className,
    style
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: subtitle }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "red", variant: "lighter", children: severityLabel })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle(), children: incidents.map((incident) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        Alert,
        {
          size: "xs",
          variant: incident.variant ?? "lighter",
          status: statusTone(incident.status),
          title: incident.title
        },
        incident.title
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle(), children: updates.map((update) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "84px minmax(0, 1fr)", gap: "0.75rem", alignItems: "start" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), fontSize: "0.82rem", lineHeight: 1.5 }, children: update.timestamp }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.9rem", lineHeight: 1.5, fontWeight: 500 }, children: update.note })
      ] }, update.timestamp)) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Divider, {}),
      actionRow([primaryAction, secondaryAction])
    ] });
  }
  function ReviewInboxWidget({
    title = "Review inbox",
    subtitle = "Collaboration",
    items = defaultReviewItems,
    action = { label: "Open review queue" },
    surface = "elevated",
    className,
    style
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: subtitle }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Badge, { color: "purple", variant: "lighter", children: [
          items.length,
          " pending"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle(), children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: personMetaStyle(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Avatar, { name: item.owner, size: 32 }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: personCopyStyle(), children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)" }, children: item.name }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: item.owner })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: priorityColor(item.priority), variant: "lighter", children: item.priority })
      ] }, item.name)) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Divider, {}),
      actionRow([action])
    ] });
  }
  function QuickActionsWidget({
    title = "Quick actions",
    subtitle = "Operator tools",
    tabs = ["Users", "Projects", "Invoices"],
    placeholder = "Search commands or paste an account ID\u2026",
    primaryAction = { label: "Open account" },
    secondaryActions = [
      { label: "Reset quota", variant: "secondary" },
      { label: "Generate report", variant: "secondary" }
    ],
    surface = "elevated",
    className,
    style
  }) {
    const [selectedAction, setSelectedAction] = (0, import_react37.useState)(0);
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: subtitle }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "purple", variant: "lighter", children: "Internal" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Input, { placeholder }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(ButtonGroup, { quantity: tabs.length, labels: tabs, value: selectedAction, onValueChange: setSelectedAction }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...inlineRowStyle(), fontSize: "0.9rem", padding: "0.2rem 0" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Focused area" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)" }, children: tabs[selectedAction] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Divider, {}),
      actionRow([primaryAction, ...secondaryActions])
    ] });
  }
  function WelcomeProfileWidget({
    title = "Welcome to Zephr",
    subtitle = "Set up your profile, add a photo, and pick the name your team will see across every workspace.",
    surface = "elevated",
    className,
    style
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            padding: "1rem",
            borderRadius: 24,
            border: "1px solid color-mix(in srgb, var(--z-color-border, #ebebeb) 86%, #ffffff 14%)",
            background: "radial-gradient(circle at 18% 12%, rgba(255, 189, 82, 0.32) 0%, rgba(255, 189, 82, 0) 28%), radial-gradient(circle at 88% 20%, rgba(245, 115, 71, 0.22) 0%, rgba(245, 115, 71, 0) 26%), linear-gradient(180deg, rgba(83, 153, 255, 0.96) 0%, rgba(218, 236, 255, 0.94) 62%, rgba(255, 255, 255, 1) 100%)",
            minHeight: 236,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 120px",
            alignItems: "end",
            gap: "1rem",
            overflow: "hidden"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
              "div",
              {
                style: {
                  width: "100%",
                  padding: "1.2rem 1.2rem 0.55rem",
                  borderRadius: 20,
                  background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.78) 42%, rgba(255,255,255,0.98) 100%)"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "sky", variant: "lighter", children: "Workspace setup" }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: { ...titleStyle(), fontSize: "1.72rem" }, children: title }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: "0.45rem 0 0", lineHeight: 1.58, maxWidth: 420 }, children: subtitle })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
              "div",
              {
                style: {
                  justifySelf: "end",
                  alignSelf: "stretch",
                  width: "100%",
                  maxWidth: 112,
                  borderRadius: 18,
                  background: "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 32%), radial-gradient(circle at 58% 82%, rgba(255, 162, 95, 0.5) 0%, rgba(255, 162, 95, 0) 34%), linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 100%)",
                  border: "1px solid rgba(255,255,255,0.38)",
                  position: "relative"
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                  "span",
                  {
                    style: {
                      position: "absolute",
                      inset: "18px 22px auto auto",
                      width: 34,
                      height: 34,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.42)",
                      backdropFilter: "blur(10px)"
                    }
                  }
                )
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: "0.85rem",
              alignItems: "center",
              paddingTop: "1rem"
            })
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: personMetaStyle(), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Avatar, { name: "Ava", size: 44 }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: personCopyStyle(), children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.95rem" }, children: "Your photo" }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), whiteSpace: "normal" }, children: "PNG or JPG up to 5 MB \xB7 500\xD7500 recommended" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "secondary", children: "Upload" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.9rem"), paddingTop: "0.15rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormField, { label: "Display name", htmlFor: "widget-profile-name", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Input, { id: "widget-profile-name", defaultValue: "@username" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { children: "Continue" })
      ] })
    ] });
  }
  function ReferralRewardWidget({
    title = "Refer & earn",
    subtitle = "Share your invite link. Your friend gets credits and you earn the same reward after their first paid action.",
    surface = "elevated",
    className,
    style
  }) {
    const steps = [
      "Share your invite link",
      "Your friend gets 10 credits when they subscribe",
      "You receive 10 credits for each referral"
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            padding: "1.15rem",
            borderRadius: 24,
            background: "color-mix(in srgb, var(--z-color-background100, #f4f6fa) 74%, #ffffff 26%)",
            border: "1px solid color-mix(in srgb, var(--z-color-border, #ebebeb) 82%, #ffffff 18%)",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 116px",
            gap: "1rem"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.55rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "yellow", variant: "lighter", children: "Earn 10 credits" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: { ...titleStyle(), fontSize: "1.6rem" }, children: title }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.55, maxWidth: 420 }, children: subtitle })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
              "div",
              {
                style: {
                  alignSelf: "stretch",
                  borderRadius: 18,
                  background: "radial-gradient(circle at 32% 26%, rgba(255, 170, 66, 0.82) 0%, rgba(255, 170, 66, 0) 38%), radial-gradient(circle at 68% 62%, rgba(110, 120, 255, 0.72) 0%, rgba(110, 120, 255, 0.08) 48%), linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(248, 235, 255, 0.94) 100%)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  position: "relative"
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                  "span",
                  {
                    style: {
                      position: "absolute",
                      inset: "16px 16px auto auto",
                      padding: "0.25rem 0.55rem",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.72)",
                      color: "var(--z-color-text, #171717)",
                      fontSize: "0.72rem",
                      fontWeight: 600
                    },
                    children: "Invite"
                  }
                )
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { ...stackStyle("0"), borderTop: "1px solid var(--z-color-border, #ebebeb)" }, children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              display: "grid",
              gridTemplateColumns: "20px minmax(0, 1fr)",
              gap: "0.75rem",
              alignItems: "start"
            })
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
              "div",
              {
                style: {
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "color-mix(in srgb, var(--accent, #121212) 8%, white)",
                  color: "var(--accent, #121212)",
                  fontSize: "0.72rem",
                  fontWeight: 700
                },
                children: index + 1
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.14rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", lineHeight: 1.45, fontSize: "0.95rem" }, children: step }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: index === 0 ? "Post the link in your welcome flow or customer email." : index === 1 ? "Credits land instantly on the first paid action." : "Track rewarded conversions from the same referral surface." })
            ] })
          ]
        },
        step
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              paddingTop: "1rem"
            }),
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: "0.75rem",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Input, { readOnly: true, value: "https://zephr.work/invite/ava-product", "aria-label": "Invite link" }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", children: "Copy link" })
          ]
        }
      )
    ] });
  }
  function SetupJourneyWidget({
    title = "Let's get you live",
    subtitle = "Guide new accounts through a short setup path with visible progress and clear next actions.",
    surface = "elevated",
    className,
    style
  }) {
    const steps = [
      { label: "Set up company", done: true },
      { label: "Create resource", active: true },
      { label: "Create service" },
      { label: "Link service with resource" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.3rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "green", variant: "lighter", children: "Onboarding" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: { ...titleStyle(), fontSize: "1.5rem", margin: 0 }, children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }, children: subtitle })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "secondary", children: "Dismiss" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "56px minmax(0, 1fr) auto",
            gap: "0.9rem",
            alignItems: "center",
            padding: "1rem 0 0.95rem",
            borderTop: "1px solid var(--z-color-border, #ebebeb)"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
              "div",
              {
                style: {
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(180deg, rgba(16, 185, 129, 0.14) 0%, rgba(16, 185, 129, 0.05) 100%)",
                  color: "var(--z-color-success, #0a7d53)",
                  fontSize: "1.4rem"
                },
                children: "\u{1F680}"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.35rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Progress, { value: 25, tone: "success" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Step 2 of 4 \xB7 3 actions remaining before first publish" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)" }, children: "25%" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: steps.map((step, index) => {
        const isDone = Boolean(step.done);
        const isActive = Boolean(step.active);
        return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
          "div",
          {
            style: {
              ...dividedRowStyle({
                padding: "1rem 0"
              }),
              display: "grid",
              gridTemplateColumns: "42px minmax(0, 1fr) auto",
              gap: "0.9rem",
              alignItems: "center",
              background: "transparent"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                "div",
                {
                  style: {
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1.5px solid ${isDone || isActive ? "color-mix(in srgb, var(--accent, #121212) 55%, white)" : "var(--z-color-border, #ebebeb)"}`,
                    background: isDone ? "color-mix(in srgb, var(--accent, #121212) 16%, white)" : "var(--z-color-surface, #ffffff)",
                    color: isDone || isActive ? "var(--accent, #121212)" : "var(--z-color-muted, #667085)",
                    fontWeight: 700
                  },
                  children: isDone ? "\u2713" : index + 1
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.18rem"), children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: isDone ? "var(--z-color-text, #171717)" : isActive ? "var(--z-color-text, #171717)" : "var(--z-color-muted, #667085)", fontSize: "0.98rem" }, children: step.label }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: isDone ? "Completed" : isActive ? "Recommended next step" : "Queued until the previous step is finished" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: isDone ? "success" : isActive ? "info" : "neutral", children: isDone ? "Done" : isActive ? "Next" : "Locked" })
            ]
          },
          step.label
        );
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { children: "Continue setup" })
    ] });
  }
  function DeliveryTimelineWidget({
    title = "Delivery timeline",
    subtitle = "A customer-safe shipment tracker with status, timestamps, and an end-of-journey rating action.",
    surface = "elevated",
    className,
    style
  }) {
    const stages = [
      { label: "Order confirmed", note: "Order placed and confirmed", time: "17 Nov, 13:45", icon: "\u25A1" },
      { label: "Shipping", note: "Handed to logistics provider", time: "17 Nov, 18:10", icon: "\u25A3" },
      { label: "Transit", note: "Moving through the network", time: "18 Nov, 09:20", icon: "\u2192" },
      { label: "Sent to customer", note: "Out for delivery", time: "18 Nov, 14:55", icon: "\u25CE" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.25rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "sky", variant: "lighter", children: "Timeline" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: { ...titleStyle(), margin: 0, fontSize: "1.35rem" }, children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "sky", variant: "lighter", children: "In progress" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle("0.8rem"), children: stages.map((stage, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "44px minmax(0, 1fr) auto", gap: "0.9rem", alignItems: "start" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { position: "relative", display: "flex", justifyContent: "center" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
            "div",
            {
              style: {
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "1px dashed var(--z-color-border, #ebebeb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--z-color-text, #171717)",
                background: "var(--z-color-surface, #ffffff)"
              },
              children: stage.icon
            }
          ),
          index < stages.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
            "span",
            {
              style: {
                position: "absolute",
                top: 48,
                width: 1,
                height: 40,
                background: "var(--z-color-border, #ebebeb)"
              }
            }
          ) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.2rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.98rem" }, children: stage.label }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), lineHeight: 1.5 }, children: stage.note })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), whiteSpace: "nowrap", fontSize: "0.86rem" }, children: stage.time })
      ] }, stage.label)) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { variant: "secondary", children: "Rate this delivery" })
    ] });
  }
  function TravelItineraryWidget({
    title = "Travel itinerary",
    subtitle = "A compact itinerary card for route-heavy products, mobility workflows, and travel planning.",
    surface = "elevated",
    className,
    style
  }) {
    const legs = [
      {
        day: "Sat, 1 Feb 2025",
        time: "3:00",
        passengers: "5 passengers",
        from: "Prague",
        fromMeta: "Vaclav Havel Airport",
        to: "Berlin",
        toMeta: "Berlin Brandenburg"
      },
      {
        day: "Sun, 2 Feb 2025",
        time: "20:40",
        passengers: "8 passengers",
        from: "Dubai",
        fromMeta: "Dubai International",
        to: "Amsterdam",
        toMeta: "Amsterdam Schiphol"
      }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.2rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "One way" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "secondary", children: "Edit search" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle("0.9rem"), children: legs.map((leg, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...stackStyle("0.7rem"),
            ...dividedRowStyle({
              padding: index === 0 ? "0.2rem 0 1rem" : "1rem 0 0.1rem"
            })
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.98rem" }, children: leg.day }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.45rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "neutral", children: leg.time }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "neutral", children: leg.passengers })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "20px minmax(0, 1fr)", gap: "0.75rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { position: "relative", display: "flex", justifyContent: "center" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { width: 10, height: 10, borderRadius: 999, border: "2px solid var(--z-color-text, #171717)", background: "var(--z-color-surface, #ffffff)", marginTop: 4 } }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { position: "absolute", top: 16, width: 2, height: 32, background: "var(--z-color-text, #171717)" } }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { position: "absolute", top: 54, width: 10, height: 10, borderRadius: 999, border: "2px solid var(--z-color-text, #171717)", background: "var(--z-color-surface, #ffffff)" } })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("1rem"), children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.98rem" }, children: leg.from }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), whiteSpace: "normal" }, children: leg.fromMeta })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.98rem" }, children: leg.to }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), whiteSpace: "normal" }, children: leg.toMeta })
                ] })
              ] })
            ] })
          ]
        },
        leg.day
      )) })
    ] });
  }
  function PromptComposerWidget({
    title = "Prompt composer",
    subtitle = "A cleaner AI input surface for asset prompts, attachments, model selection, and send controls.",
    surface = "elevated",
    className,
    style
  }) {
    const [mode, setMode] = (0, import_react37.useState)(0);
    const modes = ["Inspiration", "Production", "Storyboard"];
    const attachments = ["Add photos or videos", "Add 3D objects", "Add files (docs, PDF\u2026)"];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.65rem"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "purple", variant: "lighter", children: "AI workspace" }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "purple", variant: "lighter", children: "Brainwave 2.5" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }, children: subtitle })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.9rem"), borderTop: "1px solid var(--z-color-border, #ebebeb)", paddingTop: "1rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
          "div",
          {
            style: {
              ...panelStyle({
                width: "min(280px, 100%)",
                gap: "0",
                alignSelf: "flex-start",
                padding: "0.4rem 1rem"
              }),
              display: "grid"
            },
            children: attachments.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
              "div",
              {
                style: {
                  ...dividedRowStyle({
                    borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)",
                    padding: "0.78rem 0"
                  }),
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { color: "var(--z-color-muted, #667085)" }, children: "+" }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: item })
                ]
              },
              item
            ))
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: panelStyle({ padding: "1rem" }), children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.9rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Textarea, { rows: 3, defaultValue: "Describe your 3D object or scene\u2026" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "auto auto minmax(0, 1fr) auto auto", gap: "0.6rem", alignItems: "center" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "secondary", children: "+" }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(ButtonGroup, { quantity: 3, labels: modes, value: mode, onValueChange: setMode }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", {}),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "secondary", children: "Mic" }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", children: "Send" })
          ] })
        ] }) })
      ] })
    ] });
  }
  function ConversionScoreWidget({
    title = "Experience score",
    subtitle = "Summarize the biggest UX gaps into one visible score and a ranked list of fixes.",
    surface = "elevated",
    className,
    style
  }) {
    const findings = [
      { label: "Reviews", note: "No visible reviews or testimonial found", score: 55, tone: "High impact" },
      { label: "Social proof", note: "Missing trust badges near buy box", score: 80, tone: "High impact" },
      { label: "Buy box", note: "Add payment icons and USPs for trust", score: 72, tone: "Moderate impact" },
      { label: "Copywriting", note: "Engaging copy detected", score: 59, tone: "Low impact" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("1rem"), alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
          "div",
          {
            style: {
              width: 172,
              height: 172,
              borderRadius: "50%",
              background: "conic-gradient(#f59e0b 0deg, #fb923c 124deg, #ef4444 214deg, rgba(239,68,68,0.08) 214deg 360deg)",
              display: "grid",
              placeItems: "center",
              position: "relative"
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
              "div",
              {
                style: {
                  width: 136,
                  height: 136,
                  borderRadius: "50%",
                  background: "var(--z-color-surface, #ffffff)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "inset 0 0 0 1px var(--z-color-border, #ebebeb)"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "2.2rem", lineHeight: 1 }, children: "79" }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Zephr score" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: "0.35rem 0 0", lineHeight: 1.55 }, children: subtitle })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...summaryBandStyle({ display: "grid", gap: "0.2rem", padding: "0.9rem 1rem" }) }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: "Prioritize high-impact fixes first" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Tackle trust and proof gaps before refining lower-severity copy changes." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: findings.map((finding) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              padding: "0.95rem 0"
            }),
            display: "grid",
            gridTemplateColumns: "44px minmax(0, 1fr) auto",
            gap: "0.85rem",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { width: 44, height: 44, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "2px solid color-mix(in srgb, var(--accent, #121212) 28%, white)", color: "var(--accent, #121212)", fontWeight: 700 }, children: finding.score }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.95rem" }, children: finding.label }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), whiteSpace: "normal" }, children: finding.note })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: finding.tone === "High impact" ? "danger" : finding.tone === "Moderate impact" ? "info" : "success", children: finding.tone })
          ]
        },
        finding.label
      )) })
    ] });
  }
  function MarketingInsightsWidget({
    title = "Marketing insights",
    subtitle = "Live channel performance and device split in one surface for faster planning decisions.",
    surface = "elevated",
    className,
    style
  }) {
    const channels = [
      { label: "Organic search", share: 38, color: "#f59e0b" },
      { label: "Social media", share: 34, color: "#eab308" },
      { label: "Direct", share: 28, color: "#2dd4bf" }
    ];
    const devices = [
      { label: "Desktop", share: "27%", delta: "-3.2%" },
      { label: "Tablet", share: "12%", delta: "-6.4%" },
      { label: "Mobile", share: "61%", delta: "+0.8%" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.2rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "purple", variant: "lighter", children: "Marketing" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: { ...titleStyle(), fontSize: "1.45rem" }, children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "secondary", children: "Report" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap", paddingTop: "0.2rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "neutral", children: "Channel performance" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "neutral", children: "Engagement trends" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "neutral", children: "Conversion health" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "1.1rem",
            borderTop: "1px solid var(--z-color-border, #ebebeb)",
            paddingTop: "1rem"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.8rem"), paddingRight: "1.1rem", borderRight: "1px solid var(--z-color-border, #ebebeb)" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "1rem" }, children: "Marketing channels" }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { color: "var(--z-color-success, #0a7d53)", fontWeight: 600, fontSize: "0.88rem" }, children: "+2.1% vs last week" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { display: "grid", gridTemplateColumns: channels.map((item) => `${item.share}fr`).join(" "), gap: "0.35rem" }, children: channels.map((item) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { height: 12, borderRadius: 999, background: item.color } }, item.label)) }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle("0.45rem"), children: channels.map((item) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...inlineRowStyle(), fontSize: "0.9rem" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--z-color-text, #171717)" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { width: 9, height: 9, borderRadius: 999, background: item.color } }),
                  item.label
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("strong", { style: { color: "var(--z-color-text, #171717)" }, children: [
                  item.share,
                  "%"
                ] })
              ] }, item.label)) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.8rem"), paddingLeft: "0.1rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "baseline", gap: "0.5rem" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "2rem", lineHeight: 1 }, children: "237,456" }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "danger", children: "-1.4%" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Total visitors" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Divider, {}),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.7rem" }, children: devices.map((device) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.35rem"), children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: device.label }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "1.15rem" }, children: device.share }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { color: device.delta.startsWith("+") ? "var(--z-color-success, #0a7d53)" : "var(--z-color-danger, #c43b2f)", fontSize: "0.9rem", fontWeight: 600 }, children: device.delta })
              ] }, device.label)) })
            ] })
          ]
        }
      )
    ] });
  }
  function ApprovalModalWidget({
    title = "Approval modal",
    subtitle = "Review contract changes",
    body = "You are about to publish a pricing update that affects 14 active customers. Confirm the rollout after legal review is attached.",
    confirmLabel = "Publish changes",
    cancelLabel = "Keep draft",
    surface = "elevated",
    className,
    style
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...inlineRowStyle(), alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "orange", variant: "lighter", children: "Pricing update" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "orange", variant: "lighter", children: "Needs review" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.65rem"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.98rem" }, children: subtitle }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: body })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...summaryBandStyle(), display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Affected accounts" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.96rem" }, children: "14 active customers" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Approval state" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.96rem" }, children: "Legal attached \xB7 finance pending" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.6rem", paddingTop: "1rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "secondary", children: cancelLabel }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", children: confirmLabel })
      ] })
    ] });
  }
  function ProjectBriefFormWidget({
    title = "Project brief",
    subtitle = "Collect the inputs before your AI generates the first screen.",
    surface = "elevated",
    className,
    style
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.25rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Forms" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "sky", variant: "lighter", children: "Structured" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1rem",
            padding: "0.95rem 0",
            borderTop: "1px solid var(--z-color-border, #ebebeb)",
            borderBottom: "1px solid var(--z-color-border, #ebebeb)"
          },
          children: [
            { label: "Goal", value: "Reduce failed invoice recovery time" },
            { label: "Audience", value: "Finance and support teams" },
            { label: "Surface", value: "Internal command center" }
          ].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.15rem"), paddingLeft: index === 0 ? 0 : "1rem", borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: item.label }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.95rem", lineHeight: 1.45 }, children: item.value })
          ] }, item.label))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gap: "0.95rem", paddingTop: "0.2rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.95rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormField, { label: "Project name", required: true, htmlFor: "widget-project-name", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Input, { id: "widget-project-name", defaultValue: "Billing command center" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormField, { label: "Primary goal", htmlFor: "widget-project-goal", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Input, { id: "widget-project-goal", defaultValue: "Reduce failed invoice recovery time" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormField, { label: "Context for the AI", hint: "Be explicit about constraints, data sources, and team needs.", htmlFor: "widget-project-context", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Textarea, { id: "widget-project-context", rows: 4, defaultValue: "Build an internal dashboard for finance and support. Prioritize failed payments, retry outcomes, and customer intervention paths." }) })
      ] }),
      actionRow([{ label: "Generate UI" }, { label: "Save brief", variant: "secondary" }])
    ] });
  }
  function UploadQueueWidget({
    title = "File upload",
    subtitle = "Monitor files, progress, and publish state from a single queue.",
    surface = "elevated",
    className,
    style
  }) {
    const files = [
      { name: "brand-assets.zip", size: "24 MB", progress: 100, status: "Ready", color: "green" },
      { name: "pricing-sheet.csv", size: "1.2 MB", progress: 68, status: "Uploading", color: "blue" },
      { name: "homepage-video.mp4", size: "84 MB", progress: 14, status: "Queued", color: "gray" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.25rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Upload queue" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", children: "Add files" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "1rem", alignItems: "center", padding: "0.95rem 0", borderTop: "1px solid var(--z-color-border, #ebebeb)", borderBottom: "1px solid var(--z-color-border, #ebebeb)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.2rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)" }, children: "3 files in motion" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }, children: "Supports media, CSV, and zipped design asset bundles." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "neutral", children: "106.2 MB" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: files.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle(), children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.45rem") }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.1rem"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: file.name }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: file.size })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: file.color, variant: "lighter", children: file.status })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Progress, { value: file.progress, tone: file.progress === 100 ? "success" : "primary" })
      ] }) }, file.name)) })
    ] });
  }
  function ChatPanelWidget({
    title = "Support chat",
    subtitle = "Compact assistant thread with recent context and a fast reply field.",
    surface = "elevated",
    className,
    style
  }) {
    const messages = [
      { author: "Ava", role: "Customer", text: "The invoice sync looks delayed for our EU accounts.", status: "offline" },
      { author: "Zephr AI", role: "Assistant", text: "I found a retry backlog in the webhook worker. Want me to open the incident digest widget?", status: "online" },
      { author: "Maya", role: "Support", text: "Yes, and draft the customer update before I send it.", status: "busy" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.25rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Chat" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "sky", variant: "lighter", children: "Live" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem", padding: "0.95rem 0", borderTop: "1px solid var(--z-color-border, #ebebeb)", borderBottom: "1px solid var(--z-color-border, #ebebeb)" }, children: [
        { label: "Participants", value: "3 active" },
        { label: "SLA", value: "Reply in 6 min" },
        { label: "Channel", value: "Customer support" }
      ].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.15rem"), paddingLeft: index === 0 ? 0 : "1rem", borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: item.label }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: item.value })
      ] }, item.label)) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: messages.map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle(), children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: "0.75rem", alignItems: "start" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Avatar, { name: message.author, size: 34, status: message.status }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.2rem") }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.92rem" }, children: [
            message.author,
            " \xB7 ",
            message.role
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }, children: message.text })
        ] })
      ] }) }, `${message.author}-${message.text}`)) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "0.65rem", alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Input, { defaultValue: "Draft a reply with next steps\u2026" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", children: "Send" })
      ] })
    ] });
  }
  function InviteMembersWidget({
    title = "Invite team members",
    subtitle = "Add collaborators, assign a role, and send access in one step.",
    surface = "elevated",
    className,
    style
  }) {
    const [emails, setEmails] = (0, import_react37.useState)(["maya@zephr.work", "noah@zephr.work"]);
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.25rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Team access" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "purple", variant: "lighter", children: "Admin" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "1rem", alignItems: "center", padding: "0.95rem 0", borderTop: "1px solid var(--z-color-border, #ebebeb)", borderBottom: "1px solid var(--z-color-border, #ebebeb)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.18rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.96rem" }, children: "2 people ready to invite" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Editors can ship screens, reviewers can comment only." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "sky", variant: "lighter", children: "Editor" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormField, { label: "Email addresses", hint: "Press enter after each email to add multiple people.", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(TagInput, { value: emails, onChange: setEmails, placeholder: "name@company.com" }) }),
      actionRow([{ label: "Send invites" }, { label: "Copy invite link", variant: "secondary" }])
    ] });
  }
  function TeamDirectoryWidget({
    title = "Team list",
    subtitle = "Who is on the project, what they own, and whether they are available right now.",
    surface = "elevated",
    className,
    style
  }) {
    const members = [
      { name: "Maya Carter", role: "Frontend lead", note: "Owns billing flows", status: "online" },
      { name: "Noah Kim", role: "Design systems", note: "Maintains component contracts", status: "busy" },
      { name: "Liam Torres", role: "Product", note: "Launch planning and QA", status: "online" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.25rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Directory" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Badge, { color: "green", variant: "lighter", children: [
          members.length,
          " members"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.9rem", alignItems: "center", padding: "0.2rem 0 0.1rem" }, children: [
        { label: "Available", value: "2 teammates" },
        { label: "In review", value: "1 teammate" },
        { label: "Owner", value: "Maya Carter" }
      ].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "0.45rem" }, children: [
        index > 0 ? /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { width: 3, height: 3, borderRadius: 999, background: "var(--z-color-stroke300, #d4d7dd)" } }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), fontSize: "0.9rem" }, children: item.label }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.92rem" }, children: item.value })
      ] }, item.label)) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: members.map((member, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle(), children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: personMetaStyle(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Avatar, { name: member.name, size: 34, status: member.status }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: personCopyStyle(), children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)" }, children: member.name }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: { ...mutedTextStyle(), whiteSpace: "normal" }, children: [
              member.role,
              " \xB7 ",
              member.note
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: member.status === "busy" ? "danger" : "success", children: member.status === "busy" ? "Busy" : "Available" })
      ] }) }, member.name)) }),
      actionRow([{ label: "Manage access", variant: "secondary" }])
    ] });
  }
  function SettingsPanelWidget({
    title = "Workspace settings",
    subtitle = "Common account controls that combine switches, status, and action buttons.",
    surface = "elevated",
    className,
    style
  }) {
    const [auditEnabled, setAuditEnabled] = (0, import_react37.useState)(true);
    const [weeklySummary, setWeeklySummary] = (0, import_react37.useState)(false);
    const [maintenanceMode, setMaintenanceMode] = (0, import_react37.useState)(false);
    const [saveState, setSaveState] = (0, import_react37.useState)("idle");
    const rows = [
      { title: "Audit logging", description: "Track publish, billing, and access changes for the workspace.", value: auditEnabled, onChange: setAuditEnabled },
      { title: "Weekly digest", description: "Send a Friday summary with usage, shipping progress, and incidents.", value: weeklySummary, onChange: setWeeklySummary },
      { title: "Maintenance mode", description: "Show a maintenance notice before publishing risky migrations.", value: maintenanceMode, onChange: setMaintenanceMode }
    ];
    const handleSave = () => {
      setSaveState("saving");
      setTimeout(() => {
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 2e3);
      }, 800);
    };
    const handleReset = () => {
      setAuditEnabled(true);
      setWeeklySummary(false);
      setMaintenanceMode(false);
      setSaveState("idle");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.25rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Settings" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        saveState === "saved" ? /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "green", variant: "lighter", children: "Saved" }) : /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "neutral", children: "3 controls" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "1rem", alignItems: "center", padding: "0.95rem 0", borderTop: "1px solid var(--z-color-border, #ebebeb)", borderBottom: "1px solid var(--z-color-border, #ebebeb)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.18rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.96rem" }, children: "Audit logging is protecting billing and publish actions." }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Review defaults before inviting external collaborators." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "info", children: "Protected" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle(), children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...inlineRowStyle(), alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: row.title }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), whiteSpace: "normal" }, children: row.description })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Switch, { checked: row.value, onChange: row.onChange })
      ] }) }, row.title)) }),
      actionRow([
        { label: saveState === "saving" ? "Saving\u2026" : saveState === "saved" ? "Saved \u2713" : "Save settings", onClick: handleSave },
        { label: "Reset defaults", variant: "secondary", onClick: handleReset }
      ])
    ] });
  }
  function LaunchProgressWidget({
    title = "Launch progress",
    subtitle = "Track remaining work across design, QA, and customer-facing comms.",
    surface = "elevated",
    className,
    style
  }) {
    const steps = [
      { label: "Finalize component tokens", progress: 100, tone: "success" },
      { label: "QA the billing flows", progress: 72, tone: "warning" },
      { label: "Draft customer announcement", progress: 45, tone: "primary" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Progress" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "green", variant: "lighter", children: "76% overall" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: "1rem",
            alignItems: "center",
            padding: "1rem 0",
            borderTop: "1px solid var(--z-color-border, #ebebeb)",
            borderBottom: "1px solid var(--z-color-border, #ebebeb)"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.3rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "1rem" }, children: "Billing QA is the last critical milestone before launch." }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Next checkpoint in 2 hours \xB7 customer comms blocked on QA signoff" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { minWidth: 96, textAlign: "right" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "1.45rem", lineHeight: 1 }, children: "3/4" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: mutedTextStyle(), children: "milestones complete" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle(), children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "24px minmax(0, 1fr)", gap: "0.75rem", alignItems: "start" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
          "div",
          {
            style: {
              width: 24,
              height: 24,
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: step.progress === 100 ? "color-mix(in srgb, var(--z-color-success, #0a7d53) 14%, white)" : "var(--z-color-background100, #f4f6fa)",
              color: step.progress === 100 ? "var(--z-color-success, #0a7d53)" : "var(--muted)",
              fontSize: "0.72rem",
              fontWeight: 700
            },
            children: step.progress === 100 ? "\u2713" : index + 1
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.4rem") }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: step.label }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: mutedTextStyle(), children: [
              step.progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Progress, { value: step.progress, tone: step.tone })
        ] })
      ] }) }, step.label)) }),
      actionRow([{ label: "Open launch board" }, { label: "Export checklist", variant: "secondary" }])
    ] });
  }
  function NotificationFeedWidget({
    title = "Notifications feed",
    subtitle = "A mixed feed for approvals, releases, mentions, and customer-facing alerts.",
    surface = "elevated",
    className,
    style
  }) {
    const allItems = [
      { id: "1", label: "Pricing update approved", detail: "Maya approved the Q2 enterprise pricing change.", badge: { label: "Approved", color: "green" }, group: "Today" },
      { id: "2", label: "2 new support mentions", detail: "Customer ops mentioned billing retries in #launch-war-room.", badge: { label: "Unread", color: "blue" }, group: "Today" },
      { id: "3", label: "Scheduled publish in 30 min", detail: "Homepage hero and changelog copy are queued for publish.", badge: { label: "Scheduled", color: "orange" }, group: "Today" },
      { id: "4", label: "Release v2.4 deployed", detail: "Staging deploy succeeded. 3 new components shipped.", badge: { label: "Deploy", color: "purple" }, group: "Yesterday" }
    ];
    const [readIds, setReadIds] = (0, import_react37.useState)(/* @__PURE__ */ new Set());
    const markRead = (id) => setReadIds((prev) => /* @__PURE__ */ new Set([...prev, id]));
    const markAllRead = () => setReadIds(new Set(allItems.map((i) => i.id)));
    const unreadCount = allItems.filter((i) => !readIds.has(i.id)).length;
    const groups = ["Today", "Yesterday"];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.25rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Inbox" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        unreadCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Badge, { color: "blue", variant: "lighter", children: [
          unreadCount,
          " unread"
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "green", variant: "lighter", children: "All read" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: groups.map((group) => {
        const groupItems = allItems.filter((i) => i.group === group);
        if (!groupItems.length) return null;
        return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { padding: "0.5rem 0 0.25rem", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--z-color-muted, #667085)" }, children: group }),
          groupItems.map((item) => {
            const isRead = readIds.has(item.id);
            return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
              "div",
              {
                style: {
                  ...dividedRowStyle(),
                  opacity: isRead ? 0.55 : 1,
                  transition: "opacity 200ms"
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.35rem") }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
                    /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [
                      !isRead && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "var(--z-color-accent, #2563eb)", flexShrink: 0 } }),
                      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: item.label })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", gap: "0.4rem", alignItems: "center" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: item.badge.color, variant: "lighter", children: item.badge.label }),
                      !isRead && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                        "button",
                        {
                          type: "button",
                          onClick: () => markRead(item.id),
                          style: { fontSize: "0.75rem", color: "var(--z-color-muted, #667085)", background: "none", border: "none", cursor: "pointer", padding: "0 0.25rem", textDecoration: "underline" },
                          children: "Mark read"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }, children: item.detail })
                ] })
              },
              item.id
            );
          })
        ] }, group);
      }) }),
      actionRow([{ label: "Open inbox" }, { label: "Mark all read", variant: "secondary", onClick: markAllRead }])
    ] });
  }
  function SecurityAccessWidget({
    title = "Security & access",
    subtitle = "A compact admin surface for SSO, audit logging, and role-sensitive controls.",
    surface = "elevated",
    className,
    style
  }) {
    const [ssoEnabled, setSsoEnabled] = (0, import_react37.useState)(true);
    const [scimEnabled, setScimEnabled] = (0, import_react37.useState)(false);
    const [sessionAlerts, setSessionAlerts] = (0, import_react37.useState)(true);
    const rows = [
      { title: "Enforce SSO", detail: "Require Google or SAML for every workspace login.", value: ssoEnabled, setter: setSsoEnabled },
      { title: "SCIM provisioning", detail: "Automatically add and remove users from your directory.", value: scimEnabled, setter: setScimEnabled },
      { title: "Session alerts", detail: "Notify admins when sign-ins happen from new devices.", value: sessionAlerts, setter: setSessionAlerts }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Security" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "purple", variant: "lighter", children: "Admin" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({ paddingTop: "1rem" }),
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: "2FA is active for all owners" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), whiteSpace: "normal" }, children: "Review guest access before inviting external collaborators." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "info", children: "Protected" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle(), children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...inlineRowStyle(), alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: row.title }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), whiteSpace: "normal" }, children: row.detail })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Switch, { checked: row.value, onChange: row.setter })
      ] }) }, row.title)) }),
      actionRow([{ label: "Review access logs" }, { label: "Export audit trail", variant: "secondary" }])
    ] });
  }
  function PaymentMethodsWidget({
    title = "Payment methods",
    subtitle = "A reusable billing block for cards, invoices, and plan-level payment preferences.",
    surface = "elevated",
    className,
    style
  }) {
    const methods = [
      { label: "Visa ending 4242", meta: "Expires 08/27 \xB7 Default for subscriptions", tone: "neutral" },
      { label: "Mastercard ending 1188", meta: "Used for failed retry fallback", tone: "neutral" },
      { label: "Net 30 invoice", meta: "Enterprise invoice route for annual renewal", tone: "info" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Billing" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "neutral", children: "3 methods" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: methods.map((method, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle(), children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...inlineRowStyle(), alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: method.label }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), whiteSpace: "normal" }, children: method.meta })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: method.tone, variant: "lighter", children: index === 0 ? "Default" : method.label.includes("invoice") ? "Invoice" : "Card" })
      ] }) }, method.label)) }),
      actionRow([{ label: "Add payment method" }, { label: "Download invoices", variant: "secondary" }])
    ] });
  }
  function ActivityTimelineWidget({
    title = "Recent activity",
    subtitle = "A compact timeline for launches, merges, comments, and operational updates.",
    surface = "elevated",
    className,
    style
  }) {
    const activity = [
      { actor: "Maya", note: "merged the button loading state polish", time: "12m ago", badge: "Merged" },
      { actor: "Noah", note: "updated the invite flow copy for enterprise workspaces", time: "31m ago", badge: "Edited" },
      { actor: "Akhil", note: "published widget gallery changes to staging", time: "1h ago", badge: "Deploy" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Timeline" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "blue", variant: "lighter", children: "Today" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle("0.9rem"), children: activity.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: "0.75rem", alignItems: "start" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Avatar, { name: item.actor, size: 32 }),
          index !== activity.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { width: 1, flex: 1, minHeight: 28, background: "var(--z-color-border, #ebebeb)" } }) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.25rem"), padding: "0.15rem 0 0.65rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: item.actor }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), fontSize: "0.84rem" }, children: item.time })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }, children: item.note }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "gray", variant: "stroke", children: item.badge }) })
        ] })
      ] }, `${item.actor}-${item.time}`)) }),
      actionRow([{ label: "View activity log", variant: "secondary" }])
    ] });
  }
  function CommandPaletteWidget({
    title = "Command palette",
    subtitle = "A fast command surface for global navigation, actions, and recent entities.",
    surface = "elevated",
    className,
    style
  }) {
    const allCommands = [
      { label: "Create release", meta: "Workflow \xB7 cmd+k", badge: "Action" },
      { label: "Open billing usage", meta: "Settings \xB7 b", badge: "Page" },
      { label: "Invite team member", meta: "Team \xB7 i", badge: "Shortcut" },
      { label: "View audit trail", meta: "Security \xB7 a", badge: "Page" },
      { label: "Export analytics report", meta: "Analytics \xB7 e", badge: "Action" }
    ];
    const [query, setQuery] = (0, import_react37.useState)("");
    const [activeIndex, setActiveIndex] = (0, import_react37.useState)(0);
    const filtered = query.trim() ? allCommands.filter(
      (c) => c.label.toLowerCase().includes(query.toLowerCase()) || c.meta.toLowerCase().includes(query.toLowerCase())
    ) : allCommands.slice(0, 3);
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.4rem"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Command" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        Input,
        {
          value: query,
          onChange: (e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          },
          placeholder: "Search actions, pages, or team members\u2026"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...dividedRowStyle(), borderTop: "none", color: "var(--z-color-muted, #667085)", fontSize: "0.9rem" }, children: [
        "No results for \u201C",
        query,
        "\u201D"
      ] }) : filtered.map((command, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        "div",
        {
          onMouseEnter: () => setActiveIndex(index),
          style: {
            ...index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle(),
            borderRadius: 8,
            background: index === activeIndex ? "var(--z-color-background100, #f4f6fa)" : "transparent",
            cursor: "pointer"
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...inlineRowStyle() }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.12rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: command.label }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: command.meta })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "gray", variant: "stroke", children: command.badge })
          ] })
        },
        command.label
      )) }),
      actionRow([{ label: "Open palette" }, { label: "Edit shortcuts", variant: "secondary" }])
    ] });
  }
  function KanbanBoardWidget({
    title = "Kanban board",
    subtitle = "A compact task board for design, review, and shipping workflows.",
    surface = "elevated",
    className,
    style
  }) {
    const lanes = [
      { title: "Backlog", color: "gray", cards: ["Audit widgets page", "Review upload edge cases"] },
      { title: "In review", color: "orange", cards: ["Invite flow polish", "Changelog copy update"] },
      { title: "Done", color: "green", cards: ["Button loading state", "Alert sizing pass"] }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.4rem"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Board" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.75rem" }, children: lanes.map((lane) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.65rem"), padding: "0.8rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.9rem" }, children: lane.title }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: lane.color, variant: "lighter", children: lane.cards.length })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle("0.55rem"), children: lane.cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { padding: "0.75rem 0.8rem", borderRadius: 10, background: "var(--z-color-weak, var(--z-color-background, #f7f7f7))", border: "1px solid var(--z-color-border, #ebebeb)" }, children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.88rem", lineHeight: 1.5 }, children: card }) }, card)) })
      ] }, lane.title)) })
    ] });
  }
  function EventSchedulerWidget({
    title = "Event scheduler",
    subtitle = "A small scheduling block for launches, demos, or stakeholder reviews.",
    surface = "elevated",
    className,
    style
  }) {
    const [guests, setGuests] = (0, import_react37.useState)(["maya@zephr.work", "noah@zephr.work"]);
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.4rem"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Scheduler" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.8rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormField, { label: "Event title", htmlFor: "scheduler-title", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Input, { id: "scheduler-title", defaultValue: "Launch review sync" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormField, { label: "Time", htmlFor: "scheduler-time", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Input, { id: "scheduler-time", defaultValue: "Thu, 4:30 PM" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormField, { label: "Guests", hint: "Add people from your team or customer accounts.", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(TagInput, { value: guests, onChange: setGuests, placeholder: "name@company.com" }) }),
      actionRow([{ label: "Schedule meeting" }, { label: "Save draft", variant: "secondary" }])
    ] });
  }
  function CommentThreadWidget({
    title = "Comment thread",
    subtitle = "A review thread for design QA, docs editing, or launch feedback.",
    surface = "elevated",
    className,
    style
  }) {
    const comments = [
      { name: "Maya Carter", role: "Design systems", status: "online", note: "The file upload card should stay compact on tablet widths." },
      { name: "Akhil Krishnan", role: "Product", status: "busy", note: "Agreed. Keep the action row on one line and reduce header density." }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.4rem"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Comments" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: comments.map((comment, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle(), children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: "0.75rem", alignItems: "start" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Avatar, { name: comment.name, size: 34, status: comment.status }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.25rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: [
            comment.name,
            " \xB7 ",
            comment.role
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }, children: comment.note })
        ] })
      ] }) }, comment.name)) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormField, { label: "Reply", htmlFor: "comment-reply", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Textarea, { id: "comment-reply", rows: 3, defaultValue: "Looks good. I\u2019ll tighten the spacing and update the responsive layout." }) }),
      actionRow([{ label: "Post reply" }, { label: "Resolve thread", variant: "secondary" }])
    ] });
  }
  function PlanComparisonWidget({
    title = "Plan comparison",
    subtitle = "A compact pricing widget for upgrades, workspace seats, and feature access.",
    surface = "elevated",
    className,
    style
  }) {
    const plans = [
      { name: "Individual", price: "$79", seats: "1 seat", featured: false },
      { name: "Startup", price: "$249", seats: "10 seats", featured: true },
      { name: "Enterprise", price: "Custom", seats: "Unlimited", featured: false }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.4rem"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Pricing" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        "div",
        {
          style: {
            ...summaryBandStyle(),
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1rem"
          },
          children: plans.map((plan, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
            "div",
            {
              style: {
                ...stackStyle("0.25rem"),
                paddingLeft: index === 0 ? 0 : "1rem",
                borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.95rem" }, children: plan.name }),
                  plan.featured ? /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "blue", variant: "lighter", children: "Popular" }) : null
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "1.2rem", lineHeight: 1.2 }, children: plan.price }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: plan.seats })
              ]
            },
            plan.name
          ))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: [
        { label: "AI context files", individual: "Included", startup: "Included", enterprise: "Included" },
        { label: "Premium widgets", individual: "Core set", startup: "Full access", enterprise: "Full + custom" },
        { label: "Workspace seats", individual: "1", startup: "10", enterprise: "Unlimited" }
      ].map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) repeat(3, minmax(0, 1fr))",
              gap: "1rem",
              alignItems: "center"
            })
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.92rem", fontWeight: 600 }, children: row.label }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: row.individual }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: row.startup }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: row.enterprise })
          ]
        },
        row.label
      )) }),
      actionRow([{ label: "Upgrade plan" }, { label: "Compare features", variant: "secondary" }])
    ] });
  }
  function AssetReviewWidget({
    title = "Asset review",
    subtitle = "A media approval widget for content, homepage assets, and campaign files.",
    surface = "elevated",
    className,
    style
  }) {
    const [approved, setApproved] = (0, import_react37.useState)(["hero-shot.png"]);
    const assets = ["hero-shot.png", "pricing-card.png", "launch-thumbnail.mp4"];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.4rem"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Review" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle("0.75rem"), children: assets.map((asset) => {
        const isApproved = approved.includes(asset);
        return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "84px minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center", padding: "0.85rem 0.95rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { height: 56, borderRadius: 10, background: "linear-gradient(135deg, rgba(51,92,255,0.14), rgba(17,24,39,0.06))", border: "1px solid var(--z-color-border, #ebebeb)" } }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: asset }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: isApproved ? "Approved for publish" : "Needs final review" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
            Button,
            {
              size: "sm",
              variant: isApproved ? "secondary" : "primary",
              onClick: () => setApproved(
                (current) => current.includes(asset) ? current.filter((item) => item !== asset) : [...current, asset]
              ),
              children: isApproved ? "Approved" : "Approve"
            }
          )
        ] }, asset);
      }) })
    ] });
  }
  function ApiKeysWidget({
    title = "API keys",
    subtitle = "Manage internal tokens, scopes, and rotation without leaving the billing or settings surface.",
    surface = "elevated",
    className,
    style
  }) {
    const keys = [
      { label: "Production webhooks", scope: "Write \xB7 Billing \xB7 Webhooks", status: "Active", lastRotated: "Rotated 12 days ago" },
      { label: "Internal automation", scope: "Read \xB7 Components \xB7 Themes", status: "Staging", lastRotated: "Rotated yesterday" },
      { label: "Audit exports", scope: "Read \xB7 Audit \xB7 Licenses", status: "Limited", lastRotated: "Rotate this week" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Developer access" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "neutral", children: "3 keys" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: keys.map((key, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle(), children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.28rem") }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: key.label }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { variant: "lighter", color: key.status === "Active" ? "green" : key.status === "Staging" ? "blue" : "yellow", children: key.status })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: key.scope }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), fontSize: "0.82rem" }, children: key.lastRotated })
      ] }) }, key.label)) }),
      actionRow([{ label: "Create key" }, { label: "Rotate selected", variant: "secondary" }])
    ] });
  }
  function SupportQueueWidget({
    title = "Support queue",
    subtitle = "A triage block for customer conversations, severity, ownership, and response SLA.",
    surface = "elevated",
    className,
    style
  }) {
    const tickets = [
      { customer: "Northstar", issue: "Invoice retries failing after card update", owner: "Maya", priority: "Urgent" },
      { customer: "Patchwork", issue: "CSV export missing transaction notes", owner: "Noah", priority: "High" },
      { customer: "Vector Labs", issue: "Need onboarding help for new finance users", owner: "Liam", priority: "Normal" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.25rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Support" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "orange", variant: "lighter", children: "7 open" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1rem",
            padding: "0.95rem 0",
            borderTop: "1px solid var(--z-color-border, #ebebeb)",
            borderBottom: "1px solid var(--z-color-border, #ebebeb)"
          },
          children: [
            { label: "Urgent", value: "1 ticket" },
            { label: "Assigned", value: "3 owners" },
            { label: "Avg. first reply", value: "11 minutes" }
          ].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.15rem"), paddingLeft: index === 0 ? 0 : "1rem", borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: item.label }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: item.value })
          ] }, item.label))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: tickets.map((ticket, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: ticket.customer }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: ticket.priority === "Urgent" ? "red" : ticket.priority === "High" ? "yellow" : "gray", variant: "lighter", children: ticket.priority })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: "0.3rem 0 0", lineHeight: 1.55 }, children: ticket.issue }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: { ...mutedTextStyle(), fontSize: "0.82rem", display: "block", marginTop: "0.35rem" }, children: [
          "Owner: ",
          ticket.owner
        ] })
      ] }, ticket.customer + ticket.issue)) }),
      actionRow([{ label: "Open queue" }, { label: "Assign owner", variant: "secondary" }])
    ] });
  }
  function GoalTrackerWidget({
    title = "Goal tracker",
    subtitle = "Track quarter goals, delivery confidence, and the initiatives most likely to move the metric.",
    surface = "elevated",
    className,
    style
  }) {
    const goals = [
      { label: "Increase trial activation", progress: 68, tone: "primary", note: "New onboarding template shipping next week" },
      { label: "Reduce support first response", progress: 81, tone: "success", note: "Support queue widget now live for ops" },
      { label: "Improve upgrade conversion", progress: 47, tone: "warning", note: "Pricing page still needs A/B copy pass" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Goals" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "teal", variant: "lighter", children: "Quarterly" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle("0.85rem"), children: goals.map((goal) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.38rem"), ...dividedRowStyle({ borderTop: "1px solid var(--z-color-border, #ebebeb)", padding: "0.9rem 0" }) }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: goal.label }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: mutedTextStyle(), children: [
            goal.progress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Progress, { value: goal.progress, tone: goal.tone }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), fontSize: "0.82rem" }, children: goal.note })
      ] }, goal.label)) }),
      actionRow([{ label: "Open goals" }, { label: "Update targets", variant: "secondary" }])
    ] });
  }
  function IntegrationStatusWidget({
    title = "Integration status",
    subtitle = "Monitor third-party dependencies, sync health, and degraded connections before customers notice.",
    surface = "elevated",
    className,
    style
  }) {
    const integrations = [
      { name: "Lemon Squeezy", detail: "Checkout webhooks healthy", tone: "success" },
      { name: "Supabase", detail: "Replication lag below 120ms", tone: "success" },
      { name: "Vercel", detail: "One staging deploy failed 24m ago", tone: "warning" },
      { name: "Figma sync", detail: "Token export paused awaiting review", tone: "info" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Integrations" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "blue", variant: "lighter", children: "4 connected" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: integrations.map((integration) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: dividedRowStyle({ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: integration.name }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: integration.detail })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
          Badge,
          {
            color: integration.tone === "success" ? "green" : integration.tone === "warning" ? "yellow" : "blue",
            variant: "lighter",
            children: integration.tone === "success" ? "Healthy" : integration.tone === "warning" ? "Attention" : "Review"
          }
        )
      ] }, integration.name)) }),
      actionRow([{ label: "Open status page" }, { label: "Retry sync", variant: "secondary" }])
    ] });
  }
  function AccessRequestsWidget({
    title = "Access requests",
    subtitle = "Review pending access changes, elevated roles, and guest requests before they reach production.",
    surface = "elevated",
    className,
    style
  }) {
    const requests = [
      { name: "Ari Patel", request: "Admin access for billing workspace", reason: "Owns month-end reconciliations", badge: "Admin" },
      { name: "Sara Wong", request: "Guest access to launch room", reason: "External copy review for homepage update", badge: "Guest" },
      { name: "Nina Park", request: "Security log export", reason: "Quarterly audit prep", badge: "Audit" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Access" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "purple", variant: "lighter", children: "3 pending" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: requests.map((request) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.28rem"), ...dividedRowStyle() }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: request.name }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: request.badge === "Admin" ? "red" : request.badge === "Guest" ? "yellow" : "gray", variant: "lighter", children: request.badge })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.88rem" }, children: request.request }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), fontSize: "0.82rem" }, children: request.reason })
      ] }, request.name + request.request)) }),
      actionRow([{ label: "Review requests" }, { label: "Bulk approve", variant: "secondary" }])
    ] });
  }
  function LicenseActivationsWidget({
    title = "License activations",
    subtitle = "Track active seats, recent activations, and reset requests across customer workspaces.",
    surface = "elevated",
    className,
    style
  }) {
    const workspaces = [
      { name: "Northstar", usage: "8 / 10 seats", status: "Healthy", detail: "Last activation 3h ago" },
      { name: "Patchwork", usage: "3 / 3 seats", status: "At limit", detail: "1 reset request pending" },
      { name: "Vector Labs", usage: "14 / 20 seats", status: "Healthy", detail: "2 devices added today" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Licensing" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "neutral", children: "3 accounts" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1rem",
            padding: "0.95rem 0",
            borderTop: "1px solid var(--z-color-border, #ebebeb)",
            borderBottom: "1px solid var(--z-color-border, #ebebeb)"
          },
          children: [
            { label: "Healthy", value: "2 accounts" },
            { label: "At limit", value: "1 workspace" },
            { label: "Resets pending", value: "1 request" }
          ].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.15rem"), paddingLeft: index === 0 ? 0 : "1rem", borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: item.label }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: item.value })
          ] }, item.label))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: workspaces.map((workspace, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
            }),
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: "0.9rem",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.18rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: workspace.name }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: workspace.usage }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), fontSize: "0.82rem" }, children: workspace.detail })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: workspace.status === "At limit" ? "yellow" : "green", variant: "lighter", children: workspace.status })
          ]
        },
        workspace.name
      )) }),
      actionRow([{ label: "Open license admin" }, { label: "Reset activation", variant: "secondary" }])
    ] });
  }
  function ExperimentResultsWidget({
    title = "Experiment results",
    subtitle = "Review conversion deltas, confidence, and rollout recommendations before shipping a winner.",
    surface = "elevated",
    className,
    style
  }) {
    const variants = [
      { name: "Control", uplift: "0%", confidence: "Baseline", tone: "subtle" },
      { name: "Variant B", uplift: "+11.4%", confidence: "95% confidence", tone: "success" },
      { name: "Variant C", uplift: "+3.2%", confidence: "Needs more traffic", tone: "info" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Experiments" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "green", variant: "lighter", children: "Winner found" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: variants.map((variant, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
            }),
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: "0.9rem",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: variant.name }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: variant.confidence })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: variant.tone, variant: "lighter", children: variant.uplift })
          ]
        },
        variant.name
      )) }),
      actionRow([{ label: "Roll out winner" }, { label: "View full report", variant: "secondary" }])
    ] });
  }
  function ReleaseNotesWidget({
    title = "Release notes",
    subtitle = "Draft launch communication, checklist the announcement, and keep the final publish path in one block.",
    surface = "elevated",
    className,
    style
  }) {
    const [channels, setChannels] = (0, import_react37.useState)(["In-app changelog", "Email digest"]);
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Comms" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "blue", variant: "lighter", children: "Draft" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormField, { label: "Headline", htmlFor: "release-notes-headline", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Input, { id: "release-notes-headline", defaultValue: "New widgets gallery and page templates are now live" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormField, { label: "Summary", htmlFor: "release-notes-body", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Textarea, { id: "release-notes-body", rows: 4, defaultValue: "This release adds reusable workflow widgets, filterable page templates, and a faster docs experience through route-level chunking." }) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(FormField, { label: "Channels", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(TagInput, { value: channels, onChange: setChannels, placeholder: "Add a publish channel" }) }),
      actionRow([{ label: "Publish notes" }, { label: "Save draft", variant: "secondary" }])
    ] });
  }
  function AnalyticsOverviewWidget({
    title = "Analytics overview",
    subtitle = "Track the top-line signals that drive product and growth decisions from one compact view.",
    surface = "elevated",
    className,
    style
  }) {
    const stats = [
      { label: "Active workspaces", value: "1,284", delta: "+8.2%" },
      { label: "Weekly retention", value: "72.4%", delta: "+2.1%" },
      { label: "Avg. session", value: "18m", delta: "-1.3%" },
      { label: "Net expansion", value: "14.8%", delta: "+4.7%" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.2rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "blue", variant: "lighter", children: "Analytics" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "blue", variant: "lighter", children: "Realtime" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: "1rem", padding: "1rem 0", borderTop: "1px solid var(--z-color-border, #ebebeb)", borderBottom: "1px solid var(--z-color-border, #ebebeb)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.7rem"), justifyContent: "space-between" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.25rem"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Weekly active workspaces" }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "baseline", gap: "0.6rem", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "2.2rem", lineHeight: 1 }, children: "1,284" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { color: "var(--z-color-success, #0a7d53)", fontWeight: 600 }, children: "+8.2% vs last week" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
            "div",
            {
              style: {
                height: 92,
                borderRadius: 14,
                background: "radial-gradient(circle at 76% 12%, rgba(120, 119, 255, 0.18) 0%, rgba(120,119,255,0) 28%), linear-gradient(180deg, color-mix(in srgb, var(--z-color-background100, #f4f6fa) 72%, #ffffff 28%) 0%, rgba(255,255,255,0.96) 100%)",
                border: "1px solid var(--z-color-border, #ebebeb)",
                display: "grid",
                gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                alignItems: "end",
                gap: "0.45rem",
                padding: "1rem"
              },
              children: [42, 54, 48, 61, 68, 73, 79].map((height, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                "span",
                {
                  style: {
                    display: "block",
                    height: `${height}%`,
                    borderRadius: 999,
                    background: index === 5 ? "linear-gradient(180deg, rgba(64,132,255,0.95) 0%, rgba(145,173,255,0.62) 100%)" : "linear-gradient(180deg, rgba(64,132,255,0.22) 0%, rgba(145,173,255,0.08) 100%)"
                  }
                },
                `${height}-${index}`
              ))
            }
          )
        ] }),
        stats.map((stat, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
          "div",
          {
            style: {
              ...stackStyle("0.28rem"),
              padding: "0.15rem 0 0.2rem 1rem",
              borderTop: index > 1 ? "1px solid var(--z-color-border, #ebebeb)" : "none",
              borderLeft: "1px solid var(--z-color-border, #ebebeb)"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: stat.label }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "1.08rem" }, children: stat.value }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: { color: stat.delta.startsWith("+") ? "var(--z-color-success, #0a7d53)" : "var(--z-color-danger, #c43b2f)", fontSize: "0.82rem", fontWeight: 600 }, children: [
                stat.delta,
                " vs last week"
              ] })
            ]
          },
          stat.label
        ))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { paddingTop: "0.95rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.9rem", display: "block" }, children: "Acquisition is trending up." }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: "0.25rem 0 0", lineHeight: 1.55 }, children: "Conversion from the new onboarding path is materially outperforming control." })
      ] }),
      actionRow([{ label: "Open dashboard" }, { label: "Export snapshot", variant: "secondary" }])
    ] });
  }
  function DealsPipelineWidget({
    title = "Deals pipeline",
    subtitle = "Review commercial opportunities, deal stages, and owner context without leaving the main workspace.",
    surface = "elevated",
    className,
    style
  }) {
    const deals = [
      { name: "Northstar expansion", owner: "Maya Carter", stage: "Proposal", value: "$18k ARR", color: "blue" },
      { name: "Patchwork renewal", owner: "Liam Torres", stage: "Negotiation", value: "$32k ARR", color: "orange" },
      { name: "Vector Labs pilot", owner: "Noah Kim", stage: "Qualified", value: "$9k ARR", color: "green" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "CRM" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "teal", variant: "lighter", children: "3 active" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: deals.map((deal, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
            }),
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: "0.9rem",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: deal.name }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { style: mutedTextStyle(), children: [
                deal.owner,
                " \xB7 ",
                deal.value
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: deal.color, variant: "lighter", children: deal.stage })
          ]
        },
        deal.name
      )) }),
      actionRow([{ label: "Open pipeline" }, { label: "Add opportunity", variant: "secondary" }])
    ] });
  }
  function BillingRecoveryWidget({
    title = "Billing recovery",
    subtitle = "Prioritize failed charges, retry health, and intervention paths before revenue slips further.",
    surface = "elevated",
    className,
    style
  }) {
    const invoices = [
      { account: "Pine Labs", amount: "$1,240", state: "Retry tonight", color: "orange" },
      { account: "Atlas Studio", amount: "$420", state: "Card updated", color: "green" },
      { account: "Northstar", amount: "$890", state: "Needs outreach", color: "red" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Recovery" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "orange", variant: "lighter", children: "3 at risk" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: "1rem",
            alignItems: "center",
            padding: "1rem 0",
            borderTop: "1px solid var(--z-color-border, #ebebeb)",
            borderBottom: "1px solid var(--z-color-border, #ebebeb)"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.45rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "baseline", gap: "0.55rem", flexWrap: "wrap" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "2rem", lineHeight: 1 }, children: "64%" }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { color: "var(--z-color-warning, #d97706)", fontWeight: 600 }, children: "Recovery rate" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Progress, { value: 64, tone: "warning" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), fontSize: "0.82rem" }, children: "Most failed payments are recoverable with one more retry or direct outreach." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: "Recovered this week" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "1.15rem" }, children: "$9,840" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: invoices.map((invoice, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle(), children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: invoice.account }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: invoice.amount })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: invoice.color, variant: "lighter", children: invoice.state })
      ] }) }, invoice.account)) }),
      actionRow([{ label: "Open dunning queue" }, { label: "Send reminders", variant: "secondary" }])
    ] });
  }
  function AutomationRunsWidget({
    title = "Automation runs",
    subtitle = "Monitor scheduled jobs, agent runs, and webhook-triggered automations before they block your team.",
    surface = "elevated",
    className,
    style
  }) {
    const runs = [
      { name: "Weekly release digest", meta: "Completed 12m ago", status: "Healthy", color: "green" },
      { name: "Invoice retry sync", meta: "Delayed by 4m", status: "Delayed", color: "orange" },
      { name: "Workspace usage backfill", meta: "Queued", status: "Queued", color: "gray" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Automations" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "purple", variant: "lighter", children: "3 jobs" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1rem",
            padding: "0.95rem 0",
            borderTop: "1px solid var(--z-color-border, #ebebeb)",
            borderBottom: "1px solid var(--z-color-border, #ebebeb)"
          },
          children: [
            { label: "Healthy", value: "1 run" },
            { label: "Delayed", value: "1 run" },
            { label: "Queued", value: "1 run" }
          ].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.15rem"), paddingLeft: index === 0 ? 0 : "1rem", borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: item.label }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: item.value })
          ] }, item.label))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: runs.map((run, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
            }),
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: "0.9rem",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: run.name }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: run.meta })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: run.color, variant: "lighter", children: run.status })
          ]
        },
        run.name
      )) }),
      actionRow([{ label: "Open run history" }, { label: "Retry failed", variant: "secondary" }])
    ] });
  }
  function AuditTrailWidget({
    title = "Audit trail",
    subtitle = "Track role changes, billing actions, and sensitive workspace events from one compact review surface.",
    surface = "elevated",
    className,
    style
  }) {
    const events = [
      { actor: "Maya Carter", action: "Changed owner role for Northstar", time: "9m ago", status: "Role change" },
      { actor: "Zephr Cloud", action: "Processed annual invoice for Patchwork", time: "24m ago", status: "Billing" },
      { actor: "Noah Kim", action: "Reset an enterprise license activation", time: "48m ago", status: "License" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Audit" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { tone: "neutral", children: "Tracked" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: events.map((event, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
            }),
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: "0.9rem",
            alignItems: "start"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.2rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: event.actor }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), fontSize: "0.82rem" }, children: event.time })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: event.action })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "gray", variant: "stroke", children: event.status })
          ]
        },
        `${event.actor}-${event.time}`
      )) }),
      actionRow([{ label: "Open audit log" }, { label: "Export CSV", variant: "secondary" }])
    ] });
  }
  function ContentCalendarWidget({
    title = "Content calendar",
    subtitle = "Coordinate launches, changelog updates, and campaign assets on one schedule-aware publishing board.",
    surface = "elevated",
    className,
    style
  }) {
    const items = [
      { day: "Mon", label: "Release notes draft", owner: "Akhil" },
      { day: "Wed", label: "Homepage asset review", owner: "Noah" },
      { day: "Fri", label: "Product update email", owner: "Maya" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Content ops" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "blue", variant: "lighter", children: "This week" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1rem",
            padding: "0.95rem 0",
            borderTop: "1px solid var(--z-color-border, #ebebeb)",
            borderBottom: "1px solid var(--z-color-border, #ebebeb)"
          },
          children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.2rem"), paddingLeft: index === 0 ? 0 : "1rem", borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { ...mutedTextStyle(), fontSize: "0.82rem" }, children: item.day }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem", lineHeight: 1.45 }, children: item.label }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: item.owner })
          ] }, item.label))
        }
      ),
      actionRow([{ label: "Open calendar" }, { label: "Add publish item", variant: "secondary" }])
    ] });
  }
  function IncidentResponseWidget({
    title = "Incident response",
    subtitle = "Keep incident state, owner handoff, and active mitigation steps visible while the team is in flight.",
    surface = "elevated",
    className,
    style
  }) {
    const tasks = [
      { label: "Identify failing service", done: true },
      { label: "Draft customer notice", done: true },
      { label: "Validate webhook retries", done: false },
      { label: "Prepare follow-up postmortem", done: false }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.2rem"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Reliability" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "red", variant: "lighter", children: "P1 active" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { padding: "0.1rem 0 0.2rem", borderBottom: "1px solid var(--z-color-border, #ebebeb)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.9rem", display: "block" }, children: "Webhook retries are degraded in eu-west." }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: "0.25rem 0 0", lineHeight: 1.55 }, children: "Customer-facing comms are live. Mitigation is in progress." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1rem",
            padding: "0.95rem 0",
            borderBottom: "1px solid var(--z-color-border, #ebebeb)"
          },
          children: [
            { label: "Owner", value: "Maya Carter" },
            { label: "Customers affected", value: "84 workspaces" },
            { label: "Updated", value: "2 minutes ago" }
          ].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...stackStyle("0.2rem"), borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)", paddingLeft: index === 0 ? 0 : "1rem" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: item.label }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.96rem" }, children: item.value })
          ] }, item.label))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: tasks.map((task, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle(),
            borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)",
            display: "grid",
            gridTemplateColumns: "auto minmax(0, 1fr) auto",
            gap: "0.75rem",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Checkbox, { checked: task.done, readOnly: true }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: task.label }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { color: task.done ? "var(--z-color-success, #16a34a)" : "var(--z-color-warning, #d97706)", fontSize: "0.82rem", fontWeight: 600 }, children: task.done ? "Done" : "Active" })
          ]
        },
        task.label
      )) }),
      actionRow([{ label: "Open incident room" }, { label: "Post update", variant: "secondary" }])
    ] });
  }
  function FeedbackInboxWidget({
    title = "Feedback inbox",
    subtitle = "Collect qualitative product feedback, group themes, and route follow-up without losing the thread.",
    surface = "elevated",
    className,
    style
  }) {
    const feedback = [
      { source: "Enterprise call", note: "Need exportable audit logs for compliance review.", theme: "Compliance" },
      { source: "Support chat", note: "Invite flow should clarify role differences.", theme: "Onboarding" },
      { source: "Beta customer", note: "Billing recovery data should expose retry reason.", theme: "Billing" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Feedback" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "teal", variant: "lighter", children: "3 themes" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: feedback.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
            }),
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: "0.9rem",
            alignItems: "start"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.2rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }, children: item.source }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: mutedTextStyle(), children: item.note })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "blue", variant: "lighter", children: item.theme })
          ]
        },
        item.note
      )) }),
      actionRow([{ label: "Review feedback" }, { label: "Create insight", variant: "secondary" }])
    ] });
  }
  function DataTableWidget({
    title = "Recent transactions",
    subtitle = "A sortable overview of the latest entries.",
    surface = "elevated",
    className,
    style
  }) {
    const [sortKey, setSortKey] = (0, import_react37.useState)("date");
    const [sortDir, setSortDir] = (0, import_react37.useState)("desc");
    const [selected, setSelected] = (0, import_react37.useState)(/* @__PURE__ */ new Set());
    const baseRows = [
      { name: "Acme Corp", amount: 4250, amountDisplay: "$4,250.00", status: "Completed", statusColor: "green", date: "Mar 5, 2026", dateSort: 5 },
      { name: "Globex Inc", amount: 1800, amountDisplay: "$1,800.00", status: "Pending", statusColor: "yellow", date: "Mar 4, 2026", dateSort: 4 },
      { name: "Initech Ltd", amount: 12e3, amountDisplay: "$12,000.00", status: "Completed", statusColor: "green", date: "Mar 3, 2026", dateSort: 3 },
      { name: "Umbrella Co", amount: 3420, amountDisplay: "$3,420.00", status: "Failed", statusColor: "red", date: "Mar 2, 2026", dateSort: 2 },
      { name: "Stark Ind", amount: 8750, amountDisplay: "$8,750.00", status: "Completed", statusColor: "green", date: "Mar 1, 2026", dateSort: 1 }
    ];
    const rows = [...baseRows].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "amount") cmp = a.amount - b.amount;
      else if (sortKey === "status") cmp = a.status.localeCompare(b.status);
      else cmp = a.dateSort - b.dateSort;
      return sortDir === "asc" ? cmp : -cmp;
    });
    const toggleSort = (key) => {
      if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
      else {
        setSortKey(key);
        setSortDir("asc");
      }
    };
    const toggleRow = (name) => setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
    const allSelected = selected.size === rows.length;
    const toggleAll = () => setSelected(allSelected ? /* @__PURE__ */ new Set() : new Set(rows.map((r) => r.name)));
    const SortIcon = ({ k }) => sortKey !== k ? null : /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { marginLeft: 4, opacity: 0.7 }, children: sortDir === "asc" ? "\u2191" : "\u2193" });
    const thStyle = {
      padding: "0.75rem 1rem",
      fontSize: "0.73rem",
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--z-color-muted, #667085)",
      textAlign: "left",
      borderBottom: "1px solid var(--z-color-border, #ebebeb)",
      cursor: "pointer",
      userSelect: "none",
      whiteSpace: "nowrap"
    };
    const tdStyle = {
      padding: "0.85rem 1rem",
      fontSize: "0.92rem",
      color: "var(--z-color-text, #171717)",
      borderBottom: "1px solid var(--z-color-border, #ebebeb)"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Data" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [
          selected.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Badge, { color: "blue", variant: "lighter", children: [
            selected.size,
            " selected"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Badge, { color: "blue", variant: "lighter", children: [
            rows.length,
            " entries"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { borderRadius: 14, overflow: "hidden", border: "1px solid var(--z-color-border, #ebebeb)" }, children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("table", { style: { width: "100%", borderCollapse: "collapse", background: "var(--z-color-surface, #ffffff)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("tr", { style: { background: "var(--z-color-background100, #f4f6fa)" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("th", { style: { ...thStyle, width: 40, cursor: "default" }, children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Checkbox, { checked: allSelected, indeterminate: selected.size > 0 && !allSelected, onChange: toggleAll }) }),
          ["name", "amount", "status", "date"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("th", { style: thStyle, onClick: () => toggleSort(key), children: [
            key.charAt(0).toUpperCase() + key.slice(1),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(SortIcon, { k: key })
          ] }, key))
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("tbody", { children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
          "tr",
          {
            onClick: () => toggleRow(row.name),
            style: {
              borderBottom: i === rows.length - 1 ? "none" : void 0,
              background: selected.has(row.name) ? "color-mix(in srgb, var(--z-color-accent, #2563eb) 5%, transparent)" : "transparent",
              cursor: "pointer"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("td", { style: { ...tdStyle, width: 40 }, children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Checkbox, { checked: selected.has(row.name), onChange: () => toggleRow(row.name) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("td", { style: { ...tdStyle, fontWeight: 500 }, children: row.name }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("td", { style: { ...tdStyle, fontFamily: "var(--z-type-family-mono, monospace)", fontSize: "0.88rem" }, children: row.amountDisplay }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("td", { style: tdStyle, children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: row.statusColor, variant: "lighter", children: row.status }) }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("td", { style: { ...tdStyle, color: "var(--z-color-muted, #667085)" }, children: row.date })
            ]
          },
          row.name
        )) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--z-color-muted, #667085)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { children: "Showing 1\u20135 of 24" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", gap: "0.4rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "secondary", children: "Previous" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "secondary", children: "Next" })
        ] })
      ] })
    ] });
  }
  function StatusPageWidget({
    title = "System status",
    subtitle = "All services are operating normally.",
    surface = "elevated",
    className,
    style
  }) {
    const services = [
      { name: "API", status: "Operational", color: "green", uptime: "99.99%" },
      { name: "Dashboard", status: "Operational", color: "green", uptime: "99.98%" },
      { name: "Webhooks", status: "Degraded", color: "yellow", uptime: "99.42%" },
      { name: "Storage", status: "Operational", color: "green", uptime: "99.97%" },
      { name: "Auth", status: "Operational", color: "green", uptime: "100%" }
    ];
    const dotStyle = (color) => ({
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: color === "green" ? "var(--z-color-success, #0a7d53)" : color === "yellow" ? "var(--z-color-warning, #d97706)" : "var(--z-color-danger, #c43b2f)",
      flexShrink: 0
    });
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Status" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "green", variant: "lighter", children: "All systems go" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: services.map((svc, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
            }),
            display: "grid",
            gridTemplateColumns: "auto 1fr auto auto",
            gap: "0.85rem",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dotStyle(svc.color) }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { fontSize: "0.93rem", color: "var(--z-color-text, #171717)" }, children: svc.name }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.85rem", fontFamily: "var(--z-type-family-mono, monospace)", color: "var(--z-color-muted, #667085)" }, children: svc.uptime }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: svc.color, variant: "lighter", children: svc.status })
          ]
        },
        svc.name
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { fontSize: "0.82rem", color: "var(--z-color-muted, #667085)" }, children: "Last checked 2 minutes ago" })
    ] });
  }
  function NavbarWidget({
    title = "Navigation bar",
    subtitle = "Responsive top navigation with actions.",
    surface = "elevated",
    className,
    style
  }) {
    const links = ["Dashboard", "Projects", "Team", "Settings"];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Navigation" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...panelStyle(),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            padding: "0.75rem 1.1rem"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "1.5rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { fontSize: "0.95rem", color: "var(--z-color-text, #171717)", letterSpacing: "-0.02em" }, children: "Acme" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("nav", { style: { display: "flex", gap: "0.2rem" }, children: links.map((link, i) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                "span",
                {
                  style: {
                    padding: "0.35rem 0.7rem",
                    borderRadius: 8,
                    fontSize: "0.88rem",
                    fontWeight: i === 0 ? 500 : 400,
                    color: i === 0 ? "var(--z-color-text, #171717)" : "var(--z-color-muted, #667085)",
                    background: i === 0 ? "var(--z-color-background100, #f4f6fa)" : "transparent",
                    cursor: "pointer"
                  },
                  children: link
                },
                link
              )) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "secondary", children: "Search" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Avatar, { name: "AK", size: 28 })
            ] })
          ]
        }
      )
    ] });
  }
  function DropdownMenuWidget({
    title = "Dropdown menu",
    subtitle = "Contextual action menus and selects.",
    surface = "elevated",
    className,
    style
  }) {
    const menuItems = [
      { label: "Edit", shortcut: "\u2318E", section: "actions" },
      { label: "Duplicate", shortcut: "\u2318D", section: "actions" },
      { label: "Move to\u2026", shortcut: "\u2318M", section: "actions" },
      { label: "Archive", shortcut: "", section: "danger" },
      { label: "Delete", shortcut: "\u232B", section: "danger" }
    ];
    const menuItemStyle = (isDanger) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.55rem 0.85rem",
      borderRadius: 8,
      fontSize: "0.9rem",
      color: isDanger ? "var(--z-color-danger, #c43b2f)" : "var(--z-color-text, #171717)",
      cursor: "pointer"
    });
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Menu" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        "div",
        {
          style: {
            borderRadius: 14,
            border: "1px solid var(--z-color-border, #ebebeb)",
            background: "var(--z-color-surface, #ffffff)",
            padding: "0.4rem",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            maxWidth: 260
          },
          children: menuItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
            i === 3 && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Divider, { style: { margin: "0.3rem 0" } }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: menuItemStyle(item.section === "danger"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { children: item.label }),
              item.shortcut && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.78rem", color: "var(--z-color-muted, #667085)", fontFamily: "var(--z-type-family-mono, monospace)" }, children: item.shortcut })
            ] })
          ] }, item.label))
        }
      )
    ] });
  }
  function DatePickerWidget({
    title = "Date picker",
    subtitle = "Calendar-based date selection.",
    surface = "elevated",
    className,
    style
  }) {
    const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const days = [
      [24, 25, 26, 27, 28, 1, 2],
      [3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23],
      [24, 25, 26, 27, 28, 29, 30]
    ];
    const today = 8;
    const selected = 14;
    const dayCellStyle = (day, weekRow) => {
      const isPrev = weekRow === 0 && day > 20;
      const isSelected = day === selected && weekRow === 1;
      const isToday = day === today && weekRow === 1;
      return {
        width: 36,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        fontSize: "0.88rem",
        fontWeight: isSelected || isToday ? 600 : 400,
        cursor: "pointer",
        color: isPrev ? "var(--z-color-muted, #667085)" : isSelected ? "var(--z-color-primaryContrast, #fff)" : "var(--z-color-text, #171717)",
        background: isSelected ? "var(--z-color-primary, #533afd)" : isToday ? "var(--z-color-background100, #f4f6fa)" : "transparent"
      };
    };
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Picker" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            borderRadius: 16,
            border: "1px solid var(--z-color-border, #ebebeb)",
            background: "var(--z-color-surface, #ffffff)",
            padding: "1rem",
            maxWidth: 300
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "secondary", children: "\u2039" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { fontSize: "0.93rem", color: "var(--z-color-text, #171717)" }, children: "March 2026" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "secondary", children: "\u203A" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.15rem", justifyItems: "center" }, children: [
              weekdays.map((wd) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { fontSize: "0.73rem", fontWeight: 600, color: "var(--z-color-muted, #667085)", padding: "0.3rem 0", textAlign: "center" }, children: wd }, wd)),
              days.map(
                (week, wi) => week.map((day) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dayCellStyle(day, wi), children: day }, `${wi}-${day}`))
              )
            ] })
          ]
        }
      )
    ] });
  }
  function FileManagerWidget({
    title = "File manager",
    subtitle = "Browse and manage project files.",
    surface = "elevated",
    className,
    style
  }) {
    const files = [
      { name: "design-system.fig", type: "Figma", size: "4.2 MB", modified: "2h ago", icon: "\u{1F3A8}" },
      { name: "api-docs.md", type: "Markdown", size: "28 KB", modified: "5h ago", icon: "\u{1F4C4}" },
      { name: "components.zip", type: "Archive", size: "12.8 MB", modified: "1d ago", icon: "\u{1F4E6}" },
      { name: "brand-assets", type: "Folder", size: "\u2014", modified: "3d ago", icon: "\u{1F4C1}" },
      { name: "onboarding-flow.mp4", type: "Video", size: "86 MB", modified: "1w ago", icon: "\u{1F3AC}" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Files" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Button, { size: "sm", variant: "primary", children: "Upload" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: files.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
            }),
            display: "grid",
            gridTemplateColumns: "auto 1fr auto auto",
            gap: "0.85rem",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "1.2rem", lineHeight: 1 }, children: file.icon }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.1rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { fontSize: "0.93rem", color: "var(--z-color-text, #171717)" }, children: file.name }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.82rem", color: "var(--z-color-muted, #667085)" }, children: file.type })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.82rem", color: "var(--z-color-muted, #667085)", fontFamily: "var(--z-type-family-mono, monospace)" }, children: file.size }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.82rem", color: "var(--z-color-muted, #667085)" }, children: file.modified })
          ]
        },
        file.name
      )) }),
      actionRow([{ label: "New folder", variant: "secondary" }, { label: "Download all", variant: "secondary" }])
    ] });
  }
  function MetricsDashboardWidget({
    title = "Key metrics",
    subtitle = "Real-time performance indicators.",
    surface = "elevated",
    className,
    style
  }) {
    const [period, setPeriod] = (0, import_react37.useState)("30d");
    const metricsByPeriod = {
      "7d": [
        { label: "Revenue", value: "$11.4K", delta: "+3.2%", positive: true },
        { label: "Users", value: "2,847", delta: "+1.8%", positive: true },
        { label: "Churn", value: "0.4%", delta: "-0.1%", positive: true },
        { label: "NPS", value: "72", delta: "\u2014", positive: true }
      ],
      "30d": [
        { label: "Revenue", value: "$48.2K", delta: "+12.4%", positive: true },
        { label: "Users", value: "2,847", delta: "+8.1%", positive: true },
        { label: "Churn", value: "1.2%", delta: "-0.3%", positive: true },
        { label: "NPS", value: "72", delta: "-2", positive: false }
      ],
      "90d": [
        { label: "Revenue", value: "$142K", delta: "+28.7%", positive: true },
        { label: "Users", value: "2,847", delta: "+21.5%", positive: true },
        { label: "Churn", value: "3.8%", delta: "+0.6%", positive: false },
        { label: "NPS", value: "72", delta: "+5", positive: true }
      ]
    };
    const metrics = metricsByPeriod[period];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Dashboard" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { display: "flex", gap: "0.25rem", background: "var(--z-color-background100, #f4f6fa)", borderRadius: 8, padding: "0.2rem" }, children: ["7d", "30d", "90d"].map((p) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setPeriod(p),
            style: {
              fontSize: "0.78rem",
              fontWeight: 600,
              padding: "0.2rem 0.6rem",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              background: period === p ? "var(--z-color-surface, #ffffff)" : "transparent",
              color: period === p ? "var(--z-color-text, #171717)" : "var(--z-color-muted, #667085)",
              boxShadow: period === p ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              transition: "all 120ms"
            },
            children: p
          },
          p
        )) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }, children: metrics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { ...panelStyle(), display: "flex", flexDirection: "column", gap: "0.4rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.78rem", fontWeight: 500, color: "var(--z-color-muted, #667085)", textTransform: "uppercase", letterSpacing: "0.05em" }, children: m.label }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { fontSize: "1.35rem", letterSpacing: "-0.03em", color: "var(--z-color-text, #171717)" }, children: m.value }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.82rem", fontWeight: 500, color: m.positive ? "var(--z-color-success, #0a7d53)" : "var(--z-color-danger, #c43b2f)" }, children: m.delta })
      ] }, m.label)) }),
      actionRow([{ label: "View report" }, { label: "Export", variant: "secondary" }])
    ] });
  }
  function UserProfileCardWidget({
    title = "Profile",
    subtitle = "Manage your account details and preferences.",
    surface = "elevated",
    className,
    style
  }) {
    const details = [
      { label: "Email", value: "alex@company.com" },
      { label: "Role", value: "Admin" },
      { label: "Team", value: "Engineering" },
      { label: "Timezone", value: "UTC-8 (PST)" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Account" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...panelStyle(),
            display: "flex",
            alignItems: "center",
            gap: "1rem"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Avatar, { name: "Alex Chen", size: 48 }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: stackStyle("0.15rem"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { fontSize: "1.05rem", color: "var(--z-color-text, #171717)" }, children: "Alex Chen" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.88rem", color: "var(--z-color-muted, #667085)" }, children: "Product Engineer" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: "green", variant: "lighter", children: "Active" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6, fontSize: "0.92rem" }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: details.map((d, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
            }),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.88rem", color: "var(--z-color-muted, #667085)" }, children: d.label }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.92rem", fontWeight: 500, color: "var(--z-color-text, #171717)" }, children: d.value })
          ]
        },
        d.label
      )) }),
      actionRow([{ label: "Edit profile" }, { label: "Change password", variant: "secondary" }])
    ] });
  }
  function PricingTierWidget({
    title = "Pro plan",
    subtitle = "Everything you need to scale your product.",
    surface = "elevated",
    className,
    style
  }) {
    const features = [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "Team collaboration",
      "API access"
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Pricing" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "baseline", gap: "0.3rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--z-color-text, #171717)" }, children: "$49" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.92rem", color: "var(--z-color-muted, #667085)" }, children: "/ month" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6, fontSize: "0.92rem" }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Divider, {}),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: stackStyle("0.6rem"), children: features.map((feat) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "0.65rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { color: "var(--z-color-success, #0a7d53)", fontSize: "1rem", fontWeight: 700, lineHeight: 1 }, children: "\u2713" }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.92rem", color: "var(--z-color-text, #171717)" }, children: feat })
      ] }, feat)) }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Divider, {}),
      actionRow([{ label: "Get started" }, { label: "Compare plans", variant: "secondary" }])
    ] });
  }
  function ChangelogFeedWidget({
    title = "Changelog",
    subtitle = "Recent updates and improvements.",
    surface = "elevated",
    className,
    style
  }) {
    const entries = [
      { version: "v2.4.0", date: "Mar 5, 2026", label: "Feature", labelColor: "blue", description: "Added real-time collaboration for all project types." },
      { version: "v2.3.2", date: "Feb 28, 2026", label: "Fix", labelColor: "green", description: "Resolved issue with webhook delivery retries." },
      { version: "v2.3.1", date: "Feb 22, 2026", label: "Improvement", labelColor: "purple", description: "Dashboard load time reduced by 40% with new caching layer." },
      { version: "v2.3.0", date: "Feb 15, 2026", label: "Feature", labelColor: "blue", description: "Introduced custom roles and granular permissions." }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Card, { ...surfaceProps(surface), padding: "lg", className, style: cardStyle(style), children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: inlineRowStyle(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: kickerStyle(), children: "Updates" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { style: titleStyle(), children: title })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(Badge, { color: "blue", variant: "lighter", children: [
          entries.length,
          " releases"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }, children: subtitle }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { style: dividedListStyle(), children: entries.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
        "div",
        {
          style: {
            ...dividedRowStyle({
              borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
            }),
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "0.45rem"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("strong", { style: { fontSize: "0.93rem", fontFamily: "var(--z-type-family-mono, monospace)", color: "var(--z-color-text, #171717)" }, children: entry.version }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(Badge, { color: entry.labelColor, variant: "lighter", children: entry.label }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { style: { fontSize: "0.82rem", color: "var(--z-color-muted, #667085)", marginLeft: "auto" }, children: entry.date })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { style: { margin: 0, fontSize: "0.9rem", lineHeight: 1.55, color: "var(--z-color-text, #171717)" }, children: entry.description })
          ]
        },
        entry.version
      )) }),
      actionRow([{ label: "View all releases" }])
    ] });
  }
  return __toCommonJS(src_exports);
})();
