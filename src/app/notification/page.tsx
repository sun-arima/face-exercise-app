"use client";

import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";

export default function NotificationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-50 px-6 py-8 space-y-6">
      {/* ステータスバーモック */}
      <div className="bg-gray-800 rounded-2xl px-4 py-2 flex items-center justify-between">
        <span className="text-white text-lg">9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-2 bg-white rounded-sm" />
          <div className="w-4 h-2 bg-white rounded-sm" />
          <div className="w-6 h-3 bg-white rounded-sm" />
        </div>
      </div>

      {/* 通知バナー */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shrink-0">
            <Bell className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <p className="text-lg text-gray-500">顔まわり体操 · 午前10:00</p>
            <p className="text-xl font-bold text-gray-800 mt-1">
              今日も顔まわり体操の時間です ☺️
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/exercise/menu")}
          className="w-full h-[60px] bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300"
        >
          体操をはじめる
        </button>
      </div>

      {/* 背景装飾テキスト */}
      <div className="text-center mt-12">
        <p className="text-lg text-gray-400">
          これはプッシュ通知のモック画面です
        </p>
      </div>
    </div>
  );
}
