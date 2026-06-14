import Link from "next/link";
import { ArrowRight, BrainCircuit, DatabaseZap } from "lucide-react";
import { LiquidCore3D } from "@/components/LiquidCore3D";

export function HeroCore() {
  return (
    <main className="panel glass-panel hero-core">
      <div className="hero-media">
        <img src="/pic/istockphoto-CIS.jpg" alt="CIS智能核心缩略图" />
      </div>
      <div className="hero-copy">
        <h1 className="glass-title">CAM智能洞察中心</h1>
        <div className="input-bar hero-input">
          <textarea defaultValue="未来三年手机CIS机会在哪里？请帮我输出机会点的洞察报告" aria-label="演示问题" rows={4} />
          <Link href="/agents" className="primary-button hero-action-button">
            <BrainCircuit size={18} />
            启动洞察分析
          </Link>
        </div>
      </div>
      <div className="metric-row">
        <div className="metric">
          <DatabaseZap size={18} />
          <strong>4</strong>
          <span className="muted">知识入口</span>
        </div>
        <div className="metric">
          <BrainCircuit size={18} />
          <strong>7</strong>
          <span className="muted">行业Agent</span>
        </div>
        <div className="metric">
          <ArrowRight size={18} />
          <strong>1</strong>
          <span className="muted">决策闭环</span>
        </div>
      </div>
      <LiquidCore3D />
    </main>
  );
}
