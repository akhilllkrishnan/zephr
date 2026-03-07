"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MATERIAL_ICON_STYLES = void 0;
exports.normalizeMaterialIconName = normalizeMaterialIconName;
exports.listMaterialIcons = listMaterialIcons;
exports.searchMaterialIcons = searchMaterialIcons;
exports.getMaterialIcon = getMaterialIcon;
exports.MaterialIcon = MaterialIcon;
const jsx_runtime_1 = require("react/jsx-runtime");
const aliasKeywords = {
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
    return name
        .split("_")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" ");
}
function defineIcons(names, category, keywords) {
    return names.map((name) => {
        const parts = name.split("_").filter(Boolean);
        return {
            name,
            title: toTitle(name),
            category,
            keywords: Array.from(new Set([...keywords, ...parts]))
        };
    });
}
const iconCatalog = [
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
const catalogByName = new Map(iconCatalog.map((icon) => [icon.name, icon]));
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
function searchMaterialIcons(query, options = {}) {
    const limit = options.limit ?? 120;
    const normalizedQuery = normalizeMaterialIconName(query);
    if (!normalizedQuery) {
        return iconCatalog.slice(0, limit);
    }
    const tokenList = expandQueryTokens(normalizedQuery.split("_").filter(Boolean));
    const scored = iconCatalog
        .map((icon) => ({ icon, score: scoreIcon(icon, tokenList, normalizedQuery) }))
        .filter((entry) => entry.score > 0)
        .sort((left, right) => {
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
const familyByStyle = {
    filled: "'Material Symbols Outlined'",
    outlined: "'Material Symbols Outlined'",
    rounded: "'Material Symbols Rounded'",
    sharp: "'Material Symbols Sharp'"
};
function MaterialIcon({ name, size = 20, styleVariant = "filled", filled, weight = 400, grade = 0, opticalSize = 24, style, ...props }) {
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
    return ((0, jsx_runtime_1.jsx)("span", { ...props, role: ariaLabel ? "img" : undefined, "aria-hidden": ariaLabel ? undefined : true, style: iconStyle, children: normalizedName }));
}
//# sourceMappingURL=index.js.map