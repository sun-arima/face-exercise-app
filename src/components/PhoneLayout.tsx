"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

const navPages = ["/home", "/home-panda", "/log", "/analysis", "/family", "/exercise"];

export default function PhoneLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = navPages.some((p) => pathname.startsWith(p));

  return (
    <div className="rounded-[2.4rem] overflow-hidden bg-amber-50 relative flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pt-8">
        {children}
      </div>
      {showNav && <BottomNav />}
      {/* ホームインジケーター用の余白 */}
      <div className="h-5 bg-white shrink-0" />
    </div>
  );
}
