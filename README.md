# Yathu.ai

**A personal desktop assistant that adapts your workspace to the way you work.**

Yathu.ai is a Windows-first desktop companion built around one simple idea: your computer should feel different when you study, code, focus, or take a break.

> “Hey Yathu” is the planned wake phrase.

## Current direction

- Electron + React + TypeScript desktop shell.
- A calm, distinctive interface with its own midnight-green, sage, and warm-neutral visual identity.
- Workspace modes: Everyday, Study, Coding, Focus, and Chill.
- Keyboard activation with **Ctrl + Space**.
- Planned, optional local wake-word detection.
- Local-first command handling, with optional AI providers for complex requests.

## Resource-first design

Yathu is designed to stay idle when not in use: no background AI calls, periodic network requests, resident model, or polling-based monitor. The microphone is disabled in this prototype. Resource metrics can be sampled manually from the dashboard.

The target is **under 1% average idle CPU**, to be verified on a packaged Windows build. This is a target, not a benchmark claim. RAM is tracked separately in MB because a percentage varies with the computer's installed memory.

See [docs/RESOURCE_POLICY.md](docs/RESOURCE_POLICY.md) for the performance budget and Windows benchmark procedure.

## Getting started

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Build the desktop application:

```bash
npm run build
npm run typecheck
```

## Current status

The repository contains the desktop shell and first UI prototype. Mode selection, keyboard activation, and manual resource snapshots are implemented in the code. Microphone capture, wake-word detection, AI provider connections, Windows appearance controls, lighting integrations, and persistent settings are not wired up yet.

Those capabilities will be added in separate, testable steps. Yathu should show a clear listening state and must not silently perform disruptive desktop actions.

## Design principles

- Personal and practical, not a generic chatbot template.
- Lightweight while idle.
- Clear user control over microphone access and automation.
- Local-first where practical.
- Confirm before changing important system settings or launching disruptive actions.

## Stack

- Electron + electron-vite
- React + TypeScript
- Lucide icons
- Custom CSS with local system-font fallbacks

---

Built as an independent project. Not part of DEVTEX.
