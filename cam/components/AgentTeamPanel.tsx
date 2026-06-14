import Link from "next/link";
import { Bot, Play } from "lucide-react";
import { agents } from "@/lib/mock-data";

export function AgentTeamPanel() {
  return (
    <aside className="panel glass-panel module-panel">
      <div className="module-thumb">
        <img src="/pic/agents.png" alt="AI原生专家团队缩略图" />
      </div>
      <div className="panel-title">
        <div>
          <p className="eyebrow">AI Native Team</p>
          <h2>AI Agent协作团队</h2>
        </div>
        <Link href="/agent-config" className="icon-button" title="配置AI Agent">
          <Play size={17} />
        </Link>
      </div>
      <div className="module-list">
        {agents.slice(0, 5).map((agent) => (
          <div className="module-card holo-card compact-module-card" key={agent.id}>
            <span className={`badge ${agent.status} agent-status-corner`}>{agent.status}</span>
            <Bot size={21} color="var(--lime)" />
            <h3>{agent.name}</h3>
          </div>
        ))}
      </div>
    </aside>
  );
}
