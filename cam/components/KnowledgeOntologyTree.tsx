import { knowledgeTree } from "@/lib/mock-data";

export function KnowledgeOntologyTree() {
  return (
    <div className="ontology-tree">
      {knowledgeTree.map((group, index) => (
        <article className="ontology-node" key={group.title}>
          <span className="badge ready">{String(index + 1).padStart(2, "0")}</span>
          <h3>{group.title}</h3>
          <p>{group.description}</p>
          <div className="tag-row">
            {group.children.map((child) => (
              <span className="tag" key={child}>
                {child}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
