"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function FamilySimplePage() {
  const router = useRouter();
  const ctx = useAppContext();

  const items = [
    { label: "体操したかどうかを伝える", value: ctx.shareActivity, setter: ctx.setShareActivity },
    { label: "体操の回数を伝える", value: ctx.shareCount, setter: ctx.setShareCount },
  ];

  // 「体操したかどうか」をいいえにしたら回数もいいえ
  const handleSet = (index: number, value: boolean) => {
    if (index === 0 && !value) {
      ctx.setShareActivity(false);
      ctx.setShareCount(false);
    } else {
      items[index].setter(value);
    }
  };

  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col overflow-hidden">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">家族共有設定</h1>
        <p className="text-base text-gray-600 mt-2">
          あなたの体操の記録を、離れて暮らすご家族に自動で届けることができます。共有したい内容を選んでください。
        </p>
      </div>

      {/* 共有項目 */}
      <div className="space-y-3 mt-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between"
          >
            <span className="text-lg text-gray-800 flex-1 mr-3">
              {item.label}
            </span>
            <button
              onClick={() => handleSet(i, !item.value)}
              className={`w-14 h-8 rounded-full relative transition-colors duration-300 shrink-0 ${
                item.value ? "bg-orange-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all duration-300 ${
                  item.value ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* 家族側の見え方例 */}
      <div className="mt-6 shrink-0">
        <p className="text-base text-gray-600 mb-2">家族側の見え方例</p>
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-lg">
                😊
              </div>
              <span className="text-lg font-medium text-gray-700">
                顔まわり体操
              </span>
            </div>
            <p className="text-lg text-gray-800">
              {ctx.shareActivity && "おばあちゃんが今日も体操しました！"}
              {ctx.shareCount && " 3回達成"}
              {!ctx.shareActivity && !ctx.shareCount && "（共有する内容がありません）"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <button
        onClick={() => router.push("/onboarding/goal")}
        className="w-full h-[56px] bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300 shrink-0"
      >
        この設定で共有する
      </button>
    </div>
  );
}
