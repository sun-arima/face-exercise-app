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

const performanceData = [
  { label: "口の開き", score: 82, maxScore: 100 },
  { label: "舌の動き", score: 75, maxScore: 100 },
  { label: "頬の動き", score: 90, maxScore: 100 },
  { label: "表情の対称性", score: 68, maxScore: 100 },
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
      <p className="text-sm text-gray-500 text-center leading-relaxed">
        今回の体操の結果をまとめました。
        <br />
        お顔の変化や動作の正確さを確認できます。
      </p>

      {/* 体操前後の顔比較 */}
      <div>
        <p className="text-sm text-gray-500 mb-2">体操前後のお顔の変化</p>
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
      </div>

      {/* 体操時間 */}
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <p className="text-lg text-gray-700">今日の体操時間：<span className="font-bold text-orange-500">3分42秒</span></p>
      </div>

      {/* 動作の正確性パラメータ */}
      <div>
        <p className="text-sm text-gray-500 mb-2">動作の正確性</p>
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
          {performanceData.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between mb-1">
                <span className="text-base text-gray-700">{item.label}</span>
                <span className="text-base font-bold text-orange-500">{item.score}点</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* レーダーチャート */}
      <div>
        <p className="text-sm text-gray-500 mb-2">体操前後の総合比較</p>
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
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
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-300 rounded-full" />
              <span>体操前</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-400 rounded-full" />
              <span>体操後</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push("/home-panda")}
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
