"use client";

import { useState } from "react";
import { Bot, GitBranch, Home, ListChecks, Save, Settings, SlidersHorizontal, Sparkles } from "lucide-react";
import Link from "next/link";
import { agents } from "@/lib/mock-data";

export function AgentConfigWorkspace() {
  const [selectedId, setSelectedId] = useState(agents[0].id);
  const selectedAgent = agents.find((agent) => agent.id === selectedId) ?? agents[0];

  return (
    <div className="agent-config-layout">
      <section className="panel glass-panel agent-config-sidebar">
        <div className="panel-title">
          <div>
            <p className="eyebrow">Agent Registry</p>
            <h2>企业Agent清单</h2>
          </div>
        </div>
        {agents.map((agent) => (
          <button
            className={`agent-config-list-item ${selectedId === agent.id ? "active" : ""}`}
            key={agent.id}
            onClick={() => setSelectedId(agent.id)}
            type="button"
          >
            <Bot size={18} />
            <span>{agent.name}</span>
            <small>{agent.status}</small>
          </button>
        ))}
      </section>

      <section className="panel glass-panel agent-config-main">
        <div className="agent-config-header">
          <div>
            <p className="eyebrow">Configuration Workspace</p>
            <h2>{selectedAgent.name}</h2>
            <p>{selectedAgent.description}</p>
          </div>
          <div className="agent-config-actions">
            <Link href="/" className="ghost-button page-return-button">
              <Home size={16} />
              返回主页
            </Link>
            <button className="primary-button agent-save-button" type="button">
              <Save size={16} />
              保存配置
            </button>
          </div>
        </div>

        <div className="agent-config-grid">
          <article className="agent-config-card">
            <div className="agent-config-card-title">
              <Settings size={18} />
              <h3>职责配置</h3>
            </div>
            <p>定义该 Agent 的问题边界、决策触发条件、禁止越界事项和输出质量标准。</p>
            <div className="agent-config-field">
              <strong>当前职责</strong>
              <span>{selectedAgent.description}</span>
            </div>
            <button className="ghost-button" type="button">
              <SlidersHorizontal size={16} />
              配置职责
            </button>
          </article>

          <article className="agent-config-card">
            <div className="agent-config-card-title">
              <Sparkles size={18} />
              <h3>Skill配置</h3>
            </div>
            <p>配置检索、报告生成、竞品对比、VOC分析、供应链风险识别等可调用能力。</p>
            <div className="skill-chip-row">
              {selectedAgent.reasoning.map((skill) => (
                <span className="tag" key={skill}>{skill}</span>
              ))}
            </div>
            <button className="ghost-button" type="button">
              <ListChecks size={16} />
              配置Skill
            </button>
          </article>

          <article className="agent-config-card">
            <div className="agent-config-card-title">
              <GitBranch size={18} />
              <h3>工作流配置</h3>
            </div>
            <p>配置任务分发、Agent协作顺序、证据传递、Strategy Agent汇总和知识回写规则。</p>
            <div className="agent-config-field">
              <strong>默认输入</strong>
              <span>{selectedAgent.input}</span>
            </div>
            <div className="agent-config-field">
              <strong>默认输出</strong>
              <span>{selectedAgent.output}</span>
            </div>
            <button className="ghost-button" type="button">
              <GitBranch size={16} />
              配置工作流
            </button>
          </article>

          <article className="agent-config-card">
            <div className="agent-config-card-title">
              <Bot size={18} />
              <h3>协作规则</h3>
            </div>
            <p>配置证据等级、模型调用、人工审核、异常回退、权限边界和跨Agent协作约束。</p>
            <div className="agent-policy-list">
              <span>证据等级：A/B/C分级</span>
              <span>人工审核：关键建议必须确认</span>
              <span>回写方式：报告、OKR、任务卡同步沉淀</span>
            </div>
            <button className="ghost-button" type="button">
              <Settings size={16} />
              配置规则
            </button>
          </article>
        </div>
      </section>
    </div>
  );
}
