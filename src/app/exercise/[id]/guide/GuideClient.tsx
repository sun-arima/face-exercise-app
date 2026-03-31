"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Play, CheckCircle } from "lucide-react";
import { menus } from "@/lib/dummyData";

type Step = "video" | "face" | "countdown";

export default function GuideClient() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const menu = menus.find((m) => m.id === id) || menus[0];

  const [step, setStep] = useState<Step>("video");
  const [faceReady, setFaceReady] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // 画面2: 顔枠合わせ → 2秒後に準備OK
  useEffect(() => {
    if (step !== "face") return;
    const timer = setTimeout(() => {
      setFaceReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [step]);

  // カウントダウン
  useEffect(() => {
    if (step !== "countdown") return;
    if (countdown <= 0) {
      router.push(`/exercise/${id}/session`);
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [step, countdown, router, id]);

  // ========== 画面1: お手本動画 ==========
  if (step === "video") {
    return (
      <div className="bg-amber-50 h-full px-6 py-6 flex flex-col overflow-hidden">
        {/* ステップ表示 */}
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-base font-bold">
            1
          </div>
          <span className="text-lg font-bold text-gray-800">お手本を見る</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 shrink-0">
          {menu.name}
        </h1>
        <p className="text-base text-gray-600 mt-1 shrink-0">
          {menu.description}
        </p>

        {/* 動画エリア */}
        <div className="bg-gray-300 rounded-2xl flex-1 min-h-0 mt-4 flex flex-col items-center justify-center gap-2">
          <Play className="text-gray-500" size={48} />
          <span className="text-lg text-gray-500 font-medium">お手本動画</span>
          <span className="text-sm text-gray-400">タップして再生</span>
        </div>

        {/* 説明 */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mt-4 shrink-0">
          <p className="text-lg text-gray-700 leading-relaxed">
            動画を見て真似をしてみましょう。
            <br />
            次の画面でカメラを使って練習します。
          </p>
          <p className="text-base text-gray-500 mt-2">
            所要時間：{menu.duration}
          </p>
        </div>

        {/* 次へボタン */}
        <button
          onClick={() => setStep("face")}
          className="w-full h-[56px] bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300 shrink-0 mt-4"
        >
          確認できた → 次へ
        </button>
      </div>
    );
  }

  // ========== カウントダウン ==========
  if (step === "countdown") {
    return (
      <div className="bg-amber-50 h-full flex flex-col items-center justify-center">
        <p className="text-8xl font-bold text-orange-500 animate-pulse">
          {countdown}
        </p>
        <p className="text-2xl text-gray-600 mt-6 font-medium">
          まもなく開始します
        </p>
      </div>
    );
  }

  // ========== 画面2: 顔枠合わせ ==========
  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col overflow-hidden">
      {/* ステップ表示 */}
      <div className="flex items-center gap-2 mb-4 shrink-0">
        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-base font-bold">
          2
        </div>
        <span className="text-lg font-bold text-gray-800">
          顔をカメラに合わせる
        </span>
      </div>

      <p className="text-lg text-gray-700 mb-4 shrink-0">
        顔を下の枠に合わせてください
      </p>

      {/* カメラ枠 */}
      <div className="flex-1 min-h-0 relative">
        <div
          className={`w-full h-full rounded-2xl flex flex-col items-center justify-center transition-all duration-500 ${
            faceReady
              ? "bg-green-50 border-4 border-green-500"
              : "bg-gray-200 border-4 border-dashed border-gray-400"
          }`}
        >
          {/* 顔の枠ガイド */}
          <div
            className={`w-40 h-52 rounded-[50%] border-4 transition-all duration-500 ${
              faceReady
                ? "border-green-500"
                : "border-orange-400 animate-pulse"
            }`}
          />

          {!faceReady ? (
            <p className="text-base text-gray-500 mt-4 animate-pulse">
              顔を検出しています...
            </p>
          ) : (
            <div className="flex items-center gap-2 mt-4">
              <CheckCircle className="text-green-500" size={28} />
              <p className="text-xl text-green-600 font-bold">準備OK！</p>
            </div>
          )}
        </div>
      </div>

      {/* 開始ボタン */}
      <button
        onClick={() => {
          if (faceReady) setStep("countdown");
        }}
        disabled={!faceReady}
        className={`w-full h-[56px] text-xl font-bold rounded-2xl transition-all duration-300 shrink-0 mt-4 ${
          faceReady
            ? "bg-orange-500 text-white active:bg-orange-600"
            : "bg-gray-300 text-gray-400 cursor-not-allowed"
        }`}
      >
        トレーニング開始
      </button>
    </div>
  );
}
