import { demoScript } from "@/lib/mock-data";

export function DemoScriptPanel() {
  return (
    <section className="panel">
      <div className="panel-title">
        <div>
          <p className="eyebrow">Demo Flow</p>
          <h2>演讲级Demo脚本</h2>
        </div>
      </div>
      <div className="demo-script">
        {demoScript.map((step, index) => (
          <div className="demo-step" key={step.stage}>
            <span className="badge ready">{index + 1}</span>
            <strong>{step.stage}</strong>
            <small>{step.duration}</small>
            <p>{step.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
