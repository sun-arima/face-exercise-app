"use client";

import { useState, useEffect } from "react";
import { familyReactions, familyStamps } from "@/lib/dummyData";
import { asset } from "@/lib/assetPath";

const familyImages: Record<string, string> = {
  "美咲": asset("/family-misaki.png"),
  "健太": asset("/family-kenta.png"),
};

export default function FamilyPage() {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  // 全リアクションをフラットなリストに
  const allReactions = familyReactions.flatMap((r) =>
    r.stamps.map((s) => ({
      date: r.date,
      emoji: s.emoji,
      from: s.from,
      relation: (s as { relation?: string }).relation || "",
      icon: (s as { icon?: string }).icon || "👤",
      label: familyStamps.find((fs) => fs.emoji === s.emoji)?.label || "",
    }))
  );

  return (
    <div className="bg-amber-50 min-h-screen px-6 py-8 space-y-6 relative">
      {/* トースト通知 */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-sm w-[calc(100%-48px)] bg-orange-500 text-white rounded-2xl px-4 py-3 text-lg font-medium text-center z-50 shadow-lg transition-opacity duration-300">
          家族からメッセージが届きました
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-800">家族からのメッセージ</h1>
        <p className="text-base text-gray-500 mt-1">
          家族からもらった反応を確認できます
        </p>
      </div>

      {/* リアクション一覧 */}
      {allReactions.length > 0 ? (
        <div className="space-y-3">
          {allReactions.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4"
            >
              {/* 家族アイコン */}
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-orange-100">
                {familyImages[r.from] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={familyImages[r.from]} alt={r.from} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">{r.icon}</div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-base text-gray-500 mb-0.5">{r.relation} {r.from}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl">{r.emoji}</span>
                  <p className="text-lg font-medium text-gray-800">{r.label}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400 shrink-0">{r.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-400 text-center py-8">
          まだメッセージはありません
        </p>
      )}
    </div>
  );
}
