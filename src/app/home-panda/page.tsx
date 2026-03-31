"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, Sparkles, Apple, Flame, Mail } from "lucide-react";
import { user } from "@/lib/dummyData";
import AnimatedCat from "@/components/AnimatedCat";

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

  // ダミーデータ
  const catExp = 95; // 体操で貯まる経験値
  const catHunger = 70; // 満腹度
  const catHappiness = 85; // 幸福度
  const currentLevel = catLevels.filter((l) => catExp >= l.minExp).pop() || catLevels[0];
  const nextLevel = catLevels.find((l) => l.minExp > catExp);
  const expToNext = nextLevel ? nextLevel.minExp - catExp : 0;
  const expProgress = nextLevel
    ? ((catExp - currentLevel.minExp) / (nextLevel.minExp - currentLevel.minExp)) * 100
    : 100;

  // レッサーパンダをタップしたときのリアクション
  const handleTapPanda = () => {
    setBounce(true);
    setMood("happy");
    setTimeout(() => setBounce(false), 600);
    setTimeout(() => setMood("neutral"), 2000);
  };

  // 時間帯によるメッセージ
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "おはよう！";
    if (hour < 17) return "こんにちは！";
    return "こんばんは！";
  };

  const getMoodFace = () => {
    switch (mood) {
      case "happy": return "😆";
      case "sleepy": return "😴";
      default: return "😊";
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-amber-50 h-full px-5 py-5 flex flex-col overflow-y-auto">
      {/* ヘッダー：名前 + 連続日数 */}
      <div className="flex items-center justify-between shrink-0">
        <p className="text-lg text-gray-700">
          {user.name.split(" ")[0]}さん
        </p>
        <div className="flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full">
          <Flame className="text-orange-500" size={16} />
          <span className="text-sm font-bold text-orange-600">{user.streak}日連続</span>
        </div>
      </div>

      {/* レッサーパンダエリア */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0 py-2">
        {/* 吹き出し */}
        <div className="bg-white rounded-2xl shadow-sm px-4 py-2 mb-3 relative">
          <p className="text-base text-gray-700">
            {getGreeting()} 体操してくれたらうれしいな！
          </p>
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0"
            style={{
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "10px solid white",
            }}
          />
        </div>

        {/* 猫キャラクター */}
        <AnimatedCat mood={mood} bounce={bounce} onClick={handleTapPanda} />

        {/* 気分表示 */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl">{getMoodFace()}</span>
          <span className="text-base text-gray-600 font-medium">
            {currentLevel.name}
          </span>
          <span className="text-lg">{currentLevel.emoji}</span>
        </div>

        {/* ステータスバー */}
        <div className="w-full max-w-xs mt-4 space-y-2">
          {/* 経験値 */}
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-500 shrink-0" size={16} />
            <div className="flex-1">
              <div className="flex justify-between text-xs text-gray-500 mb-0.5">
                <span>Lv.{currentLevel.level}</span>
                <span>次のレベルまで {expToNext}exp</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${expProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* 満腹度 */}
          <div className="flex items-center gap-2">
            <Apple className="text-green-500 shrink-0" size={16} />
            <div className="flex-1">
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${catHunger}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-gray-500 w-8">{catHunger}%</span>
          </div>

          {/* 幸福度 */}
          <div className="flex items-center gap-2">
            <Heart className="text-pink-500 shrink-0" size={16} />
            <div className="flex-1">
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-400 rounded-full transition-all duration-500"
                  style={{ width: `${catHappiness}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-gray-500 w-8">{catHappiness}%</span>
          </div>
        </div>
      </div>

      {/* 分析レポート通知バナー */}
      <button
        onClick={() => router.push("/analysis")}
        className="w-full bg-white border-2 border-orange-200 rounded-2xl p-3 flex items-center gap-3 shadow-sm active:bg-orange-50 transition-colors duration-300 shrink-0"
      >
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
          <Mail className="text-orange-500" size={20} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-base font-medium text-gray-800">3月のお便り</p>
          <p className="text-xs text-gray-500">分析レポートが届いています</p>
        </div>
        <span className="text-orange-400 text-lg">›</span>
      </button>

      {/* 体操開始ボタン */}
      <button
        onClick={() => router.push("/exercise/menu")}
        className="w-full h-14 bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300 shadow-lg flex items-center justify-center gap-3 shrink-0 mt-2"
      >
        <span className="text-2xl">🐱</span>
        体操してごはんをあげる
      </button>

      {/* 今日の記録 */}
      <div className="bg-white/80 rounded-2xl p-3 mt-2 shrink-0">
        <div className="flex justify-around text-center">
          <div>
            <p className="text-2xl font-bold text-orange-500">3回</p>
            <p className="text-xs text-gray-500">今日の体操</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div>
            <p className="text-2xl font-bold text-yellow-500">+15</p>
            <p className="text-xs text-gray-500">獲得exp</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div>
            <p className="text-2xl font-bold text-pink-500">😊</p>
            <p className="text-xs text-gray-500">ねこの気分</p>
          </div>
        </div>
      </div>
    </div>
  );
}
