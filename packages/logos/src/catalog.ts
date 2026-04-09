import { LogoCatalogEntry } from "./types";

interface SeedLogo {
  name: string;
  domain: string;
  category: string;
  color: string;
  tags: string[];
}

const seedLogos: SeedLogo[] = [
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
  { name: "Reddit", domain: "reddit.com", category: "social", color: "#f97316", tags: ["community", "social", "forum"] },

  // ── More AI & ML ──────────────────────────────────────────────────────────
  { name: "Mistral AI", domain: "mistral.ai", category: "ai", color: "#f97316", tags: ["ai", "llm", "model"] },
  { name: "Cohere", domain: "cohere.com", category: "ai", color: "#2563eb", tags: ["ai", "llm", "enterprise"] },
  { name: "Hugging Face", domain: "huggingface.co", category: "ai", color: "#f59e0b", tags: ["ai", "models", "datasets"] },
  { name: "Replicate", domain: "replicate.com", category: "ai", color: "#111827", tags: ["ai", "inference", "models"] },
  { name: "Stability AI", domain: "stability.ai", category: "ai", color: "#2563eb", tags: ["ai", "image", "generative"] },
  { name: "Runway", domain: "runwayml.com", category: "ai", color: "#111827", tags: ["ai", "video", "creative"] },
  { name: "ElevenLabs", domain: "elevenlabs.io", category: "ai", color: "#111827", tags: ["ai", "voice", "audio"] },
  { name: "Midjourney", domain: "midjourney.com", category: "ai", color: "#111827", tags: ["ai", "image", "creative"] },
  { name: "Together AI", domain: "together.ai", category: "ai", color: "#7c3aed", tags: ["ai", "inference", "llm"] },
  { name: "Groq", domain: "groq.com", category: "ai", color: "#f97316", tags: ["ai", "inference", "hardware"] },
  { name: "Fireworks AI", domain: "fireworks.ai", category: "ai", color: "#f59e0b", tags: ["ai", "inference", "api"] },
  { name: "DeepMind", domain: "deepmind.google", category: "ai", color: "#2563eb", tags: ["ai", "research", "google"] },
  { name: "Cursor", domain: "cursor.com", category: "ai", color: "#111827", tags: ["ai", "editor", "coding"] },
  { name: "Windsurf", domain: "windsurf.com", category: "ai", color: "#0ea5e9", tags: ["ai", "editor", "coding"] },
  { name: "Bolt", domain: "bolt.new", category: "ai", color: "#111827", tags: ["ai", "coding", "vibe"] },
  { name: "v0", domain: "v0.dev", category: "ai", color: "#111827", tags: ["ai", "ui", "coding"] },
  { name: "Lovable", domain: "lovable.dev", category: "ai", color: "#ec4899", tags: ["ai", "coding", "vibe"] },

  // ── More Developer Tools ───────────────────────────────────────────────────
  { name: "Postman", domain: "postman.com", category: "developer", color: "#f97316", tags: ["api", "testing", "http"] },
  { name: "Insomnia", domain: "insomnia.rest", category: "developer", color: "#7c3aed", tags: ["api", "testing", "http"] },
  { name: "Docker", domain: "docker.com", category: "developer", color: "#2563eb", tags: ["containers", "devops", "infra"] },
  { name: "Kubernetes", domain: "kubernetes.io", category: "developer", color: "#2563eb", tags: ["containers", "orchestration", "devops"] },
  { name: "Terraform", domain: "terraform.io", category: "developer", color: "#7c3aed", tags: ["infra", "devops", "iac"] },
  { name: "CircleCI", domain: "circleci.com", category: "developer", color: "#22c55e", tags: ["ci", "cd", "devops"] },
  { name: "GitHub Actions", domain: "github.com/features/actions", category: "developer", color: "#111827", tags: ["ci", "cd", "github"] },
  { name: "Jenkins", domain: "jenkins.io", category: "developer", color: "#dc2626", tags: ["ci", "cd", "automation"] },
  { name: "Vite", domain: "vitejs.dev", category: "developer", color: "#7c3aed", tags: ["build", "frontend", "tooling"] },
  { name: "Webpack", domain: "webpack.js.org", category: "developer", color: "#2563eb", tags: ["build", "bundler", "javascript"] },
  { name: "Turborepo", domain: "turbo.build", category: "developer", color: "#dc2626", tags: ["monorepo", "build", "javascript"] },
  { name: "Nx", domain: "nx.dev", category: "developer", color: "#2563eb", tags: ["monorepo", "build", "tooling"] },

  // ── Design ────────────────────────────────────────────────────────────────
  { name: "Adobe", domain: "adobe.com", category: "design", color: "#dc2626", tags: ["design", "creative", "suite"] },
  { name: "Zeplin", domain: "zeplin.io", category: "design", color: "#f59e0b", tags: ["design", "handoff", "developer"] },
  { name: "InVision", domain: "invisionapp.com", category: "design", color: "#f43f5e", tags: ["design", "prototype", "handoff"] },
  { name: "Penpot", domain: "penpot.app", category: "design", color: "#7c3aed", tags: ["design", "open-source", "prototype"] },
  { name: "Spline", domain: "spline.design", category: "design", color: "#111827", tags: ["design", "3d", "interactive"] },
  { name: "Maze", domain: "maze.co", category: "design", color: "#f97316", tags: ["design", "testing", "ux"] },
  { name: "Lottiefiles", domain: "lottiefiles.com", category: "design", color: "#2563eb", tags: ["animation", "lottie", "assets"] },

  // ── Analytics & Data ──────────────────────────────────────────────────────
  { name: "Mixpanel", domain: "mixpanel.com", category: "observability", color: "#7c3aed", tags: ["analytics", "product", "events"] },
  { name: "Amplitude", domain: "amplitude.com", category: "observability", color: "#2563eb", tags: ["analytics", "product", "growth"] },
  { name: "PostHog", domain: "posthog.com", category: "observability", color: "#f97316", tags: ["analytics", "open-source", "product"] },
  { name: "Segment", domain: "segment.com", category: "observability", color: "#22c55e", tags: ["analytics", "data", "cdp"] },
  { name: "Hotjar", domain: "hotjar.com", category: "observability", color: "#f97316", tags: ["analytics", "heatmaps", "ux"] },
  { name: "FullStory", domain: "fullstory.com", category: "observability", color: "#2563eb", tags: ["analytics", "sessions", "ux"] },
  { name: "LogRocket", domain: "logrocket.com", category: "observability", color: "#7c3aed", tags: ["errors", "sessions", "frontend"] },

  // ── More Databases ────────────────────────────────────────────────────────
  { name: "ClickHouse", domain: "clickhouse.com", category: "database", color: "#f59e0b", tags: ["database", "analytics", "olap"] },
  { name: "CockroachDB", domain: "cockroachlabs.com", category: "database", color: "#16a34a", tags: ["database", "distributed", "sql"] },
  { name: "Turso", domain: "turso.tech", category: "database", color: "#22c55e", tags: ["database", "sqlite", "edge"] },
  { name: "Upstash", domain: "upstash.com", category: "database", color: "#16a34a", tags: ["redis", "serverless", "kafka"] },
  { name: "Xata", domain: "xata.io", category: "database", color: "#7c3aed", tags: ["database", "serverless", "branching"] },
  { name: "Convex", domain: "convex.dev", category: "database", color: "#f97316", tags: ["database", "realtime", "backend"] },

  // ── More Entertainment / Social ───────────────────────────────────────────
  { name: "Twitch", domain: "twitch.tv", category: "media", color: "#7c3aed", tags: ["streaming", "gaming", "live"] },
  { name: "Figma Community", domain: "figma.com", category: "design", color: "#a855f7", tags: ["community", "resources", "design"] },
  { name: "Product Hunt", domain: "producthunt.com", category: "social", color: "#f97316", tags: ["launches", "community", "product"] },
  { name: "Dribbble", domain: "dribbble.com", category: "social", color: "#ec4899", tags: ["design", "portfolio", "community"] },
  { name: "Behance", domain: "behance.net", category: "social", color: "#2563eb", tags: ["design", "portfolio", "adobe"] }
];

function normalizeId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const catalog: LogoCatalogEntry[] = seedLogos.map((logo) => ({
  id: normalizeId(logo.name),
  name: logo.name,
  domain: logo.domain,
  category: logo.category,
  color: logo.color,
  tags: logo.tags
}));

const byDomain = new Map(catalog.map((item) => [item.domain.toLowerCase(), item]));

function normalizeDomain(domain: string): string {
  return domain.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
}

export function listLogoCatalog(): LogoCatalogEntry[] {
  return [...catalog];
}

export function getLogoByDomain(domain: string): LogoCatalogEntry | null {
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

function score(entry: LogoCatalogEntry, tokens: string[], normalized: string): number {
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

export function searchLogoCatalog(query: string, limit = 120): LogoCatalogEntry[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return catalog.slice(0, limit);
  }

  const tokens = normalized.split(/\s+/).filter(Boolean);

  return catalog
    .map((entry) => ({ entry, score: score(entry, tokens, normalized) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.entry.name.localeCompare(right.entry.name))
    .slice(0, limit)
    .map((entry) => entry.entry);
}
