"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function FamilySettingPage() {
  const router = useRouter();
  const { shareActivity, setShareActivity, shareCount, setShareCount } =
    useAppContext();

  const getPreviewMessage = () => {
    if (shareActivity && shareCount) {
      return "おばあちゃんが今日も体操しました！3回達成";
    } else if (shareActivity && !shareCount) {
      return "おばあちゃんが今日も体操しました！";
    } else if (!shareActivity && shareCount) {
      return "今日の体操：3回達成";
    } else {
      return "（共有する内容がありません）";
    }
  };

  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col overflow-hidden">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">家族共有設定</h1>
        <p className="text-lg text-gray-600 mt-2">
          設定した内容を家族に共有します
        </p>
      </div>

      {/* トグルスイッチ */}
      <div className="space-y-3 mt-5 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">
          <span className="text-lg text-gray-800">
            体操したかどうかを伝える
          </span>
          <button
            onClick={() => setShareActivity(!shareActivity)}
            className={`w-14 h-8 rounded-full relative transition-colors duration-300 shrink-0 ml-3 ${
              shareActivity ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all duration-300 ${
                shareActivity ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">
          <span className="text-lg text-gray-800">体操の回数を伝える</span>
          <button
            onClick={() => setShareCount(!shareCount)}
            className={`w-14 h-8 rounded-full relative transition-colors duration-300 shrink-0 ml-3 ${
              shareCount ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all duration-300 ${
                shareCount ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 家族側の見え方例 */}
      <div className="mt-5 shrink-0">
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
            <p className="text-lg text-gray-800">{getPreviewMessage()}</p>
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
