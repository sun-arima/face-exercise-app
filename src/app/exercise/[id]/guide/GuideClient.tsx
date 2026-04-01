"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { menus } from "@/lib/dummyData";

export default function GuideClient() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const menu = menus.find((m) => m.id === id) || menus[0];

  const [counting, setCounting] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!counting) return;
    if (countdown <= 0) {
      router.push(`/exercise/${id}/session`);
      return;
    }
    const t = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [counting, countdown, router, id]);

  if (counting) {
    return (
      <div className="bg-amber-50 h-full flex flex-col items-center justify-center gap-4">
        <p className="text-2xl text-gray-500 font-medium">まもなく開始します</p>
        <p className="text-[120px] font-bold text-orange-500 leading-none animate-pulse">
          {countdown}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-800 shrink-0">
        {menu.name}
      </h1>
      <p className="text-base text-gray-600 mt-1 shrink-0">
        {menu.description}
      </p>

      {/* 動画エリア */}
      <div className="rounded-2xl mt-4 overflow-hidden bg-black aspect-[4/3] w-full shrink-0">
        <video
          src="/traning.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* 説明 */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mt-4 shrink-0">
        <p className="text-lg text-gray-700 leading-relaxed">
          動画を見て真似をしてみましょう。
        </p>
        <p className="text-base text-gray-500 mt-2">
          所要時間：{menu.duration}
        </p>
      </div>

      {/* 開始ボタン */}
      <button
        onClick={() => { setCountdown(3); setCounting(true); }}
        className="w-full h-[56px] bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300 shrink-0 mt-4"
      >
        トレーニング開始
      </button>
    </div>
  );
}
