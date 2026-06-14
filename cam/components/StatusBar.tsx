import { statusItems } from "@/lib/mock-data";

export function StatusBar() {
  return (
    <section className="status-bar" aria-label="平台状态">
      {statusItems.map((item) => {
        const Icon = item.icon;
        return (
          <div className="status-item" key={item.label}>
            <Icon size={19} color="var(--aqua)" />
            <strong>{item.value}</strong>
            <span className="muted">{item.label}</span>
          </div>
        );
      })}
    </section>
  );
}
