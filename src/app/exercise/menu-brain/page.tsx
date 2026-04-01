"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, Brain } from "lucide-react";

const brainMenus = [
  {
    id: "brain-1",
    name: "色読みテスト",
    emoji: "🎨",
    duration: "約2分",
    description: "文字の色と意味が違うものを判断します",
    color: "bg-purple-100",
  },
  {
    id: "brain-2",
    name: "計算チャレンジ",
    emoji: "🧮",
    duration: "約3分",
    description: "簡単な足し算・引き算を素早く解きます",
    color: "bg-blue-100",
  },
  {
    id: "brain-3",
    name: "記憶カード",
    emoji: "🃏",
    duration: "約3分",
    description: "表示されたカードの位置を覚えます",
    color: "bg-green-100",
  },
  {
    id: "brain-4",
    name: "言葉つなぎ",
    emoji: "📝",
    duration: "約2分",
    description: "お題に合う言葉をできるだけ多く思い出します",
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
          <h1 className="text-2xl font-bold text-gray-800">脳トレ</h1>
          <p className="text-base text-gray-500">認知症予防のトレーニング</p>
        </div>
      </div>

      <div className="space-y-4">
        {brainMenus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => router.push(`/exercise/brain/${menu.id}`)}
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

      <button
        onClick={() => router.push("/exercise/menu")}
        className="w-full h-14 bg-gray-100 text-gray-600 border border-gray-300 text-lg font-medium rounded-2xl"
      >
        顔まわり体操に切り替え
      </button>
    </div>
  );
}
