"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, BookOpen, BarChart3, Users } from "lucide-react";

const tabs = [
  { label: "ホーム", icon: Home, path: "/home" },
  { label: "ログ", icon: BookOpen, path: "/log" },
  { label: "分析", icon: BarChart3, path: "/analysis" },
  { label: "家族", icon: Users, path: "/family" },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 shrink-0">
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.path);
        return (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`flex flex-col items-center justify-center h-14 min-w-[64px] gap-0.5 ${
              active ? "text-orange-500" : "text-gray-400"
            }`}
          >
            <tab.icon size={24} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
