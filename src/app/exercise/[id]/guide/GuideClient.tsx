"use client";

import { useRouter, useParams } from "next/navigation";
import { Play } from "lucide-react";
import { menus } from "@/lib/dummyData";

export default function GuideClient() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const menu = menus.find((m) => m.id === id) || menus[0];

  return (
    <div className="bg-amber-50 min-h-screen px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{menu.name}</h1>
        <p className="text-lg text-gray-600 mt-1">{menu.description}</p>
      </div>

      <div className="bg-gray-300 rounded-2xl h-48 flex flex-col items-center justify-center gap-2">
        <Play className="text-gray-500" size={40} />
        <span className="text-lg text-gray-500">お手本動画</span>
        <span className="text-sm text-gray-400">タップして再生</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
        <p className="text-lg text-gray-700">
          動画を見て、やり方を確認してから始めましょう。
        </p>
        <p className="text-lg text-gray-500">所要時間：{menu.duration}</p>
      </div>

      <button
        onClick={() => router.push(`/exercise/${id}/session`)}
        className="w-full h-[60px] bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300"
      >
        体操をはじめる
      </button>
    </div>
  );
}
