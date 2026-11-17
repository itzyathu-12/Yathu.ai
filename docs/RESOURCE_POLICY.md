# Resource and idle-performance policy

Yathu.ai is designed to stay quiet when the user is not asking it to do anything.

## Targets (to be measured, not assumed)

- **Idle CPU:** aim for less than 1% average on the reference Windows laptop, measured over a 5-minute idle window after startup settles.
- **Background CPU:** aim for effectively 0% when the window is minimized and no voice feature is enabled.
- **Network:** no periodic requests, telemetry, cloud speech recognition, or AI calls while idle.
- **Microphone:** disabled by default. The current prototype does not capture audio.
- **Workers:** no resident AI model, command worker, or polling loop in the base desktop shell.
- **Memory:** measure separately from CPU. A percentage-of-RAM target is not meaningful across different machines; track working set in MB and compare against a documented hardware baseline.

The 1% CPU target is an engineering goal, not a verified benchmark. Electron itself has a baseline memory footprint and several OS processes; do not promise that total machine usage will remain below 1%.

## Current implementation

- Electron's background renderer throttling remains enabled (Chromium default).
- The app starts only the desktop window and one global shortcut.
- Resource metrics are collected only when the user presses **Check resource use**. There is no monitoring timer.
- Metrics are read through a narrow preload bridge and IPC handler; Node integration stays disabled in the renderer.
- Remote Google Fonts loading was removed so the UI does not make a font request at startup.
- The microphone control is disabled. Wake-word detection is not implemented and must be separately enabled by the user when added.

## Required rules for future features

1. Do not add recurring timers, tight polling loops, or recurring background fetches for status updates.
2. Do not load AI SDKs, model runtimes, or speech engines until the user invokes the relevant feature.
3. Do not initialize a microphone stream on app startup. A wake-word option must be explicit, visible, and independently switchable.
4. Prefer OS events and user actions over polling.
5. Release audio streams and temporary resources when voice mode is stopped or the app exits.
6. Use cloud AI only after a user request; never stream idle microphone audio to a cloud service.
7. Keep any future local wake-word engine small and benchmark its CPU cost separately from the desktop shell.
8. Before shipping, measure the packaged production build on Windows, not just the Vite development server.

## Benchmark procedure (Windows)

1. Build and launch the packaged app.
2. Wait 2 minutes after startup for initial work to settle.
3. Close other Yathu windows and leave the app idle for 5 minutes with microphone disabled.
4. Record Yathu process CPU and memory in Windows Task Manager (Details tab; include all Yathu/Electron child processes).
5. Repeat with the window minimized.
6. Repeat after enabling any future wake-word feature; report that result separately.
7. Record machine model, Windows version, app version, test duration, CPU average/peak, and total working set.

A single snapshot is useful for troubleshooting but does not prove a 5-minute average. The in-app snapshot is intentionally manual and on-demand to avoid creating its own background load.
