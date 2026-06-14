import { CockpitWorkspace } from "@/components/CockpitWorkspace";

export default function CockpitPage() {
  return (
    <main className="page">
      <section className="section-title">
        <div>
          <p className="eyebrow">Insight Execution Cockpit</p>
          <h1>洞察执行驾驶舱</h1>
          <p>机会点到OKR、执行闭环、知识闭环的一体化看板。</p>
        </div>
      </section>
      <CockpitWorkspace />
    </main>
  );
}
