"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

const goalOptions = [
  {
    minutes: 5,
    label: "かんたんモード",
    description: "まずは気軽に始めたい方に",
    emoji: "🌱",
  },
  {
    minutes: 10,
    label: "おすすめモード",
    description: "バランスよく続けたい方に",
    emoji: "⭐",
    recommended: true,
  },
  {
    minutes: 15,
    label: "しっかりモード",
    description: "しっかり鍛えたい方に",
    emoji: "💪",
  },
];

export default function GoalPage() {
  const router = useRouter();
  const { goalMinutes, setGoalMinutes } = useAppContext();

  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-800 text-center mt-4 shrink-0">
        1日の体操の目標時間を
        <br />
        決めましょう
      </h1>
      <p className="text-base text-gray-500 text-center mt-2 shrink-0">
        あとから変更もできます
      </p>

      {/* 選択カード */}
      <div className="flex-1 flex flex-col justify-center space-y-3 min-h-0">
        {goalOptions.map((option) => {
          const isSelected = goalMinutes === option.minutes;
          return (
            <button
              key={option.minutes}
              onClick={() => setGoalMinutes(option.minutes)}
              className={`w-full rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 relative ${
                isSelected
                  ? "bg-orange-500 text-white shadow-lg scale-[1.02]"
                  : "bg-white text-gray-800 shadow-sm"
              }`}
            >
              <span className="text-3xl">{option.emoji}</span>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <p className={`text-lg font-bold ${isSelected ? "text-white" : "text-gray-800"}`}>
                    {option.label}
                  </p>
                  {option.recommended && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      isSelected ? "bg-white/30 text-white" : "bg-orange-100 text-orange-600"
                    }`}>
                      おすすめ
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-0.5 ${isSelected ? "text-white/80" : "text-gray-500"}`}>
                  {option.description}
                </p>
              </div>
              <p className={`text-2xl font-bold shrink-0 ${isSelected ? "text-white" : "text-orange-500"}`}>
                {option.minutes}分
              </p>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => router.push("/home-panda")}
        className="w-full h-[56px] bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300 shrink-0"
      >
        この目標でスタート
      </button>
    </div>
  );
}
