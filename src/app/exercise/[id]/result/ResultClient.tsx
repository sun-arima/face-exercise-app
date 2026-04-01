"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { badges } from "@/lib/dummyData";

const performanceData = [
  { label: "口の開き", score: 82, maxScore: 100 },
  { label: "舌の動き", score: 75, maxScore: 100 },
  { label: "頬の動き", score: 100, maxScore: 100 },
  { label: "表情の対称性", score: 68, maxScore: 100 },
];

const mentalScore = 78;
const mentalEmoji = "😊";
const mentalMessage = "良い調子ですね！";

export default function ResultClient() {
  const router = useRouter();
  const [showBadgeModal, setShowBadgeModal] = useState(true);

  return (
    <div className="bg-amber-50 min-h-screen px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        体操お疲れ様でした！
      </h1>

      {/* 猫のごはん獲得 */}
      <div className="flex items-center justify-center gap-3 bg-orange-50 border-2 border-orange-200 rounded-2xl px-5 py-3">
        <span className="text-3xl">🍖</span>
        <div>
          <p className="text-base font-bold text-orange-600">猫の餌を手に入れました！</p>
          <p className="text-sm text-orange-400 font-medium">+10pt</p>
        </div>
      </div>

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
            <div className="w-full h-28 rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/before.png" alt="体操前" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg text-gray-600">体操前</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full h-28 rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/after.png" alt="体操後" className="w-full h-full object-cover" />
            </div>
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
          <p className="text-lg font-bold text-green-600">正確に動けていました 👍</p>
          {performanceData.map((item) => {
            const colorClass = item.score >= 90 ? "text-green-500" : item.score >= 75 ? "text-orange-500" : "text-red-400";
            const barColor = item.score >= 90 ? "bg-green-400" : item.score >= 75 ? "bg-orange-400" : "bg-red-400";
            return (
            <div key={item.label}>
              <div className="flex justify-between mb-1">
                <span className="text-base text-gray-700">{item.label}</span>
                <span className={`text-base font-bold ${colorClass}`}>{item.score}点</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${barColor} rounded-full transition-all duration-500`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          );
          })}
        </div>
      </div>

      {/* 現在の心の状態 */}
      <div>
        <p className="text-sm text-gray-500 mb-2">現在の心の状態</p>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">{mentalEmoji}</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-base text-gray-700">心の状態スコア</span>
                <span className="text-base font-bold text-pink-500">{mentalScore}点</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-400 rounded-full transition-all duration-500"
                  style={{ width: `${mentalScore}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">{mentalMessage}</p>
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
