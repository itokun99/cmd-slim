# Command Code Mod

The root package remains the OpenCode plugin and also ships an optional
Command Code mod. The adapter uses the current agent prompts and skill tree
from this repository rather than copied templates.

The Command Code Mod API is experimental. This adapter was checked against
Command Code 1.83.0; pin the Command Code version you use and verify it after
upgrading the host.

## Install

From a checkout, build the package and install it at project scope:

```bash
bun install
bun run build
cmd mods add "$PWD"
cmd mods list
```

Add `--global` to make the mod available across projects. After publishing a
package version that contains the mod, install it by package name:

```bash
cmd mods add oh-my-opencode-slim --global
```

Use `cmd mods update` to update installed packages. Start a new Command Code
session or use `/reload` to load updated mod code.

For a one-session checkout smoke test, run:

```bash
cmd --mod ./dist/commandcode/mod.js
```

`cmd --mod` loads the mod for that session without adding it to settings.
Inspect its static registrations with:

```bash
cmd mods inspect ./dist/commandcode/mod.js
```

The 1.83.0 inspector reports recognized hooks and sub-agent registrations but
does not report `cmd.addSkillsPath`. Verify the skills path by asking a live
session to use a bundled skill.

## What the mod provides

- Current Explorer, Oracle, Designer, Fixer, and Observer agent prompts, plus
  the portable Council and Councillor roles. Librarian was merged into
  Explorer upstream and is not registered separately.
- The current bundled skill tree from `src/skills/`.
- The current Orchestrator routing prompt, appended to Command Code's main
  General agent prompt.
- No model pins; Command Code sub-agents inherit the active session model.

## Host boundary

Command Code does not expose a primary-agent selector through its Mod API.
General remains the main agent, and the mod only adds Orchestrator instructions
to its prompt. That overlay does not change General's identity or tool set.
Agents registered by `cmd.addAgent` are sub-agents selected through the host's
native delegation tool.

The Council/Councillor pair is static; OpenCode's per-preset council seats
depend on `RuntimeConfig` and are not mapped by this adapter. Marketplace,
presets, multiplexer, ACP, Interview, and OpenCode-specific runtime hooks also
remain in the OpenCode plugin.

The bundled `oh-my-opencode-slim` skill covers OpenCode configuration. The
Command Code host note in that skill directs users to this guide and the
native `cmd mods` commands instead of editing OpenCode settings. The
`reflect` skill's OpenCode database workflow is not used by Command Code;
session history analysis there requires transcripts supplied by the user.

## Following upstream changes

The mod imports role definitions and the Orchestrator prompt builder from the
current source tree and adds `src/skills/` relative to the built mod. When the
upstream source changes, rebuild and run the package and live Command Code
checks before updating the installed package.
