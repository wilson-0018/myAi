import Link from "next/link";
import { moduleEntries } from "@/lib/mock-data";

export function KnowledgeHubPanel() {
  return (
    <aside className="panel glass-panel module-panel">
      <div className="module-thumb">
        <img src="/pic/knowlege.png" alt="知识情报中心缩略图" />
      </div>
      <div className="panel-title">
        <div>
          <p className="eyebrow">Knowledge Intelligence Hub</p>
          <h2>行业知识库</h2>
        </div>
      </div>
      <div className="module-list">
        {moduleEntries.map((entry) => {
          const Icon = entry.icon;
          return (
            <Link href={entry.href} className="module-card holo-card compact-module-card" key={entry.id}>
              <Icon size={22} color="var(--aqua)" />
              <h3>{entry.title}</h3>
              <p className="module-subtitle">{entry.subtitle}</p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
