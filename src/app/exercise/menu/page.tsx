"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { menus } from "@/lib/dummyData";

const categoryColors: Record<string, string> = {
  表情筋: "bg-pink-100",
  嚥下機能: "bg-blue-100",
  発声: "bg-yellow-100",
  認知機能: "bg-purple-100",
};

export default function ExerciseMenuPage() {
  const router = useRouter();

  return (
    <div className="bg-amber-50 min-h-screen px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        どの体操をしますか？
      </h1>

      {/* メニューカード */}
      <div className="space-y-4">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => router.push(`/exercise/${menu.id}/guide`)}
            className="w-full h-28 bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 active:bg-gray-50 transition-colors duration-300"
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                categoryColors[menu.category] || "bg-gray-100"
              }`}
            >
              {menu.emoji}
            </div>
            <div className="flex-1 text-left">
              <p className="text-xl font-bold text-gray-800">{menu.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                  {menu.category}
                </span>
                <span className="text-sm text-gray-500">{menu.duration}</span>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={24} />
          </button>
        ))}
      </div>
    </div>
  );
}
