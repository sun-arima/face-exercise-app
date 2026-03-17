"use client";

import { useRouter } from "next/navigation";
import { Flame, Mail } from "lucide-react";
import Image from "next/image";
import { user, badges } from "@/lib/dummyData";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="bg-amber-50 min-h-screen px-6 py-8 space-y-6">
      {/* キャラクター付き挨拶 */}
      <div className="flex items-end gap-1">
        <Image src="/character.png" alt="キャラクター" width={80} height={80} className="shrink-0" />
        <div className="flex-1 relative mb-2">
          {/* 吹き出し本体 */}
          <div className="bg-white rounded-2xl shadow-sm p-4 relative">
            <p className="text-lg text-gray-800">
              おはようございます、{user.name.split(" ")[0]}さん！
              <br />
              今日もいっしょに体操しましょう
            </p>
          </div>
          {/* 吹き出しの三角（しっぽ） */}
          <div
            className="absolute -left-3 bottom-3 w-0 h-0"
            style={{
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderRight: "14px solid white",
            }}
          />
        </div>
      </div>

      {/* 連続記録バッジカード */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-2">
          <Flame className="text-orange-500" size={28} />
          <span className="text-xl font-bold text-orange-500">
            {user.streak}日連続継続中！
          </span>
        </div>
        <p className="text-lg text-gray-600">
          すごい！この調子で続けましょう
        </p>
      </div>

      {/* 月次分析レポート通知バナー（お便り風） */}
      <button
        onClick={() => router.push("/analysis")}
        className="w-full bg-white border-2 border-orange-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm active:bg-orange-50 transition-colors duration-300"
      >
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
          <Mail className="text-orange-500" size={24} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-lg font-medium text-gray-800">3月のお便り</p>
          <p className="text-sm text-gray-500">分析レポートが届いています</p>
        </div>
        <span className="text-orange-400 text-xl">›</span>
      </button>

      {/* 体操開始ボタン（大きく強調） */}
      <button
        onClick={() => router.push("/exercise/menu")}
        className="w-full h-28 bg-orange-500 text-white text-2xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300 shadow-lg flex flex-col items-center justify-center gap-1"
      >
        <span className="text-4xl">🏃‍♀️</span>
        <span>今日の体操をはじめる</span>
      </button>

      {/* 継続バッジ */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <p className="text-lg font-bold text-gray-800 mb-3">獲得したバッジ</p>
        <div className="flex gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex-1 bg-orange-50 rounded-2xl p-3 flex flex-col items-center text-center"
            >
              <span className="text-3xl mb-1">{badge.emoji}</span>
              <p className="text-sm font-bold text-gray-800">{badge.name}</p>
              <p className="text-xs text-gray-500 mt-1">{badge.acquiredDate.replace("2025-", "")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
