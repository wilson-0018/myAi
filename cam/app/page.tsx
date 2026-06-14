import { AgentTeamPanel } from "@/components/AgentTeamPanel";
import { HeroCore } from "@/components/HeroCore";
import { KnowledgeHubPanel } from "@/components/KnowledgeHubPanel";
import { StatusBar } from "@/components/StatusBar";

export default function HomePage() {
  return (
    <div className="page">
      <div className="hero-grid">
        <KnowledgeHubPanel />
        <HeroCore />
        <AgentTeamPanel />
      </div>
      <StatusBar />
    </div>
  );
}
