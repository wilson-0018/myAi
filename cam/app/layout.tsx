import type { Metadata } from "next";
import Link from "next/link";
import { Activity, BrainCircuit, DatabaseZap, LayoutDashboard } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "CAM Intelligent Industry Insight Platform",
  description: "CAM CIS industry insight platform MVP"
};

const navItems = [
  { href: "/", label: "总览", icon: Activity },
  { href: "/knowledge", label: "知识情报", icon: DatabaseZap },
  { href: "/agents", label: "AI团队", icon: BrainCircuit },
  { href: "/cockpit", label: "执行驾驶舱", icon: LayoutDashboard }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="app-shell">
          <header className="top-nav">
            <Link href="/" className="brand">
              <span className="brand-mark">CIS</span>
              <span>
                <strong>CAM智能行业洞察平台</strong>
              </span>
            </Link>
            <nav>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link href={item.href} key={item.href} className="nav-link">
                    <Icon size={17} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
