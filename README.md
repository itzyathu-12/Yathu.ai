# Yathu.ai

**A personal desktop assistant that adapts your workspace to the way you work.**

Yathu.ai is a Windows-first desktop companion built around one simple idea: your computer should feel different when you study, code, focus, or take a break.

> “Hey Yathu” — your assistant is ready.

## Current direction

- A native-feeling desktop app built with Electron, React, and TypeScript.
- A calm, distinctive interface inspired by the structure and clarity of DEVTEX, with its own midnight-green, sage, and warm-neutral visual identity.
- Workspace modes: Everyday, Study, Coding, Focus, and Chill.
- Planned voice activation with the wake phrase **Hey Yathu**.
- Planned keyboard activation with **Ctrl + Space**.
- Local-first command handling, with optional AI providers for more complex requests.

## Getting started

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Build the desktop application:

```bash
npm run build
```

## Project status

This repository currently contains the desktop shell and first UI prototype. Mode selection and the command-entry prototype work in the renderer. Microphone capture, wake-word detection, AI provider connections, Windows appearance controls, lighting integrations, and persistent settings are not wired up yet.

Those capabilities will be added in separate, testable steps. Yathu will show a clear listening state and should not silently perform disruptive desktop actions.

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
- CSS custom properties for mode-aware theming

---

Built as an independent project. Not part of DEVTEX.
