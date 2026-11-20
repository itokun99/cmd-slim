import {
  COUNCIL_AGENT_DESCRIPTION,
  COUNCIL_AGENT_PROMPT,
} from '../agents/council';
import {
  COUNCILLOR_AGENT_DESCRIPTION,
  COUNCILLOR_PROMPT,
} from '../agents/councillor';
import { buildOrchestratorPrompt } from '../agents/orchestrator';
import {
  ROLE_DEFINITIONS,
  type SpecialistRole,
} from '../agents/role-definitions';

type CommandCodeTools = '*' | readonly string[];

type CommandCodeAgent = {
  readonly name: string;
  readonly description: string;
  readonly systemPrompt: string;
  readonly tools?: CommandCodeTools;
};

type CommandCodeModApi = {
  readonly addAgent: (agent: CommandCodeAgent) => unknown;
  readonly addSkillsPath: (path: string) => unknown;
  readonly hooks: (hooks: {
    readonly appendSystemPrompt: () => string;
  }) => unknown;
};

const READ_ONLY_TOOLS = [
  'read_file',
  'read_directory',
  'grep',
  'glob',
  'web_search',
  'web_fetch',
] as const;

const ROLE_TOOLS = {
  explorer: READ_ONLY_TOOLS,
  oracle: READ_ONLY_TOOLS,
  designer: '*',
  fixer: '*',
  observer: ['read_file', 'read_directory'],
} as const satisfies Readonly<Record<SpecialistRole, CommandCodeTools>>;

export default function commandCodeMod(cmd: CommandCodeModApi): void {
  for (const role of Object.values(ROLE_DEFINITIONS)) {
    cmd.addAgent({
      name: role.id,
      description: role.description,
      systemPrompt: role.prompt,
      tools: ROLE_TOOLS[role.id],
    });
  }

  cmd.addAgent({
    name: 'council',
    description: COUNCIL_AGENT_DESCRIPTION,
    systemPrompt: COUNCIL_AGENT_PROMPT,
    tools: [],
  });
  cmd.addAgent({
    name: 'councillor',
    description: COUNCILLOR_AGENT_DESCRIPTION,
    systemPrompt: COUNCILLOR_PROMPT,
    tools: READ_ONLY_TOOLS,
  });

  cmd.addSkillsPath('../../src/skills');

  const orchestratorPrompt = buildOrchestratorPrompt();
  cmd.hooks({ appendSystemPrompt: () => orchestratorPrompt });
}
