"use client";

import { useEffect, useMemo, useState } from "react";
import { Bot, CheckCircle2, Circle, FileText, Loader2 } from "lucide-react";
import { AgentArchitectureDiagram } from "@/components/AgentArchitectureDiagram";
import { agents } from "@/lib/mock-data";

type RuntimeStatus = "running" | "processing" | "complete";

export function AgentWorkspace() {
  const orderedAgents = useMemo(() => agents.slice(0, 6), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<RuntimeStatus>("running");
  const isAllComplete = activeIndex >= orderedAgents.length;

  useEffect(() => {
    if (isAllComplete) return;

    const timer = window.setTimeout(() => {
      if (phase === "running") {
        setPhase("processing");
        return;
      }

      if (phase === "processing") {
        setPhase("complete");
        return;
      }

      setActiveIndex((index) => index + 1);
      setPhase("running");
    }, phase === "complete" ? 260 : 520);

    return () => window.clearTimeout(timer);
  }, [phase, isAllComplete]);

  const getStatus = (index: number): RuntimeStatus => {
    if (index < activeIndex || isAllComplete) return "complete";
    if (index === activeIndex) return phase;
    return "running";
  };

  const statusLabel: Record<RuntimeStatus, string> = {
    running: "运行",
    processing: "运行中",
    complete: "完成"
  };

  const statusIcon = (status: RuntimeStatus) => {
    if (status === "complete") return <CheckCircle2 size={16} />;
    if (status === "processing") return <Loader2 className="spin-icon" size={16} />;
    return <Circle size={14} />;
  };

  return (
    <>
      <AgentArchitectureDiagram />
      <section className="agent-grid" style={{ marginTop: 16 }}>
        {orderedAgents.map((agent, index) => {
          const status = getStatus(index);
          return (
            <article className="card agent-card" key={agent.id}>
              <header>
                <div>
                  <Bot size={22} color="var(--aqua)" />
                  <h3>{agent.name}</h3>
                </div>
                <span className={`agent-status-icon runtime-${status}`} title={statusLabel[status]}>
                  {statusIcon(status)}
                </span>
              </header>
              <div className="agent-detail-block">
                <p><strong>职责：</strong>{agent.description}</p>
                <p><strong>输入：</strong>{agent.input}</p>
                <p><strong>输出：</strong>{agent.output}</p>
              </div>
              <ul className="reasoning-list">
                {agent.reasoning.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button className={`ghost-button ${status === "complete" ? "complete-button" : ""}`} type="button">
                {status === "complete" ? <CheckCircle2 size={17} /> : <Loader2 className={status === "processing" ? "spin-icon" : ""} size={17} />}
                {status === "complete" ? "完成" : statusLabel[status]}
              </button>
            </article>
          );
        })}
      </section>
      {isAllComplete ? (
        <section className="panel glass-panel report-result-panel">
          <div className="panel-title">
            <div>
              <p className="eyebrow">Generated Reports</p>
              <h2>洞察报告生成完成</h2>
            </div>
          </div>
          <div className="report-result-grid">
            <article className="report-result-card">
              <FileText size={22} color="var(--aqua)" />
              <h3>1. CAM行业机会点分析报告</h3>
              <p>聚焦未来三年手机CIS机会窗口，输出旗舰影像差异化、中端成本效率、国产化替代和AI影像协同机会点。</p>
              <span className="badge adopted">推理完成</span>
            </article>
            <article className="report-result-card">
              <FileText size={22} color="var(--lime)" />
              <h3>2. CAM行业洞察综合分析报告</h3>
              <p>综合趋势、用户、竞争、供应链和内部能力，形成策略建议、风险预警和后续OKR执行方向。</p>
              <span className="badge adopted">推理完成</span>
            </article>
          </div>
        </section>
      ) : null}
    </>
  );
}
