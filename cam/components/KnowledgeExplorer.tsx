"use client";

import { useMemo, useState } from "react";
import { Bot, CloudUpload, DatabaseZap, Search } from "lucide-react";
import { knowledgeCards, moduleEntries } from "@/lib/mock-data";
import type { KnowledgeCategory } from "@/types/platform";

const labels: Record<KnowledgeCategory, string> = {
  trend: "看趋势AI资料整理",
  customer: "看用户AI资料整理",
  competitive: "看竞争AI资料整理",
  enterprise: "看自己AI资料整理"
};

const viewVisuals: Record<KnowledgeCategory, { badge: string; title: string; image: string; alt: string }> = {
  trend: {
    badge: "趋势分析整理",
    title: "行业趋势",
    image: "/pic/trend-chart-2.png",
    alt: "行业趋势图"
  },
  customer: {
    badge: "用户洞察整理",
    title: "用户画像与需求",
    image: "/pic/customer-chart.png",
    alt: "用户洞察图"
  },
  competitive: {
    badge: "竞争情报整理",
    title: "竞争格局",
    image: "/pic/competitive-chart.png",
    alt: "竞争分析图"
  },
  enterprise: {
    badge: "内部资产整理",
    title: "企业能力",
    image: "/pic/enterprise-chart.png",
    alt: "企业内部能力图"
  }
};

const fallbackThumbnails: Record<KnowledgeCategory, string> = {
  trend: "/pic/trend-chart.png",
  customer: "/pic/customer-chart.png",
  competitive: "/pic/competitive-chart.png",
  enterprise: "/pic/enterprise-chart.png"
};

export function KnowledgeExplorer() {
  const [active, setActive] = useState<KnowledgeCategory>("trend");
  const [keyword, setKeyword] = useState("");

  const cards = useMemo(() => {
    return knowledgeCards.filter((card) => {
      const hitCategory = card.category === active;
      const hitKeyword = `${card.title}${card.summary}${card.tags.join("")}`.toLowerCase().includes(keyword.toLowerCase());
      return hitCategory && hitKeyword;
    });
  }, [active, keyword]);

  return (
    <div className="knowledge-grid">
      <section className="panel">
        <div className="tab-row">
          {moduleEntries.map((entry) => (
            <button
              className={`tab-button ${active === entry.id ? "active" : ""}`}
              key={entry.id}
              onClick={() => setActive(entry.id)}
              type="button"
            >
              {entry.title}
            </button>
          ))}
        </div>
        <div className="input-bar" style={{ marginTop: 0, marginBottom: 16 }}>
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索CIS趋势、客户、竞争、内部资产" />
          <button className="ghost-button" type="button">
            <Search size={17} />
            搜索
          </button>
        </div>
        <div className="knowledge-action-row">
          <button className="ghost-button" type="button">
            <CloudUpload size={16} />
            文档上传
          </button>
          <button className="ghost-button" type="button">
            <Bot size={16} />
            AI爬虫
          </button>
          <button className="ghost-button" type="button">
            <DatabaseZap size={16} />
            企业Tclaw收集
          </button>
        </div>
        <div className="knowledge-list">
          {cards.map((card) => (
            <article className={`knowledge-list-item ${active === "enterprise" ? "no-thumb" : ""}`} key={card.id}>
              {active === "enterprise" ? null : <img src={card.thumbnail ?? fallbackThumbnails[card.category]} alt={card.title} />}
              <div className="knowledge-list-body">
                <div className="knowledge-list-head">
                  <span className="badge ready">{card.type}</span>
                  <h3>{card.title}</h3>
                </div>
                <p className="knowledge-field"><strong>摘要</strong>{card.summary}</p>
                <p className="knowledge-field knowledge-source"><strong>来源</strong>{card.source} · {card.updatedAt}</p>
                <div className="tag-row">
                  {card.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <aside className="panel">
        <p className="eyebrow">Current View</p>
        <h2>{labels[active]}</h2>
        <div className="trend-chart-panel">
          <div className="trend-chart-head">
            <span className="badge ready">{viewVisuals[active].badge}</span>
            <strong>{viewVisuals[active].title}</strong>
          </div>
          <img src={viewVisuals[active].image} alt={viewVisuals[active].alt} />
        </div>
      </aside>
    </div>
  );
}
