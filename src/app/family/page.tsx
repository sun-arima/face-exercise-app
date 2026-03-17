"use client";

import { useState, useEffect } from "react";
import { familyReactions, familyStamps } from "@/lib/dummyData";

export default function FamilyPage() {
  const [showToast, setShowToast] = useState(true);
  const [myStamps, setMyStamps] = useState<Record<number, string[]>>({});

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  const handleMyStamp = (reactionIndex: number, emoji: string) => {
    setMyStamps((prev) => {
      const current = prev[reactionIndex] || [];
      if (current.includes(emoji)) {
        return { ...prev, [reactionIndex]: current.filter((e) => e !== emoji) };
      }
      return { ...prev, [reactionIndex]: [...current, emoji] };
    });
  };

  return (
    <div className="bg-amber-50 min-h-screen px-6 py-8 space-y-6 relative">
      {/* トースト通知 */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-sm w-[calc(100%-48px)] bg-orange-500 text-white rounded-2xl px-4 py-3 text-lg font-medium text-center z-50 shadow-lg transition-opacity duration-300">
          家族がスタンプを送りました
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-800">家族共有</h1>
        <p className="text-lg text-gray-500 mt-1">
          家族への共有状況と、もらったリアクションを確認できます
        </p>
      </div>

      {/* 共有記録リスト */}
      <div className="space-y-4">
        {familyReactions.map((reaction, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm p-6 space-y-4"
          >
            <p className="text-lg text-gray-800">
              {reaction.date}：{reaction.message}
            </p>

            {/* 家族からのスタンプ */}
            {reaction.stamps.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">家族からのリアクション</p>
                <div className="flex flex-col gap-2">
                  {reaction.stamps.map((stamp, si) => {
                    const s = familyStamps.find((fs) => fs.emoji === stamp.emoji);
                    return (
                      <div
                        key={si}
                        className="bg-orange-50 rounded-2xl px-4 py-2 flex items-center gap-2"
                      >
                        <span className="text-2xl">{stamp.emoji}</span>
                        <div>
                          <p className="text-lg font-medium text-gray-800">{stamp.from}</p>
                          <p className="text-sm text-gray-500">{s?.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 自分からスタンプを押す */}
            <div>
              <p className="text-sm text-gray-500 mb-2">スタンプを送る</p>
              <div className="flex gap-2">
                {familyStamps.map((stamp) => {
                  const isSelected = (myStamps[i] || []).includes(stamp.emoji);
                  return (
                    <button
                      key={stamp.id}
                      onClick={() => handleMyStamp(i, stamp.emoji)}
                      className={`rounded-full px-3 py-2 text-lg transition-colors duration-300 ${
                        isSelected
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {stamp.emoji}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
