import { agentArchitecture } from "@/lib/mock-data";

export function AgentArchitectureDiagram() {
  return (
    <section className="panel glass-panel agent-architecture" aria-label="Agent协作工作流">
      <div className="panel-title">
        <div>
          <p className="eyebrow">Digital Workforce Flow</p>
          <h2>Agent协作工作流</h2>
        </div>
      </div>
      <div className="agent-flow-canvas">
        <svg className="liquid-current-map static-workflow-lines" viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="currentGradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#dffbff" />
              <stop offset="42%" stopColor="#4df3ff" />
              <stop offset="72%" stopColor="#ff5bd7" />
              <stop offset="100%" stopColor="#c8ff73" />
            </linearGradient>
            <filter id="currentGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {[
            "M500 58 C410 78 270 96 145 112",
            "M500 58 C465 82 420 96 382 112",
            "M500 58 C535 82 580 96 618 112",
            "M500 58 C590 78 730 96 855 112",
            "M145 168 C260 185 390 198 500 212",
            "M382 168 C430 185 468 198 500 212",
            "M618 168 C570 185 532 198 500 212",
            "M855 168 C740 185 610 198 500 212",
            "M500 260 C462 276 420 292 348 302",
            "M500 260 C500 276 500 288 500 302",
            "M500 260 C538 276 580 292 652 302"
          ].map((path) => (
            <g key={path}>
              <path className="current-path" d={path} />
              <path className="current-pulse" d={path} />
            </g>
          ))}
        </svg>
        <div className="flow-node director-node workflow-node workflow-director">
          <span>{agentArchitecture.director.icon}</span>
          {agentArchitecture.director.label}
        </div>
        {agentArchitecture.analysts.map((node, index) => (
          <div className={`flow-node analyst-node workflow-node workflow-analyst workflow-analyst-${index}`} key={node.id}>
            <span>{node.icon}</span>
            {node.label}
          </div>
        ))}
        <div className="flow-node strategy-node workflow-node workflow-strategy">
          <span>{agentArchitecture.strategy.icon}</span>
          {agentArchitecture.strategy.label}
        </div>
        {agentArchitecture.outputs.map((node, index) => (
          <div className={`flow-node output-node workflow-node workflow-output workflow-output-${index}`} key={node.id}>
            <span>{node.icon}</span>
            {node.label}
          </div>
        ))}
      </div>
    </section>
  );
}
