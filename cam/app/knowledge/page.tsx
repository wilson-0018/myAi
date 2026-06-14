import { KnowledgeExplorer } from "@/components/KnowledgeExplorer";
import Link from "next/link";
import { Home } from "lucide-react";

export default function KnowledgePage() {
  return (
    <main className="page">
      <section className="section-title">
        <div>
          <p className="eyebrow">Knowledge Intelligence Hub</p>
          <h1>企业知识库</h1>
          <p className="knowledge-page-subtitle">围绕看趋势、看用户、看竞争、看自己四个入口，把资料沉淀为可检索、可复用、可进入决策流的知识卡。</p>
        </div>
        <Link href="/" className="ghost-button page-return-button">
          <Home size={17} />
          返回主页
        </Link>
      </section>
      <KnowledgeExplorer />
    </main>
  );
}
