import type { LucideIcon } from "lucide-react";

export type KnowledgeCategory = "trend" | "customer" | "competitive" | "enterprise";
export type AgentStatus = "ready" | "running" | "review";
export type RecommendationStatus = "pending" | "adopted" | "modified" | "rejected";

export interface ModuleEntry {
  id: KnowledgeCategory;
  title: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
}

export interface KnowledgeCard {
  id: string;
  title: string;
  type: "report" | "voc" | "benchmark" | "internal" | "image" | "news" | "deck" | "crawler";
  category: KnowledgeCategory;
  tags: string[];
  summary: string;
  source: string;
  updatedAt: string;
  thumbnail?: string;
}

export interface AgentProfile {
  id: string;
  name: string;
  status: AgentStatus;
  description: string;
  input: string;
  output: string;
  reasoning: string[];
}

export interface InsightReport {
  id: string;
  title: string;
  category: "opportunity" | "risk" | "roadmap";
  status: "draft" | "review" | "approved";
  recommendations: string[];
  evidence: string[];
}

export interface OkrItem {
  id: string;
  objective: string;
  keyResults: string[];
  tasks: string[];
}
