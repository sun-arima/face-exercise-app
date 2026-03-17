"use client";

import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function GoalPage() {
  const router = useRouter();
  const { goalMinutes, setGoalMinutes } = useAppContext();

  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col items-center overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-800 text-center mt-8 shrink-0">
        1日の体操の目標時間を
        <br />
        決めましょう
      </h1>

      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        <p className="text-7xl font-bold text-orange-500">{goalMinutes}</p>
        <p className="text-2xl text-gray-600 mt-2">分</p>
      </div>

      {/* 調整ボタン */}
      <div className="flex items-center gap-8 mb-8 shrink-0">
        <button
          onClick={() => setGoalMinutes(Math.max(5, goalMinutes - 5))}
          className="h-16 w-16 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center active:bg-gray-200 transition-colors duration-300"
        >
          <Minus size={28} className="text-gray-600" />
        </button>
        <button
          onClick={() => setGoalMinutes(Math.min(60, goalMinutes + 5))}
          className="h-16 w-16 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center active:bg-gray-200 transition-colors duration-300"
        >
          <Plus size={28} className="text-gray-600" />
        </button>
      </div>

      <button
        onClick={() => router.push("/home")}
        className="w-full h-[56px] bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300 shrink-0"
      >
        この目標でスタート
      </button>
    </div>
  );
}
