"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, Brain } from "lucide-react";

const brainMenus = [
  {
    id: "brain-1",
    name: "しりとり体操",
    emoji: "💬",
    duration: "約3分",
    description: "声を出しながら頭を使います",
    color: "bg-purple-100",
  },
  {
    id: "brain-2",
    name: "逆さ言葉体操",
    emoji: "🔄",
    duration: "約2分",
    description: "言葉を逆さにして発声します",
    color: "bg-blue-100",
  },
  {
    id: "brain-3",
    name: "数かぞえ体操",
    emoji: "🔢",
    duration: "約3分",
    description: "数をかぞえながら顔を動かします",
    color: "bg-green-100",
  },
  {
    id: "brain-4",
    name: "じゃんけん表情",
    emoji: "✊",
    duration: "約2分",
    description: "じゃんけんに合わせて表情を変えます",
    color: "bg-pink-100",
  },
];

export default function BrainExerciseMenuPage() {
  const router = useRouter();

  return (
    <div className="bg-amber-50 min-h-screen px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <Brain className="text-purple-500" size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">脳トレ体操</h1>
          <p className="text-base text-gray-500">頭と顔を同時にきたえます</p>
        </div>
      </div>

      <div className="space-y-4">
        {brainMenus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => router.push(`/exercise/1/guide`)}
            className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 active:bg-gray-50 transition-colors duration-300"
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${menu.color}`}
            >
              {menu.emoji}
            </div>
            <div className="flex-1 text-left">
              <p className="text-xl font-bold text-gray-800">{menu.name}</p>
              <p className="text-sm text-gray-500">{menu.description}</p>
              <span className="text-xs text-gray-400 mt-1">{menu.duration}</span>
            </div>
            <ChevronRight className="text-gray-400" size={24} />
          </button>
        ))}
      </div>

      {/* 通常の体操メニューへの切替 */}
      <button
        onClick={() => router.push("/exercise/menu")}
        className="w-full h-14 bg-gray-100 text-gray-600 border border-gray-300 text-lg font-medium rounded-2xl"
      >
        通常の体操メニューに切り替え
      </button>
    </div>
  );
}
