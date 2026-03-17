"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { badges } from "@/lib/dummyData";

const scoreCards = [
  { label: "飲み込む力", change: 12, up: true },
  { label: "脳の刺激", change: 5, up: true },
  { label: "表情の豊かさ", change: 18, up: true },
  { label: "声を出す力", change: 8, up: true },
];

const radarData = [
  { subject: "表情の豊かさ", before: 50, after: 70 },
  { subject: "飲み込む力", before: 50, after: 60 },
  { subject: "声を出す力", before: 50, after: 65 },
  { subject: "脳の刺激", before: 50, after: 55 },
];

export default function ResultClient() {
  const router = useRouter();
  const [showBadgeModal, setShowBadgeModal] = useState(true);

  return (
    <div className="bg-amber-50 min-h-screen px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        お疲れ様でした！
      </h1>
      <p className="text-lg text-gray-600 text-center">
        正確に動けていました 👍
      </p>

      <div className="flex gap-4">
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full h-28 bg-gray-300 rounded-2xl" />
          <span className="text-lg text-gray-600">体操前</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full h-28 bg-gray-300 rounded-2xl" />
          <span className="text-lg text-gray-600">体操後</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <p className="text-lg text-gray-700">今日の体操時間：3分42秒</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {scoreCards.map((sc) => (
          <div
            key={sc.label}
            className={`rounded-2xl p-4 text-center ${
              sc.up ? "bg-orange-100" : "bg-gray-100"
            }`}
          >
            <p className="text-lg font-medium text-gray-700">{sc.label}</p>
            <p className="text-xl font-bold text-orange-500">
              ↑{sc.change}%
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4">
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <Radar
              name="体操前"
              dataKey="before"
              stroke="#d1d5db"
              fill="#d1d5db"
              fillOpacity={0.3}
            />
            <Radar
              name="体操後"
              dataKey="after"
              stroke="#f97316"
              fill="#f97316"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
        <p className="text-lg font-bold text-center text-orange-500 mt-2">
          一番伸びた：表情の豊かさ ＋20pt
        </p>
      </div>

      <button
        onClick={() => router.push("/home")}
        className="w-full h-[60px] bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300"
      >
        ホームに戻る
      </button>

      {showBadgeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm text-center space-y-4">
            <span className="text-7xl">🏅</span>
            <h2 className="text-2xl font-bold text-gray-800">7日連続達成！</h2>
            <p className="text-lg text-gray-600">毎日続けてすごいです！</p>

            <div className="border-t pt-4">
              <p className="text-lg font-medium text-gray-700 mb-3">
                あなたのバッジ
              </p>
              <div className="flex justify-center gap-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center">
                    <span className="text-3xl">{badge.emoji}</span>
                    <span className="text-sm text-gray-600">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowBadgeModal(false)}
              className="w-full h-[60px] bg-gray-100 text-gray-700 border border-gray-300 text-lg font-medium rounded-2xl"
            >
              とじる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
