import { AgentWorkspace } from "@/components/AgentWorkspace";
import Link from "next/link";
import { Home } from "lucide-react";

export default function AgentsPage() {
  return (
    <main className="page">
      <section className="section-title">
        <div>
          <p className="eyebrow">AI Native Team</p>
          <h1>AI Native专家团队</h1>
          <p>以Agent协作工作流展示行业研究总监、分析Agent、Strategy Agent之间的协作链路，形成洞察、风险和战略建议。</p>
        </div>
        <Link href="/" className="ghost-button page-return-button">
          <Home size={17} />
          返回主页
        </Link>
      </section>
      <AgentWorkspace />
    </main>
  );
}
