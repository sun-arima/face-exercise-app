"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const slides = [
  {
    emoji: "😊",
    title: "顔まわり体操で\n毎日をいきいきと",
    description:
      "顔まわりを動かすことで、体と頭をやさしく刺激し、毎日をいきいき過ごすサポートになります",
    benefits: [
      "食べる・飲み込む力を保つ",
      "脳をやさしく刺激する",
      "表情が豊かになり会話しやすくなる",
    ],
  },
  {
    emoji: "🏅",
    title: "続けた日数が\nバッジになります",
    description: "毎日の頑張りが目に見える形になります",
    benefits: [],
  },
  {
    emoji: "👨‍👩‍👧",
    title: "家族に記録を\n届けられます",
    description: "離れた家族にも、あなたの元気を伝えられます",
    benefits: [],
  },
];

export default function IntroPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const isLast = index === slides.length - 1;
  const slide = slides[index];

  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col overflow-hidden">
      {/* スライドコンテンツ */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-5 min-h-0">
        <span className="text-[72px] leading-none">{slide.emoji}</span>
        <h1 className="text-2xl font-bold text-gray-800 text-center whitespace-pre-line leading-snug">
          {slide.title}
        </h1>
        <p className="text-lg text-gray-600 text-center leading-relaxed">
          {slide.description}
        </p>

        {/* チェックリスト */}
        {slide.benefits.length > 0 && (
          <div className="w-full bg-white rounded-2xl shadow-sm p-5 space-y-3">
            {slide.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <Check className="text-green-600" size={16} />
                </div>
                <span className="text-lg text-gray-800">{benefit}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ドットインジケーター */}
      <div className="flex gap-3 justify-center mb-4 shrink-0">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              i === index ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* ボタン */}
      <button
        onClick={() => {
          if (isLast) {
            router.push("/onboarding/permission");
          } else {
            setIndex(index + 1);
          }
        }}
        className="w-full h-[56px] bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300 shrink-0"
      >
        {isLast ? "はじめる" : "次へ"}
      </button>
    </div>
  );
}
