import { AgentConfigWorkspace } from "@/components/AgentConfigWorkspace";

export default function AgentConfigPage() {
  return (
    <main className="page">
      <section className="section-title">
        <div>
          <p className="eyebrow">Enterprise Agent Configuration</p>
          <h1>企业级Agent配置管理</h1>
          <p>配置企业 Agent 的职责、Skill、协作规则与工作流，作为 AI Native Team 的治理后台。</p>
        </div>
      </section>
      <AgentConfigWorkspace />
    </main>
  );
}
