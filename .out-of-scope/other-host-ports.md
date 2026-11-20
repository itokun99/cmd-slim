# Ports to Other Agent Hosts

The upstream oh-my-opencode-slim project does not port or maintain versions
for other agent hosts (for example, a Codex fork). Forking and reusing its
ideas, agents, and prompts elsewhere is explicitly welcome.

This `cmd-slim` downstream now ships an optional Command Code adapter under
`src/commandcode/`, built from the current upstream role prompts and bundled
skills. It covers the legacy port's agent, skill, and Orchestrator-prompt
surface through Command Code's native Mod API; it does not claim full parity
with OpenCode-only runtime features. The root package remains the OpenCode
plugin source of truth.

## Why the upstream project does not maintain ports

#507 requested a Codex port. alvinunreal declined while encouraging reuse:

> Even though I'm liking the idea, with v2 we are even more opencode
> dependent since background tasks are becoming major part of this plugin.
>
> Besides codex pi is also interesting, just I won't be able to maintain
> another version of this plugin.
> If others are willing, feel free to copy the idea, agents, prompts etc.

The plugin is coupled to OpenCode's runtime surface (session hooks, background
task boards, v1/v2 adapters), so each host port is a separate product with its
own maintenance cost rather than a feature of the upstream repository.

## Prior requests

- #507 — "[Feature]: oh-my-codex-slim" (closed)
