"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sparkles, Flame } from "lucide-react";
import { user, dailyLog } from "@/lib/dummyData";
import AnimatedCat from "@/components/AnimatedCat";
import { asset } from "@/lib/assetPath";

// 猫の成長レベル
const catLevels = [
  { level: 1, name: "こねこ", emoji: "🐣", minExp: 0 },
  { level: 2, name: "やんちゃ猫", emoji: "🐾", minExp: 30 },
  { level: 3, name: "おしゃれ猫", emoji: "✨", minExp: 80 },
  { level: 4, name: "おとな猫", emoji: "🌟", minExp: 150 },
  { level: 5, name: "ボス猫", emoji: "👑", minExp: 300 },
];

export default function HomePandaPage() {
  const router = useRouter();
  const [mood, setMood] = useState<"happy" | "neutral" | "sleepy">("neutral");
  const [bounce, setBounce] = useState(false);

  const catExp = 95;
  const currentLevel = catLevels.filter((l) => catExp >= l.minExp).pop() || catLevels[0];
  const nextLevel = catLevels.find((l) => l.minExp > catExp);
  const expToNext = nextLevel ? nextLevel.minExp - catExp : 0;
  const expProgress = nextLevel
    ? ((catExp - currentLevel.minExp) / (nextLevel.minExp - currentLevel.minExp)) * 100
    : 100;

  const handleTapCat = () => {
    setBounce(true);
    setMood("happy");
    setTimeout(() => setBounce(false), 600);
    setTimeout(() => setMood("neutral"), 2000);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "おはようございます！";
    if (hour < 17) return "こんにちは！";
    return "こんばんは！";
  };

  const todayLog = dailyLog[0]; // 最新日

  return (
    <div className="bg-gradient-to-b from-orange-50 to-amber-50 h-full flex flex-col overflow-y-auto">
      {/* ヘッダー */}
      <div className="px-5 pt-5 pb-2 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xl font-bold text-gray-800">
            {user.name.split(" ")[0]}さん、{getGreeting()}
          </p>
          <div className="flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full">
            <Flame className="text-orange-500" size={16} />
            <span className="text-sm font-bold text-orange-600">{user.streak}日連続</span>
          </div>
        </div>
        <p className="text-base text-gray-500">
          {user.streak}日連続で体操しています！素晴らしいです🎉
        </p>
      </div>

      {/* 猫エリア */}
      <div className="flex flex-col items-center px-5 py-3 shrink-0">
        {/* 吹き出し */}
        <div className="bg-white border-2 border-orange-300 rounded-2xl px-4 py-3 mb-0 relative shadow-sm">
          <p className="text-base text-gray-700 leading-relaxed">
            今日も体操お疲れさまです！<br />
            あいうえお体操は、脳の働きを元気にしてくれます！
          </p>
          {/* 枠線あり三角（外側） */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-[14px] w-0 h-0"
            style={{
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "14px solid #fdba74",
            }}
          />
          {/* 内側白三角 */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-[10px] w-0 h-0"
            style={{
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "11px solid white",
            }}
          />
        </div>

        {/* 猫キャラクター */}
        <AnimatedCat mood={mood} bounce={bounce} onClick={handleTapCat} />

        {/* レベル名 */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold text-gray-700">{currentLevel.name}</span>
          <span className="text-xl">{currentLevel.emoji}</span>
        </div>

        {/* Lvバー */}
        <div className="w-full max-w-xs mt-3">
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-500 shrink-0" size={18} />
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Lv.{currentLevel.level}</span>
                <span>次のレベルまで {expToNext}exp</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${expProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 体操開始ボタン */}
      <div className="px-5 shrink-0">
        <button
          onClick={() => router.push("/exercise/menu")}
          className="w-full h-20 bg-orange-500 text-white text-2xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300 flex items-center justify-center gap-3 border-2 border-orange-600"
          style={{ boxShadow: "0 6px 20px rgba(249, 115, 22, 0.4)" }}
        >
          <span className="text-3xl">🐱</span>
          体操してごはんをあげる
        </button>
      </div>

      {/* 今日の記録 */}
      <div className="px-5 pt-4 pb-4 shrink-0">
        <p className="text-base font-bold text-gray-700 mb-2">今日の体操記録</p>

        {todayLog.records.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-base text-gray-400">まだ今日は体操していません</p>
          </div>
        ) : (
          <div className="space-y-2">
            {todayLog.records.map((rec, i) => {
              const viewers = (rec as { viewers?: string[] }).viewers || [];
              return (
                <div key={i} className="bg-white rounded-2xl shadow-sm p-4">
                  <div className="flex items-start gap-3">
                    {/* トレーニング内容 + 長さ */}
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-gray-800">{rec.menu}</p>
                      <p className="text-sm text-gray-500">{rec.time}</p>
                      {/* 既読ファミリーアイコン */}
                      {viewers.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex -space-x-1.5">
                            {viewers.map((name) => (
                              <div key={name} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={asset(`/family-${name === "美咲" ? "misaki" : "kenta"}.png`)} alt={name} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 font-medium">既読</span>
                        </div>
                      )}
                    </div>
                    {/* 右側：心の状態 + 時刻 */}
                    <div className="shrink-0 flex flex-col items-end gap-1.5">
                      {/* 心の状態スコアと絵文字 */}
                      {todayLog.mentalScore > 0 && (
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-gray-400">心の状態スコア</span>
                          <div className="flex items-center gap-1 bg-pink-50 px-3 py-1.5 rounded-full">
                            <span className="text-xl">{todayLog.mentalEmoji}</span>
                            <span className="text-base font-bold text-pink-500">{todayLog.mentalScore}点</span>
                          </div>
                        </div>
                      )}
                      {/* 時刻 */}
                      <span className="text-sm text-gray-400">
                        {(rec as { startTime?: string }).startTime || "--:--"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
