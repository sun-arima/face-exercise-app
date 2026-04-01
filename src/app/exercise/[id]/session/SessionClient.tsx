"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { asset } from "@/lib/assetPath";

export default function SessionClient() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [borderGreen, setBorderGreen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBorderGreen((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col overflow-hidden">
      {/* タイトル */}
      <div className="mb-3 shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">ほっぺの膨らまし体操</h1>
        <p className="text-base text-gray-500 mt-0.5">飲み込む力を上げる動きです</p>
      </div>

      {/* インストラクター動画 */}
      <div className="rounded-2xl flex-[3] min-h-0 overflow-hidden shrink-0">
        <video
          src={asset("/traning.mp4")}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className="h-3 shrink-0" />

      {/* カメラエリア */}
      <div
        className={`rounded-2xl flex-[3] min-h-0 flex flex-col items-center justify-center transition-colors duration-300 relative shrink-0 ${
          borderGreen
            ? "bg-gray-200 border-4 border-green-500"
            : "bg-gray-300 border-4 border-gray-400"
        }`}
      >
        <span className="text-lg text-gray-500">あなたの顔</span>
        {borderGreen && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <span className="bg-green-500 text-white text-base font-bold px-4 py-1.5 rounded-full">
              正確にできています
            </span>
          </div>
        )}
      </div>

      <div className="h-3 shrink-0" />

      <button
        onClick={() => router.push(`/exercise/${id}/result`)}
        className="w-full h-[56px] bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300 shrink-0"
      >
        トレーニングを終了する
      </button>
    </div>
  );
}
