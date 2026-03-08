# @zephrui/cli

[![npm](https://img.shields.io/npm/v/@zephrui/cli?color=blue)](https://www.npmjs.com/package/@zephrui/cli)
[![license](https://img.shields.io/npm/l/@zephrui/cli)](https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE)

CLI for the Zephr design system. Initialize projects, scaffold components, switch themes, and generate AI instruction files.

## Usage

```sh
npx @zephrui/cli init                          # set up Zephr in your project
npx @zephrui/cli add button                    # scaffold a component
npx @zephrui/cli theme stripe --accent #1d4ed8 # switch theme
npx @zephrui/cli doctor                        # check your setup
npx @zephrui/cli list                          # list all components
```

## What `init` generates

- `zephr.config.ts` — project configuration
- `src/styles/zephr.css` — theme CSS import
- `.env.example` — environment template
- `CLAUDE.md` — Claude Code instructions
- `AGENTS.md` — Codex/Gemini instructions
- `llms.txt` — standard AI discovery file

## Docs

[zephr-docs.vercel.app](https://zephr-docs.vercel.app)

## License

[MIT](https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE)
