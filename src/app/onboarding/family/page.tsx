"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const shareItems = [
  { key: "shareActivity", label: "体操したかどうかを伝える" },
  { key: "shareCount", label: "体操の回数を伝える" },
  { key: "shareMentalScore", label: "心の状態スコアを伝える" },
  { key: "shareTrainingDetail", label: "トレーニングの項目内容を伝える" },
  { key: "shareTrainingVideo", label: "トレーニング中の顔動画を伝える" },
] as const;

type ShareKey = (typeof shareItems)[number]["key"];

export default function FamilySettingPage() {
  const router = useRouter();
  const ctx = useAppContext();

  const getters: Record<ShareKey, boolean> = {
    shareActivity: ctx.shareActivity,
    shareCount: ctx.shareCount,
    shareMentalScore: ctx.shareMentalScore,
    shareTrainingDetail: ctx.shareTrainingDetail,
    shareTrainingVideo: ctx.shareTrainingVideo,
  };

  const setters: Record<ShareKey, (v: boolean) => void> = {
    shareActivity: ctx.setShareActivity,
    shareCount: ctx.setShareCount,
    shareMentalScore: ctx.setShareMentalScore,
    shareTrainingDetail: ctx.setShareTrainingDetail,
    shareTrainingVideo: ctx.setShareTrainingVideo,
  };

  // 「体操したかどうか」がいいえの場合、全部いいえにする
  const handleSetValue = (key: ShareKey, value: boolean) => {
    if (key === "shareActivity" && !value) {
      // 全部いいえにする
      ctx.setShareActivity(false);
      ctx.setShareCount(false);
      ctx.setShareMentalScore(false);
      ctx.setShareTrainingDetail(false);
      ctx.setShareTrainingVideo(false);
    } else {
      setters[key](value);
    }
  };

  const anyShared =
    getters.shareActivity ||
    getters.shareCount ||
    getters.shareMentalScore ||
    getters.shareTrainingDetail ||
    getters.shareTrainingVideo;

  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col overflow-hidden">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">家族共有設定</h1>
        <p className="text-sm text-gray-600 mt-1">
          家族に共有する内容を選んでください
        </p>
      </div>

      {/* 共有項目リスト */}
      <div className="space-y-2 mt-3 flex-1 overflow-y-auto min-h-0">
        {shareItems.map((item) => {
          const value = getters[item.key];
          return (
            <div
              key={item.key}
              className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center justify-between"
            >
              <span className="text-sm text-gray-800 flex-1 mr-3">
                {item.label}
              </span>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleSetValue(item.key, true)}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    value
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}
                >
                  はい
                </button>
                <button
                  onClick={() => handleSetValue(item.key, false)}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    !value
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}
                >
                  いいえ
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 家族側の見え方例 */}
      <div className="mt-2 shrink-0">
        <p className="text-xs text-gray-600 mb-1">家族側の見え方例</p>
        <div className="bg-white rounded-2xl shadow-sm p-3">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs">
                😊
              </div>
              <span className="text-xs font-medium text-gray-700">
                顔まわり体操
              </span>
            </div>
            {!anyShared ? (
              <p className="text-xs text-gray-400">（共有する内容がありません）</p>
            ) : (
              <div className="space-y-1.5">
                {getters.shareActivity && (
                  <p className="text-xs text-gray-800">
                    おばあちゃんが今日も体操しました！
                    {getters.shareCount && " 3回達成"}
                  </p>
                )}
                {getters.shareMentalScore && (
                  <p className="text-xs text-gray-800">心の状態：良好 😊</p>
                )}
                {getters.shareTrainingDetail && (
                  <p className="text-xs text-gray-800">
                    📋 あいうえお体操、舌回し体操
                  </p>
                )}
                {getters.shareTrainingVideo && (
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src="/training-face.png"
                        alt="トレーニング動画"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-gray-800">🎥 トレーニング動画</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push("/onboarding/goal")}
        className="w-full h-[52px] bg-orange-500 text-white text-lg font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300 shrink-0 mt-2"
      >
        この設定で共有する
      </button>
    </div>
  );
}
