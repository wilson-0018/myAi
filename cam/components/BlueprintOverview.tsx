import { architectureLayers, digitalTwinSignals, valueMatrix } from "@/lib/mock-data";

export function BlueprintOverview() {
  return (
    <section className="blueprint-grid">
      <article className="panel">
        <div className="panel-title">
          <div>
            <p className="eyebrow">V2.0 Product Blueprint</p>
            <h2>感知 -&gt; 思考 -&gt; 行动</h2>
          </div>
        </div>
        <div className="layer-row">
          {architectureLayers.map((layer) => (
            <div className="layer-card" key={layer.title}>
              <span className="badge ready">{layer.title}</span>
              <h3>{layer.subtitle}</h3>
              <p>{layer.detail}</p>
            </div>
          ))}
        </div>
      </article>
      <article className="panel">
        <div className="panel-title">
          <div>
            <p className="eyebrow">Industry Digital Twin</p>
            <h2>行业数字孪生信号</h2>
          </div>
        </div>
        <div className="signal-grid">
          {digitalTwinSignals.map((signal) => (
            <div className="signal-card" key={signal.label}>
              <strong>{signal.value}</strong>
              <span>{signal.label}</span>
              <p>{signal.detail}</p>
            </div>
          ))}
        </div>
      </article>
      <article className="panel value-panel">
        <div className="panel-title">
          <div>
            <p className="eyebrow">Value Matrix</p>
            <h2>角色价值矩阵</h2>
          </div>
        </div>
        <div className="value-grid">
          {valueMatrix.map((item) => (
            <div className="module-card" key={item.role}>
              <h3>
                <span>{item.icon}</span> {item.role}
              </h3>
              <div className="tag-row">
                {item.values.map((value) => (
                  <span className="tag" key={value}>
                    {value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
