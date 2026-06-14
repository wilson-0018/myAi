import { Archive, CheckCircle2, CircleDashed, ClipboardList, DatabaseZap, Flag, RefreshCcw, Target, XCircle } from "lucide-react";

const cockpitMetrics = [
  { label: "机会点", value: "12", icon: Target },
  { label: "OKR草案", value: "4", icon: Flag },
  { label: "执行任务", value: "18", icon: ClipboardList },
  { label: "知识回写", value: "36", icon: DatabaseZap }
];

const cockpitFlow = [
  { title: "机会点", detail: "识别", icon: Target },
  { title: "OKR", detail: "转化", icon: Flag },
  { title: "执行闭环", detail: "跟踪", icon: RefreshCcw },
  { title: "知识回写", detail: "沉淀", icon: DatabaseZap }
];

const opportunityCards = [
  { title: "高像素长焦", status: "已接受", icon: CheckCircle2 },
  { title: "AI影像协同", status: "已接受", icon: CheckCircle2 },
  { title: "HDR视频", status: "待确认", icon: CircleDashed },
  { title: "国产替代", status: "忽略", icon: XCircle }
];
const okrCards = ["价格段配置地图", "供应商路线表", "客户VOC库"];
const taskCards = ["竞品拆解", "RFQ验证", "供应风险复盘"];
const knowledgeCards = ["报告", "经验", "决策", "能力"];

export function CockpitWorkspace() {
  return (
    <div className="cockpit-board">
      <section className="cockpit-metric-row">
        {cockpitMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article className="cockpit-metric" key={metric.label}>
              <Icon size={20} />
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          );
        })}
      </section>

      <section className="panel glass-panel cockpit-flow-panel">
        <div className="cockpit-core">
          <img src="/pic/cockpit-core.png" alt="Insight Cockpit" />
        </div>
        <div className="cockpit-flow">
          {cockpitFlow.map((step, index) => {
            const Icon = step.icon;
            return (
              <div className="cockpit-flow-step" key={step.title}>
                <span className="cockpit-step-index">0{index + 1}</span>
                <Icon size={22} />
                <strong>{step.title}</strong>
                <small>{step.detail}</small>
              </div>
            );
          })}
        </div>
      </section>

      <section className="cockpit-lane-grid">
        <article className="cockpit-lane">
          <div className="cockpit-lane-head">
            <Target size={18} />
            <h3>机会点</h3>
          </div>
          <div className="cockpit-chip-list opportunity-chip-list">
            {opportunityCards.map((item) => {
              const Icon = item.icon;
              return (
                <span className={`cockpit-chip opportunity-chip status-${item.status}`} key={item.title}>
                  <Icon size={13} />
                  <strong>{item.title}</strong>
                  <small>{item.status}</small>
                </span>
              );
            })}
          </div>
        </article>

        <article className="cockpit-lane okr-lane">
          <span className="okr-link-line" aria-hidden="true" />
          <div className="cockpit-lane-head">
            <Flag size={18} />
            <h3>OKR</h3>
          </div>
          <div className="cockpit-chip-list">
            {okrCards.map((item) => (
              <span className="cockpit-chip" key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article className="cockpit-lane">
          <div className="cockpit-lane-head">
            <CheckCircle2 size={18} />
            <h3>执行闭环</h3>
          </div>
          <div className="cockpit-chip-list">
            {taskCards.map((item) => (
              <span className="cockpit-chip running-chip" key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article className="cockpit-lane">
          <div className="cockpit-lane-head">
            <Archive size={18} />
            <h3>知识闭环</h3>
          </div>
          <div className="cockpit-chip-list">
            {knowledgeCards.map((item) => (
              <span className="cockpit-chip complete-chip" key={item}>{item}</span>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
