import {
  BarChart3,
  Blocks,
  BrainCircuit,
  Building2,
  Cpu,
  DatabaseZap,
  Eye,
  LineChart,
  Radar,
  Route,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import type { AgentProfile, InsightReport, KnowledgeCard, ModuleEntry, OkrItem } from "@/types/platform";

export const moduleEntries: ModuleEntry[] = [
  {
    id: "trend",
    title: "看趋势",
    subtitle: "高像素、大底、HDR视频、AI影像与价格段迁移",
    href: "/knowledge?view=trend",
    icon: LineChart
  },
  {
    id: "customer",
    title: "看用户",
    subtitle: "终端品牌影像策略、VOC、价格带和区域需求",
    href: "/knowledge?view=customer",
    icon: UsersRound
  },
  {
    id: "competitive",
    title: "看竞争",
    subtitle: "Sony、Samsung、OmniVision、国产CIS路线对比",
    href: "/knowledge?view=competitive",
    icon: Radar
  },
  {
    id: "enterprise",
    title: "看自己",
    subtitle: "内部文档、项目复盘、能力地图与知识回写",
    href: "/knowledge?view=enterprise",
    icon: Building2
  }
];

export const valueMatrix = [
  {
    role: "管理层",
    icon: "🎯",
    values: ["行业趋势预测", "竞争格局分析", "风险预警", "战略建议与决策支撑"]
  },
  {
    role: "市场团队",
    icon: "📈",
    values: ["客户需求洞察", "市场机会发现", "产品定位支持", "竞争动态追踪"]
  },
  {
    role: "研发团队",
    icon: "🔬",
    values: ["技术路线分析", "专利监控", "技术演进预测", "创新机会发现"]
  },
  {
    role: "供应链团队",
    icon: "🔗",
    values: ["价格趋势监测", "供应风险预警", "产能预测", "TCO成本分析"]
  }
];

export const architectureLayers = [
  { title: "感知层", subtitle: "Knowledge Intelligence Hub", detail: "数据采集、知识构建、情报分析" },
  { title: "思考层", subtitle: "AI Native Team", detail: "多Agent协同推理、洞察生成、策略汇总" },
  { title: "行动层", subtitle: "Insight Execution Cockpit", detail: "决策转化、任务跟踪、知识沉淀" }
];

export const knowledgeCards: KnowledgeCard[] = [
  {
    id: "doc_trend_200mp",
    title: "200MP从主摄卖点转向长焦裁切与多焦段覆盖",
    type: "report",
    category: "trend",
    tags: ["200MP", "长焦", "旗舰"],
    summary: "高像素不再只服务分辨率叙事，更被用于长焦裁切、无损变焦和AI remosaic协同。",
    source: "公开资料+知识库AGENT",
    updatedAt: "2026-06-13",
    thumbnail: "/pic/thumb-233.png"
  },
  {
    id: "doc_trend_hdr",
    title: "HDR视频成为旗舰影像体验指标",
    type: "report",
    category: "trend",
    tags: ["HDR", "视频", "ISP"],
    summary: "逆光、夜景和视频动态范围对用户感知更直接，要求CIS、ISP和算法同步规划。",
    source: "行业趋势摘要",
    updatedAt: "2026-06-13",
    thumbnail: "/pic/thumb-3.png"
  },
  {
    id: "news_trend_ai_camera",
    title: "AI影像资讯：端侧模型开始影响Camera规格定义",
    type: "news",
    category: "trend",
    tags: ["资讯", "AI Camera", "端侧模型"],
    summary: "AI影像从后期编辑向拍摄前和拍摄中迁移，可能改变CIS、ISP和算法联合定义方式。",
    source: "AI爬虫采集",
    updatedAt: "2026-06-13",
    thumbnail: "/pic/jade-chambers-gAajOmMG6XI-unsplash.jpg"
  },
  {
    id: "doc_trend_patent",
    title: "专利趋势与技术路线图",
    type: "report",
    category: "trend",
    tags: ["专利", "技术路线", "热力图"],
    summary: "以专利趋势、技术演化和产品矩阵识别CIS创新机会，支持从趋势到路线图的规划。",
    source: "产品架构蓝图V2.0",
    updatedAt: "2026-06-13",
    thumbnail: "/pic/istockphoto-CIS.jpg"
  },
  {
    id: "voc_customer_flagship",
    title: "旗舰用户画像：要可感知的夜景、长焦和视频稳定性",
    type: "voc",
    category: "customer",
    tags: ["VOC", "旗舰", "用户体验"],
    summary: "旗舰机用户更关注拍得到、拍得稳、发出去好看，而不仅是传感器参数。",
    source: "模拟VOC",
    updatedAt: "2026-06-13",
    thumbnail: "/pic/thumb-customer-related.png"
  },
  {
    id: "voc_multi_industry",
    title: "多行业用户需求覆盖：手机、汽车、安防、IoT、AI PC",
    type: "voc",
    category: "customer",
    tags: ["手机", "汽车", "安防", "IoT", "AI PC"],
    summary: "用户洞察不只覆盖手机影像，也要支持车载CIS、机器人视觉、AI PC Camera和边缘AI视觉机会识别。",
    source: "产品架构蓝图V2.0",
    updatedAt: "2026-06-13",
    thumbnail: "/pic/thumb-customer-related.png"
  },
  {
    id: "img_customer_scene",
    title: "用户场景图片：低照、长焦与社交分享样张归档",
    type: "image",
    category: "customer",
    tags: ["图片", "样张", "用户场景"],
    summary: "用于沉淀不同影像场景下的用户感知差异，支持后续VOC和体验指标标注。",
    source: "文档上传",
    updatedAt: "2026-06-13",
    thumbnail: "/pic/knowlege.png"
  },
  {
    id: "bench_supplier_map",
    title: "移动CIS供应商定位对比",
    type: "benchmark",
    category: "competitive",
    tags: ["Sony", "Samsung", "OmniVision", "国产化"],
    summary: "供应商评价需同时看高端产品、量产能力、客户导入、成本和生态协同。",
    source: "公开资料汇总",
    updatedAt: "2026-06-13",
    thumbnail: "/pic/thumb-competitive-related.png"
  },
  {
    id: "bench_competitor_product",
    title: "竞品监测：产品、技术、专利、份额与新品动态",
    type: "benchmark",
    category: "competitive",
    tags: ["Sony", "Samsung", "OmniVision", "SK Hynix"],
    summary: "竞争情报要形成季度份额、区域分布、新品规格、技术布局和专利申请趋势的联动视图。",
    source: "产品架构蓝图V2.0",
    updatedAt: "2026-06-13",
    thumbnail: "/pic/thumb-competitive-related.png"
  },
  {
    id: "crawler_competitor_news",
    title: "竞品新品资讯抓取：高像素长焦与大底主摄动态",
    type: "crawler",
    category: "competitive",
    tags: ["AI爬虫", "新品", "竞品动态"],
    summary: "自动收集竞品发布信息、规格变化和供应商线索，待人工审核后进入正式知识库。",
    source: "AI爬虫",
    updatedAt: "2026-06-13",
    thumbnail: "/pic/AI-TEAMS.png"
  },
  {
    id: "internal_agent_manual",
    title: "CAM CIS知识库助手人格与工作手册",
    type: "internal",
    category: "enterprise",
    tags: ["SOUL", "AGENTS", "IDENTITY", "user"],
    summary: "定义问答助手的证据分级、决策触发、场景适配和行业分析框架。",
    source: "知识库AGENT",
    updatedAt: "2026-06-13"
  },
  {
    id: "internal_backflow",
    title: "洞察回写规则：报告、OKR、任务、资产沉淀",
    type: "internal",
    category: "enterprise",
    tags: ["闭环", "OKR", "知识回写"],
    summary: "每条建议必须能追溯到证据，并在评审后沉淀为可复用知识卡。",
    source: "任务说明手册V1.0",
    updatedAt: "2026-06-13"
  },
  {
    id: "internal_tclaw_collect",
    title: "企业Tclaw收集：项目经验与内部案例沉淀",
    type: "internal",
    category: "enterprise",
    tags: ["Tclaw", "内部案例", "经验沉淀"],
    summary: "面向项目文档、客户案例、质量复盘和供应商评审记录的企业内部采集入口。",
    source: "企业Tclaw收集",
    updatedAt: "2026-06-13"
  }
];

export const agents: AgentProfile[] = [
  {
    id: "agent_research_director",
    name: "行业研究总监Agent",
    status: "running",
    description: "拆解问题、分发任务、统一证据口径",
    input: "未来三年CAM CIS机会在哪里？",
    output: "输出四条机会主线。",
    reasoning: ["识别问题类型为战略规划", "将任务分发给技术、供应、用户、竞争Agent", "要求所有结论标注证据等级"]
  },
  {
    id: "agent_industry",
    name: "行业分析Agent",
    status: "ready",
    description: "合并技术路线与供应链判断，覆盖CIS规格、模组约束、供应商roadmap和导入风险",
    input: "哪些技术和供应路线值得跟踪？",
    output: "输出技术与供应机会。",
    reasoning: ["比较主摄与长焦应用差异", "识别工程约束：厚度、功耗、算法", "评估供应商roadmap、价格、交期与良率"]
  },
  {
    id: "agent_user",
    name: "用户洞察Agent",
    status: "review",
    description: "终端用户、品牌影像叙事、VOC与区域场景",
    input: "用户真的感知200MP吗？",
    output: "输出用户感知机会。",
    reasoning: ["把参数映射到用户场景", "区分旗舰与中端用户诉求", "输出产品卖点翻译"]
  },
  {
    id: "agent_competition",
    name: "竞争分析Agent",
    status: "ready",
    description: "竞品配置、供应商路线、终端品牌策略",
    input: "竞品影像升级方向是什么？",
    output: "输出竞品机会窗口。",
    reasoning: ["对比价格段配置", "识别供应商导入线索", "形成竞品雷达"]
  },
  {
    id: "agent_self",
    name: "自我分析Agent",
    status: "ready",
    description: "内部能力、项目复盘、知识资产与短板识别",
    input: "我们应该补哪类能力？",
    output: "输出内部能力缺口。",
    reasoning: ["读取内部手册与知识库", "映射到业务闭环", "输出资产建设优先级"]
  },
  {
    id: "agent_strategy",
    name: "Strategy Agent",
    status: "running",
    description: "汇总多Agent结论，形成策略、风险和OKR草案",
    input: "将机会转为执行方案",
    output: "输出策略与执行建议。",
    reasoning: ["合并多Agent输出", "剔除低证据等级结论", "生成报告卡、OKR草案和任务卡"]
  }
];

export const reports: InsightReport[] = [
  {
    id: "report_opportunity_2026",
    title: "2026 CAM CIS机会地图",
    category: "opportunity",
    status: "review",
    recommendations: ["旗舰：高像素长焦与HDR视频协同规划", "中端：50MP主摄稳定供货与低照体验优化", "供应：建立关键规格第二来源"],
    evidence: ["知识库趋势卡", "供应商公开资料", "内部助手工作手册"]
  },
  {
    id: "report_sanding",
    title: "三定策略报告：战略控制点、目标项、策略动作",
    category: "roadmap",
    status: "draft",
    recommendations: ["定战略控制点：高像素长焦与AI影像协同", "定目标项：建立跨价格段CIS配置地图", "定策略动作：供应商roadmap、竞品拆解、客户VOC三线验证"],
    evidence: ["Strategy Agent汇总", "知识图谱关系", "V2.0蓝图三定映射"]
  },
  {
    id: "report_risk_cost",
    title: "大底与高像素导入风险评审",
    category: "risk",
    status: "draft",
    recommendations: ["同步评估模组厚度、功耗、算法成本", "避免只按像素定义产品卖点", "导入前完成竞品拆解与用户感知验证"],
    evidence: ["技术Agent结论", "用户洞察Agent结论"]
  }
];

export const okrs: OkrItem[] = [
  {
    id: "okr_knowledge_map",
    objective: "建立CAM CIS价格段配置地图，支撑2026产品规划",
    keyResults: ["覆盖旗舰/中端/入门三类价格段", "沉淀不少于40条竞品配置卡", "形成每月一次供应商路线更新"],
    tasks: ["整理竞品机型CIS配置", "补齐供应商roadmap字段", "定义知识回写标签"]
  }
];

export const assetTypes = [
  { cn: "知识", en: "Knowledge", detail: "行业知识、技术知识、市场知识" },
  { cn: "能力", en: "Capability", detail: "分析能力、决策能力、执行能力" },
  { cn: "技能", en: "Skill", detail: "方法论、工具使用、最佳实践" },
  { cn: "经验", en: "Experience", detail: "成功案例、失败教训、踩坑记录" },
  { cn: "决策", en: "Decision", detail: "决策依据、决策过程、决策结果" }
];

export const digitalTwinSignals = [
  { label: "技术路线热度", value: "86", detail: "高像素长焦、HDR视频、AI remosaic持续升温" },
  { label: "供应链风险", value: "P1", detail: "关键规格需建立第二来源与认证窗口" },
  { label: "竞争窗口", value: "Q3", detail: "旗舰影像配置窗口集中在下半年定义周期" },
  { label: "机会方向", value: "4", detail: "车载CIS、机器人视觉、AI PC Camera、边缘AI视觉" }
];

export const demoScript = [
  { stage: "平台启动", duration: "1min", content: "展示CIS智能核心和三大模块总入口" },
  { stage: "看趋势", duration: "2min", content: "展示技术路线演进、专利趋势和产业链趋势" },
  { stage: "AI Native Team", duration: "1min", content: "输入未来三年CIS行业机会问题" },
  { stage: "多Agent协同", duration: "3min", content: "展示推理、知识调取和Strategy Agent汇总" },
  { stage: "战略建议", duration: "2min", content: "输出车载CIS、机器人视觉、AI PC Camera、边缘AI视觉方向" },
  { stage: "驾驶舱", duration: "2min", content: "展示OKR生成与任务分发" },
  { stage: "知识回写", duration: "1min", content: "展示资产沉淀和回写审核机制" },
  { stage: "生成报告", duration: "1min", content: "自动生成行业洞察报告完成演示" }
];

export const statusItems = [
  { label: "知识卡片", value: "128", icon: DatabaseZap },
  { label: "活跃Agent", value: "7", icon: Cpu },
  { label: "待评审报告", value: "12", icon: Eye },
  { label: "执行任务", value: "24", icon: Blocks },
  { label: "风险预警", value: "5", icon: ShieldCheck }
];

export const processSteps = [
  { title: "输入问题", detail: "明确业务场景和目标价格段" },
  { title: "分发任务", detail: "研究总监拆解给多Agent" },
  { title: "并行推理", detail: "技术/供应/用户/竞争同步分析" },
  { title: "策略汇总", detail: "Strategy Agent输出报告卡" },
  { title: "人工评审", detail: "采纳、修改或驳回建议" },
  { title: "回写沉淀", detail: "OKR、任务和知识资产闭环" }
];

export const chartSignals = [
  { label: "高像素长焦", value: 86, icon: BarChart3 },
  { label: "HDR视频", value: 78, icon: Eye },
  { label: "国产替代", value: 72, icon: Route },
  { label: "AI影像协同", value: 91, icon: BrainCircuit }
];

export const agentArchitecture = {
  input: { id: "user_input", label: "用户输入", icon: "👤" },
  director: { id: "agent_research_director", label: "行业研究总监Agent", icon: "🎯" },
  analysts: [
    { id: "agent_industry", label: "行业分析Agent", icon: "🔬" },
    { id: "agent_user", label: "用户洞察Agent", icon: "👥" },
    { id: "agent_competition", label: "竞争分析Agent", icon: "⚔" },
    { id: "agent_self", label: "自我分析Agent", icon: "🧭" }
  ],
  strategy: { id: "agent_strategy", label: "Strategy Agent", icon: "🦁" },
  outputs: [
    { id: "output_report", label: "行业洞察报告", icon: "📄" },
    { id: "output_risk", label: "风险预警", icon: "⚡" },
    { id: "output_strategy", label: "战略建议", icon: "📋" }
  ]
};

export const knowledgeTree = [
  {
    title: "01 Raw Documents",
    description: "原始资料层：报告、新闻、财报、访谈、拆解、会议纪要",
    children: ["行业报告", "供应商资料", "客户/用户资料", "竞品拆解", "内部会议纪要"]
  },
  {
    title: "02 Ontology Objects",
    description: "本体对象层：把资料拆成可检索、可关联、可推理的业务对象",
    children: [
      "Trend / Market / Customer",
      "Competitor",
      "Component",
      "Supplier Roadmap",
      "InternalCapability / TCO",
      "Opportunity",
      "Solution / Demo",
      "Decision / Action",
      "Evidence / Review"
    ]
  },
  {
    title: "03 Business Assets",
    description: "业务资产层：沉淀Prompt、模板、报告、知识卡和决策资产",
    children: ["Prompt", "报告模板", "竞品表", "机会点卡", "OKR与任务卡"]
  },
  {
    title: "04 Knowledge Graph",
    description: "关系图谱层：表达对象间的影响、支撑、矛盾、依赖和回写关系",
    children: ["impacts", "supports", "contradicts", "enables", "depends_on", "converted_to", "validates", "updates"]
  },
  {
    title: "05 Workflow",
    description: "工作流层：Agent协同、评审、执行、任务追踪和知识回写",
    children: ["Agent分发", "多Agent推理", "人工评审", "OKR生成", "任务执行", "知识回写"]
  },
  {
    title: "06 MVP CAM CIS / Camera",
    description: "首期业务范围：围绕CAM CIS/Camera场景建立最小可演示知识闭环",
    children: ["Trend", "CompetitorProduct", "Component", "Supplier", "InternalCapability", "Opportunity", "Solution", "Evidence"]
  }
];
